import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductApi from "../api/productApi";
import Helmet from "../components/Helmet";
import ProductView from "../components/ProductView";

const ProductDetail = () => {
  const { ProductId } = useParams();
  const [product, setProduct] = React.useState(undefined);
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await ProductApi.getProductById(ProductId);
      setProduct(response.data);
    };
    fetchProduct();
  }, [ProductId]);

  return (
    <Helmet
      title={
        product ? "Chi tiết sản phẩm " + product.name : "Chi tiết sản phẩm"
      }
    >
      {product && <ProductView product={product} />}
    </Helmet>
  );
};

export default ProductDetail;
