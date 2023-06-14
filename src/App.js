import GlobalStyle from "./style/GlobalStyle";
import Router from "./routes/Router";
import Theme from './style/Theme';
import { ThemeProvider } from 'styled-components';
import { AuthContextProvider } from './contexts/Auth';

function App() {
  return (
    <>
      <AuthContextProvider>
        <ThemeProvider theme={Theme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </AuthContextProvider> 
    </>
  );
}
export default App;