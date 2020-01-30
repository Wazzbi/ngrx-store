import { Action } from "@ngrx/store";
import {
  ShoppingActionTypes,
  ShoppingAction
} from "../actions/shopping.actions";
import { ShoppingItem } from "../models/shopping-item.model";

const initialState: Array<ShoppingItem> = [
  {
    id: "123456",
    name: "Flash Disk"
  }
];

export function ShoppingReducer(
  state: Array<ShoppingItem> = initialState,
  action: ShoppingAction
) {
  switch (action.type) {
    case ShoppingActionTypes.ADD_ITEM:
      return [...state, action.payload];

    case ShoppingActionTypes.DELETE_ITEM:
      return state.filter(o => o.name !== action.payload);

    default:
      return state;
  }
}
