import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../Components/Rating/Rating";
import { useDispatch, useSelector } from "react-redux";
import { getproduct, postReview } from "../Actions/productActions";
import Message from "../Components/Message/Message";
import Loader from "../Components/Loader/Loader";
import { POST_REVIEW_RESET } from "../Constants/types";

const ProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product);
  const { loading, product, error } = productState;

  //Quantity
  const [qty, setQty] = useState(1);
  const id = useParams().id;

  //Review
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productReview = useSelector((state) => state.postReview);
  const {
    loading: reviewPostLoading,
    success,
    error: reviewPostError,
  } = productReview;

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (success) {
      setRating(0);
      setComment("");
      dispatch({
        type: POST_REVIEW_RESET,
      });
    }
    dispatch(getproduct(id));
  }, [id, dispatch, success]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(
      postReview(id, {
        comment,
        rating,
      })
    );
  };

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Link to="/">
            <Button className="btn btn-light my-3">Go Back</Button>
          </Link>

          <Row>
            <Col md={6}>
              <Image fluid src={product.image} alt={product?.name}></Image>
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product?.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product?.rating}
                    text={`${product?.numReviews} reviews`}
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product?.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product?.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product?.countInStock > 0
                          ? "In Stock"
                          : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* Quantity Selector */}
                  {product?.countInStock > 0 ? (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {/* Options */}
                            {[...Array(product?.countInStock).keys()].map(
                              (opt) => (
                                <option key={opt + 1} value={opt + 1}>
                                  {opt + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ) : null}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product?.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          {/* Post Review Form */}
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}

              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating}></Rating>
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h2>Write a customer review</h2>
                  {reviewPostError && (
                    <Message variant="danger">{reviewPostError}</Message>
                  )}
                  {reviewPostLoading && <Loader></Loader>}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">Poor</option>
                          <option value="2">Fair</option>
                          <option value="3">Good</option>
                          <option value="4">Very Good</option>
                          <option value="5">Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">Login In</Link> to write a
                      review.
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductPage;
