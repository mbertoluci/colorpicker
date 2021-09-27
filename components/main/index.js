import { useSelector } from "react-redux";
import { FormPalette } from "../formpalette";
import { Palette } from "../palette";
import { Container, Header, PaletteList } from "./styles";
import { getPalettes } from "../../store/palette";
import { EmptyState } from "../emptystate";

export const Main = () => {
  const palettes = useSelector(getPalettes);
  return (
    <Container>
      <Header>
        <FormPalette quantity={5} />
      </Header>
      <PaletteList>
        {palettes.length === 0 && <EmptyState />}
        {palettes &&
          palettes.map(({ paletteId, colors }) => (
            <Palette key={paletteId} colors={colors} paletteId={paletteId} />
          ))}
      </PaletteList>
    </Container>
  );
};
