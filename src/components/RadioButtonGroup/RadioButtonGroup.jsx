import React, { useContext } from "react";
import styled from "styled-components";
import category from "../../contexts/ProductCategoryContext";
import SquareButton from "../Button/SquareButton/SquareButton";

const RadioDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: 10px 0 16px;
`;

const RadioInput = ({ title, data, name, setState, state }) => (
  <>
    <p>{title}</p>
    <RadioDiv>
      {data.map(([key, value]) => (
        <React.Fragment key={key}>
          <SquareButton type="radio" state={state} data={key} name={name} value={value} className="a11y-hidden" setState={setState} required />
        </React.Fragment>
      ))}
    </RadioDiv>
  </>
);

export default function RadioButtonGroup({ state, setState, type }) {
  const categoryData = useContext(category);

  const sizeData = ["FREE", "XS", "S", "M", "L", "XL"].map((size) => [size, size]);

  const isShareData = {
    false: "판매",
    true: "무료나눔",
  };

  const components = {
    clothes: <RadioInput title="상품 종류" data={Object.entries(categoryData)} name="category" setState={setState} state={state} />,
    size: <RadioInput title="사이즈" data={sizeData} name="size" setState={setState} state={state} />,
    saleType: <RadioInput title="거래 방식" data={Object.entries(isShareData)} name="sale-type" setState={setState} state={state} />,
  };

  return components[type];
}
