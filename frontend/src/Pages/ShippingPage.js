import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../Actions/cartActions";
import FormContainer from "../Components/FormContainer/FormContainer";
import CheckoutSteps from "./CheckoutSteps";

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address"
            value={address}
            required
            onChange={(event) => setAddress(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="City"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postlCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className="my-3" type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
