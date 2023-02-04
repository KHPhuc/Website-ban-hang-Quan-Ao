import { product1 } from "../../../DataTest/DataTest";
import { Typography, Select, Skeleton } from "antd";
import { AiTwotoneStar } from "react-icons/ai";
import FooterAntd from "../../../common/Footer/Footer";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { removeAccents } from "../../../common/RemoveAccents/RemoveAccents";
import { useNavigate } from "react-router-dom";
import { BACKEND } from "../../../common/Config/Config";

const { Title } = Typography;

export default function Product({
  selectedProductType,
  product,
  getProductTypeToShow,
  setSelectedProduct,

  setDetailProduct,
}: any) {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedProductType) {
      getProductTypeToShow(selectedProductType[0]);
    }
  }, [selectedProductType]);

  return (
    <>
      <div className="home pb-[0.5rem]">
        <div className="container">
          <div className="filter">
            <Title level={3} style={{ marginBottom: 0 }} className="mr-[15px]">
              Sản phẩm
            </Title>
            <Select
              className="hidden md:flex mr-[15px]"
              defaultValue="Danh mục"
              style={{ width: 180 }}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "disabled",
                  disabled: true,
                  label: "Disabled",
                },
                {
                  value: "Yiminghe",
                  label: "yiminghe",
                },
              ]}
            />
            <Select
              className="hidden md:flex"
              defaultValue="Danh mục"
              style={{ width: 180 }}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "disabled",
                  disabled: true,
                  label: "Disabled",
                },
                {
                  value: "Yiminghe",
                  label: "yiminghe",
                },
              ]}
            />
          </div>
          <div className="product">
            <div
              className={"w-full"}
              style={{ paddingTop: "0.35rem", paddingBottom: "0.35rem" }}
            >
              <div className="flex justify-between items-center">
                <Title level={4}>{selectedProductType[1] || ""}</Title>
                {/* <a>Xem tất cả</a> */}
              </div>
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
                            `../productdetail/${removeAccents(e.productName)
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
                              i === product.length - 1
                                ? setLoading(false)
                                : null
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
                                  e.originalProduct !== 0
                                    ? "text-[#ff3102]"
                                    : ""
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
                                          (e.currentPrice * 100) /
                                            e.originalPrice
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
                      <Skeleton
                        active
                        className="w-full mt-[0.15rem] h-[1rem]"
                      />
                    </div>
                    <div className="col">
                      <Skeleton.Image
                        active
                        className="w-full h-[5.3rem] 2xl:h-[4.2rem]"
                      />
                      <Skeleton
                        active
                        className="w-full mt-[0.15rem] h-[1rem]"
                      />
                    </div>
                    <div className="col">
                      <Skeleton.Image
                        active
                        className="w-full h-[5.3rem] 2xl:h-[4.2rem]"
                      />
                      <Skeleton
                        active
                        className="w-full mt-[0.15rem] h-[1rem]"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute w-full bottom-0">
        <FooterAntd />
      </div>
    </>
  );
}
