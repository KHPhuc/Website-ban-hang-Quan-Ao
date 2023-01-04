import { useEffect, useState } from "react";
import { Card, Input, Button, Divider, Popconfirm, Empty } from "antd";
import { FaPlus } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

export default function ProductType({
  setTitle,
  productType,
  getProductType,
  addProductType,
  updateProductType,
  deleteProductType,

  detailProductType,
  getDetailProductType,
  addDetailProductType,
  updateDetailProductType,
  deleteDetailProductType,

  setDetailProductType,
}: any) {
  const [isOpenAddPT, setIsOpenAddPT] = useState(false);
  const [isOpenAddDPT, setIsOpenAddDPT] = useState(false);

  const [keyEidtPT, setKeyEditPT]: any = useState();
  const [inputEditPT, setInputEditPT]: any = useState();

  const [keyOpenPT, setKeyOpenPT] = useState();
  const [keyEditDetailPT, setKeyEditDetailPT]: any = useState();
  const [inputEditDetailPT, setInputEditDetailPT]: any = useState();

  const [inputProductType, setInputProductType]: any = useState();
  const [inputDetailPT, setInputDetailPT]: any = useState();

  useEffect(() => {
    setTitle("Quản lý danh mục sản phẩm");
    getProductType();
    setDetailProductType("");
  }, []);

  useEffect(() => {
    setInputProductType("");
    setKeyEditPT("");
    setInputEditPT("");
  }, [productType]);

  useEffect(() => {
    setInputDetailPT("");
    setKeyEditDetailPT("");
    setInputEditDetailPT("");
  }, [detailProductType]);

  const handleOpenPT = (e: any) => {
    setKeyOpenPT(e);
    getDetailProductType(e);
  };

  return (
    <>
      <div>
        <p className="text-center font-bold text-[28px] mb-[30px]">
          Danh mục chính
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-1">
          {productType
            ? productType.map((e: any, i: any) => {
                return (
                  <div key={i} className="relative card">
                    <Card
                      hoverable
                      className="text-center bg-[#f6f6f6]"
                      onClick={() => {
                        keyEidtPT === e.productTypeId
                          ? null
                          : handleOpenPT(e.productTypeId);
                      }}
                    >
                      {keyEidtPT === e.productTypeId ? (
                        <div>
                          <div className="text-white">
                            <Input
                              placeholder="Tên danh mục"
                              value={inputEditPT}
                              onChange={(e: any) =>
                                setInputEditPT(e.target.value)
                              }
                              onKeyDown={(e) =>
                                e.key === "Enter"
                                  ? updateProductType(keyEidtPT, inputEditPT)
                                  : null
                              }
                            />
                          </div>
                          <div className="flex justify-between mt-[0.15rem]">
                            <Button
                              className="bg-[#1677ff] hover:bg-[#4096ff]"
                              type="primary"
                              onClick={
                                () => updateProductType(keyEidtPT, inputEditPT)
                                // addProductType(inputProductType, null)
                              }
                            >
                              Cập nhật
                            </Button>
                            <Button
                              type="primary"
                              danger
                              onClick={() => setKeyEditPT("")}
                            >
                              Hủy
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="font-semibold text-[23px]">
                          {e.productTypeName}
                        </p>
                      )}
                    </Card>

                    {keyEidtPT === e.productTypeId ? (
                      ""
                    ) : (
                      <>
                        <MdEdit
                          size={20}
                          className="absolute top-[13px] right-[40px] text-blue-500 hover:scale-[1.3] duration-200 icon-hover"
                          onClick={() => {
                            setInputEditPT(e.productTypeName);
                            setKeyEditPT(e.productTypeId);
                          }}
                        />
                        <Popconfirm
                          title="Bạn có chắc chắn muốn xóa không?"
                          // description="Are you sure to delete this task?"
                          onConfirm={() => deleteProductType(e.productTypeId)}
                          // de="Bạn có chắc chắn muốn xóa không?"
                          // className="bg-[#1677ff] hover:bg-[#4096ff]"
                        >
                          <MdDelete
                            size={20}
                            className="absolute top-[13px] right-[13px] text-red-500 hover:scale-[1.3] duration-200 icon-hover"
                            // onClick={() => handleDelete(e.productTypeId)}
                          />
                        </Popconfirm>
                      </>
                    )}
                  </div>
                );
              })
            : ""}

          <Card
            hoverable
            className="text-center bg-[#3d53cc]"
            bodyStyle={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              !isOpenAddPT ? setIsOpenAddPT(true) : "";
            }}
          >
            {!isOpenAddPT ? (
              <div className="text-white">
                <FaPlus />
              </div>
            ) : (
              <div>
                <div className="text-white">
                  <Input
                    placeholder="Tên danh mục"
                    value={inputProductType}
                    onChange={(e: any) => setInputProductType(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter"
                        ? addProductType(inputProductType)
                        : null
                    }
                  />
                </div>
                <div className="flex justify-between mt-[0.15rem]">
                  <Button
                    className="bg-[#1677ff] hover:bg-[#4096ff]"
                    type="primary"
                    onClick={() => addProductType(inputProductType)}
                  >
                    Thêm
                  </Button>
                  <Button
                    type="primary"
                    danger
                    onClick={() => setIsOpenAddPT(false)}
                  >
                    Hủy
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
        <Divider className="mt-[50px]" />
        <p className="text-center font-bold text-[25px] mb-[30px] mt-[30px]">
          Danh mục phụ
        </p>
        <div
          className={`${
            keyOpenPT
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-1"
              : ""
          }`}
        >
          {detailProductType
            ? detailProductType.map((e: any, i: any) => {
                return (
                  <div key={i} className="relative card">
                    <Card
                      key={i}
                      hoverable
                      className="text-center bg-[#f6f6f6]"
                      // onClick={() => handleOpen(e.productTypeName)}
                    >
                      {keyEditDetailPT === e.detailPTId ? (
                        <div>
                          <div className="text-white">
                            <Input
                              placeholder="Tên danh mục"
                              value={inputEditDetailPT}
                              onChange={(e: any) =>
                                setInputEditDetailPT(e.target.value)
                              }
                              onKeyDown={(e) =>
                                e.key === "Enter"
                                  ? updateDetailProductType(
                                      keyEditDetailPT,
                                      inputEditDetailPT
                                    )
                                  : null
                              }
                            />
                          </div>
                          <div className="flex justify-between mt-[0.15rem]">
                            <Button
                              className="bg-[#1677ff] hover:bg-[#4096ff]"
                              type="primary"
                              onClick={
                                () =>
                                  updateDetailProductType(
                                    keyEditDetailPT,
                                    inputEditDetailPT
                                  )
                                // addProductType(inputProductType, null)
                              }
                            >
                              Cập nhật
                            </Button>
                            <Button
                              type="primary"
                              danger
                              onClick={() => setKeyEditDetailPT("")}
                            >
                              Hủy
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="font-semibold text-[23px]">
                          {e.detailPTName}
                        </p>
                      )}
                    </Card>
                    {keyEditDetailPT === e.detailPTId ? (
                      ""
                    ) : (
                      <>
                        <MdEdit
                          size={20}
                          className="absolute top-[13px] right-[40px] text-blue-500 hover:scale-[1.3] duration-200 icon-hover"
                          onClick={() => {
                            setInputEditDetailPT(e.detailPTName);
                            setKeyEditDetailPT(e.detailPTId);
                          }}
                        />
                        <Popconfirm
                          title="Bạn có chắc chắn muốn xóa không?"
                          // description="Are you sure to delete this task?"
                          onConfirm={() =>
                            deleteDetailProductType(e.detailPTId)
                          }
                          // de="Bạn có chắc chắn muốn xóa không?"
                          // className="bg-[#1677ff] hover:bg-[#4096ff]"
                        >
                          <MdDelete
                            size={20}
                            className="absolute top-[13px] right-[13px] text-red-500 hover:scale-[1.3] duration-200 icon-hover"
                            // onClick={() => handleDelete(e.productTypeId)}
                          />
                        </Popconfirm>
                      </>
                    )}
                  </div>
                );
              })
            : ""}

          {keyOpenPT ? (
            <Card
              hoverable
              className="text-center bg-[#3d53cc]"
              bodyStyle={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                !isOpenAddDPT ? setIsOpenAddDPT(true) : "";
              }}
            >
              {!isOpenAddDPT ? (
                <div className="text-white">
                  <FaPlus />
                </div>
              ) : (
                <div>
                  <div className="text-white">
                    <Input
                      placeholder="Tên danh mục"
                      value={inputDetailPT}
                      onChange={(e: any) => setInputDetailPT(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter"
                          ? addDetailProductType(inputDetailPT, keyOpenPT)
                          : null
                      }
                    />
                  </div>
                  <div className="flex justify-between mt-[0.15rem]">
                    <Button
                      className="bg-[#1677ff] hover:bg-[#4096ff]"
                      type="primary"
                      onClick={() =>
                        addDetailProductType(inputDetailPT, keyOpenPT)
                      }
                    >
                      Thêm
                    </Button>
                    <Button
                      type="primary"
                      danger
                      onClick={() => setIsOpenAddDPT(false)}
                    >
                      Hủy
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ) : (
            <Empty description={"Chọn 1 danh mục"} />
          )}
        </div>
      </div>
    </>
  );
}
