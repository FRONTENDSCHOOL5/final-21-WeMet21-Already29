import React from "react";
import { GreenBigBtn, GreenMdBtn, GreenSmBtn, GreenSsBtn, WhiteBigBtn, WhiteMdBtn, WhiteSsBtn, UnactiveBigBtn, UnactiveMdBtn, UnactiveSmBtn } from "./ButtonStyle";

export function GreenBigButton({ contents }) {
  return <GreenBigBtn>{contents}</GreenBigBtn>;
}

export function GreenMdButton({ contents, onClick }) {
  return <GreenMdBtn onClick={onClick}>{contents}</GreenMdBtn>;
}

export function GreenSmButton({ contents }) {
  return <GreenSmBtn>{contents}</GreenSmBtn>;
}

export function GreenSsButton({ contents }) {
  return <GreenSsBtn>{contents}</GreenSsBtn>;
}

export function WhiteBigButton({ contents }) {
  return <WhiteBigBtn>{contents}</WhiteBigBtn>;
}

export function WhiteMdButton({ contents }) {
  return <WhiteMdBtn>{contents}</WhiteMdBtn>;
}

export function WhiteSsButton({ contents }) {
  return <WhiteSsBtn>{contents}</WhiteSsBtn>;
}

export function UnactiveBigButton({ contents }) {
  return <UnactiveBigBtn>{contents}</UnactiveBigBtn>;
}

export function UnactiveMdButton({ contents }) {
  return <UnactiveMdBtn>{contents}</UnactiveMdBtn>;
}

export function UnactiveSmButton({ contents }) {
  return <UnactiveSmBtn>{contents}</UnactiveSmBtn>;
}
