import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message/Message";
import moment from "moment";
import {
  getOrderDetails,
  payOrder,
  setDelivered,
} from "../Actions/orderActions";
import Loader from "../Components/Loader/Loader";
import { ORDER_DELIVER_RESET, PAY_ORDER_RESET } from "../Constants/types";

const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);

  //Payment
  const _payOrder = useSelector((state) => state.payOrder);
  const { loading: loadingPayment, success, error: errorPayment } = _payOrder;

  //Delivery status
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: orderDeliverLoading,
    error: orderDeliverError,
    success: orderDeliverSuccess,
  } = orderDeliver;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const {
    _id,
    user,
    shippingAddress,
    orderItems,
    paymentMethod,
    isPaid,
    isDelivered,
    paymentResult,
  } = order;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&components=buttons`;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    dispatch({
      type: PAY_ORDER_RESET,
    });
    dispatch({
      type: ORDER_DELIVER_RESET,
    });
    dispatch(getOrderDetails(id));

    //Check for Paypal Script
    if (!isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [id, dispatch, success, orderDeliverSuccess, navigate]);

  //add Decimals
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  //Calculate Price
  const itemsPrice = addDecimal(
    orderItems?.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  //Shipping Price
  const shippingPrice = addDecimal(itemsPrice > 500 ? 0 : 100);

  //Tax Price
  const taxPrice = addDecimal(Number(0.04 * itemsPrice));

  const total = addDecimal(
    Number(itemsPrice) + Number(taxPrice) + Number(shippingPrice)
  );

  const paymentSuccessHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };

  //Deliver status
  const deliveryStatusHandler = () => {
    dispatch(setDelivered(id));
  };

  return loading ? (
    <Loader></Loader>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>ORDER {_id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {user?.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${user?.email}`}>{user?.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {shippingAddress?.address}, {shippingAddress?.city},{" "}
                {shippingAddress?.postalCode}, {shippingAddress?.country}
              </p>
              {isDelivered ? (
                <Message variant="success">
                  Delivered {moment(order.deliveredAt).format("MMMM Do YYYY")}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
              {isPaid && paymentResult ? (
                <Message variant="success">
                  Paid on{" "}
                  {moment(paymentResult.update_time).format("MMMM Do YYYY")}
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Ordered Items</h2>
              {orderItems?.length === 0 ? (
                <Message>Order is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderItems?.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={4}>
                          <Image
                            alt={item.name}
                            fluid
                            rounded
                            src={item.image}
                          ></Image>
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${total}</Col>
                </Row>
              </ListGroup.Item>

              {!isPaid && (
                <ListGroup.Item>
                  {loadingPayment && <Loader></Loader>}
                  {!sdkReady ? (
                    <Loader></Loader>
                  ) : (
                    <PayPalButton
                      amount={total}
                      onSuccess={paymentSuccessHandler}
                    ></PayPalButton>
                  )}
                </ListGroup.Item>
              )}

              {orderDeliverLoading && <Loader></Loader>}
              {orderDeliverError && (
                <Message variant="danger">{orderDeliverError}</Message>
              )}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliveryStatusHandler}
                    >
                      Mark as Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
