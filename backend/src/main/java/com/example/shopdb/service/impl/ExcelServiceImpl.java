package com.example.shopdb.service.impl;

import com.example.shopdb.dto.response.OrderResponse;
import com.example.shopdb.service.ExcelService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;  // ✅ Dùng jakarta.servlet thay vì javax.servlet
import java.io.IOException;
import java.util.List;

@Service
public class ExcelServiceImpl implements ExcelService {

    @Override
    public void exportOrdersToExcel(List<OrderResponse> orders, HttpServletResponse response) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Orders");

        // Header
        String[] headers = {"ID", "User ID", "Total Price", "Status", "Payment Method", "Shipping Address", "Voucher Code", "Created At"};
        Row headerRow = sheet.createRow(0);

        CellStyle headerStyle = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setBold(true);
        headerStyle.setFont(font);

        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        // Data rows
        int rowNum = 1;
        for (OrderResponse order : orders) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(order.getId());
            row.createCell(1).setCellValue(order.getUserId() != null ? order.getUserId() : 0);
            row.createCell(2).setCellValue(order.getTotalPrice());
            row.createCell(3).setCellValue(order.getStatus());
            row.createCell(4).setCellValue(order.getPaymentMethod());
            row.createCell(5).setCellValue(order.getShippingAddress() != null ? order.getShippingAddress() : "");
            row.createCell(6).setCellValue(order.getVoucherCode() != null ? order.getVoucherCode() : "");
            row.createCell(7).setCellValue(order.getCreatedAt() != null ? order.getCreatedAt().toString() : "");
        }

        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }

        // Config response để tải file
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=orders.xlsx");

        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();
        outputStream.close();
    }
}
