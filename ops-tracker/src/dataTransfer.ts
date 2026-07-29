import type { Approval, StandingTodo, Ticket } from './types';

interface ExportPayload {
  version: 1;
  exportedAt: string;
  tickets: Ticket[];
  approvals: Approval[];
  todos: StandingTodo[];
}

export function buildExport(
  tickets: Ticket[],
  approvals: Approval[],
  todos: StandingTodo[],
): ExportPayload {
  return { version: 1, exportedAt: new Date().toISOString(), tickets, approvals, todos };
}

export function downloadExport(payload: ExportPayload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ops-tracker-export-${payload.exportedAt.slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function parseImport(text: string): ExportPayload {
  const data = JSON.parse(text);
  if (!Array.isArray(data.tickets) || !Array.isArray(data.approvals) || !Array.isArray(data.todos)) {
    throw new Error('File is missing tickets, approvals, or todos arrays.');
  }
  return data as ExportPayload;
}
