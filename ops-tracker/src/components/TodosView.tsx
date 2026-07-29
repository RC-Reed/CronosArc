import { useState } from 'react';
import type { StandingTodo } from '../types';
import { newId, nowIso } from '../useLocalStorage';

interface Props {
  todos: StandingTodo[];
  setTodos: (updater: (prev: StandingTodo[]) => StandingTodo[]) => void;
}

export function TodosView({ todos, setTodos }: Props) {
  const [text, setText] = useState('');

  const add = () => {
    if (!text.trim()) return;
    const ts = nowIso();
    setTodos((prev) => [
      ...prev,
      { id: newId(), text: text.trim(), notes: '', done: false, createdAt: ts, updatedAt: ts },
    ]);
    setText('');
  };

  const toggle = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done, updatedAt: nowIso() } : t)),
    );
  };

  const updateNotes = (id: string, notes: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, notes, updatedAt: nowIso() } : t)));
  };

  const remove = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const open = todos.filter((t) => !t.done);
  const done = todos.filter((t) => t.done);

  return (
    <div className="view">
      <div className="view-toolbar">
        <input
          className="title-input"
          placeholder="Not-yet-ticketed item (e.g. verify SDO MFA federation)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
        />
        <button className="primary" onClick={add}>
          + Add
        </button>
      </div>

      {open.map((t) => (
        <TodoRow key={t.id} todo={t} onToggle={() => toggle(t.id)} onNotes={(n) => updateNotes(t.id, n)} onDelete={() => remove(t.id)} />
      ))}

      {done.length > 0 && (
        <div className="group">
          <h3 className="group-heading">Done</h3>
          {done.map((t) => (
            <TodoRow key={t.id} todo={t} onToggle={() => toggle(t.id)} onNotes={(n) => updateNotes(t.id, n)} onDelete={() => remove(t.id)} />
          ))}
        </div>
      )}

      {todos.length === 0 && <p className="empty">No standing todos yet.</p>}
    </div>
  );
}

function TodoRow({
  todo,
  onToggle,
  onNotes,
  onDelete,
}: {
  todo: StandingTodo;
  onToggle: () => void;
  onNotes: (notes: string) => void;
  onDelete: () => void;
}) {
  return (
    <div className={`card todo-row ${todo.done ? 'done' : ''}`}>
      <div className="card-row">
        <input type="checkbox" checked={todo.done} onChange={onToggle} />
        <span className="todo-text">{todo.text}</span>
        <button className="icon-btn" onClick={onDelete} aria-label="Delete">
          ✕
        </button>
      </div>
      <input
        className="todo-notes"
        placeholder="Notes"
        value={todo.notes}
        onChange={(e) => onNotes(e.target.value)}
      />
    </div>
  );
}
