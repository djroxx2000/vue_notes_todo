export type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
  end: string;
};

export type NoteItem = {
  id: number;
  text: string;
  title: string;
  iat: string;
};

// State final structure
export type State = {
  loading: boolean;
  todos: Array<TodoItem>;
  notes: Array<NoteItem>;
};

export const state: State = {
  loading: false,
  todos: [],
  notes: []
};
