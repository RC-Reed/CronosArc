import { useMemo, useState } from 'react';
import type { Priority, Ticket, TicketStatus } from '../types';
import { newId, nowIso } from '../useLocalStorage';

const STATUSES: TicketStatus[] = ['open', 'in-progress', 'blocked', 'done'];
const PRIORITIES: Priority[] = ['low', 'medium', 'high', 'critical'];

function blankTicket(): Ticket {
  const ts = nowIso();
  return {
    id: newId(),
    key: '',
    title: '',
    status: 'open',
    blockedOnPerson: '',
    blockedOnReason: '',
    priority: 'medium',
    notes: '',
    relatedTickets: [],
    createdAt: ts,
    updatedAt: ts,
  };
}

interface Props {
  tickets: Ticket[];
  setTickets: (updater: (prev: Ticket[]) => Ticket[]) => void;
}

export function TicketsView({ tickets, setTickets }: Props) {
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [groupByPerson, setGroupByPerson] = useState(false);
  const [draft, setDraft] = useState<Ticket | null>(null);

  const update = (id: string, patch: Partial<Ticket>) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch, updatedAt: nowIso() } : t)),
    );
  };

  const remove = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  const addDraft = () => {
    if (!draft) return;
    if (!draft.title.trim()) return;
    setTickets((prev) => [...prev, draft]);
    setDraft(null);
  };

  const filtered = useMemo(
    () => tickets.filter((t) => statusFilter === 'all' || t.status === statusFilter),
    [tickets, statusFilter],
  );

  const groups = useMemo(() => {
    if (!groupByPerson) return null;
    const map = new Map<string, Ticket[]>();
    for (const t of filtered) {
      const person = t.blockedOnPerson.trim() || 'Unblocked / No one';
      const list = map.get(person) ?? [];
      list.push(t);
      map.set(person, list);
    }
    return map;
  }, [filtered, groupByPerson]);

  return (
    <div className="view">
      <div className="view-toolbar">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as TicketStatus | 'all')}
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <label className="toggle">
          <input
            type="checkbox"
            checked={groupByPerson}
            onChange={(e) => setGroupByPerson(e.target.checked)}
          />
          Group by blocked-on
        </label>
        <button className="primary" onClick={() => setDraft(blankTicket())}>
          + New ticket
        </button>
      </div>

      {draft && (
        <TicketCard
          ticket={draft}
          onChange={(patch) => setDraft({ ...draft, ...patch })}
          onDelete={() => setDraft(null)}
          isDraft
          onSave={addDraft}
        />
      )}

      {groups
        ? Array.from(groups.entries()).map(([person, list]) => (
            <div key={person} className="group">
              <h3 className="group-heading">{person}</h3>
              {list.map((t) => (
                <TicketCard
                  key={t.id}
                  ticket={t}
                  onChange={(patch) => update(t.id, patch)}
                  onDelete={() => remove(t.id)}
                />
              ))}
            </div>
          ))
        : filtered.map((t) => (
            <TicketCard
              key={t.id}
              ticket={t}
              onChange={(patch) => update(t.id, patch)}
              onDelete={() => remove(t.id)}
            />
          ))}

      {!draft && filtered.length === 0 && <p className="empty">No tickets match this filter.</p>}
    </div>
  );
}

function TicketCard({
  ticket,
  onChange,
  onDelete,
  isDraft,
  onSave,
}: {
  ticket: Ticket;
  onChange: (patch: Partial<Ticket>) => void;
  onDelete: () => void;
  isDraft?: boolean;
  onSave?: () => void;
}) {
  return (
    <div className={`card priority-${ticket.priority}`}>
      <div className="card-row">
        <input
          className="key-input"
          placeholder="KEY-1"
          value={ticket.key}
          onChange={(e) => onChange({ key: e.target.value })}
        />
        <input
          className="title-input"
          placeholder="Ticket title"
          value={ticket.title}
          onChange={(e) => onChange({ title: e.target.value })}
        />
        <button className="icon-btn" onClick={onDelete} aria-label="Delete">
          ✕
        </button>
      </div>
      <div className="card-row">
        <select
          value={ticket.status}
          onChange={(e) => onChange({ status: e.target.value as TicketStatus })}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={ticket.priority}
          onChange={(e) => onChange({ priority: e.target.value as Priority })}
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      {ticket.status === 'blocked' && (
        <div className="card-row">
          <input
            placeholder="Blocked on (person)"
            value={ticket.blockedOnPerson}
            onChange={(e) => onChange({ blockedOnPerson: e.target.value })}
          />
          <input
            placeholder="Reason"
            value={ticket.blockedOnReason}
            onChange={(e) => onChange({ blockedOnReason: e.target.value })}
          />
        </div>
      )}
      <textarea
        placeholder="Notes"
        value={ticket.notes}
        onChange={(e) => onChange({ notes: e.target.value })}
      />
      <input
        placeholder="Related tickets (comma separated)"
        value={ticket.relatedTickets.join(', ')}
        onChange={(e) =>
          onChange({
            relatedTickets: e.target.value
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean),
          })
        }
      />
      {isDraft && (
        <button className="primary" onClick={onSave}>
          Add ticket
        </button>
      )}
    </div>
  );
}
