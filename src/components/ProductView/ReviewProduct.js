import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Rating,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ProductApi from "../../api/productApi";
import SendIcon from "@mui/icons-material/Send";

const ReviewProduct = ({ id, username }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(5);
  const [anonymous, setAnonymous] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [reviewData, setReviewData] = useState({
    displayName: "",
    rate: 5,
    comment: "",
  });

  const handleChangeRating = (event, newValue) => {
    setRating(newValue || 5);
    setReviewData({
      ...reviewData,
      rate: newValue || 5,
    });
  };
  const handleChangeSwitch = (e) => {
    setAnonymous(e.target.checked);
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await ProductApi.postComment({
        ...reviewData,
        displayName: anonymous ? "Ẩn danh" : reviewData.displayName,
        productId: id,
        username: username,
      });
      setOpen(false);
      setError(null);
      setIsLoading(false);
    } catch (error) {
      setError("Đã xảy ra lỗi");
      setOpen(false);
      setError(error);
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Button onClick={handleOpen} variant="outlined">
        Viết đánh giá
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            maxWidth: "100%",
            bgcolor: "background.paper",
          }}
        >
          <Box
            component={"form"}
            onSubmit={handleSubmit}
            sx={{ p: 1, borderRadius: 1 }}
          >
            <Typography variant="h5" align="center" textTransform={"bold"}>
              Viết đánh giá sản phẩm
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
              <Rating
                size={"large"}
                value={rating}
                onChange={handleChangeRating}
                precision={1}
              />
            </Box>
            <TextField
              name="rate"
              placeholder="Nhập tên hiển thị"
              value={rating}
              onChange={handleChangeInput}
              sx={{ display: "none" }}
              margin="dense"
            />
            <TextField
              name="displayName"
              sx={{ flexGrow: 1 }}
              fullWidth
              placeholder="Nhập tên hiển thị"
              disabled={anonymous}
              required={!anonymous}
              margin="dense"
              onChange={handleChangeInput}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <span>Ẩn danh</span>
              <Switch checked={anonymous} onChange={handleChangeSwitch} />
            </Box>
            <TextField
              name="comment"
              label="Viết đánh giá tại đây"
              multiline
              fullWidth
              rows={4}
              required
              onChange={handleChangeInput}
              margin="dense"
            />
            <Box sx={{ textAlign: "right", mt: 1 }}>
              <Button
                disabled={isLoading}
                endIcon={isLoading ? <CircularProgress /> : <SendIcon />}
                type={"submit"}
                variant={"contained"}
              >
                Gửi nhận xét
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ReviewProduct;
