import { Rate } from "antd";
import { useEffect, useState } from "react";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import { NumericFormat } from "react-number-format";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FooterAntd from "../../../common/Footer/Footer";
import { getProductByUrl } from "../../../../app/API/Product/Product";

import { toast } from "react-toastify";
import { BACKEND } from "../../../common/Config/Config";

export default function DetailProduct({
  detailProduct,
  setDetailProduct,

  // getProductByUrl,
  selectedProduct,

  loadingGetDetailProduct,
  setLoadingGetDetailProduct,

  auth,

  cart,
  setCart,
  addCart,
}: any) {
  const nav = useNavigate();
  const location = useLocation();
  const [data, setData]: any = useState();
  const [selectColor, setSelectColor]: any = useState();
  const [selectSize, setSelectSize]: any = useState();
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    let url = location.pathname.split("/");
    if (url[1] === "productdetail") {
      setLoadingGetDetailProduct(true);
      getProductByUrl(url[2])
        .then((res: any) => {
          if (res) {
            setData(res);
            let index = res.detailProduct.findIndex(
              (x: any) => x.color === selectedProduct.color
            );
            if (index !== -1) {
              setSelectColor(res.detailProduct[index]);
              setSelectSize(res.detailProduct[index].sizes[0]);
            } else {
              setSelectColor(res.detailProduct[0]);
              setSelectSize(res.detailProduct[0].sizes[0]);
            }
          } else {
            nav("/page404");
          }
        })
        .catch((err) => {
          nav("/page404");
        });
    }
  }, [location.pathname]);

  const changeColor = (e: any) => {
    setSelectColor(e);
    let find = false;
    for (let i = 0; i < e.sizes.length; i++) {
      if (e.sizes[i].size === selectSize.size) {
        find = true;
        if (quantity > e.sizes[i].quantity) {
          setQuantity(e.sizes[i].quantity);
        }
        setSelectSize(e.sizes[i]);
        break;
      }
    }
    if (!find) {
      setSelectSize(e.sizes[0]);
    }
  };

  const changeQuantity = (e: any) => {
    if (e === 1) {
      if (quantity < selectSize.quantity) {
        setQuantity(quantity + 1);
      } else {
        toast.warning("Vượt quá số lượng hàng còn!");
      }
    } else if (e === -1) {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      } else {
        toast.warning("Tối thiểu 1 cái!");
      }
    }
  };

  const handleAddCart = () => {
    if (!auth) {
      // console.log(selectColor, selectSize, quantity);
      if (cart.length === 0) {
        let cache = Object.assign([], cart);
        cache.push({
          detailProductId: selectSize.detailProductId,
          quantity: quantity,
        });
        setCart(cache);
      } else {
        let index = cart.findIndex(
          (x: any) => x.detailProductId === selectSize.detailProductId
        );
        if (index !== -1) {
          let q = cart[index].quantity + 1;
          let cache = Object.assign({}, cart[index], { quantity: q });
          // cache[index].quantity += quantity;
          let cache1 = Object.assign([], cart);
          cache1[index] = cache;
          setCart(cache1);
        } else {
          setCart([
            ...cart,
            {
              detailProductId: selectSize.detailProductId,
              quantity: quantity,
            },
          ]);
        }
      }
    } else {
      addCart({
        customerId: auth.id,
        detailProductId: selectSize.detailProductId,
        quantity: quantity,
      });
    }
    toast.success("Thêm sản phẩm thành công", { containerId: "RT" });
  };

  useEffect(() => {
    // console.log(cart);
    if (!auth) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <>
      <div className="home">
        <div className="container">
          <div className="md:flex" style={{ marginTop: "0.3rem" }}>
            <div style={{ width: "100%", marginRight: "0.5rem" }}>
              <img
                src={`${BACKEND}/${
                  selectColor ? selectColor.image : ""
                }`}
                alt=""
                style={{ borderRadius: "20px" }}
              />
            </div>
            <div className="w-full md:w-[80%] mt-[0.2rem] md:mt-0">
              <h1
                style={{
                  fontSize: "0.4rem",
                  lineHeight: "0.5rem",
                  marginBottom: "7px",
                }}
              >
                {data ? data.productName : ""}
              </h1>
              {data && data.totalComment ? (
                <div className="flex items-center">
                  <div className="flex" style={{ color: "#2f5acf" }}>
                    <Rate
                      disabled
                      value={data ? data.totalScore / data.totalComment : 0}
                      allowHalf
                    />
                    {/* <IoStar style={{ margin: "0 3px" }} />
                  <IoStar style={{ margin: "0 3px" }} />
                  <IoStar style={{ margin: "0 3px" }} />
                  <IoStar style={{ margin: "0 3px" }} />
                  <IoStarHalf style={{ margin: "0 3px" }} /> */}
                  </div>
                  <p style={{ marginRight: "5px" }}>
                    ({data ? data.totalComment : 0})
                  </p>
                  {/* <p>Đã bán (web): 5131</p> */}
                </div>
              ) : (
                ""
              )}

              <div className="flex" style={{ marginTop: "0.05rem" }}>
                <p
                  style={{
                    fontSize: "0.2rem",
                    lineHeight: "0.4rem",
                    marginBottom: "7px",
                    marginRight: "15px",
                    fontWeight: "500",
                  }}
                >
                  <NumericFormat
                    displayType={"text"}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    suffix={"₫"}
                    value={selectSize ? selectSize.currentPrice : 0}
                  />
                </p>
                <p
                  style={{
                    fontSize: "0.2rem",
                    lineHeight: "0.4rem",
                    marginBottom: "7px",
                    textDecoration: "line-through",
                    color: "#cdcdcd",
                    marginRight: "15px",
                  }}
                >
                  <NumericFormat
                    displayType={"text"}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    suffix={"₫"}
                    value={selectSize ? selectSize.originalPrice : 0}
                  />
                </p>

                <p
                  style={{
                    fontSize: "0.15rem",
                    lineHeight: "0.4rem",
                    marginBottom: "7px",
                    color: "#fb0000",
                  }}
                >
                  {selectSize
                    ? -Math.round(
                        100 -
                          (selectSize.currentPrice * 100) /
                            selectSize.originalPrice
                      )
                    : 0}
                  %
                </p>
              </div>
              <div style={{ marginTop: "0.3rem" }}>
                <p style={{ fontSize: "0.2rem", fontWeight: 400 }}>Màu sắc: </p>
                {data
                  ? data.detailProduct.map((e: any, i: any) => {
                      return (
                        <button
                          key={i}
                          className={`button-radio ${
                            selectColor.color === e.color
                              ? "button-radio-selected"
                              : ""
                          }`}
                          onClick={() => changeColor(e)}
                        >
                          {e.color}
                        </button>
                      );
                    })
                  : ""}
              </div>
              {selectSize && selectSize.size ? (
                <div style={{ marginTop: "0.2rem" }}>
                  <p style={{ fontSize: "0.2rem", fontWeight: 400 }}>
                    Kích thước:{" "}
                  </p>
                  <div className="grid grid-cols-6 gap-[0.2rem]">
                    {selectColor
                      ? selectColor.sizes.map((e: any, i: any) => {
                          return (
                            <button
                              key={i}
                              className={`button-radio-size ${
                                selectSize && selectSize.size === e.size
                                  ? "button-radio-selected"
                                  : ""
                              }`}
                              onClick={() => {
                                if (quantity > e.quantity) {
                                  setQuantity(e.quantity);
                                }
                                setSelectSize(e);
                              }}
                            >
                              {e.size}
                            </button>
                          );
                        })
                      : ""}
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="flex" style={{ marginTop: "0.2rem" }}>
                <div className="button-number flex items-center justify-between">
                  <button className="add" onClick={() => changeQuantity(-1)}>
                    -
                  </button>
                  <div>{quantity}</div>
                  <button className="minus" onClick={() => changeQuantity(1)}>
                    +
                  </button>
                </div>
                <button
                  className="button-add-cart text-white"
                  style={{ width: "100%" }}
                  onClick={() => handleAddCart()}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
              <div
                style={{
                  marginTop: "50px",
                  borderTop: "1px solid #cdcdcd",
                  paddingTop: "30px",
                }}
              >
                <h3
                  style={{
                    fontSize: "0.3rem",
                    lineHeight: "0.5rem",
                    marginBottom: "7px",
                  }}
                >
                  Chi tiết
                </h3>
                <p style={{ fontSize: "0.22rem" }}>
                  {data ? data.description : ""}
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "50px",
              borderTop: "1px solid #cdcdcd",
              paddingTop: "30px",
              fontSize: "0.3rem",
              lineHeight: "0.5rem",
              fontWeight: "600",
            }}
            className={"flex"}
          >
            {data && data.totalComment ? (
              <>
                <p
                  style={{
                    marginLeft: "0.5rem",
                    marginRight: "0.4rem",
                  }}
                >
                  75 Đánh giá
                </p>
                <p>4.9/5</p>
              </>
            ) : (
              <p
                style={{
                  marginLeft: "0.5rem",
                  marginRight: "0.4rem",
                }}
              >
                Chưa có đánh giá!
              </p>
            )}
          </div>
          <div
            style={{
              marginTop: "20px",
              borderTop: "1px solid #cdcdcd",
              padding: "20px 0",
              lineHeight: "0.5rem",
            }}
            className={`${
              data && data.totalComment
                ? "grid grid-cols-1 md:grid-cols-2 md:gap-1"
                : ""
            }`}
          >
            {data && data.totalComment ? (
              <>
                <div className="flex" style={{ marginBottom: "10px" }}>
                  <div
                    className="flex items-center"
                    style={{
                      color: "#2f5acf",
                      height: "0.5rem",
                      marginRight: "50px",
                    }}
                  >
                    <IoStar style={{ margin: "0 3px" }} />
                    <IoStar style={{ margin: "0 3px" }} />
                    <IoStar style={{ margin: "0 3px" }} />
                    <IoStar style={{ margin: "0 3px" }} />
                    <IoStarOutline style={{ margin: "0 3px" }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: "500" }}>Nguyễn Văn A</p>
                    <p
                      style={{
                        fontWeight: "400",
                        color: "#cdcdcd",
                        lineHeight: "5px",
                        fontStyle: "italic",
                      }}
                    >
                      Xank/L
                    </p>
                    <p style={{ fontWeight: 450, margin: "20px 0" }}>
                      Nguyễn Văn A
                    </p>
                    <p
                      style={{
                        fontWeight: "400",
                        color: "#cdcdcd",
                      }}
                    >
                      12.15.2022
                    </p>
                  </div>
                </div>
                <div className="flex" style={{ marginBottom: "10px" }}>
                  <div
                    className="flex items-center"
                    style={{
                      color: "#2f5acf",
                      height: "0.5rem",
                      marginRight: "50px",
                    }}
                  >
                    <IoStar style={{ margin: "0 3px" }} />
                    <IoStar style={{ margin: "0 3px" }} />
                    <IoStar style={{ margin: "0 3px" }} />
                    <IoStar style={{ margin: "0 3px" }} />
                    <IoStarOutline style={{ margin: "0 3px" }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: "500" }}>Nguyễn Văn A</p>
                    <p
                      style={{
                        fontWeight: "400",
                        color: "#cdcdcd",
                        lineHeight: "5px",
                        fontStyle: "italic",
                      }}
                    >
                      Xank/L
                    </p>
                    <p style={{ fontWeight: 450, margin: "15px 0" }}>
                      Nguyễn Văn A
                    </p>
                    <p
                      style={{
                        fontWeight: "400",
                        color: "#cdcdcd",
                      }}
                    >
                      12.15.2022
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center" style={{ lineHeight: "20px" }}>
                <p>Chưa có đánh giá</p>
                <p>
                  <i>Hãy mua và đánh giá sản phẩm này nhé!</i>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <FooterAntd />
    </>
  );
}
