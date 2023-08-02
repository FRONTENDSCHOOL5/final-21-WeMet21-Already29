import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import category from "../../../contexts/ProductCategoryContext";

const RadioDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: 10px 0 16px;
`;

const Input = styled.input`
  + label {
    transition: all.2s;
    font-size: 1.4rem;
    user-select: none;
    cursor: pointer;
    background-color: var(--unactive-color);
    border-radius: 30px;
    padding: 10px 15px;
    font-weight: 500;

    :hover {
      background-color: var(--main-color);
    }
  }
  :checked + label {
    background-color: var(--main-color);
    color: var(--white-color);
  }
`;

const RadioButtonGroup = ({ title, items, name, onChange, item }) => (
  <>
    <p>{title}</p>
    <RadioDiv>
      {items.map(([key, value]) => (
        <React.Fragment key={key}>
          <Input type="radio" id={key} name={name} value={value} className="a11y-hidden" onChange={(e) => onChange(e.target.id)} checked={key === item} required />
          <label htmlFor={key}>{value}</label>
        </React.Fragment>
      ))}
    </RadioDiv>
  </>
);

export default function RadioButton({ item, setItem, type }) {
  const categoryData = useContext(category);

  const sizeData = ["FREE", "XS", "S", "M", "L", "XL"].map((size) => [size, size]);

  const isShareData = {
    false: "판매",
    true: "무료나눔",
  };

  const components = {
    clothes: <RadioButtonGroup title="상품 종류" items={Object.entries(categoryData)} name="category" onChange={(id) => setItem(id)} item={item} />,
    size: <RadioButtonGroup title="사이즈" items={sizeData} name="size" onChange={(id) => setItem(id)} item={item} />,
    saleType: <RadioButtonGroup title="거래 방식" items={Object.entries(isShareData)} name="sale-type" onChange={(id) => setItem(id)} item={item} />,
  };

  return components[type];
}
