import { ColorPicker } from "../ColorPicker";
import { Container, PaletteContainer, DeleteButton } from "./styles";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deletePalette, editColor } from "../../store/palette";

export const Palette = ({ paletteId, colors }) => {
  const dispatch = useDispatch();

  const handleColorChanged = ({ color, colorId, paletteId }) => {
    dispatch(editColor(paletteId, colorId, color));
  };

  const handleDeleteOnClick = () => {
    dispatch(deletePalette(paletteId));
  };

  return (
    <Container>
      {colors &&
        colors.map(({ color, id }) => (
          <PaletteContainer key={`${paletteId}${id}`}>
            <ColorPicker
              hex={color}
              colorId={id}
              paletteId={paletteId}
              onColorChanged={(event) => handleColorChanged(event)}
            />
          </PaletteContainer>
        ))}
      <DeleteButton onClick={() => handleDeleteOnClick()}>
        <AiFillDelete size={24} />
      </DeleteButton>
    </Container>
  );
};
