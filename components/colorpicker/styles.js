import styled from "styled-components";
import { pickTextColorBasedOnBgColorAdvanced } from "../../utils/_colors";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: ${(props) =>
    props.colorValidator(props.backgroundColor)
      ? `${props.backgroundColor}`
      : "#FFF"};
  border: ${(props) =>
    props.colorValidator(props.backgroundColor) ? "unset" : "1px dashed #000"};
`;

export const Label = styled.p`
  color: ${(props) =>
    pickTextColorBasedOnBgColorAdvanced({
      bgColor: props.backgroundColor ? props.backgroundColor : "#FFFFFF",
      lightColor: "#FFF",
      darkColor: "#000",
    })};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const Input = styled.input`
  width: 100%;
  text-transform: uppercase;
`;

export const ButtonApply = styled.button``;
