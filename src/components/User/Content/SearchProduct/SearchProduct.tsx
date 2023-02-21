import { Typography, Input, Skeleton } from "antd";
import { AiTwotoneStar } from "react-icons/ai";
import FooterAntd from "../../../common/Footer/Footer";
import { useCallback, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { removeAccents } from "../../../common/RemoveAccents/RemoveAccents";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND } from "../../../common/Config/Config";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  searchProduct,
} from "../../../../app/API/Product/Product";

const { Title } = Typography;
const { Search } = Input;

export default function SearchProduct({ setSelectedProduct }: any) {
  const nav = useNavigate();
  const param = useParams()["*"];
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPage(0);
    setData([]);
    setHasMore(true);
    searchProduct({
      page: 0,
      text: param?.split("=")[1],
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
  }, []);

  const fetchData = () => {
    searchProduct({
      text: param?.split("=")[1],
      page: page,
    }).then((res: any) => {
      setData(res);
      if (res.length < 20) {
        setHasMore(false);
      } else {
        setPage(page + 1);
      }
    });
  };

  const search = (text: any) => {
    nav(`search/text=${text}`);
  };

  return (
    <>
      <div className="home pb-[0.5rem]">
        <div className="container">
          <div className="filter">
            <Title level={3} style={{ marginBottom: 0 }} className="mr-[15px]">
              Sản phẩm
            </Title>
            <Search
              placeholder="Tên sản phẩm cần tìm ..."
              style={{ width: "25%"}}
              onSearch={search}
              className="searchP"
              value={param?.split("=")[1]}
            />
          </div>
          <div className="product">
            <div
              className={"w-full"}
              style={{ paddingTop: "0.35rem", paddingBottom: "0.35rem" }}
            >
              <div className="flex justify-between items-center">
                {/* <Title level={4}>{selectedProductType[1] || ""}</Title> */}
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
                          // if (selectedColor) {
                          //   e.color = selectedColor;
                          // }
                          // if (selectedSize) {
                          //   e.size = selectedSize;
                          // }
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
