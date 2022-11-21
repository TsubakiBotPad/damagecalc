import { keyframes } from "@emotion/css";
import styled from "@emotion/styled";

const shimmer = keyframes`
0% {
  background-position: -468px 0;
}

100% {
  background-position: 468px 0; 
}
`;

export const ShimmerDiv2 = styled.div`
  background: #f3df0d;
  background-image: linear-gradient(to right, #f3df0d 0%, #fff9da 20%, #f3df0d 40%, #f3df0d 100%);
  background-repeat: no-repeat;
  background-size: 800px 104px;
  display: inline-block;
  position: relative;

  -webkit-animation-duration: 2s;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: ${shimmer};
  -webkit-animation-timing-function: linear;
  width: 100%;
  height: 5px;
  border: 1px solid #ffffc2;
`;
