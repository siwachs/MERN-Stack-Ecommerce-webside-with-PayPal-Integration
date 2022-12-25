import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import { Container } from "react-bootstrap";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ProfilePage from "./Pages/ProfilePage";
import ShippingPage from "./Pages/ShippingPage";
import PaymentPage from "./Pages/PaymentPage";
import PlaceOrder from "./Pages/PlaceOrder";
import OrderPage from "./Pages/OrderPage";
import UsersListPage from "./Pages/UsersListPage";
import UserEdit from "./Pages/UserEdit";
import ProductListPage from "./Pages/ProductListPage";
import ProductEditPage from "./Pages/ProductEditPage";
import OrderListPage from "./Pages/OrderListPage";

const App = () => {
  return (
    <Router>
      <Header></Header>
      <main className="py-3">
        <Container>
          <Routes>
            {/* Register and Login */}
            <Route
              exact
              path="/login"
              element={<LoginPage></LoginPage>}
            ></Route>
            <Route
              exact
              path="/register"
              element={<RegisterPage></RegisterPage>}
            ></Route>

            {/* Product */}
            <Route
              exact
              path="/product/:id"
              element={<ProductPage></ProductPage>}
            ></Route>

            {/* Home */}
            <Route exact path="/" element={<Home></Home>}></Route>
            <Route
              exact
              path="/page/:pageNumber"
              element={<Home></Home>}
            ></Route>
            <Route
              exact
              path="/search/:keyword/page/:pageNumber"
              element={<Home></Home>}
            ></Route>
            <Route
              exact
              path="/search/:keyword"
              element={<Home></Home>}
            ></Route>

            {/* Profile */}
            <Route
              exact
              path="/profile"
              element={<ProfilePage></ProfilePage>}
            ></Route>

            {/* Cart and Add to Cart */}
            <Route exact path="/cart" element={<CartPage></CartPage>}></Route>
            <Route
              exact
              path="/cart/:id"
              element={<CartPage></CartPage>}
            ></Route>

            {/* Shipping + Payment */}
            <Route
              exact
              path="/shipping"
              element={<ShippingPage></ShippingPage>}
            ></Route>
            <Route
              exact
              path="/payment"
              element={<PaymentPage></PaymentPage>}
            ></Route>
            <Route
              exact
              path="/placeorder"
              element={<PlaceOrder></PlaceOrder>}
            ></Route>

            {/* Admin Routes */}
            <Route
              exact
              path="/admin/userlist"
              element={<UsersListPage></UsersListPage>}
            ></Route>
            <Route
              exact
              path="admin/user/edit/:id"
              element={<UserEdit></UserEdit>}
            ></Route>

            {/* OrderList */}
            <Route
              exact
              path="/admin/orderlist"
              element={<OrderListPage></OrderListPage>}
            ></Route>

            {/* Products Addition */}
            <Route
              exact
              path="/admin/productlist"
              element={<ProductListPage></ProductListPage>}
            ></Route>
            <Route
              exact
              path="/admin/product/edit/:id"
              element={<ProductEditPage></ProductEditPage>}
            ></Route>
            <Route
              exact
              path="/admin/productlist/page/:pageNumber"
              element={<ProductListPage></ProductListPage>}
            ></Route>

            {/* Common Admin+User */}
            <Route
              exact
              path="/order/:id"
              element={<OrderPage></OrderPage>}
            ></Route>
          </Routes>
        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
};

export default App;
