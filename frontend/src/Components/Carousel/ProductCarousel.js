import React, { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { topProductList } from "../../Actions/productActions";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.topProducts
  );

  useEffect(() => {
    dispatch(topProductList());
  }, [dispatch]);

  if (loading) return <Loader></Loader>;

  if (error) return <Message variant="danger">{error}</Message>;

  if (products?.length === 0) return <Message>Product List is Empty</Message>;

  return (
    <Carousel pause="hover" className="bg-dark bg-dark-custom">
      {products?.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Carousel.Caption className="carousel-caption">
              <h2 className="truncate-text">
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
            <Image src={product.image} alt={product.name} fluid></Image>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
