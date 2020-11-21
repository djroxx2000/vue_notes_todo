import { ActionContext, ActionTree, CommitOptions } from "vuex";
import { Mutations, MutationTypes } from "./mutations";
import { State, TodoItem, NoteItem } from "./state";
import idbAccess from "./idbAccess";

export enum ActionTypes {
  getTodoItems = "GET_TODOS",
  setTodoItems = "SET_TODO",
  getNoteItems = "GET_NOTES",
  setNoteItems = "SET_NOTES",
  completeTodoItem = "COMPLETE_TODO_ITEM",
  removeTodoItem = "REMOVE_TODO"
}

// Augment action context for checking mutation types and params while committing
type ActionAugment = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionTypes.getTodoItems](context: ActionAugment): void;
  [ActionTypes.setTodoItems](context: ActionAugment): void;
  [ActionTypes.getNoteItems](context: ActionAugment): void;
  [ActionTypes.setNoteItems](context: ActionAugment): void;
  [ActionTypes.removeTodoItem](context: ActionAugment, todoId: number): void;
  [ActionTypes.completeTodoItem](
    context: ActionAugment,
    todo: Record<string, any>
  ): void;
};

// Action tree takes state and root state. Both refer to the same here.

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.getTodoItems]({ state, commit }) {
    commit(MutationTypes.setLoading, true);

    const db = await idbAccess();
    if (db) {
      // type check db result to be a todoitem array
      const todoData = (await db.getAll("todos")) as TodoItem[];
      if (todoData !== undefined) {
        state.todos = todoData;
      }
    } else {
      console.log("Unable to form connection to IDB");
    }

    commit(MutationTypes.setLoading, false);
  },
  async [ActionTypes.setTodoItems]({ state }) {
    const db = await idbAccess();
    if (db) {
      const newTodo = { id: 0, text: "", completed: false, end: "" };

      // Need to create new js object since idb doesnt support vuex proxy objects
      for (const todo of state.todos) {
        newTodo.id = todo.id;
        newTodo.text = todo.text;
        newTodo.completed = todo.completed;
        newTodo.end = todo.end;
        db.put("todos", newTodo);
      }
    } else {
      console.log("Unable to make connection with IDB");
    }
  },
  async [ActionTypes.completeTodoItem]({ commit }, todo) {
    commit(MutationTypes.completeTodo, todo.id);
    const newTodo = {
      id: todo.id,
      text: todo.text,
      completed: todo.completed,
      end: todo.end
    };
    const db = await idbAccess();
    if (db) {
      await db.put("todos", newTodo);
    }
  },
  async [ActionTypes.getNoteItems]({ state, commit }) {
    commit(MutationTypes.setLoading, true);

    const db = await idbAccess();
    if (db) {
      const noteData = (await db.getAll("notes")) as NoteItem[];
      if (noteData !== undefined) {
        state.notes = noteData;
      }
    } else {
      console.log("Unable to form connection to IDB");
    }

    commit(MutationTypes.setLoading, false);
  },
  async [ActionTypes.setNoteItems]({ state }) {
    const db = await idbAccess();
    if (db) {
      const newNote = { id: 0, text: "", title: "", iat: "" };
      for (const note of state.notes) {
        newNote.id = note.id;
        newNote.text = note.text;
        newNote.title = note.title;
        newNote.iat = note.iat;
        db.put("notes", newNote);
      }
    } else {
      console.log("Unable to make connection with IDB");
    }
  },
  async [ActionTypes.removeTodoItem]({ state }, todoId) {
    const db = await idbAccess();
    if (db) {
      db.delete("todos", todoId);
      console.log(state.todos[0].id);
      console.log(todoId);
      state.todos = state.todos.filter(todo => todo.id !== todoId);
    }
  }
};
