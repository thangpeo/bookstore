import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Pagination,
  PaginationItem,
  Paper,
  Portal,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductFilter from "../components/ProductFilter";
import ProductCard from "../components/ProductCard";
import ProductApi from "../api/productApi";
import brandApi from "../api/brandApi";
import genreApi from "../api/genreApi";
import publisherApi from "../api/publisherApi";
import FilterItem from "../components/ProductFilter/FilterItem";
import { useSelector } from "react-redux";
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import CategoryListItem from "../components/CategoryListItem";
import Helmet from "../components/Helmet";

const initFilter = {
  brand: [],
  genre: [],
  publisher: [],
  price: [],
};
const prices = [
  {
    label: "0 - 150.000vnđ",
    minValue: 0,
    maxValue: 150000,
  },
  {
    label: "150.000vnđ - 300.000vnđ",
    minValue: 150000,
    maxValue: 300000,
  },
  {
    label: "300.000vnđ - 500.000vnđ",
    minValue: 300000,
    maxValue: 500000,
  },
  {
    label: "500.000vnđ - 700.000vnđ",
    minValue: 500000,
    maxValue: 700000,
  },
  {
    label: "700.000vnđ trở lên",
    minValue: 700000,
    maxValue: Number.MAX_SAFE_INTEGER,
  },
];

