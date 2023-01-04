import "react-toastify/dist/ReactToastify.css";
import React, { Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import LayoutAnt from "./components/Ant/Layout";
import { LoadingSupense } from "./components/common/Loading/LoadingSuspense";
import Header from "./containers/User/Header/Header";
import Home from "./containers/User/Home/Home";
import Product from "./components/User/Content/Product/Product";
import LoginRegister from "./containers/User/LoginRegister/LoginRegister";
import DetailProduct from "./components/User/Content/DetailProduct/DetailProduct";
import Cart from "./components/User/Content/Cart/Cart";
import { Layout } from "antd";
// import Sidebar from "./containers/Admin/Sidebar/Sidebar";

import HeaderAdmin from "./containers/Admin/Header/Header";
import ContentAdmin from "./components/Admin/Content/ContentAdmin";

const Sidebar = React.lazy(() => import("./containers/Admin/Sidebar/Sidebar"));

function App({ auth, setDevice }: any) {
  const location = useLocation();
  useEffect(() => {
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
        // hideProgressBar={true}
        newestOnTop
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        className={"text-[0.3rem] md:text-[0.2rem]"}
      />
      <Suspense fallback={<LoadingSupense />}>
        <LayoutAnt>
          {location.pathname.split("/")[1] !== "admin" ? <Header /> : ""}
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="product" element={<Product />} />
            <Route path="productdetail" element={<DetailProduct />} />
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
                auth.isAdmin ? (
                  <>
                    <Sidebar />
                    <Layout>
                      <HeaderAdmin />
                      <ContentAdmin />
                    </Layout>
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </LayoutAnt>
        {/* <LayoutAnt>
        <Header />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="productdetail" element={<DetailProduct />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<LoginRegister />} />
          <Route path="register" element={<LoginRegister />} />
        </Routes>

        <Sidebar />
        <Layout>
          <HeaderAdmin />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: "#fff",
            }}
          ></Content>
        </Layout>
      </LayoutAnt> */}
      </Suspense>
    </>
  );
}

export default App;
