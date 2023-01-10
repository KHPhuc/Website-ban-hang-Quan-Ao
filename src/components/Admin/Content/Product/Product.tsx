import { useEffect, useState } from "react";
import {
  Button,
  Table,
  Popconfirm,
  // Upload,
  Modal,
  Space,
} from "antd";
import AddProduct from "../../../../containers/Admin/Content/Product/AddProduct/AddProduct";
import UpdateProduct from "../../../../containers/Admin/Content/Product/UpdateProduct/UpdateProduct";

// import { AiFillFileAdd, AiFillFileExcel } from "react-icons/ai";
// import { getExcelPT } from "../../../../app/API/Product/Product";
// var XLSX = require("xlsx");
import * as XLSX from "xlsx";
import { addProductByExcel } from "../../../../app/API/Product/Product";
import { NumericFormat } from "react-number-format";

export default function Product({
  setTitle,
  getAllProductType,
  allProductType,

  product,
  getProduct,
  deleteProduct,

  deleteDetailProduct,
}: any) {
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [isOpenModalDescription, setIsOpenModalDescription] = useState(false);
  const [isOpenModalUpdateProduct, setIsOpenModalUpdateProduct] =
    useState(false);

  const [valueDescription, setValueDescription]: any = useState();
  const [valueUpdateProduct, setValueUpdateProduct]: any = useState();

  useEffect(() => {
    setTitle("Quản lý sản phẩm");
    getAllProductType();
    getProduct();
  }, []);

  useEffect(() => {
    if (product) {
    }
  }, [product]);

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Loại sản phẩm",
      // dataIndex: "productType",
      render: (e: any) => {
        return allProductType
          ? allProductType
              .find((x: any) => {
                return x.detailProductType.find(
                  (x1: any) => x1.detailPTId === e.detailPTId
                );
              })
              ?.detailProductType.find(
                (x1: any) => x1.detailPTId === e.detailPTId
              )?.detailPTName
          : "";
      },

      key: "productType",
    },
    {
      title: "Số lượng",
      render: (e: any) =>
        e.detailProduct.reduce((e1: any, e2: any) => e1 + e2.quantity, 0),
      key: "total",
    },
    Table.EXPAND_COLUMN,
    {
      title: "Số màu",
      //   dataIndex: "colors",
      //   key: "colors"
      render: (x: any) => x.detailProduct.length,
    },
    {
      title: "Mô tả",
      render: (x: any) => (
        <a
          onClick={() => {
            setValueDescription({
              productName: x.productName,
              description: x.description,
            });
            setIsOpenModalDescription(true);
          }}
        >
          Mô tả
        </a>
      ),
    },
    {
      title: "Hành động",
      render: (x: any) => (
        <Space size="middle">
          <a
            onClick={() => {
              console.log(x);
              setValueUpdateProduct({
                productId: x.productId,
                productName: x.productName,
                description: x.description,
                detailPTId: x.detailPTId,
              });
              setIsOpenModalUpdateProduct(true);
            }}
          >
            Sửa
          </a>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa không?"
            onConfirm={() => {
              deleteProduct(x.productId);
            }}
          >
            <a>Xóa</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const columnsExpand = [
    {
      title: "Hình ảnh",
      // dataIndex: "image",
      // key: "image",
      //   render: (x: any) => (
      //     <Button onClick={() => console.log(x)}>Nhấn thử</Button>
      //   ),
      // width: "1%",
      // render: (x: any) => <>{x.image(x.urlImage, x.key, detailProductList)}</>,
      onCell: (x: any, index: any) => {
        return x.span ? { rowSpan: x.span } : { rowSpan: 0 };
      },
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      onCell: (x: any, index: any) => {
        return x.span ? { rowSpan: x.span } : { rowSpan: 0 };
      },
      key: "color",
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Giá gốc",
      // dataIndex: "originalPrice",
      render: (x: any) => (
        <del>
          <NumericFormat
            displayType={"text"}
            thousandSeparator={"."}
            decimalSeparator={","}
            suffix={" ₫"}
            value={x.originalPrice}
          />
        </del>
      ),
      key: "originalPrice",
    },
    {
      title: "Giá sale",
      render: (x: any) => (
        <NumericFormat
          displayType={"text"}
          thousandSeparator={true}
          suffix={" ₫"}
          value={x.currentPrice}
        />
      ),
      key: "currentPrice",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: 110,
    },
    {
      title: "Hành động",
      render: (e: any) => (
        <Space>
          <a>Sửa</a>
          <Popconfirm
            title="Bạn có muốn xóa không?"
            onConfirm={() => {
              deleteDetailProduct(e.detailProductId);
            }}
          >
            <a>Xóa</a>
          </Popconfirm>
        </Space>
      ),
      width: 110,
    },
  ];

  //#region Tính năng phát triển sau
  const handleExcel = async (e: any) => {
    let pass = true;
    const data = await e.arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = XLSX.read(data);
    let tach = workbook.Sheets["Sản phẩm"]["!ref"]?.split(":")!;
    tach[0] = tach[0].substring(1);
    tach[1] = tach[1].substring(1);
    const worksheet = workbook.Sheets["Sản phẩm"];
    // console.log(worksheet);

    for (let i = 2; i <= parseInt(tach[1]); i++) {
      if (!worksheet[`K${i}`].v) {
        pass = false;
      }
    }

    if (pass) {
      var dataConvert: any = [];
      for (var i = 2; i <= parseInt(tach[1]); i++) {
        if (worksheet[`A${i}`]) {
          var cache;
          if (worksheet[`B${i}`] && worksheet[`B${i}`].v.includes("Mũ")) {
            cache = {
              productName: worksheet[`A${i}`].v,
              detailPTId: worksheet[`C${i}`].v,
              description: worksheet[`D${i}`].v,
              detailProduct: [
                {
                  color: worksheet[`F${i}`].v,
                  subDetail: [
                    {
                      quantity: worksheet[`H${i}`].w,
                      originalPrice: worksheet[`I${i}`].v,
                      currentPrice: worksheet[`J${i}`].v,
                    },
                  ],
                },
              ],
            };
          } else {
            cache = {
              productName: worksheet[`A${i}`].v,
              detailPTId: worksheet[`C${i}`].v,
              description: worksheet[`D${i}`].v,
              detailProduct: [
                {
                  color: worksheet[`F${i}`].v,
                  subDetail: [
                    {
                      size: worksheet[`G${i}`].v,
                      quantity: worksheet[`H${i}`].w,
                      originalPrice: worksheet[`I${i}`].v,
                      currentPrice: worksheet[`J${i}`].v,
                    },
                  ],
                },
              ],
            };
          }

          dataConvert.push(cache);
        } else {
          let index1 = dataConvert.length - 1;
          let find = false;
          for (
            let index2 = 0;
            index2 < dataConvert[index1].detailProduct.length;
            index2++
          ) {
            if (
              dataConvert[index1].detailProduct[index2].color ===
              worksheet[`F${i}`].v
            ) {
              if (worksheet[`B${i}`] && worksheet[`B${i}`].v.includes("Mũ")) {
                dataConvert[index1].detailProduct[index2].subDetail.push({
                  quantity: worksheet[`H${i}`].w,
                  originalPrice: worksheet[`I${i}`].v,
                  currentPrice: worksheet[`J${i}`].v,
                });
              } else {
                dataConvert[index1].detailProduct[index2].subDetail.push({
                  size: worksheet[`G${i}`].v,
                  quantity: worksheet[`H${i}`].w,
                  originalPrice: worksheet[`I${i}`].v,
                  currentPrice: worksheet[`J${i}`].v,
                });
              }

              find = true;
              break;
            }
          }
          if (!find) {
            if (worksheet[`B${i}`] && worksheet[`B${i}`].v.includes("Mũ")) {
              dataConvert[index1].detailProduct.push({
                color: worksheet[`F${i}`].v,
                subDetail: [
                  {
                    quantity: worksheet[`H${i}`].v,
                    originalPrice: worksheet[`I${i}`].v,
                    currentPrice: worksheet[`J${i}`].v,
                  },
                ],
              });
            } else {
              dataConvert[index1].detailProduct.push({
                color: worksheet[`F${i}`].v,
                subDetail: [
                  {
                    size: worksheet[`G${i}`].v,
                    quantity: worksheet[`H${i}`].v,
                    originalPrice: worksheet[`I${i}`].v,
                    currentPrice: worksheet[`J${i}`].v,
                  },
                ],
              });
            }
          }
        }
      }

      addProductByExcel(dataConvert);
      // addProduct(dataConvert);
      // console.log(dataConvert);
    }
  };
  //#endregion

  return (
    <>
      <div className="flex justify-between">
        <div className="md:flex">
          {/* <Upload
            beforeUpload={async (e) => {
              console.log(e);
            }}
            showUploadList={false}
          >
            <Button className="flex items-center" icon={<AiFillFileAdd />}>
              Thêm Excel
            </Button>
          </Upload> */}
        </div>

        {/* <div className="md:flex">
          <Button
            icon={<AiFillFileExcel />}
            className="flex items-center mb-[5px] md:mb-0 md:mr-[5px]"
          >
            Mẫu thêm sản phẩm
          </Button>
          <Button
            icon={<AiFillFileExcel />}
            className="flex items-center"
            onClick={() => getExcelPT()}
          >
            Danh sách loại sản phẩm
          </Button>
        </div> */}
      </div>

      <Table
        title={() => (
          <div className="flex justify-between">
            <div>Danh sách sản phẩm</div>
            <div className="flex">
              <Button
                type="primary"
                onClick={() => setIsOpenModalAdd(true)}
                className="flex mb-[5px] md:mb-0 md:mr-[5px]"
              >
                Thêm
              </Button>
              {/* <Upload
                beforeUpload={(e) => {
                  handleExcel(e);
                }}
                showUploadList={false}
              >
                <Button className="flex items-center" icon={<AiFillFileAdd />}>
                  Thêm Excel
                </Button>
              </Upload> */}
            </div>
          </div>
        )}
        columns={columns}
        dataSource={product}
        rowKey="productId"
        scroll={{ x: "max-content" }}
        expandable={{
          expandedRowRender: (record: any) => (
            <Table
              columns={columnsExpand}
              // dataSource={record.colors}
              dataSource={record.detailProduct}
              pagination={false}
              rowKey="detailProductId"
              scroll={{ x: "max-content" }}
            />
            // <p>Hihi</p>
          ),
        }}
      />
      <AddProduct
        isOpenModalAdd={isOpenModalAdd}
        setIsOpenModalAdd={setIsOpenModalAdd}
        productType={allProductType}
      />
      <Modal
        title={`${valueDescription ? valueDescription.productName : ""}`}
        open={isOpenModalDescription}
        onCancel={() => setIsOpenModalDescription(false)}
        footer={null}
      >
        {valueDescription ? valueDescription.description : ""}
      </Modal>
      <UpdateProduct
        isOpenModalUpdateProduct={isOpenModalUpdateProduct}
        setIsOpenModalUpdateProduct={setIsOpenModalUpdateProduct}
        data={valueUpdateProduct}
        allProductType={allProductType}
      />
    </>
  );
}
