import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../Components/Product/Product";
import { useDispatch, useSelector } from "react-redux";
import { productList } from "../Actions/productActions";
import Loader from "../Components/Loader/Loader";
import Message from "../Components/Message/Message";
import { useParams } from "react-router-dom";
import Paginate from "../Components/Pagination/Paginate";
import ProductCarousel from "../Components/Carousel/ProductCarousel";
import Meta from "../Components/Meta";

const Home = () => {
  const keyword = useParams().keyword;
  const pageNumber = useParams().pageNumber || 1;
  const dispatch = useDispatch();
  const productListState = useSelector((state) => state.productList);
  const { loading, products, error, pages, pageNo } = productListState;

  useEffect(() => {
    dispatch(productList(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta
        title="AtoZ | Home"
        description="Testing E-commerce Website"
        keywords="Electronics"
      ></Meta>

      {!keyword && (
        <>
          <h1>Top Rated Products</h1>
          <ProductCarousel></ProductCarousel>
        </>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : products?.length === 0 ? (
        <Message>No product found for given query.</Message>
      ) : (
        <>
          <Row>
            {products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            pageNo={pageNo}
            keyword={keyword ? keyword : ""}
          ></Paginate>
        </>
      )}
    </>
  );
};

export default Home;
