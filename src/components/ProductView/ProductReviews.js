import { Box, Button, Pagination, Rating, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductApi from "../../api/productApi";
import { openModal } from "../../redux/AuthModalSlice";
import ProductComments from "./ProductComments";
import ReviewProduct from "./ReviewProduct";

const ProductReviews = ({ id }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const openLoginModal = () => {
    dispatch(openModal("login"));
  };
  const closeLoginModal = () => {
    dispatch(openModal("register"));
  };
  useEffect(() => {
    const fetchCommentsProduct = async (id) => {
      const { data } = await ProductApi.getComments(id, { page });
      console.log(data);
      if (data && data.total > 0) {
        setComments(data.comments);
        setRating(data.rating);
        setTotal(data.total);
        setTotalPage(data.totalPage);
      }
    };
    fetchCommentsProduct(id);
  }, [id, page]);
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ textAlign: "center", p: 1, flexBasis: "25%" }}>
          <Typography sx={{ fontWeight: "bold" }} variant="h6">
            <Typography fontSize={52} variant="span">
              {rating}
            </Typography>
            <Typography fontSize={24} variant="span">
              /5
            </Typography>
          </Typography>
          <Typography>
            <Rating value={rating} readOnly />
          </Typography>
          <Typography>(Tổng {total} lượt đánh giá)</Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {isLoggedIn ? (
            <ReviewProduct id={id} username={userInfo.username} />
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              Chỉ có thành viên mới có thể viết nhận xét. Vui lòng
              <Button onClick={openLoginModal}> đăng nhập</Button>
              hoặc
              <Button onClick={closeLoginModal}> đăng ký.</Button>
            </Box>
          )}
        </Box>
      </Box>
      {comments && comments.length > 0 && (
        <Box>
          <ProductComments comments={comments} />
          <Box sx={{ p: 1 }}>
            <Pagination
              onChange={handleChangePage}
              sx={{ "& .MuiPagination-ul": { justifyContent: "center" } }}
              count={totalPage}
              page={page}
              color="primary"
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default ProductReviews;
