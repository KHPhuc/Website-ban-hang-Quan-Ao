import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import FooterAntd from "../../../common/Footer/Footer";

export default function DetailProduct() {
  return (
    <>
      <div className="home">
        <div className="container">
          <div className="md:flex" style={{ marginTop: "0.3rem" }}>
            <div style={{ width: "100%", marginRight: "0.5rem" }}>
              <img
                src="https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/September2022/polousanavy1.jpg"
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
                Áo Polo nam Pique Cotton USA thấm hút tối đa (trơn)
              </h1>
              <div className="flex items-center">
                <div className="flex" style={{ color: "#2f5acf" }}>
                  <IoStar style={{ margin: "0 3px" }} />
                  <IoStar style={{ margin: "0 3px" }} />
                  <IoStar style={{ margin: "0 3px" }} />
                  <IoStar style={{ margin: "0 3px" }} />
                  <IoStarHalf style={{ margin: "0 3px" }} />
                </div>
                <p style={{ marginRight: "5px" }}>(75)</p>
                <p>Đã bán (web): 5131</p>
              </div>
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
                  310.000đ
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
                  310.000đ
                </p>
                <p
                  style={{
                    fontSize: "0.15rem",
                    lineHeight: "0.4rem",
                    marginBottom: "7px",
                    color: "#fb0000",
                  }}
                >
                  -10%
                </p>
              </div>
              <div style={{ marginTop: "0.3rem" }}>
                <p style={{ fontSize: "0.2rem", fontWeight: 400 }}>Màu sắc: </p>
                <button className="button-radio button-radio-selected">
                  Xanh
                </button>
                <button className="button-radio">Đỏ</button>
                <button className="button-radio">Tím</button>
                <button className="button-radio">Trắng Xanh</button>
              </div>
              <div style={{ marginTop: "0.2rem" }}>
                <p style={{ fontSize: "0.2rem", fontWeight: 400 }}>
                  Kích thước:{" "}
                </p>
                <div className="grid grid-cols-6 gap-[0.2rem]">
                  <button className="button-radio-size button-radio-selected">
                    S
                  </button>
                  <button className="button-radio-size button-radio-selected">
                    M
                  </button>
                  <button className="button-radio-size">L</button>
                  <button className="button-radio-size">XL</button>
                  <button className="button-radio-size">2XL</button>
                  <button className="button-radio-size">3XL</button>
                </div>
              </div>
              <div className="flex" style={{ marginTop: "0.2rem" }}>
                <button className="button-number">
                  <span className="add">-</span>
                  {3}
                  <span className="minus">+</span>
                </button>
                <button className="button-add-cart" style={{ width: "100%" }}>
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
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Harum ullam, modi possimus velit distinctio eos laudantium?
                  Repudiandae saepe qui quaerat nesciunt iste aliquid aliquam a,
                  in nisi, cum sapiente nihil.
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
            <p
              style={{
                marginRight: "0.4rem",
              }}
            >
              75 Đánh giá
            </p>
            <p>4.9/5</p>
          </div>
          <div
            style={{
              marginTop: "20px",
              borderTop: "1px solid #cdcdcd",
              padding: "20px 0",
              lineHeight: "0.5rem",
            }}
            className="grid grid-cols-1 md:grid-cols-2 md:gap-1"
          >
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
          </div>
        </div>
      </div>
      <FooterAntd />
    </>
  );
}
