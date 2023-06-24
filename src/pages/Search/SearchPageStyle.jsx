import styled from 'styled-components';

const StyledSearch = styled.section`
  width: 390px;
  height: 100vh;
  position: relative;
  margin: 0 auto;
  background-color: white;

  * {
    box-sizing: border-box;
  }

  h3 {
    font-size: var(--font-lg-size);
  }

  .searchMain {
    display: flex;
    flex-direction: column;
    height: 90vh;
    gap: 16px;
    padding: 20px 16px;
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export default StyledSearch;
