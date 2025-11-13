package com.example.shopdb.service;

import com.example.shopdb.dto.response.OrderResponse;
import jakarta.servlet.http.HttpServletResponse; // ✅ Dùng jakarta.servlet thay vì javax.servlet
import java.io.IOException;
import java.util.List;

public interface ExcelService {
    void exportOrdersToExcel(List<OrderResponse> orders, HttpServletResponse response) throws IOException;
}
