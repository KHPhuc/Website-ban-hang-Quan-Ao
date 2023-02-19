import { Typography, Select, Skeleton } from "antd";
import { AiTwotoneStar } from "react-icons/ai";
import FooterAntd from "../../../common/Footer/Footer";
import { useCallback, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { removeAccents } from "../../../common/RemoveAccents/RemoveAccents";
import { useNavigate } from "react-router-dom";
import { BACKEND } from "../../../common/Config/Config";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getProductTypeToShow,
  getProperties,
} from "../../../../app/API/Product/Product";
import { debounce } from "lodash";

const { Title } = Typography;

export default function Product({
  selectedProductType,
  setSelectedProduct,
}: any) {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [dataP, setDataP] = useState([]);
  const [selectColor, setSelectColor]: any = useState([]);
  const [selectSize, setSelectSize]: any = useState([]);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (selectedProductType) {
      getProperties(selectedProductType[0]).then((res: any) => {
        setDataP(res);
        let cacheC: any = [];
        let cacheC1: any = [];
        let cacheS: any = [];
        let cacheS1: any = [];
        res.forEach((e: any) => {
          if (!cacheC.includes(e.color)) {
            cacheC.push(e.color);
            cacheC1.push({ value: e.color, label: e.color });
          }
          if (e.size && !cacheS.includes(e.size)) {
            cacheS.push(e.size);
            cacheS1.push({
              value: e.size,
              label: e.size,
            });
          }
        });
        setSelectColor(cacheC1);
        setSelectSize(cacheS1);
      });
      getProductTypeToShow({
        detailPTId: selectedProductType[0],
        page: 0,
        color: null,
        size: null,
      })
        .then((res: any) => {
          setData(res);
          if (res.length < 20) {
            setHasMore(false);
          } else {
            setPage(1);
          }
        })
        .finally(() => {
          setDataLoading(false);
        });
    }
  }, [selectedProductType]);

  const fetchData = () => {
    getProductTypeToShow({
      detailPTId: selectedProductType[0],
      page: page,
      color: selectColor,
      size: selectSize,
    }).then((res: any) => {
      setData(res);
      if (res.length < 20) {
        setHasMore(false);
      } else {
        setPage(page + 1);
      }
    });
  };

  const onChangeColor = (value: any) => {
    let cache: any = [];
    let cache1: any = [];
    setSelectedColor(value);
    if (value) {
      dataP.forEach((e: any) => {
        if (value === e.color && !cache.includes(e.size)) {
          cache.push(e.size);
          cache1.push({
            value: e.size,
            label: e.size,
          });
        }
      });
    } else {
      dataP.forEach((e: any) => {
        if (!cache.includes(e.size)) {
          cache.push(e.size);
          cache1.push({
            value: e.size,
            label: e.size,
          });
        }
      });
    }
    setSelectSize(cache1);
    fetchAgain(value, selectedSize, selectedProductType[0]);
  };

  const onChangeSize = (value: any) => {
    let cache: any = [];
    let cache1: any = [];
    setSelectedSize(value);
    if (value) {
      dataP.forEach((e: any) => {
        if (value === e.size && !cache.includes(e.color)) {
          cache.push(e.color);
          cache1.push({
            value: e.color,
            label: e.color,
          });
        }
      });
    } else {
      dataP.forEach((e: any) => {
        if (!cache.includes(e.color)) {
          cache.push(e.color);
          cache1.push({
            value: e.color,
            label: e.color,
          });
        }
      });
    }
    setSelectColor(cache1);
    fetchAgain(selectedColor, value, selectedProductType[0]);
  };

  const fetchAgain = useCallback(
    debounce((color: any, size: any, type: any) => {
      getProductTypeToShow({
        detailPTId: type,
        page: 0,
        color: color,
        size: size,
      }).then((res: any) => {
        setData(res);
        if (res.length < 20) {
          setHasMore(false);
        } else {
          setHasMore(true);
          setPage(1);
        }
      });
    }, 500),
    []
  );

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
              placeholder="Màu sắc"
              style={{ width: 180 }}
              options={selectColor}
              onChange={(e) => onChangeColor(e)}
              allowClear
            />
            {selectSize.length ? (
              <Select
                className="hidden md:flex"
                placeholder="Kích thước"
                style={{ width: 180 }}
                options={selectSize}
                onChange={(e) => onChangeSize(e)}
                allowClear
              />
            ) : (
              ""
            )}
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
              {data.length ? (
                <InfiniteScroll
                  className="row"
                  dataLength={data.length}
                  next={fetchData}
                  hasMore={hasMore}
                  loader={
                    <></>
                    // <div className="text-center mt-[20px]">Đang tải...</div>
                  }
                  endMessage={
                    <></>
                    // <div className="text-center mt-[20px]">Đã tải hết!</div>
                  }
                >
                  {data.map((e: any, i: any) => {
                    return (
                      <div
                        key={i}
                        className="col"
                        onClick={() => {
                          if (selectedColor) {
                            e.color = selectedColor;
                          }
                          if (selectedSize) {
                            e.size = selectedSize;
                          }
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
                              i === data.length - 1 ? setLoading(false) : null
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
                  })}
                </InfiniteScroll>
              ) : (
                <div className="row">
                  <div className="col">
                    <Skeleton.Image
                      active={dataLoading}
                      className="w-full h-[5.3rem] 2xl:h-[4.2rem]"
                    />
                    <Skeleton
                      active={dataLoading}
                      className="w-full mt-[0.15rem] h-[1rem]"
                    />
                  </div>
                  <div className="col">
                    <Skeleton.Image
                      active={dataLoading}
                      className="w-full h-[5.3rem] 2xl:h-[4.2rem]"
                    />
                    <Skeleton
                      active={dataLoading}
                      className="w-full mt-[0.15rem] h-[1rem]"
                    />
                  </div>
                  <div className="col">
                    <Skeleton.Image
                      active={dataLoading}
                      className="w-full h-[5.3rem] 2xl:h-[4.2rem]"
                    />
                    <Skeleton
                      active={dataLoading}
                      className="w-full mt-[0.15rem] h-[1rem]"
                    />
                  </div>
                </div>
              )}
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
