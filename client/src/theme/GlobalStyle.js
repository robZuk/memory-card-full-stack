import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css?family=Lato:300,500,700&display=swap');
  
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

body {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  font-family: 'Lato', sans-serif;
 
  
}

`;

export default GlobalStyle;
