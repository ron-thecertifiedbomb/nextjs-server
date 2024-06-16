"use client";
import { Provider } from "react-redux";
import { store } from "../lib/store";


export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}