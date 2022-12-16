import { Suspense, useEffect } from "react";
import "./App.css";
import LayoutAnt from "./components/Ant/Layout";
import { LoadingSupense } from "./components/common/Loading/LoadingSuspense";
import Header from "./containers/User/Header/Header";
import Home from "./containers/User/Home/Home";
import { Routes, Route } from "react-router-dom";
import Product from "./components/User/Content/Product/Product";
import LoginRegister from "./components/User/Content/LoginRegister/LoginRegister";
import DetailProduct from "./components/User/Content/DetailProduct/DetailProduct";
import Cart from "./components/User/Content/Cart/Cart";

function App({ setDevice }: any) {
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
  //   fetchData();
  // }, []);

  return (
    <Suspense fallback={<LoadingSupense />}>
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
    </Suspense>
  );
}

export default App;
