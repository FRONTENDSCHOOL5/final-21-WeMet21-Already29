import styled from "styled-components";

const GreenBigBtn = styled.button`
  width: 20.125rem;
  height: 2.75rem;
  border-radius: 10px;
  border: none;
  color: var(--white-color);
  font-size: var(--font-md-size);
  background-color: var(--main-color);
`;

const GreenMdBtn = styled.button`
  width: 7.5rem;
  height: 2.125rem;
  border-radius: 10px;
  border: none;
  color: var(--white-color);
  font-size: var(--font-md-size);
  background-color: var(--main-color);
`;

const GreenSmBtn = styled.button`
  width: 5.625rem;
  height: 2rem;
  border-radius: 10px;
  border: none;
  color: var(--white-color);
  font-size: var(--font-md-size);
  background-color: var(--main-color);
`;

const GreenSsBtn = styled.button`
  width: 3.5rem;
  height: 1.75rem;
  border-radius: 10px;
  border: none;
  color: var(--white-color);
  font-size: var(--font-sm-size);
  background-color: var(--main-color);
`;

const WhiteBigBtn = styled(GreenBigBtn)`
  background-color: var(--white-color);
  color: var(--font-black-color);
`;

const WhiteMdBtn = styled(GreenMdBtn)`
  background-color: var(--white-color);
  color: var(--font-black-color);
`;

const WhiteSsBtn = styled(GreenSsBtn)`
  background-color: var(--white-color);
  color: var(--font-black-color);
`;

const UnactiveBigBtn = styled(GreenBigBtn)`
  background-color: var(--unactive-color);
  color: var(--white-color);
`;

const UnactiveMdBtn = styled(GreenMdBtn)`
  background-color: var(--unactive-color);
  color: var(--white-color);
`;

const UnactiveSmBtn = styled(GreenSmBtn)`
  background-color: var(--unactive-color);
  color: var(--white-color);
`;

export { GreenBigBtn, GreenMdBtn, GreenSmBtn, GreenSsBtn, WhiteBigBtn, WhiteMdBtn, WhiteSsBtn, UnactiveBigBtn, UnactiveMdBtn, UnactiveSmBtn };
