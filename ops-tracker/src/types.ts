export type TicketStatus = 'open' | 'in-progress' | 'blocked' | 'done';
export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type ApprovalStatus = 'pending' | 'approved' | 'denied';

export interface Ticket {
  id: string;
  key: string;
  title: string;
  status: TicketStatus;
  blockedOnPerson: string;
  blockedOnReason: string;
  priority: Priority;
  notes: string;
  relatedTickets: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Approval {
  id: string;
  item: string;
  approver: string;
  whatsNeeded: string;
  dateRequested: string;
  status: ApprovalStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface StandingTodo {
  id: string;
  text: string;
  notes: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ActionSide = 'mine' | 'other';
