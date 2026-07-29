import { useMemo } from 'react';
import type { Approval, StandingTodo, Ticket } from '../types';

interface ActionItem {
  id: string;
  label: string;
  detail: string;
  type: 'Ticket' | 'Approval' | 'Todo';
}

interface Props {
  tickets: Ticket[];
  approvals: Approval[];
  todos: StandingTodo[];
}

export function DashboardView({ tickets, approvals, todos }: Props) {
  const { mine, other } = useMemo(() => {
    const mine: ActionItem[] = [];
    const other: ActionItem[] = [];

    for (const t of tickets) {
      if (t.status === 'done') continue;
      const item: ActionItem = {
        id: t.id,
        label: `${t.key || '(no key)'} — ${t.title || '(untitled)'}`,
        detail: t.status === 'blocked' ? t.blockedOnReason : `Status: ${t.status}`,
        type: 'Ticket',
      };
      if (t.status === 'blocked' && t.blockedOnPerson.trim()) {
        other.push({ ...item, detail: `Waiting on ${t.blockedOnPerson}: ${t.blockedOnReason || 'no reason noted'}` });
      } else {
        mine.push(item);
      }
    }

    for (const a of approvals) {
      if (a.status !== 'pending') continue;
      other.push({
        id: a.id,
        label: a.item || '(untitled approval)',
        detail: `Waiting on ${a.approver || 'someone'}: ${a.whatsNeeded || 'approval'}`,
        type: 'Approval',
      });
    }

    for (const td of todos) {
      if (td.done) continue;
      mine.push({
        id: td.id,
        label: td.text,
        detail: td.notes || 'Not yet ticketed',
        type: 'Todo',
      });
    }

    return { mine, other };
  }, [tickets, approvals, todos]);

  return (
    <div className="view dashboard">
      <div className="dashboard-col">
        <h2>Needs My Action ({mine.length})</h2>
        {mine.length === 0 && <p className="empty">Nothing on your plate. Nice.</p>}
        {mine.map((item) => (
          <ActionRow key={`${item.type}-${item.id}`} item={item} />
        ))}
      </div>
      <div className="dashboard-col">
        <h2>Waiting on Someone Else ({other.length})</h2>
        {other.length === 0 && <p className="empty">Nothing pending on others.</p>}
        {other.map((item) => (
          <ActionRow key={`${item.type}-${item.id}`} item={item} />
        ))}
      </div>
    </div>
  );
}

function ActionRow({ item }: { item: ActionItem }) {
  return (
    <div className="card action-row">
      <div className="card-row">
        <span className={`badge type-${item.type.toLowerCase()}`}>{item.type}</span>
        <span className="action-label">{item.label}</span>
      </div>
      {item.detail && <p className="action-detail">{item.detail}</p>}
    </div>
  );
}
