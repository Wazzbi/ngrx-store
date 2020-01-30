import {
  AddItemAction,
  DeleteItemAction
} from "./store/actions/shopping.actions";
import { ShoppingItem } from "./store/models/shopping-item.model";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AppState } from "./store/models/app-state.model";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "ngrx-store-trial";

  //must match to type of 'StoreModule.forRoot'
  shoppingItems: Observable<Array<ShoppingItem>>;
  newShoppingItem: ShoppingItem = { id: "", name: "" };

  //'AppState' provides strong typing TODO: will it run with 'Array<ShoppingItem>' ???
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.shoppingItems = this.store.select(store => store.shopping);

    //we could have also selected our shopping slice by string, providing it matched the reducer definition
    //this.shoppingItems = this.store.select('shopping');
  }

  addItem() {
    //possibly import 'uuid'
    //this.newShoppingItem.id = uuid();

    this.store.dispatch(new AddItemAction(this.newShoppingItem));

    console.log("item added");

    this.newShoppingItem = { id: "", name: "" };
  }
  /**
   * WHAT'S HAPPENING:
   * 1. The AddItemAction is fired with the payload of newShoppingItem.
   * 2. Our shoppingReducer sees the new action and filters by action.type.
   * 3. As the action.type is [SHOPPING] Add Item the newShoppingItem is added to the end of our array: [...state, action.payload],
   * 4. The shopping slice of state is updated and as we're subscribed to changes with the async pipe our UI updates.
   */

  deleteItem(itemName: string) {
    this.store.dispatch(new DeleteItemAction(itemName));

    console.log(`item ${itemName} deleted`);
  }
}
