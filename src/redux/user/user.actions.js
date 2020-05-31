import { UserActionTypes } from "./user.types";

//this file is fore defining the "actions" the application can use to manipulate state.
//ALL ACTIONS FOR A SPECIFIC SUBREDUCER MUST BE INCLUDED HERE.

export const addToFridgeStock = (item) => ({
  type: UserActionTypes.ADD_TO_FRIDGESTOCK,
  payload: item,
});
export const removeFromFridgeStock = (item) => ({
  type: UserActionTypes.REMOVE_FROM_FRIDGESTOCK,
  payload: item,
});
