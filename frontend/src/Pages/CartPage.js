import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import {
  Image,
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../Actions/cartActions";
import Message from "../Components/Message/Message";

function CartPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const productId = useParams().id || null;
  const qty = searchParams.get("qty") || 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOut = () => {
    navigate("/shipping");
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems?.length === 0 ? (
          <Message>
            Your Cart is Empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems?.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt="" fluid rounded></Image>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {/* Options */}
                      {[...Array(item?.countInStock).keys()].map((opt) => (
                        <option key={opt + 1} value={opt + 1}>
                          {opt + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce(
                  (accumulator, currentItem) =>
                    accumulator + Number(currentItem.qty),
                  0
                )}
                ) items
              </h2>
              $
              {cartItems
                .reduce((acc, cur) => acc + Number(cur.qty * cur.price), 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkOut}
              >
                proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartPage;
