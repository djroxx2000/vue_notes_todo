/* eslint-disable */

import { MutationTree } from "vuex";
import { NoteItem, State, TodoItem } from "./state";

// Using string enum as variables for better typescript support for key extraction
export enum MutationTypes {
  createTodo = "CREATE_TODO",
  completeTodo = "COMPLETE_TODO",
  createNote = "CREATE_NOTE",
  setLoading = "SET_LOADING"
}

// Every declared function here must be defined else error
export type Mutations = {
  [MutationTypes.createTodo](state: State, item: TodoItem): void;
  [MutationTypes.completeTodo](state: State, item: number): void;
  [MutationTypes.setLoading](state: State, is_loading: boolean): void;
  [MutationTypes.createNote](state: State, item: NoteItem): void;
};

// Mutations only accept 2 arguments the state and payload. Mutation Tree enforces it.

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.createTodo](state, item) {
    state.todos.unshift(item);
  },
  [MutationTypes.completeTodo](state, item_id) {
    const item = state.todos.findIndex(item => item.id === item_id);
    if (item === -1) {
      return;
    }
    state.todos[item].completed = !state.todos[item].completed;
  },
  [MutationTypes.createNote](state, item) {
    state.notes.unshift(item);
  },
  [MutationTypes.setLoading](state, is_loading) {
    state.loading = is_loading;
  }
};
