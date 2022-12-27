import { Suspense, useEffect } from "react";
import "./App.css";
import LayoutAnt from "./components/Ant/Layout";
import { LoadingSupense } from "./components/common/Loading/LoadingSuspense";
import Header from "./containers/User/Header/Header";
import Home from "./containers/User/Home/Home";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Product from "./components/User/Content/Product/Product";
import LoginRegister from "./containers/User/LoginRegister/LoginRegister";
import DetailProduct from "./components/User/Content/DetailProduct/DetailProduct";
import Cart from "./components/User/Content/Cart/Cart";
import { Layout } from "antd";
import Sidebar from "./containers/Admin/Sidebar/Sidebar";
import HeaderAdmin from "./containers/Admin/Header/Header";

const { Content } = Layout;

function App({ auth, setDevice }: any) {
  const navigate = useNavigate();
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

  useEffect(() => {
    if (auth) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, [auth]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <Suspense fallback={<LoadingSupense />}>
      <Routes>
        <Route
          path="/*"
          element={
            <LayoutAnt>
              <Header />
              <Routes>
                <Route path="" element={<Home />} />
                <Route path="product" element={<Product />} />
                <Route path="productdetail" element={<DetailProduct />} />
                <Route path="cart" element={<Cart />} />
                <Route path="login" element={<LoginRegister />} />
                <Route path="register" element={<LoginRegister />} />
              </Routes>
            </LayoutAnt>
          }
        />
        <Route
          path="/admin/*"
          element={
            auth ? (
              <LayoutAnt>
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
              </LayoutAnt>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
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
  );
}

export default App;
