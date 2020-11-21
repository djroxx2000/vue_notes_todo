// vuex v4 store

import {
  createStore,
  createLogger,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions
} from "vuex";

// Importing defined structure types
import { State, state } from "./state";
import { Mutations, mutations } from "./mutations";
import { Actions, actions } from "./actions";
import { Getters, getters } from "./getters";

// Store structure. create logger for tracking store operations
export const store = createStore<State>({
  plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
  state,
  getters,
  actions,
  mutations
});

// Exporting store type for better type inference with functional definitions
export type Store = Omit<
  VuexStore<State>,
  "getters" | "commits" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    option?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

// outputs type inference ready Store object
export function useStore() {
  return store as Store;
}
