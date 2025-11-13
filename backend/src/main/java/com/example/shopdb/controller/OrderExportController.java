package com.example.shopdb.controller;

import com.example.shopdb.dto.response.OrderResponse;
import com.example.shopdb.service.ExcelService;
import com.example.shopdb.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletResponse; // ✅ Dùng jakarta.servlet
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class OrderExportController {

    private final ExcelService excelService;
    private final OrderService orderService;

    @GetMapping("/export")
    public void exportOrders(HttpServletResponse response) throws IOException {
        List<OrderResponse> orders = orderService.getAll();
        excelService.exportOrdersToExcel(orders, response);
    }
}
