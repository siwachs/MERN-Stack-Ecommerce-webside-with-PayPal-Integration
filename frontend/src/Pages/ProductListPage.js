import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import Message from "../Components/Message/Message";
import Loader from "../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProductById,
  productList,
} from "../Actions/productActions";
import { CREATE_PRODUCT_RESET } from "../Constants/types";
import Paginate from "../Components/Pagination/Paginate";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const _pageNo = useParams().pageNumber || 1;
  const _productList = useSelector((state) => state.productList);
  const { loading, error, products, pages } = _productList;

  const userLogin = useSelector((state) => state.userLogin);

  const deleteProduct = useSelector((state) => state.deleteProduct);
  const { loading: deleteLoading, error: deleteError, success } = deleteProduct;

  const _createProduct = useSelector((state) => state.createProduct);
  const {
    loading: createLoading,
    error: createError,
    product: createdProduct,
    success: createSuccess,
  } = _createProduct;

  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({
      type: CREATE_PRODUCT_RESET,
    });
    if (!userInfo?.isAdmin) {
      navigate("/login");
    } else {
      dispatch(productList("", _pageNo));
    }

    if (createSuccess) {
      navigate(`/admin/product/edit/${createdProduct._id}`);
    }
  }, [dispatch, navigate, userInfo, success, createSuccess, _pageNo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProductById(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {deleteLoading && <Loader></Loader>}
      {deleteError && <Message variant="delete">{deleteError}</Message>}
      {createLoading && <Loader></Loader>}
      {createError && <Message variant="delete">{createError}</Message>}
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered responsive hover className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/edit/${product._id}`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} pageNo={_pageNo} isAdmin></Paginate>
        </>
      )}
    </>
  );
};

export default ProductListPage;
