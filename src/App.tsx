import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { toast, ToastContainer } from "react-toastify";
import { LoadingSupense } from "./components/common/Loading/LoadingSuspense";

const LayoutAnt = React.lazy(() => import("./components/Ant/Layout"));
const Header = React.lazy(() => import("./containers/User/Header/Header"));

const Home = React.lazy(() => import("./containers/User/Home/Home"));
const Product = React.lazy(() => import("./containers/User/Product/Product"));
const DetailProduct = React.lazy(
  () => import("./containers/User/DetailProduct/DetailProduct")
);
const Cart = React.lazy(() => import("./containers/User/Cart/Cart"));
const SearchProduct = React.lazy(
  () => import("./containers/User/SearchProduct/SearchProduct")
);

const Account = React.lazy(() => import("./containers/User/Account/Account"));
const Admin = React.lazy(() => import("./containers/Admin/Admin"));
const LoginRegister = React.lazy(
  () => import("./containers/User/LoginRegister/LoginRegister")
);

const Page404 = React.lazy(() => import("./components/Result/Page404/Page404"));
const PagePaySuccess = React.lazy(
  () => import("./components/Result/PagePaySuccess/PagePaySuccess")
);
const PayHandle = React.lazy(
  () => import("./components/Result/PayHandle/PayHandle")
);
const OrderSuccess = React.lazy(
  () => import("./containers/Common/OrderSuccess")
);
const PageOrderFail = React.lazy(
  () => import("./components/Result/PageOrderFail/PagePaySuccess")
);
const PagePayFail = React.lazy(
  () => import("./components/Result/PagePayFail/PagePaySuccess")
);

function App({ auth, setDevice, login, account, setCart }: any) {
  const location = useLocation();
  useEffect(() => {
    // if (account) {
    //   login(account.username, account.password);
    // } else {
    //   const items = localStorage.getItem("cart");
    //   if (items) {
    //     const p = JSON.parse(items);
    //     setCart(p);
    //   }
    // }

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
        limit={3}
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
                  <Route path="search/*" element={<SearchProduct />} />
                  <Route
                    path="cart"
                    element={!auth ? <Navigate to={"/"} /> : <Cart />}
                  />
                  <Route
                    path="account/*"
                    element={auth ? <Account /> : <Navigate to={"/login"} />}
                  />
                  <Route
                    path="login"
                    element={
                      auth ? (
                        auth.isAdmin ? (
                          <Navigate to={"/admin/order"} />
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
