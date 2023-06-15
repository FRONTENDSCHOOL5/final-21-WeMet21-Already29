import React from 'react';
import StyledTopBasicNav from './TopNavbarStyle';
import iconSearch from '../../../assets/images/icon-search.svg';

export function TopMainNav(props) {
  const goSearch = () => {
    window.location.href = '/search';
  };

  return (
    <StyledTopBasicNav>
      <span>{props.value}</span>
      <img src={iconSearch} alt="검색" onClick={goSearch} />
    </StyledTopBasicNav>
  );
}
