import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import userApi from "../../api/userApi";

const schema = yup
  .object({
    receiverFullName: yup.string().required("Không được để trống"),
    phone: yup.string().required("Không được để trống"),
    province: yup.string().required("Không được để trống"),
    district: yup.string().required("Không được để trống"),
    ward: yup.string().required("Không được để trống"),
    address: yup.string().required("Không được để trống"),
  })
  .required();

const ShippingAddressForm = ({ title = "", shippingAddress }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      receiverFullName:
        (shippingAddress && shippingAddress.receiverFullName) || "",
      phone: (shippingAddress && shippingAddress.phone) || "",
      province: (shippingAddress && shippingAddress.province) || "",
      district: (shippingAddress && shippingAddress.district) || "",
      ward: (shippingAddress && shippingAddress.ward) || "",
      address: (shippingAddress && shippingAddress.address) || "",
    },
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const onSubmit = async (data) => {
    const newAddress = { ...shippingAddress, ...data };
    if (shippingAddress) {
      await userApi.updateShippingAddress(newAddress);
    } else {
      await userApi.addShippingAddress(newAddress);
    }
  };

  const handleChangeProvice = (e) => {
    const value = e.target.value;
    setDistricts(provinces.find((item) => item.Id === value).Districts);
    setWards([]);
  };
  const handleChangeDistrict = (e) => {
    const value = e.target.value;
    setWards(districts.find((item) => item.Id === value).Wards);
  };

  React.useEffect(() => {
    const fet = async () => {
      const res = await fetch(
        "https://raw.githubusercontent.com/thangpeo/address/main/address.json"
      );
      const data = await res.json();
      if (shippingAddress) {
        const pro = data;
        const dis = data.find(
          (item) => item.Id === shippingAddress.province
        ).Districts;
        const wa = dis.find(
          (item) => item.Id === shippingAddress.district
        ).Wards;
        setProvinces(pro);
        setDistricts(dis);
        setWards(wa);
      } else {
        setProvinces(data);
      }
    };
    fet();
  }, [shippingAddress]);

  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Box
          component={"form"}
          sx={{ display: "flex", flexDirection: "column", p: 1 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="h6">{title}</Typography>
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
                margin="normal"
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
                margin="normal"
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
                margin="normal"
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
          <Box textAlign={"center"}>
            <Button type={"submit"} size="small" variant={"contained"}>
              Lưu địa chỉ
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ShippingAddressForm;
