import { Spin } from "antd";
import React from "react";
import { styled } from "styled-components";
const Loading = styled.div`
  width: 100vw;
  heigt: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PageLoading = () => {
  return (
    <Loading>
      <Spin />
    </Loading>
  );
};

export default PageLoading;
