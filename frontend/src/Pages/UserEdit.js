import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../Components/FormContainer/FormContainer";
import {
  getUserById,
  register,
  updateUserByAdmin,
} from "../Actions/userActions";
import Message from "../Components/Message/Message";
import Loader from "../Components/Loader/Loader";
import {
  USER_DETAILS_RESET_ADMIN,
  USER_UPDATE_RESET,
} from "../Constants/types";

const UserEdit = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const id = useParams().id;

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetailsByAdmin);

  const userUpdate = useSelector((state) => state.userUpdateByAdmin);

  const { loading, error, userInfo } = userDetails;
  const { loading: updateLoading, error: updateError, success } = userUpdate;

  useEffect(() => {
    if (success) {
      dispatch({
        type: USER_UPDATE_RESET,
      });
      dispatch({
        type: USER_DETAILS_RESET_ADMIN,
      });
      navigate("/admin/userlist");
    } else {
      if (userInfo?._id !== id) {
        dispatch(getUserById(id));
      } else {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setIsAdmin(userInfo.isAdmin);
      }
    }
  }, [id, dispatch, userInfo, success, navigate]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateUserByAdmin(id, name, email, isAdmin));
  };

  return (
    <>
      <Link to={`/admin/userlist`}>Go Back</Link>
      <FormContainer>
        <h1>Update a user</h1>
        {updateLoading && <Loader></Loader>}
        {updateError && <Message variant="danger">{updateError}</Message>}
        {loading ? (
          loading && <Loader></Loader>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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

            <Form.Group controlId="isadmin">
              <Form.Check
                label="Is Admin"
                type="checkbox"
                checked={isAdmin}
                onChange={(event) => setIsAdmin(event.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" className="my-3" variant="primary">
              Update User
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEdit;
