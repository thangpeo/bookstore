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
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import orderApi from "../api/orderApi";
import Helmet from "../components/Helmet";
import OrderProduct from "../components/OrderProduct";

const OrderDetail = () => {
  const [orderItems, setOrderItems] = useState([]);
  const { id } = useParams();
  const userInfo = useSelector((state) => state.auth.userInfo);
  useEffect(() => {
    const getOrdersDetail = async (username, id) => {
      const response = await orderApi.getOrder(username, id);
      setOrderItems(response.data.items);
    };
    getOrdersDetail(userInfo.username, id);
  }, [userInfo]);
  const navigate = useNavigate();
  const onRowClick = (productId) => {
    navigate(`/productdetail/${productId}`);
  };

  return (
    <Helmet title="Chi tiết đơn hàng">
      <Box sx={{ px: 1 }}>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Sản phẩm</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell>Giảm giá</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Tạm tính</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderItems.map((orderItem) => {
                return (
                  <TableRow
                    key={orderItem._id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => onRowClick(orderItem._id)}
                  >
                    <TableCell>{orderItem.name}</TableCell>
                    <TableCell>{orderItem.quantity}</TableCell>
                    <TableCell>{orderItem.price}</TableCell>
                    <TableCell>{orderItem.discount}</TableCell>
                    <TableCell>
                      {orderItem.price *
                        orderItem.quantity *
                        (1 - orderItem.discount / 100)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Helmet>
  );
};

export default OrderDetail;
