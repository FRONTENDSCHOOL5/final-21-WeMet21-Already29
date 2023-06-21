import GlobalStyle from "./style/GlobalStyle";
import SignUp from "./pages/SignUp/SignUp"
import { AuthContextProvider } from './contexts/SearchContext/Auth';

function App() {
  return (
    <>
      <AuthContextProvider>
        <GlobalStyle />
        <SignUp />
      </AuthContextProvider>
    </>
  );
};
export default App;
