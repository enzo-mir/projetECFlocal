import { Suspense } from "react";
import "./assets/style/App.css";
import GlobalStyle from "./pages/UI/GlobalStyle";
import Navigation from "./pages/naviguation/Navigation";

function App() {
  return (
    <>
      <Navigation connected={false} admin={false} />
      <GlobalStyle />
    </>
  );
}

export default App;
