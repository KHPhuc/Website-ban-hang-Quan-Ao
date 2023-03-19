import { Card, Layout } from "antd";

const { Footer } = Layout;

export default function FooterAntd() {
  return (
    <Footer
      className="flex items-center justify-center"
      style={{
        textAlign: "center",
        height: "1rem",
      }}
    >
      <div className="w-full">
        <div
          className="grid grid-cols-1 md: grid-rows-3 gap-3 w-full"
          style={{ border: "1px solid #000" }}
        >
          <div>
            <Card title="Card title" bordered={false} className="h-full">
              Card content
            </Card>
          </div>
          <div>
            <Card title="Card title" bordered={false} className="h-full">
              Card content
            </Card>
          </div>
          <div>
            <Card title="Card title" bordered={false} className="h-full">
              Card content
            </Card>
          </div>
        </div>
        <div>Hoàng Minh Shop ©2023 Created by KP23</div>
      </div>
    </Footer>
  );
}
