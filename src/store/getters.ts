import { GetterTree } from "vuex";
import { State } from "./state";

// Vuex4 makes me not wanna use getters
// Still template is ready just in case

export type Getters = {
  completedCount(state: State): number;
  totalCount(state: State): number;
};

export const getters: GetterTree<State, State> & Getters = {
  completedCount(state) {
    return state.todos.filter(item => (item.completed = true)).length;
  },
  totalCount(state) {
    return state.todos.length;
  }
};
