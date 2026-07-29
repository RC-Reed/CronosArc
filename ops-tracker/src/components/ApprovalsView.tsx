import { useState } from 'react';
import type { Approval, ApprovalStatus } from '../types';
import { newId, nowIso } from '../useLocalStorage';

const STATUSES: ApprovalStatus[] = ['pending', 'approved', 'denied'];

function blankApproval(): Approval {
  const ts = nowIso();
  return {
    id: newId(),
    item: '',
    approver: '',
    whatsNeeded: '',
    dateRequested: ts.slice(0, 10),
    status: 'pending',
    notes: '',
    createdAt: ts,
    updatedAt: ts,
  };
}

interface Props {
  approvals: Approval[];
  setApprovals: (updater: (prev: Approval[]) => Approval[]) => void;
}

export function ApprovalsView({ approvals, setApprovals }: Props) {
  const [draft, setDraft] = useState<Approval | null>(null);

  const update = (id: string, patch: Partial<Approval>) => {
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...patch, updatedAt: nowIso() } : a)),
    );
  };

  const remove = (id: string) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
  };

  const addDraft = () => {
    if (!draft || !draft.item.trim()) return;
    setApprovals((prev) => [...prev, draft]);
    setDraft(null);
  };

  return (
    <div className="view">
      <div className="view-toolbar">
        <button className="primary" onClick={() => setDraft(blankApproval())}>
          + New approval
        </button>
      </div>

      {draft && (
        <ApprovalCard
          approval={draft}
          onChange={(patch) => setDraft({ ...draft, ...patch })}
          onDelete={() => setDraft(null)}
          isDraft
          onSave={addDraft}
        />
      )}

      {approvals.map((a) => (
        <ApprovalCard
          key={a.id}
          approval={a}
          onChange={(patch) => update(a.id, patch)}
          onDelete={() => remove(a.id)}
        />
      ))}

      {!draft && approvals.length === 0 && <p className="empty">No approvals tracked yet.</p>}
    </div>
  );
}

function ApprovalCard({
  approval,
  onChange,
  onDelete,
  isDraft,
  onSave,
}: {
  approval: Approval;
  onChange: (patch: Partial<Approval>) => void;
  onDelete: () => void;
  isDraft?: boolean;
  onSave?: () => void;
}) {
  return (
    <div className={`card status-${approval.status}`}>
      <div className="card-row">
        <input
          className="title-input"
          placeholder="What's the item?"
          value={approval.item}
          onChange={(e) => onChange({ item: e.target.value })}
        />
        <button className="icon-btn" onClick={onDelete} aria-label="Delete">
          ✕
        </button>
      </div>
      <div className="card-row">
        <input
          placeholder="Approver (e.g. Sena, David)"
          value={approval.approver}
          onChange={(e) => onChange({ approver: e.target.value })}
        />
        <input
          type="date"
          value={approval.dateRequested}
          onChange={(e) => onChange({ dateRequested: e.target.value })}
        />
        <select
          value={approval.status}
          onChange={(e) => onChange({ status: e.target.value as ApprovalStatus })}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <input
        placeholder="What's needed from them"
        value={approval.whatsNeeded}
        onChange={(e) => onChange({ whatsNeeded: e.target.value })}
      />
      <textarea
        placeholder="Notes"
        value={approval.notes}
        onChange={(e) => onChange({ notes: e.target.value })}
      />
      {isDraft && (
        <button className="primary" onClick={onSave}>
          Add approval
        </button>
      )}
    </div>
  );
}
