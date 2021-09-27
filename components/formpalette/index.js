import { useState, useEffect, useCallback } from "react";
import { ColorPicker } from "../colorpicker";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addPalette } from "../../store/palette";

import {
  Container,
  ColorPickersContainer,
  CreatePaletteButton,
} from "./styles";

export const FormPalette = ({ quantity }) => {
  const dispatch = useDispatch();
  const [palette, setPalette] = useState({
    colors: new Array(quantity),
    quantity: 0,
  });
  const [elements, setElements] = useState([]);
  const [resetElements, setResetElements] = useState(false);
  const [createPaletteButtonDisabled, setCreatePaletteButtonDisabled] =
    useState(true);

  const handleColorPickerChanged = useCallback(
    ({ color, position }) => {
      setPalette((prevState) => {
        prevState.colors[position] = { color, id: uuidv4() };
        prevState.quantity =
          prevState.quantity < quantity ? prevState.quantity + 1 : quantity;
        return { ...prevState };
      });
    },
    [quantity]
  );

  const handleCreatePaletteOnClick = () => {
    dispatch(addPalette({ paletteId: uuidv4(), colors: palette.colors }));
    setPalette({
      colors: new Array(quantity),
      quantity: 0,
    });
    setResetElements(true);
  };

  useEffect(() => {
    setCreatePaletteButtonDisabled(palette.quantity !== quantity);
  }, [palette, quantity]);

  useEffect(() => {
    setElements(() => {
      let temp = [];
      for (let i = 0; i < quantity; i++) {
        temp.push(
          <ColorPicker
            key={i}
            position={i}
            onColorChanged={(event) => handleColorPickerChanged(event)}
            reset={resetElements}
            handleReset={setResetElements}
          />
        );
      }
      return [...temp];
    });
  }, [quantity, handleColorPickerChanged, resetElements]);

  return (
    <Container>
      <ColorPickersContainer>{elements}</ColorPickersContainer>
      <CreatePaletteButton
        onClick={handleCreatePaletteOnClick}
        disabled={createPaletteButtonDisabled}
      >
        Create Palette
      </CreatePaletteButton>
    </Container>
  );
};
