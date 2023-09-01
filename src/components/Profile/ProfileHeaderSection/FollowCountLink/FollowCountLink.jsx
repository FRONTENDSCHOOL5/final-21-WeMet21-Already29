import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const FollowCountSpan = styled.span`
  display: block;
  font-size: 1.8rem;
  font-weight: bold;

  color: ${({ count }) => (count ? "var(--font-black-color)" : "var(--gray-color)")};
`;

export default function FollowCountLink({ count, to, children }) {
  const Container = count ? Link : "div";
  const toProp = count ? { to: to } : {};
  return (
    <Container {...toProp}>
      <FollowCountSpan count={count}>{count}</FollowCountSpan>
      {children}
    </Container>
  );
}
