import { createSlice } from "@reduxjs/toolkit";

type sliceType = {
  home: {
    images: string[];
  };
};

export const homeSlice = createSlice({
  name: "Home",
  initialState: {
    images: ["Add button"],
  },
  reducers: {
    addImage: (state, action) => {
      const newImagesArray =
        state.images === undefined ? ["Add button"] : state.images;
      newImagesArray.unshift(action.payload);
      state.images = newImagesArray;
    },
    replaceImage: (state, action) => {
      const indexToChange = state.images.indexOf(action.payload.oldItem);
      const newImagesArray = state.images;

      newImagesArray[indexToChange] = action.payload.newItem;

      state.images = newImagesArray;
    },
    deleteImage: (state, action) => {
      const indexToDelete = state.images.indexOf(action.payload);
      const newImagesArray = state.images;

      newImagesArray.splice(indexToDelete, 1);

      state.images = newImagesArray;
    },
  },
});

export const { addImage, replaceImage, deleteImage } = homeSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const selectImages = (state: sliceType) => state.home.images;

export default homeSlice.reducer;
