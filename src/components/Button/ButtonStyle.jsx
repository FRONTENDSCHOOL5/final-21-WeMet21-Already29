import styled from "styled-components";

const GreenBigBtn = styled.button`
  width: 32.2rem;
  height: 4.4rem;
  border-radius: 1rem;
  border: none;
  color: var(--white-color);
  font-size: var(--font-md-size);
  background-color: var(--main-color);
  text-align: center;
`;

const GreenMdBtn = styled.button`
  width: 12rem;
  height: 3.4rem;
  border-radius: 1rem;
  border: none;
  color: var(--white-color);
  font-size: var(--font-md-size);
  background-color: var(--main-color);
  text-align: center;
`;

const GreenSmBtn = styled.button`
  width: 9rem;
  height: 3.2rem;
  border-radius: 1rem;
  border: none;
  color: var(--white-color);
  font-size: var(--font-md-size);
  background-color: var(--main-color);
  text-align: center;
`;

const GreenSsBtn = styled.button`
  width: 5.6rem;
  height: 2.8rem;
  border-radius: 1rem;
  border: none;
  color: var(--white-color);
  font-size: var(--font-sm-size);
  background-color: var(--main-color);
  text-align: center;
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