import styled from "@emotion/styled";
import {
  color,
  layout,
  border,
  display,
  flexbox,
  typography,
  space,
  position,
} from "styled-system";
import { BoxProps } from "./Box";

const Button = styled.button<
  BoxProps & {
    square?: boolean;
  }
>`
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #ccc;
  height: 32px;
  width: ${({ square }) => (square ? "32px" : "72px")};
  :hover {
    border-color: #0066cc;
    color: #0066cc;
  }
  ${layout}
  ${color}
  ${border}
  ${display}
  ${flexbox}
  ${typography}
  ${space}
  ${position}
`;

export default Button;
