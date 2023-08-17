import React from "react";
import styled from "styled-components";

const BoxWrapper = styled.div`
  border: 2px solid var(--box-gray-color);
  box-shadow: 3px 3px 2px var(--box-gray-color);
  padding: 12px 14px;
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 15px;
`;

export default function ShadowBox({ children }) {
  return <BoxWrapper>{children}</BoxWrapper>;
}
