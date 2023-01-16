import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Skeleton, Typography } from "antd";
import { AiTwotoneStar } from "react-icons/ai";
import FooterAntd from "../../../common/Footer/Footer";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { info } from "console";
import { removeAccents } from "../../../common/RemoveAccents/RemoveAccents";
import { BACKEND } from "../../../common/Config/Config";

const { Title } = Typography;

export default function Home({
  product,
  getProductToShow,
  setSelectedProduct,

  setDetailProduct,
}: any) {
  const nav = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const banner = ["/img/banner/banner_1.jpg", "/img/banner/banner_2.jpg"];

  const settings = {
    dots: false,
    // lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 9000,
    arrows: false,
  };

  // useEffect(() => {
  //   if (location.pathname.split("/")[1] && location.pathname.split("/")[1] === "") {
  //     getProductToShow();
  //   }
  // }, [location.pathname]);
  useEffect(() => {
    getProductToShow();
  }, []);

  return (
    <>
      <div className="home">
        <div className="container">
          {/* <div className="carousel">
            <Slider {...settings} className="slider">
              {banner.map((e: any, i: any) => {
                return (
                  <div key={i}>
                    <img src={e} alt="" className="w-full h-full" />
                  </div>
                );
              })}
            </Slider>
          </div> */}

          <div className="my-[20px]">
            <div className="row">
              {product ? (
                product.map((e: any, i: any) => {
                  return (
                    <div
                      key={i}
                      className="col"
                      onClick={() => {
                        setDetailProduct("");
                        setSelectedProduct(e);
                        nav(
                          `productdetail/${removeAccents(e.productName)
                            .split("/")
                            .join("-")
                            .split(" ")
                            .join("-")}`
                        );
                      }}
                    >
                      <div className="thumbnail">
                        <img
                          src={`${BACKEND}/${e.image}`}
                          alt=""
                          loading="lazy"
                          onLoad={(e) =>
                            i === product.length - 1 ? setLoading(false) : null
                          }
                        />
                        {e.totalComment !== 0 ? (
                          <>
                            <p className="ratting">
                              {e.totalComment
                                ? e.totalScore / e.totalComment
                                : 0}
                            </p>
                            <span className="star">
                              <AiTwotoneStar />
                            </span>
                            <p className="comment">({e.totalComment})</p>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      {!loading ? (
                        <div className="info" id="info">
                          <p className="title">{e.productName}</p>
                          <div className="block sm:flex">
                            <p
                              className={`${
                                e.originalProduct !== 0 ? "text-[#ff3102]" : ""
                              } sm:mr-[14px]`}
                            >
                              <NumericFormat
                                displayType={"text"}
                                thousandSeparator={"."}
                                decimalSeparator={","}
                                suffix={"₫"}
                                value={e.currentPrice}
                              />
                            </p>

                            {e.originalPrice !== 0 ? (
                              <>
                                <p className={`text-[#c4c4c4] sm:mr-[14px]`}>
                                  <del>
                                    <NumericFormat
                                      displayType={"text"}
                                      thousandSeparator={"."}
                                      decimalSeparator={","}
                                      suffix={"₫"}
                                      value={e.originalPrice}
                                    />
                                  </del>
                                </p>
                                <p className={`text-[#ff3102]`}>
                                  -
                                  <NumericFormat
                                    displayType={"text"}
                                    thousandSeparator={"."}
                                    decimalSeparator={","}
                                    suffix={"%"}
                                    value={Math.floor(
                                      100 -
                                        (e.currentPrice * 100) / e.originalPrice
                                    )}
                                  />
                                </p>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })
              ) : (
                <>
                  <div className="col">
                    <Skeleton.Image
                      active
                      className="w-full h-[5.3rem] 2xl:h-[4.2rem]"
                    />
                    <Skeleton active className="w-full mt-[0.15rem] h-[1rem]" />
                  </div>
                  <div className="col">
                    <Skeleton.Image
                      active
                      className="w-full h-[5.3rem] 2xl:h-[4.2rem]"
                    />
                    <Skeleton active className="w-full mt-[0.15rem] h-[1rem]" />
                  </div>
                  <div className="col">
                    <Skeleton.Image
                      active
                      className="w-full h-[5.3rem] 2xl:h-[4.2rem]"
                    />
                    <Skeleton active className="w-full mt-[0.15rem] h-[1rem]" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <FooterAntd />
    </>
  );
}
