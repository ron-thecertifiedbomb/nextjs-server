
import { Provider } from "react-redux";
import Home from "./homePage"
import { store } from "../lib/store";

export default function Entry() {
  return (
    <Provider store={store()}>
    <Home />
    </Provider>
  )
}
