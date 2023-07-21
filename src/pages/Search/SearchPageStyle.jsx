import styled from "styled-components";

const StyledSearch = styled.section`
  width: 39rem;
  height: 100vh;
  position: relative;
  margin: 0 auto;

  .searchMain {
    display: flex;
    flex-direction: column;
    height: 100vh;
    gap: 16px;
    padding: 2rem 1.6rem;
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export default StyledSearch;
