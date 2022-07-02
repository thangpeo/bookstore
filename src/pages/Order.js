import React, { useEffect, useState } from "react";
import orderApi from "../api/orderApi";
import { useSelector } from "react-redux";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet";
import dayjs from 'dayjs'

const Order = () => {
  const [orders, setOrders] = useState([]);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      const getOrders = async () => {
        const response = await orderApi.getAll(userInfo);
        setOrders(response.data);
      };
      getOrders();
    }
  }, [userInfo]);

  const onRowClick = (orderId) => {
    navigate(orderId);
  };

  return (
    <Helmet title="Đơn hàng">
      <Box sx={{ px: 1 }}>
        {orders.length <= 0 ? (
          <Box>Bạn chưa có đơn hàng nào!</Box>
        ) : (
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Mã hóa đơn</TableCell>
                  <TableCell>Ngày lập</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Tổng tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => {
                  return (
                    <TableRow
                      key={order._id}
                      hover
                      onClick={() => onRowClick(order._id)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{dayjs(order.createAt).format("DD-MM-YYYY")}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>{order.totalPrice}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Helmet>
  );
};

export default Order;
