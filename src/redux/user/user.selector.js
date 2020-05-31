import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectUserFridgeStock = createSelector(
  [selectUser], //an array of inputSelectors
  (user) => user.fridgeStock // function that will return the value we want from the selector
);
