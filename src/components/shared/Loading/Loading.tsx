import React from "react";
import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center gap-4 p-4 flex-wrap justify-center bg-">
      <Spin size="large" tip="Loading payments..." />
    </div>
  );
};

export default Loading;
