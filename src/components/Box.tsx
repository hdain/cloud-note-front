import styled from "@emotion/styled";
import {
  color,
  layout,
  LayoutProps,
  ColorProps,
  BorderProps,
  DisplayProps,
  border,
  display,
  FlexboxProps,
  flexbox,
  typography,
  space,
  position,
  SpaceProps,
  PositionProps,
} from "styled-system";

export type BoxProps = LayoutProps &
  ColorProps &
  SpaceProps &
  PositionProps &
  BorderProps &
  DisplayProps &
  FlexboxProps;

const Box = styled.div<BoxProps>`
  ${layout}
  ${color}
  ${border}
  ${display}
  ${flexbox}
  ${typography}
  ${space}
  ${position}
`;

export default Box;
