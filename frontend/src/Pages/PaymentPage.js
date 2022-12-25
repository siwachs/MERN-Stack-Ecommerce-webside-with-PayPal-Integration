import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../Components/FormContainer/FormContainer";
import CheckoutSteps from "./CheckoutSteps";
import { savePaymentMethod } from "../Actions/cartActions";

const PaymentPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const methodHandler = (event) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <h1>Payment Method</h1>
      <Form onSubmit={methodHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>

          <Col>
            <Form.Check
              checked
              type="radio"
              label="PayPal"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              onChange={(event) => setPaymentMethod(event.target.value)}
            ></Form.Check>

            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              disabled
              onChange={(event) => setPaymentMethod(event.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
