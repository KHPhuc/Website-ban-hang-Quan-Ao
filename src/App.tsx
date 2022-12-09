import { Suspense, useEffect } from "react";
import "./App.css";
import LayoutAnt from "./components/Ant/Layout";
import { LoadingSupense } from "./components/common/Loading/LoadingSuspense";
import Header from "./containers/Header/Header";

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

  return (
    <Suspense fallback={<LoadingSupense />}>
      <LayoutAnt>
        <Header />
      </LayoutAnt>
    </Suspense>
  );
}

export default App;
