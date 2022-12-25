import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../Components/FormContainer/FormContainer";
import Message from "../Components/Message/Message";
import Loader from "../Components/Loader/Loader";
import { UPDATE_PRODUCT_RESET } from "../Constants/types";
import { getproduct, updateProduct } from "../Actions/productActions";

const ProductEditPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [uploading, setUploading] = useState(false);

  const id = useParams().id;
  const dispatch = useDispatch();

  const _product = useSelector((state) => state.product);
  const { loading, product, error } = _product;

  const productUpdate = useSelector((state) => state.updateProduct);
  const { loading: updateLoading, error: updateError, success } = productUpdate;

  useEffect(() => {
    if (success) {
      dispatch({
        type: UPDATE_PRODUCT_RESET,
      });
      navigate("/admin/productlist");
    } else {
      if (!product?.name || product?._id !== id) {
        dispatch(getproduct(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setBrand(product.brand);
        setImage(product.image);
        setDescription(product.description);
        setCountInStock(product.countInStock);
      }
    }
  }, [id, dispatch, product?.name, success]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      updateProduct(id, {
        name,
        image,
        brand,
        category,
        description,
        price,
        countInStock,
      })
    );
  };

  const filePickerHandler = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      alert(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link to={`/admin/productlist`}>Go Back</Link>
      <FormContainer>
        <h1>Add/Edit a Product</h1>
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

            <Form.Group controlId="image">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="text"
                accept=".jpg,.png,.jpeg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type="file"
                accept=".jpg,.png,.jpeg"
                placeholder="Profile Image"
                onChange={filePickerHandler}
              ></Form.Control>

              {uploading && <Loader></Loader>}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Brand Name"
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="stock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Stock"
                value={countInStock}
                onChange={(event) => setCountInStock(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="Description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button className="my-3" type="submit" variant="primary">
              Update/Add Product
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
