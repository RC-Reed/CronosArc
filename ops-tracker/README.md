# Ops Tracker

A personal ops tracker for IT infrastructure work: tickets, pending approvals,
and standing todos, with a dashboard split by what needs your action vs. what's
waiting on someone else.

## Entities

- **Tickets** — key (e.g. `SA-3`), title, status (open/in-progress/blocked/done),
  blocked-on person + reason, priority, notes, related tickets.
- **Approvals pending** — item, approver, what's needed, date requested, status.
- **Standing todos** — not-yet-ticketed items with optional notes.

## Views

- **Dashboard** — combines all three entities into "Needs My Action" and
  "Waiting on Someone Else" columns. A ticket counts as waiting on someone
  else when it's `blocked` and has a blocked-on person; a pending approval
  always counts as waiting on its approver; open todos always need your
  action.
- **Tickets** — filter by status, optionally group by blocked-on person.
- **Approvals** — flat list, editable inline.
- **Todos** — checklist with notes per item.

## Data storage

Everything is stored in the browser's `localStorage` (no backend, no auth).
Data lives per-browser/per-device — deploying to one URL and opening it on
both your phone and your laptop does **not** sync data between them, since
`localStorage` never leaves the device it was written on.

To move data between devices, use the **Export data** / **Import data**
links in the header: export downloads a JSON snapshot of everything
(tickets, approvals, todos), and import replaces the current device's data
with a chosen snapshot after a confirmation prompt.

## Development

```sh
npm install
npm run dev
```

## Build / deploy

```sh
npm run build
```

Outputs a static site to `dist/`. Deploy `dist/` to any static host (GitHub
Pages, Netlify, Vercel, Cloudflare Pages, or a folder served by nginx/Caddy
on your homelab).
