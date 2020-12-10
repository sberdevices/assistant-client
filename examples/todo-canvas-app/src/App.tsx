import React, { FC, memo, useState} from 'react';
import './App.css';

export const App: FC = memo(() => {
    const [notes, setNotes] = useState([{ id: 'uinmh', title: 'купить хлеб', completed: false }]);
    const [note, setNote] = useState('');

    const addNote = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setNotes([...notes, { id: Math.random().toString(36).substring(7), title: note, completed: false }]);
        setNote('');
    };

    const deleteNote = (id: string) => {
        setNotes(notes.filter(n => n.id !== id));
    } 

    const doneNote = (id: string) => {
        setNotes(notes.map((n) => (n.id === id ? { ...n, completed: true } : n)))
    };

    return (
        <main className="container">
            <form
                onSubmit={addNote}
            >
                <input
                    className="add-note"
                    type="text"
                    placeholder="Add Note"
                    value={note}
                    onChange={({ target: { value } }) => setNote(value)}
                    required
                    autoFocus
                />
            </form>
            <ul className="notes">
                {notes.map((note, index) => (
                    <li className="note" key={note.id}>
                        <span>
                            <span style={{ fontWeight: 'bold' }}>{index + 1}. </span>
                            <span
                                style={{
                                    textDecorationLine: note.completed ? 'line-through' : 'none',
                                }}
                            >
                                {note.title}
                            </span>
                        </span>
                        <input
                            className="done-note"
                            type="checkbox"
                            checked={note.completed}
                            onChange={() => doneNote(note.id)}
                            disabled={note.completed}
                        />
                        <div className="remove-note" onClick={() => deleteNote(note.id)}>X</div>
                    </li>
                ))}
            </ul>
        </main>
    );
});
