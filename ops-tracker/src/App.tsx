import { useState } from 'react';
import { ApprovalsView } from './components/ApprovalsView';
import { DashboardView } from './components/DashboardView';
import { TicketsView } from './components/TicketsView';
import { TodosView } from './components/TodosView';
import { seedApprovals, seedTickets, seedTodos } from './seedData';
import type { Approval, StandingTodo, Ticket } from './types';
import { useLocalStorage } from './useLocalStorage';

type Tab = 'dashboard' | 'tickets' | 'approvals' | 'todos';

const TABS: { id: Tab; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'tickets', label: 'Tickets' },
  { id: 'approvals', label: 'Approvals' },
  { id: 'todos', label: 'Todos' },
];

function App() {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [tickets, setTickets] = useLocalStorage<Ticket[]>('ops-tracker/tickets', seedTickets());
  const [approvals, setApprovals] = useLocalStorage<Approval[]>(
    'ops-tracker/approvals',
    seedApprovals(),
  );
  const [todos, setTodos] = useLocalStorage<StandingTodo[]>('ops-tracker/todos', seedTodos());

  return (
    <div className="app">
      <header className="app-header">
        <h1>Ops Tracker</h1>
        <nav className="tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="app-main">
        {tab === 'dashboard' && (
          <DashboardView tickets={tickets} approvals={approvals} todos={todos} />
        )}
        {tab === 'tickets' && <TicketsView tickets={tickets} setTickets={setTickets} />}
        {tab === 'approvals' && <ApprovalsView approvals={approvals} setApprovals={setApprovals} />}
        {tab === 'todos' && <TodosView todos={todos} setTodos={setTodos} />}
      </main>
    </div>
  );
}

export default App;
