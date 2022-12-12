import { Carousel } from "antd";

export default function Home() {
  const banner = [
    "/img/banner/banner_1.png",
    "/img/banner/banner_2.png",
    "/img/banner/banner_3.png",
  ];

  return (
    <div className="home">
      <Carousel autoplay>
        {banner.map((e: any, i: any) => {
          return (
            <div key={i}>
              <img
                style={{ height: "2rem", lineHeight: "2rem" }}
                src={e}
                alt=""
                loading="lazy"
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
