import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typography, FloatButton } from "antd";
import { AiTwotoneStar } from "react-icons/ai";
import FooterAntd from "../../../common/Footer/Footer";

const { Title } = Typography;

export default function Home() {
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

  const product = [
    {
      title: "Product 1",
      product: [
        {
          title: "Product 1",
          description: "Description for product 1",
          price: "198000",
          comment: 20,
          ratting: 4.8,
          img: "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/August2022/xam_nhjat_real_4.jpg",
        },
        {
          title: "Product 1",
          description: "Description for product 1",
          price: "198000",
          comment: 20,
          ratting: 4.8,
          img: "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/August2022/xam_nhjat_real_4.jpg",
        },
        {
          title: "Product 1",
          description: "Description for product 1",
          price: "198000",
          comment: 20,
          ratting: 4.8,
          img: "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/August2022/xam_nhjat_real_4.jpg",
        },
        {
          title: "Product 1",
          description: "Description for product 1",
          price: "198000",
          comment: 20,
          ratting: 4.8,
          img: "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/August2022/xam_nhjat_real_4.jpg",
        },
        {
          title: "Product 1",
          description: "Description for product 1",
          price: "198000",
          comment: 20,
          ratting: 4.8,
          img: "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/August2022/xam_nhjat_real_4.jpg",
        },
        {
          title: "Product 1",
          description: "Description for product 1",
          price: "198000",
          comment: 20,
          ratting: 4.8,
          img: "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/August2022/xam_nhjat_real_4.jpg",
        },
        {
          title: "Product 1",
          description: "Description for product 1",
          price: "198000",
          comment: 20,
          ratting: 4.8,
          img: "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/August2022/xam_nhjat_real_4.jpg",
        },
      ],
    },
    {
      title: "Product 2",
      product: [
        {
          title: "Product 1",
          description: "Description for product 1",
          price: "198000",
          comment: 20,
          ratting: 4.8,
          img: "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/August2022/xam_nhjat_real_4.jpg",
        },
        {
          title: "Product 1",
          description: "Description for product 1",
          price: "198000",
          comment: 20,
          ratting: 4.8,
          img: "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/August2022/xam_nhjat_real_4.jpg",
        },
        {
          title: "Product 1",
          description: "Description for product 1",
          price: "198000",
          comment: 20,
          ratting: 4.8,
          img: "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/August2022/xam_nhjat_real_4.jpg",
        },
        {
          title: "Product 1",
          description: "Description for product 1",
          price: "198000",
          comment: 20,
          ratting: 4.8,
          img: "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/August2022/xam_nhjat_real_4.jpg",
        },
        {
          title: "Product 1",
          description: "Description for product 1",
          price: "198000",
          comment: 20,
          ratting: 4.8,
          img: "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/August2022/xam_nhjat_real_4.jpg",
        },
        {
          title: "Product 1",
          description: "Description for product 1",
          price: "198000",
          comment: 20,
          ratting: 4.8,
          img: "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/August2022/xam_nhjat_real_4.jpg",
        },
        {
          title: "Product 1",
          description: "Description for product 1",
          price: "198000",
          comment: 20,
          ratting: 4.8,
          img: "https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/August2022/xam_nhjat_real_4.jpg",
        },
      ],
    },
  ];

  return (
    <>
      <div className="home">
        <div className="container">
          <div className="carousel">
            <Slider {...settings} className="slider">
              {banner.map((e: any, i: any) => {
                return (
                  <div key={i}>
                    <img src={e} alt="" className="w-full h-full" />
                  </div>
                );
              })}
            </Slider>
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
                  {/* <Row gutter={[16, 16]}>
                  {e.product.map((e1: any, i1: any) => {
                    return (
                      <Col key={i1} span={8}>
                        <img src={e1.img} alt="" style={{ width: "100%" }} />
                      </Col>
                    );
                  })}
                </Row> */}
                </div>
              );
            })}
          </div>
        </div>
        <FloatButton.BackTop />
      </div>
      <FooterAntd />
    </>
  );
}
