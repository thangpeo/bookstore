import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import userApi from "../api/userApi";
import orderApi from "../api/orderApi";
import numberWithCommas from "../utils/numberWithCommas";
import Helmet from "../components/Helmet";
import { removeCart } from "../redux/CartSlice";

const schema = yup
  .object({
    receiverFullName: yup.string().required("Không được để trống"),
    email: yup
      .string()
      .email("không đúng định dạng")
      .required("Không được để trống"),
    phone: yup.string().required("Không được để trống"),
    province: yup.string().required("Không được để trống"),
    district: yup.string().required("Không được để trống"),
    ward: yup.string().required("Không được để trống"),
    address: yup.string().required("Không được để trống"),
  })
  .required();

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState([]);
  const [value, setValue] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const dispatch = useDispatch();

  const clearCart = () => {
    dispatch(removeCart());
  };

  const handleSelectChange = (event) => {
    setValue(Number(event.target.value));
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      receiverFullName: "",
      email: "",
      phone: "",
      province: "",
      district: "",
      ward: "",
      address: "",
    },
  });
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { userInfo, isLoggedIn } = useSelector((state) => state.auth);

  const [totalPrice, setTotalPrice] = React.useState(0);
  React.useEffect(() => {
    setTotalPrice(
      cartItems.reduce(
        (preValue, item) => preValue + item.price * item.quantity,
        0
      )
    );
  }, [cartItems]);

  const onSubmit = async (data) => {
    const { email, ...dataShipping } = data;
    if (isLoggedIn) {
      if (shippingAddress.length > 0) {
        // promises.push(orderApi.addOrder({ shippingAddress: shippingAddress[value], items: cartItems, username: userInfo.username }))
        await orderApi.addOrder({
          shippingAddress: shippingAddress[value],
          items: cartItems,
          username: userInfo.username,
        });
        console.log({
          shippingAddress: shippingAddress[value],
          items: cartItems,
          username: userInfo.username,
        });
      } else {
        const promises = [];
        promises.push(
          userApi.addShippingAddress({
            ...dataShipping,
            username: email,
            isDefault: true,
          })
        );
        promises.push(
          orderApi.addOrder({
            shippingAddress: data,
            items: cartItems,
            username: userInfo.username,
          })
        );
        Promise.all(promises).then((results) => {
          setIsDone(true);
        });
        // console.log({
        //   shippingAddress: dataShipping,
        //   items: cartItems,
        //   username: userInfo.username,
        // });
      }
    } else {
      await orderApi.addOrder({
        shippingAddress: data,
        items: cartItems,
        username: email,
      });
      // promises.push(orderApi.addOrder({ shippingAddress: data, items: cartItems, username: email }))
      // console.log({
      //   shippingAddress: dataShipping,
      //   items: cartItems,
      //   username: email,
      // });
    }
  };

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const handleChangeProvice = (e) => {
    const value = e.target.value;
    setDistricts(provinces.find((item) => item.Id === value).Districts);
    setWards([]);
  };
  const handleChangeDistrict = (e) => {
    const value = e.target.value;
    setWards(districts.find((item) => item.Id === value).Wards);
  };

  useEffect(() => {
    if (isLoggedIn) {
      const getShippingAdress = async () => {
        try {
          const response = await userApi.getShippingAddress(userInfo.username);
          setShippingAddress(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getShippingAdress();
    }
  }, [isLoggedIn, userInfo]);
  useEffect(() => {
    if (!(isLoggedIn && shippingAddress.length > 0)) {
      const fet = async () => {
        const res = await fetch(
          "https://raw.githubusercontent.com/thangpeo/address/main/address.json"
        );
        const data = await res.json();
        setProvinces(data);
      };
      fet();
    }
  }, [shippingAddress, isLoggedIn]);

  if (cartItems.length === 0) {
    return <Navigate to={"/cart"} replace />;
  } else if (isDone) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <Helmet title="Tiến hành thanh toán">
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Paper sx={{ pt: 1, pb: 2, px: 3, my: 2 }}>
          <Typography variant="h6">ĐỊA CHỈ GIAO HÀNG</Typography>
          <Divider />
          {isLoggedIn && shippingAddress.length > 0 ? (
            <FormControl>
              <FormLabel>Chọn sổ địa chỉ</FormLabel>
              <RadioGroup
                name="shippingAddress"
                value={value}
                onChange={handleSelectChange}
              >
                {shippingAddress.map((item, index) => {
                  return (
                    <FormControlLabel
                      value={index}
                      control={<Radio checked={index === value} />}
                      label={`${item.address} ${item.ward} ${item.district} ${item.province}`}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Controller
                name="receiverFullName"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Họ tên người nhận"
                    margin="dense"
                    error={errors.receiverFullName ? true : false}
                    helperText={errors.receiverFullName?.message}
                    {...field}
                  />
                )}
              />
              {!isLoggedIn && (
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      size="small"
                      label="Email"
                      margin="dense"
                      error={errors.email ? true : false}
                      helperText={errors.email?.message}
                      {...field}
                    />
                  )}
                />
              )}
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Số điện thoại người nhận"
                    margin="dense"
                    error={errors.phone ? true : false}
                    helperText={errors.phone?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="province"
                control={control}
                render={({
                  field: { value, name, ref, onChange }, // remove onChange here to allow pass though from parent onChange
                }) => (
                  <FormControl
                    size="small"
                    margin="dense"
                    error={errors.province ? true : false}
                  >
                    <InputLabel>Tỉnh/thành phố</InputLabel>
                    <Select
                      label="Tỉnh/Thành phố"
                      onChange={(e) => {
                        handleChangeProvice(e);
                        onChange(e);
                      }}
                      value={value}
                      name={name}
                      ref={ref}
                    >
                      {provinces.map((item) => {
                        return (
                          <MenuItem key={item.Id} value={item.Id}>
                            {item.Name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>{errors.province?.message}</FormHelperText>
                  </FormControl>
                )}
              />
              <Controller
                name="district"
                control={control}
                render={({ field: { value, name, ref, onChange } }) => (
                  <FormControl
                    size="small"
                    margin="dense"
                    error={errors.district ? true : false}
                  >
                    <InputLabel>Quận/huyện</InputLabel>
                    <Select
                      label="Quận/Huyện"
                      onChange={(e) => {
                        handleChangeDistrict(e);
                        onChange(e);
                      }}
                      value={value}
                      name={name}
                      ref={ref}
                    >
                      {districts.map((item) => {
                        return (
                          <MenuItem key={item.Id} value={item.Id}>
                            {item.Name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>{errors.district?.message}</FormHelperText>
                  </FormControl>
                )}
              />
              <Controller
                name="ward"
                control={control}
                render={({ field }) => (
                  <FormControl
                    size="small"
                    margin="dense"
                    error={errors.ward ? true : false}
                  >
                    <InputLabel>Phường/xã</InputLabel>
                    <Select label="Phường/xã" {...field}>
                      {wards.map((item) => {
                        return (
                          <MenuItem key={item.Id} value={item.Id}>
                            {item.Name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>{errors.ward?.message}</FormHelperText>
                  </FormControl>
                )}
              />
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    label="Địa chỉ"
                    margin="dense"
                    error={errors.address ? true : false}
                    helperText={errors.address?.message}
                    {...field}
                  />
                )}
              />
            </Box>
          )}
        </Paper>
        <Paper sx={{ pt: 1, pb: 2, px: 3, my: 2 }}>
          <Typography variant="h6">Danh sách sản phẩm</Typography>
          <Divider />
          <Box>
            {cartItems.map((product) => (
              <CartItem key={product._id} product={product} />
            ))}
          </Box>
        </Paper>
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            p: 1,
            borderTop: 2,
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "space-between", sm: "flex-end" },
            }}
          >
            <Typography color="error" fontWeight={"bold"} sx={{ mr: 2 }}>
              Tổng số tiền: {numberWithCommas(totalPrice)} VNĐ
            </Typography>
            <Button type={"submit"} variant="contained" color="error">
              Thanh toán
            </Button>
          </Box>
        </Paper>
      </Box>
    </Helmet>
  );
};

export default Checkout;
