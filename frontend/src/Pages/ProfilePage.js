import React, { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../Actions/userActions";
import Message from "../Components/Message/Message";
import Loader from "../Components/Loader/Loader";
import { getOrders } from "../Actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";
import { USER_UPDATE_RESET } from "../Constants/types";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const _orders = useSelector((state) => state.orders);
  const { orders, loading: loadingOrders, error: ordersError } = _orders;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getSuccess = useSelector((state) => state.updateProfile);
  const { success } = getSuccess;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user?.name || success) {
        dispatch({
          type: USER_UPDATE_RESET,
        });
        dispatch(getProfile("profile"));
        dispatch(getOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, navigate, dispatch, user, success]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords does not match");
      return;
    } else {
      dispatch(
        updateProfile({
          id: user._id,
          name,
          email,
          password: password === "" ? null : password,
        })
      );
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader></Loader>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Retype Password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button className="my-3" type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader></Loader>
        ) : ordersError ? (
          <Message>{ordersError}</Message>
        ) : (
          <Table striped hover responsive bordered className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{moment(order.createdAt).format("MMMM Do YYYY")}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      moment(order.paidAt).format("MMMM Do YYYY")
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      moment(order.deliveredAt).format("MMMM Do YYYY")
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
