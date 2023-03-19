import { Card, Layout } from "antd";

const { Footer } = Layout;

export default function FooterAntd() {
  return (
    <Footer
      className="flex items-center justify-center md:pd-0"
      style={{
        textAlign: "center",
        // height: "2rem",
        padding: "0.3rem"
      }}
    >
      <div className="w-full" style={{ maxWidth: "15rem" }}>
        <div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-3 gap-1 w-full"
          // style={{ border: "1px solid #000" }}
        >
          <div>
            <Card bordered={false} className="h-full" hoverable>
              <div className="flex items-center justify-center">
                <div className="mr-[10px]">
                  <img
                    src="/img/assets/telephone.png"
                    alt=""
                    style={{ width: "30px" }}
                  />
                </div>
                <div>
                  <p className="font-[600] text-[18px]">Kiều Hoàng Phúc</p>
                  <p>0985635346</p>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card
              bordered={false}
              className="h-full flex items-center justify-center"
              hoverable
              onClick={() => {
                window.open(
                  "https://www.facebook.com/kieuhoangphuc/",
                  "_blank"
                );
              }}
            >
              <div className="flex items-center justify-center">
                <div className="mr-[10px]">
                  <img
                    src="/img/assets/facebook.png"
                    alt=""
                    style={{ width: "30px" }}
                  />
                </div>
                <div>
                  <p className="font-[600] text-[18px]">Kiều Hoàng Phúc</p>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card
              bordered={false}
              className="h-full flex items-center justify-center"
              hoverable
              onClick={() =>
                window.open("mailto: kieuphuck17h@gmail.com", "_blank")
              }
            >
              <div className="flex items-center justify-center">
                <div className="mr-[10px]">
                  <img
                    src="/img/assets/gmail.png"
                    alt=""
                    style={{ width: "30px" }}
                  />
                </div>
                <div>
                  <p className="font-[600] text-[18px]">Kiều Hoàng Phúc</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="mt-[10px]">Hoàng Minh Shop ©2023 Created by KP23</div>
      </div>
    </Footer>
  );
}
