const initialState = {
  data: [],
};

export const paletteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PALETTE:
      return { ...state, data: [...state.data, action.payload] };
    case DELETE_PALETTE:
      return {
        ...state,
        data: [
          ...state.data.filter((item) => item.paletteId !== action.payload),
        ],
      };
    case EDIT_COLOR:
      const paletteIndex = state.data.findIndex(
        (item) => item.paletteId === action.payload.paletteId
      );
      const colorIndex = state.data[paletteIndex].colors.findIndex(
        (item) => item.id === action.payload.colorId
      );
      const data = state.data;
      data[paletteIndex].colors[colorIndex].color = action.payload.color;
      return { ...state, data: [...data] };
    default:
      return state;
  }
};

//selectors
export const getPalettes = (state) => state.palettes.data;

//action types
export const ADD_PALETTE = "palettes/addPalettes";
export const DELETE_PALETTE = "palettes/deletePalette";
export const EDIT_COLOR = "palettes/editColor";

export const addPalette = (palette) => ({
  type: ADD_PALETTE,
  payload: palette,
});

export const deletePalette = (paletteId) => ({
  type: DELETE_PALETTE,
  payload: paletteId,
});

export const editColor = (paletteId, colorId, color) => ({
  type: EDIT_COLOR,
  payload: { paletteId, colorId, color },
});
