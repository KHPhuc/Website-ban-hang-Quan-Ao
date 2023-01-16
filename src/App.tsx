import "react-toastify/dist/ReactToastify.css";
import { Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { toast, ToastContainer } from "react-toastify";
import LayoutAnt from "./components/Ant/Layout";
import { LoadingSupense } from "./components/common/Loading/LoadingSuspense";
import Header from "./containers/User/Header/Header";
// import Home from "./containers/User/Home/Home";
// import Product from "./containers/User/Product/Product";
import LoginRegister from "./containers/User/LoginRegister/LoginRegister";
// import DetailProduct from "./containers/User/DetailProduct/DetailProduct";
// import Cart from "./containers/User/Cart/Cart";
import Admin from "./containers/Admin/Admin";
import React from "react";
import Page404 from "./components/Result/Page404/Page404";
import PagePaySuccess from "./components/Result/PagePaySuccess/PagePaySuccess";
import PayHandle from "./components/Result/PayHandle/PayHandle";
import OrderSuccess from "./containers/Common/OrderSuccess";
import PageOrderFail from "./components/Result/PageOrderFail/PagePaySuccess";
import PagePayFail from "./components/Result/PagePayFail/PagePaySuccess";

const Home = React.lazy(() => import("./containers/User/Home/Home"));
const Product = React.lazy(() => import("./containers/User/Product/Product"));
const DetailProduct = React.lazy(
  () => import("./containers/User/DetailProduct/DetailProduct")
);
const Cart = React.lazy(() => import("./containers/User/Cart/Cart"));

function App({ auth, setDevice, login, account, setCart }: any) {
  const location = useLocation();
  useEffect(() => {
    if (account) {
      login(account.username, account.password);
    } else {
      const items = localStorage.getItem("cart");
      if (items) {
        const p = JSON.parse(items);
        setCart(p);
      }
    }

    if (window.innerWidth < 768) {
      setDevice("mobile");
    } else {
      setDevice("desktop");
    }

    const handle = () => {
      if (window.innerWidth < 768) {
        setDevice("mobile");
      } else {
        setDevice("desktop");
      }
    };

    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("resize", handle);
    };
  }, []);

  // useEffect(() => {
  //   if (auth.isAdmin) {
  //     navigate("/admin");
  //   } else {
  //     navigate("/");
  //   }
  // }, [auth]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        className={"text-[0.3rem] md:text-[0.2rem]"}
        enableMultiContainer
        containerId={"CT"}
      />

      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        className={"text-[0.3rem] md:text-[0.2rem]"}
        enableMultiContainer
        containerId={"RT"}
      />
      <Suspense fallback={<LoadingSupense />}>
        <Routes>
          <Route
            path="/*"
            element={
              <LayoutAnt>
                {location.pathname.split("/")[1] !== "admin" ? <Header /> : ""}
                <Routes>
                  <Route path="" element={<Home />} />
                  <Route path="product/:id" element={<Product />} />
                  <Route path="productdetail/:id" element={<DetailProduct />} />
                  <Route
                    path="cart"
                    element={auth.isAdmin ? <Navigate to={"/"} /> : <Cart />}
                  />
                  <Route
                    path="login"
                    element={
                      auth ? (
                        auth.isAdmin ? (
                          <Navigate to={"/admin"} />
                        ) : (
                          <Navigate to={"/"} />
                        )
                      ) : (
                        <LoginRegister />
                      )
                    }
                  />
                  <Route
                    path="register"
                    element={
                      auth ? (
                        auth.isAdmin ? (
                          <Navigate to={"/admin"} />
                        ) : (
                          <Navigate to={"/"} />
                        )
                      ) : (
                        <LoginRegister />
                      )
                    }
                  />
                  <Route
                    path="admin/*"
                    element={
                      auth.isAdmin ? <Admin /> : <Navigate to="/login" />
                    }
                  />
                </Routes>
              </LayoutAnt>
            }
          />
          <Route path="pay-handle/*" element={<PayHandle />} />
          <Route path="page404" element={<Page404 />} />
          <Route path="pay-success" element={<PagePaySuccess />} />
          <Route path="pay-fail" element={<PagePayFail />} />
          <Route path="order-success/*" element={<OrderSuccess />} />
          <Route path="order-fail/*" element={<PageOrderFail />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
