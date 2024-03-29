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
  scrollbar-width: thin; /* "auto" 또는 "thin" 사용 가능 */
  scrollbar-color: ${color.primary[1]} ${color.primary[3]};
}

body::-webkit-scrollbar {
    width: 8px;  
}

body::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: ${color.primary[1]}; /* 스크롤바의 색상 */
    
    border-radius: 10px;
}

body::-webkit-scrollbar-track {
    background: ${color.primary[3]};  /*스크롤바 뒷 배경 색상*/
}

`;

export default GlobalStyles;
