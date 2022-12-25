import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Message from "../Components/Message/Message";
import Loader from "../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../Actions/orderActions";

const OrderListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allOrders = useSelector((state) => state.allOrders);
  const { loading, error, orders } = allOrders;

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return (
    <>
      <h1>All Orders</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered responsive hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Is Paid</th>
              <th>Is Delivered</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(1, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paymentResult.update_time.substring(1, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(1, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListPage;
