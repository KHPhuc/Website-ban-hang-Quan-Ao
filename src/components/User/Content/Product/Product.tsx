import { product } from "../../../DataTest/DataTest";
import { Typography, Select } from "antd";
import { AiTwotoneStar } from "react-icons/ai";
import FooterAntd from "../../../common/Footer/Footer";

const { Title } = Typography;

export default function Product() {
  return (
    <>
      <div className="home">
        <div className="container">
          <div className="filter grid grid-cols-3 gap-1">
            <Title level={3} style={{ marginBottom: 0 }}>
              Sản phẩm
            </Title>
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
            {product.map((e: any, i: any) => {
              return (
                <div
                  key={i}
                  className={"w-full"}
                  style={{ paddingTop: "0.35rem" }}
                >
                  <div className="flex justify-between items-center">
                    <Title level={4}>{e.title}</Title>
                    <a>Xem tất cả</a>
                  </div>
                  <div className="row">
                    {e.product.map((e1: any, i1: any) => {
                      return (
                        <div key={i1} className="col">
                          <div className="thumbnail">
                            <img src={e1.img} alt="" />
                            <p className="ratting">{e1.ratting}</p>
                            <span className="star">
                              <AiTwotoneStar />
                            </span>
                            <p className="comment">({e1.comment})</p>
                          </div>
                          <div className="info">
                            <p className="title">{e1.title}</p>
                            <p className="price">{e1.price + "đ"}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <FooterAntd />
    </>
  );
}