const Products = () => {
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [brands, setBrands] = useState(null);
  const [genres, setGenres] = useState(null);
  const [publishers, setPublishers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const categories = useSelector((state) => state.category.data);
  const [error, setError] = useState(null);
  const filterChipsRef = React.useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const { category, type } = useParams();
  const navigate = useNavigate();

  const [filter, setFilter] = useState(initFilter);
  const filterSelect = (type, checked, value1, value2) => {
    if (checked) {
      switch (type) {
        case "brand":
          const newBrand = [...filter.brand, value1];
          setFilter({ ...filter, brand: newBrand });
          break;
        case "genre":
          const newGenre = [...filter.genre, value1];
          setFilter({ ...filter, genre: newGenre });
          break;
        case "publisher":
          const newPub = [...filter.publisher, value1];
          setFilter({ ...filter, publisher: newPub });
          break;
        case "price":
          const newPrice = [value1, value2];
          setFilter({ ...filter, price: newPrice });
          break;
        default:
          break;
      }
    } else {
      switch (type) {
        case "brand":
          const newBrand = filter.brand.filter((e) => e !== value1);
          setFilter({ ...filter, brand: newBrand });
          break;
        case "genre":
          const newGenre = filter.genre.filter((e) => e !== value1);
          setFilter({ ...filter, genre: newGenre });
          break;
        case "publisher":
          const newPublisher = filter.publisher.filter((e) => e !== value1);
          setFilter({ ...filter, publisher: newPublisher });
          break;
        case "price":
          setFilter({ ...filter, price: [] });
          break;
        default:
          break;
      }
    }
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const clearFilter = () => {
    setFilter(initFilter);
  };

  useEffect(() => {
    const fetchProductData = async (filter) => {
      setIsLoading(true);
      try {
        const filterParams = {};
        const key = searchParams.get("q");
        Object.keys(filter).forEach((key) => {
          filterParams[key] = filter[key].join("_");
        });
        const params = {
          ...filterParams,
          page,
          type,
          category,
          q: key,
        };
        const { data } = await ProductApi.getAll(params);
        const { productList, totalPage = 0 } = data;
        setProducts(productList);
        setTotalPage(totalPage);
        setError(null);
      } catch (error) {
        console.log(error);
        setError("Đã xảy ra lỗi!");
      }
      setIsLoading(false);
    };
    fetchProductData(filter);
  }, [filter, page, type, category, searchParams]);
  useEffect(() => {
    const fetchBrandsProduct = async () => {
      try {
        const resBrands = await brandApi.getAll();
        setBrands(resBrands.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBrandsProduct();
  }, []);
  useEffect(() => {
    const fetchGenresProduct = async () => {
      try {
        const resGenres = await genreApi.getAll();
        setGenres(resGenres.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenresProduct();
  }, []);
  useEffect(() => {
    const fetchPublishersProduct = async () => {
      try {
        const resPublishers = await publisherApi.getAll();
        setPublishers(resPublishers.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPublishersProduct();
  }, []);

  return (
    <Helmet title="Sản phẩm">
      <Grid container spacing={2}>
        <Grid item xs={0} md={3}>
          <Paper>
            <List>
              <ListItem>
                <ListItemText
                  sx={{ "&:hover": { cursor: "pointer" } }}
                  primary={"Tất cả sản phẩm"}
                  onClick={() => navigate("/products")}
                />
              </ListItem>
              {categories.map((category, index) => (
                <CategoryListItem key={index} category={category} />
              ))}
            </List>
            <CategoryListItem categories={categories} />
          </Paper>
          <Paper>
            {prices && (
              <ProductFilter title={"Giá"} alwaysShow>
                {prices.map((item, index) => (
                  <React.Fragment key={index}>
                    <FilterItem
                      label={item.label}
                      onChange={(e) => {
                        filterSelect(
                          "price",
                          e.target.checked,
                          item.minValue,
                          item.maxValue
                        );
                      }}
                      checked={
                        filter.price[0] === item.minValue &&
                        filter.price[1] === item.maxValue
                      }
                    />
                    {filter.price[0] === item.minValue &&
                      filter.price[1] === item.maxValue && (
                        <Portal container={filterChipsRef.current}>
                          <Chip
                            label={item.label}
                            color="secondary"
                            variant="outlined"
                            onDelete={() =>
                              filterSelect(
                                "price",
                                false,
                                item.minValue,
                                item.maxValue
                              )
                            }
                          />
                        </Portal>
                      )}
                  </React.Fragment>
                ))}
              </ProductFilter>
            )}
            {genres && genres.length > 0 && (
              <ProductFilter title={"Thể loại"}>
                {genres.map((item, index) => (
                  <React.Fragment key={index}>
                    <FilterItem
                      label={item.name}
                      onChange={(e) =>
                        filterSelect("genre", e.target.checked, item._id)
                      }
                      checked={filter.genre.includes(item._id)}
                    />
                    {filter.genre.includes(item._id) && (
                      <Portal container={filterChipsRef.current}>
                        <Chip
                          label={item.name}
                          color="secondary"
                          variant="outlined"
                          onDelete={() =>
                            filterSelect("genre", false, item._id)
                          }
                        />
                      </Portal>
                    )}
                  </React.Fragment>
                ))}
              </ProductFilter>
            )}
            {publishers && publishers.length > 0 && (
              <ProductFilter title={"Nhà cung cấp"}>
                {publishers.map((item, index) => (
                  <React.Fragment key={index}>
                    <FilterItem
                      label={item.name}
                      onChange={(e) =>
                        filterSelect("publisher", e.target.checked, item._id)
                      }
                      checked={filter.publisher.includes(item._id)}
                    />
                    {filter.publisher.includes(item._id) && (
                      <Portal container={filterChipsRef.current}>
                        <Chip
                          label={item.name}
                          color="secondary"
                          variant="outlined"
                          onDelete={() =>
                            filterSelect("publisher", false, item._id)
                          }
                        />
                      </Portal>
                    )}
                  </React.Fragment>
                ))}
              </ProductFilter>
            )}
            {brands && brands.length > 0 && (
              <ProductFilter title={"Thương hiệu"}>
                {brands.map((item, index) => (
                  <React.Fragment key={index}>
                    <FilterItem
                      label={item.name}
                      onChange={(e) =>
                        filterSelect("brand", e.target.checked, item._id)
                      }
                      checked={filter.brand.includes(item._id)}
                    />
                    {filter.brand.includes(item._id) && (
                      <Portal container={filterChipsRef.current}>
                        <Chip
                          label={item.name}
                          color="secondary"
                          variant="outlined"
                          onDelete={() =>
                            filterSelect("brand", false, item._id)
                          }
                        />
                      </Portal>
                    )}
                  </React.Fragment>
                ))}
              </ProductFilter>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box>
            <Box
              component={"span"}
              sx={{ "&>*": { m: 1 } }}
              ref={filterChipsRef}
            ></Box>
            {filterChipsRef &&
              filterChipsRef.current &&
              filterChipsRef.current.childNodes.length >= 1 && (
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ m: 1 }}
                  onClick={() => {
                    clearFilter();
                  }}
                >
                  Xóa bộ lọc
                </Button>
              )}
          </Box>
          {isLoading ? (
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography>{error}</Typography>
          ) : (
            <Box>
              {products.length <= 0 ? (
                <Box>Không có sản phẩm phù hợp</Box>
              ) : (
                <Grid container sx={{ mb: 2 }} spacing={1}>
                  {products.map((product, index) => (
                    <Grid key={index} item xs={6} md={3}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>
              )}
              {totalPage && (
                <Pagination
                  color="primary"
                  count={totalPage}
                  page={page}
                  shape="rounded"
                  showFirstButton
                  showLastButton
                  sx={{ display: "flex", justifyContent: "center" }}
                  onChange={handleChangePage}
                  renderItem={(item) => (
                    <PaginationItem
                      // components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                      {...item}
                    />
                  )}
                />
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </Helmet>
  );
};

export default Products;
