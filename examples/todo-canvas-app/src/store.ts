type Note = {
    id: string;
    title: string;
    completed: boolean;
};

type State = {
    notes: Array<Note>;
};

type Action =
    | {
          type: 'init';
          notes: Array<Note>;
      }
    | {
          type: 'add_note';
          note: string;
      }
    | {
          type: 'done_note';
          id: string;
      }
    | {
          type: 'delete_note';
          id: string;
      };

export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'init':
            return {
                ...state,
                notes: [...action.notes],
            };

        case 'add_note':
            return {
                ...state,
                notes: [
                    ...state.notes,
                    {
                        id: Math.random().toString(36).substring(7),
                        title: action.note,
                        completed: false,
                    },
                ],
            };

        case 'done_note':
            return {
                ...state,
                notes: state.notes.map((note) => (note.id === action.id ? { ...note, completed: true } : note)),
            };

        case 'delete_note':
            return {
                ...state,
                notes: state.notes.filter(({ id }) => id !== action.id),
            };

        default:
            throw new Error();
    }
};
