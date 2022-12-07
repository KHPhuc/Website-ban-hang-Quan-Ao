import { useEffect } from "react";
import "./App.css";
import LayoutAnt from "./components/Ant/Layout";
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
    <LayoutAnt>
      <Header />
    </LayoutAnt>
  );
}

export default App;
