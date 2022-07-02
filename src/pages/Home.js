import React, { useEffect, useRef, useState } from "react";
import bannerApi from "../api/bannerApi";
import categoryApi from "../api/categoryApi";
import Banner from "../components/Banner";
import BannerItem from "../components/Banner/BannerItem";
import InfinityList from "../components/InfinityList";
import ProductCategoryContent from "../components/ProductCategoryContent";
import SectionProduct from "../components/SectionProduct";
import { useSelector } from "react-redux";
import ProductApi from "../api/productApi";
import { Box } from "@mui/material";
import Helmet from "../components/Helmet";

const Home = () => {
  const [banners, setBanners] = useState([]);
  const categories = useSelector((state) => state.category.data);
  const isLoading = useSelector((state) => state.category.isLoading);
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [categoryLink, setCategoryLink] = useState("/products");
  const [categoryWithProducts, setCategoryWithProducts] = useState([]);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const { data } = await bannerApi.getAll();
        setBanners(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBanner();
  }, []);

  const fetchProductsByCategory = async (id) => {
    if (id) {
      const { data } = await ProductApi.getAll({
        category: id,
      });
      setProductsByCategory(data.productList);
      setCategoryLink("/products/" + id);
    } else {
      const { data } = await ProductApi.getAll();
      setProductsByCategory(data.productList);
      setCategoryLink("/products/");
    }
  };
  const fetchProductsByCategory_Type = async (category, type) => {
    if (category && type) {
      const { data } = await ProductApi.getAll({
        type: type._id,
      });
      // data.productList
      setCategoryWithProducts([
        ...categoryWithProducts.map((c) => {
          if (c._id === category._id) {
            return {
              ...c,
              listProduct: data.productList,
              loaded: true,
            };
          } else {
            return c;
          }
        }),
      ]);
    }
  };

  useEffect(() => {
    fetchProductsByCategory();
  }, []);
  useEffect(() => {
    if (!isLoading) {
      const arrCategoryWithProducts = [
        ...categories.map((c) => ({
          ...c,
          listProduct: [],
          loaded: false,
          link: `/products/${c._id}/${c.types[0]._id ? c.types[0]._id : ""}`,
        })),
      ];
      setCategoryWithProducts(arrCategoryWithProducts);
    }
  }, [isLoading, categories]);
  useEffect(() => {
    if (categoryWithProducts && categoryWithProducts.length > 0) {
      for (let index = 0; index < categoryWithProducts.length; index++) {
        const category = categoryWithProducts[index];
        if (!category.loaded) {
          fetchProductsByCategory_Type(category, category.types[0]);
          break;
        }
      }
    }
  }, [categoryWithProducts]);
  return (
    <Helmet title="Trang chủ">
      <Banner data={banners}>
        {banners.map((item, index) => (
          <BannerItem key={index} src={item.image} href={item.link} />
        ))}
      </Banner>
      <ProductCategoryContent categories={categories}/>
      {categories && (
        <SectionProduct
          title={"Top sản phẩm"}
          products={productsByCategory}
          tabs={[{ name: "Tất cả" }, ...categories].map((category) => ({
            label: category.name,
            onChange: () => {
              fetchProductsByCategory(category._id);
            },
          }))}
          seeMoreLink={categoryLink}
        />
      )}
      {categoryWithProducts.map((category) => {
        if (!category.product) {
          return null;
        }
        return (
          <SectionProduct
            key={category._id}
            loading={category.loaded}
            title={category.name}
            products={category.listProduct}
            tabs={category.types.map((type) => ({
              label: type.name,
              onChange: () => {
                fetchProductsByCategory_Type(category, type);
              },
            }))}
            seeMoreLink={category.link}
          />
        );
      })}
    </Helmet>
  );
};

export default Home;
