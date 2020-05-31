import { UserActionTypes } from "./user.types";
import { removeFromFridgeStock, addToFridgeStock } from "./user.utils";

//where the actual heavy lifting gets done

//when recieving a new action, redux will perform the task based on what type needs to be completed.

const INITIAL_STATE = {
  fridgeStock: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.ADD_TO_FRIDGESTOCK:
      return {
        ...state,
        fridgeStock: addToFridgeStock(state.fridgeStock, action.payload),
      };
    case UserActionTypes.REMOVE_FROM_FRIDGESTOCK:
      return {
        ...state,
        fridgeStock: removeFromFridgeStock(state.fridgeStock, action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;
