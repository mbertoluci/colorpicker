import { useState, useEffect } from "react";
import { MdDone } from "react-icons/md";
import { Container, Label, Input, ButtonApply } from "./styles";
import PropTypes from "prop-types";

export const ColorPicker = ({
  hex,
  position,
  colorId,
  paletteId,
  onColorChanged,
  reset,
  handleReset,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [color, setColor] = useState("");
  const [applyButtonState, setApplyButtonState] = useState(false);

  const handleOpenState = () => setOpen((prevState) => !prevState);

  const validateColor = (hex) =>
    hex && hex.length === 7 && hex.match(/[0-9A-Fa-f]{6}/g);

  const handleColor = (hex) => setColor(hex);

  const onClickApply = () => {
    onColorChanged({ color, position, colorId, paletteId });
    setOpen(false);
  };

  useEffect(() => {
    if (reset) {
      setColor("");
      if (handleReset) handleReset(false);
    }
  }, [reset, handleReset]);

  useEffect(() => {
    if (validateColor(hex)) {
      setColor(hex);
    }
  }, [hex]);

  useEffect(() => {
    setApplyButtonState(validateColor(color));
  }, [color]);

  return (
    <Container backgroundColor={color} colorValidator={validateColor}>
      {!isOpen && (
        <Label backgroundColor={color} onClick={handleOpenState}>
          {color ? color.toUpperCase() : hex ? hex.toUpperCase() : `add color`}
        </Label>
      )}
      {isOpen && (
        <>
          <Input value={color} onChange={(e) => handleColor(e.target.value)} />
          <ButtonApply
            onClick={() => onClickApply()}
            disabled={!applyButtonState}
          >
            <MdDone />
          </ButtonApply>
        </>
      )}
    </Container>
  );
};

ColorPicker.propTypes = {
  hex: PropTypes.string,
  onColorChanged: PropTypes.func.isRequired,
  position: PropTypes.number,
  id: PropTypes.any,
  reset: PropTypes.bool,
  handleReset: PropTypes.func,
};

ColorPicker.defaultProps = {
  hex: undefined,
  id: undefined,
  position: undefined,
  reset: false,
  handleReset: undefined,
};
