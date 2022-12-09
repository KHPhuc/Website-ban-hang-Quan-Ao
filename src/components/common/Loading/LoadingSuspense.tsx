export function LoadingSupense() {
  return (
    <div
      style={{
        zIndex: 9999,
        height: "100vh",
        width: "100vw",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        background: "rgba(0,0,0,.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <img
          style={{ width: "100%", height: "100%", maxWidth: "300px" }}
          src="https://www.b52king.com/public/html/images/common_img/puff.svg"
          alt=""
        />
      </div>
    </div>
  );
}
