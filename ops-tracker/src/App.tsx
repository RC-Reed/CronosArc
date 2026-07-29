import { useRef, useState } from 'react';
import { ApprovalsView } from './components/ApprovalsView';
import { DashboardView } from './components/DashboardView';
import { TicketsView } from './components/TicketsView';
import { TodosView } from './components/TodosView';
import { buildExport, downloadExport, parseImport } from './dataTransfer';
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    downloadExport(buildExport(tickets, approvals, todos));
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const text = await file.text();
      const data = parseImport(text);
      const confirmed = window.confirm(
        `Import ${data.tickets.length} ticket(s), ${data.approvals.length} approval(s), and ${data.todos.length} todo(s)? This replaces everything currently on this device.`,
      );
      if (!confirmed) return;
      setTickets(() => data.tickets);
      setApprovals(() => data.approvals);
      setTodos(() => data.todos);
    } catch (err) {
      window.alert(`Could not import file: ${(err as Error).message}`);
    }
  };

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
        <div className="data-toolbar">
          <button className="link-btn" onClick={handleExport}>
            Export data
          </button>
          <button className="link-btn" onClick={handleImportClick}>
            Import data
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            hidden
            onChange={handleImportFile}
          />
        </div>
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
