import React from "react";
import { GreenBigBtn, GreenMdBtn, GreenSmBtn, GreenSsBtn, WhiteBigBtn, WhiteMdBtn, WhiteSsBtn, UnactiveBigBtn, UnactiveMdBtn, UnactiveSmBtn } from "./ButtonStyle";

export function GreenBigButton({ contents, onClick }) {
  return (
    <>
      <GreenBigBtn onClick={onClick}>{contents}</GreenBigBtn>
    </>
  );
}

export function GreenMdButton({ contents, onClick }) {
  return (
    <>
      <GreenMdBtn onClick={onClick}>{contents}</GreenMdBtn>
    </>
  );
}

export function GreenSmButton({ contents, onClick }) {
  return (
    <>
      <GreenSmBtn onClick={onClick}>{contents}</GreenSmBtn>
    </>
  );
}

export function GreenSsButton({ contents, onClick }) {
  return (
    <>
      <GreenSsBtn onClick={onClick}>{contents}</GreenSsBtn>
    </>
  );
}

export function WhiteBigButton({ contents, onClick }) {
  return (
    <>
      <WhiteBigBtn onClick={onClick}>{contents}</WhiteBigBtn>
    </>
  );
}

export function WhiteMdButton({ contents, onClick }) {
  return (
    <>
      <WhiteMdBtn onClick={onClick}>{contents}</WhiteMdBtn>
    </>
  );
}

export function WhiteSsButton({ contents, onClick }) {
  return (
    <>
      <WhiteSsBtn onClick={onClick}>{contents}</WhiteSsBtn>
    </>
  );
}

export function UnactiveBigButton({ contents, onClick }) {
  return (
    <>
      <UnactiveBigBtn onClick={onClick}>{contents}</UnactiveBigBtn>
    </>
  );
}

export function UnactiveMdButton({ contents, onClick }) {
  return (
    <>
      <UnactiveMdBtn onClick={onClick}>{contents}</UnactiveMdBtn>
    </>
  );
}

export function UnactiveSmButton({ contents, onClick }) {
  return (
    <>
      <UnactiveSmBtn onClick={onClick}>{contents}</UnactiveSmBtn>
    </>
  );
}



