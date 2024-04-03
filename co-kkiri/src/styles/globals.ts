import { createGlobalStyle } from "styled-components";
import resetStyle from "./reset";
import DESIGN_TOKEN from "./tokens";

const { color } = DESIGN_TOKEN;

const GlobalStyles = createGlobalStyle`
${resetStyle}

html {
  font-size: 62.5%;
}

body {
  font-size: 1.6rem;
  font-family: "Pretendard";
  font-weight: 400;
  overflow-y:scroll;
  background-color: ${color.white};
}
*::-webkit-scrollbar {
    width: 8px;  
}

*::-webkit-scrollbar-thumb {
    height: 30%;
    background: ${color.primary[1]};
    
    border-radius: 10px;
}

*::-webkit-scrollbar-track {
    background: ${color.primary[3]};
}
`;

export default GlobalStyles;
