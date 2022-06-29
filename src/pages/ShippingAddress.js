import { Box, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userApi from "../api/userApi";
import Helmet from "../components/Helmet";
import ShippingAddressItem from "../components/ShippingAddressItem";

const ShippingAddress = () => {
  const [shippingAddressDefault, setShippingAddressDefault] = useState(null);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  const editAddress = (id) => {
    navigate(`/account/shippingaddress/edit/${id}`);
  };
  const removeAddress = async (id) => {
    await userApi.removeShippingAddress(id);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const getShippingAddress = async () => {
      const response = await userApi.getShippingAddress(userInfo.username);
      // const data = [
      //     {
      //         "province": "Oklahoma",
      //         "district": "Tibbie",
      //         "ward": "Lexington Avenue",
      //         "address": 904,
      //         "phone": "+1 (813) 407-3072",
      //         "receiverFullName": "Hardy Mejia",
      //         "_id": "62902f3a1c53ffa88e7c1292",
      //         "isDefault": false
      //     },
      //     {
      //         "province": "Marshall Islands",
      //         "district": "Allentown",
      //         "ward": "Church Avenue",
      //         "address": 996,
      //         "phone": "+1 (897) 411-3436",
      //         "receiverFullName": "Jerry Buchanan",
      //         "_id": "62902f3ab4fb943feff0d90a",
      //         "isDefault": false
      //     },
      //     {
      //         "province": "Wisconsin",
      //         "district": "Hoehne",
      //         "ward": "Georgia Avenue",
      //         "address": 450,
      //         "phone": "+1 (893) 451-2329",
      //         "receiverFullName": "Leonard Rowland",
      //         "_id": "62902f3aa80ad812c6098505",
      //         "isDefault": true
      //     },
      //     {
      //         "province": "New York",
      //         "district": "Fontanelle",
      //         "ward": "Bradford Street",
      //         "address": 959,
      //         "phone": "+1 (925) 428-2764",
      //         "receiverFullName": "Lacy Mcleod",
      //         "_id": "62902f3abac0b87a27fc0f90",
      //         "isDefault": false
      //     },
      //     {
      //         "province": "California",
      //         "district": "Logan",
      //         "ward": "Newton Street",
      //         "address": 670,
      //         "phone": "+1 (853) 545-2519",
      //         "receiverFullName": "Thompson Benjamin",
      //         "_id": "62902f3a1baff02da2a61365",
      //         "isDefault": false
      //     },
      //     {
      //         "province": "District Of Columbia",
      //         "district": "Tooleville",
      //         "ward": "Wolcott Street",
      //         "address": 644,
      //         "phone": "+1 (875) 582-3983",
      //         "receiverFullName": "Ingrid Mcgee",
      //         "_id": "62902f3a675e699a8d781865",
      //         "isDefault": false
      //     }
      // ]
      const addresses = [];
      response.data.forEach((item) => {
        // data.forEach(item => {
        if (item.isDefault) {
          setShippingAddressDefault(item);
        } else {
          addresses.push(item);
        }
      });
      setShippingAddresses(addresses);
    };
    getShippingAddress();
  }, [dispatch]);

  return (
    <Helmet title="Sổ địa chỉ">
      {shippingAddressDefault ? (
        <Box sx={{ px: 2 }}>
          <Paper sx={{ mb: 2, p: 1 }}>
            <Typography gutterBottom variant="h6">
              Địa chỉ giao hàng mặc định
            </Typography>
            <ShippingAddressItem data={shippingAddressDefault} />
          </Paper>
          <Paper sx={{ mb: 2, p: 1 }}>
            <Typography gutterBottom variant="h6">
              Địa chỉ giao hàng khác
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {shippingAddresses.map((item) => {
                return (
                  <Box sx={{ flexBasis: "50%" }} key={item._id}>
                    <ShippingAddressItem
                      data={item}
                      onEditClick={() => editAddress(item._id)}
                      onRemoveClick={() => removeAddress(item._id)}
                    />
                  </Box>
                );
              })}
            </Box>
          </Paper>
        </Box>
      ) : (
        <Box>Ban chu co dia chi nao</Box>
      )}
    </Helmet>
  );
};

export default ShippingAddress;
