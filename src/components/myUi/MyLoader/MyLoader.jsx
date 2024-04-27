import React from "react";
import ReactLoading from "react-loading";

const MyLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Высота вьюпорта браузера
      }}
    >
      <ReactLoading type="bars" color="white" />
    </div>
  );
};

export default MyLoader;
