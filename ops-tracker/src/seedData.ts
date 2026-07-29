import type { Approval, StandingTodo, Ticket } from './types';
import { newId, nowIso } from './useLocalStorage';

export function seedTickets(): Ticket[] {
  const ts = nowIso();
  return [
    {
      id: newId(),
      key: 'SA-3',
      title: 'Migrate SSO connector to new IdP',
      status: 'blocked',
      blockedOnPerson: 'Sena',
      blockedOnReason: 'Waiting on approval for new SAML config',
      priority: 'high',
      notes: '',
      relatedTickets: [],
      createdAt: ts,
      updatedAt: ts,
    },
  ];
}

export function seedApprovals(): Approval[] {
  const ts = nowIso();
  return [
    {
      id: newId(),
      item: 'New SAML config for SSO migration',
      approver: 'Sena',
      whatsNeeded: 'Sign-off on connector settings before cutover',
      dateRequested: ts.slice(0, 10),
      status: 'pending',
      notes: '',
      createdAt: ts,
      updatedAt: ts,
    },
  ];
}

export function seedTodos(): StandingTodo[] {
  const ts = nowIso();
  return [
    {
      id: newId(),
      text: 'Verify SDO MFA federation',
      notes: '',
      done: false,
      createdAt: ts,
      updatedAt: ts,
    },
  ];
}
