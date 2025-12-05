# 2025-12 — HP Spectre x360 Pre-Repair Log  
**Engineering Log — Baseline Assessment & Upgrade Plan**

This log documents the current state of my HP Spectre x360 and the plan to repair and upgrade it so it can become my **Mobile Linux Command Center** (Pop!_OS laptop for homelab access, scripting, and learning).

No work has been done yet — this is the baseline before I open the device.

---

# 🔧 Summary  

I have an older HP Spectre x360 Convertible 13-ac0XX that:

- still boots and runs Windows 10 Home  
- has a weak battery that drains extremely fast  
- has only 8 GB RAM and an older SSD  
- runs hot enough that a thermal refresh makes sense  

The goal is to refresh the hardware so this machine can:

- run Pop!_OS reliably  
- stay on battery long enough for real mobile use  
- act as a portable terminal into my homelab and future Proxmox environment  

This entry captures the **“before”** condition and the planned upgrades.

---

# 💻 Current System Specs (From System Info & Photos)

**Model:** HP Spectre x360 Convertible 13-ac0XX  
**Form factor:** 13" convertible / touchscreen  

### OS / Firmware (current)
- OS: Windows 10 Home, Version 10.0.18362  
- System type: 64-bit OS, x64-based processor  

### CPU / RAM
- CPU: Intel Core i7-7500U @ 2.70 GHz  
- Installed RAM: 8.0 GB  

### Other
- Pen and touch support (10 points)  
- Hyper-V support flags present  

---

# ⚠️ Observed Issues / Pain Points  

Right now, the main issues with the Spectre are:

- **Battery health is poor**  
  - Drains extremely quickly  
  - Unreliable for mobile work  

- **Thermals are likely degraded**  
  - Factory paste is years old  
  - Good candidate for refresh  

- **Storage is limited**  
  - Not enough space for Linux workflow  

- **OS is still Windows 10**  
  - Will be replaced with Pop!_OS  

---

# 🎯 Role in CronosArc  

The Spectre is being positioned as my:

- **Mobile Linux Command Center**  
- portable SSH workstation  
- scripting + engineering laptop  
- on-the-go homelab access point  
- future AIDEN/Cronos integration client  

This log is the first step before hardware work begins.

---

# 🧩 Planned Upgrades & Parts (Confirmed Orders)

All replacement and upgrade components have been ordered. These parts were selected to extend the life of the HP Spectre, improve thermal performance, and prepare it for Pop!_OS as my Mobile Linux Command Center.

### ✅ 1. Battery Replacement  
**Model:** SH03XL Laptop Battery  
Compatible with HP Spectre x360 13-ac0xx series.

This will fix the rapid drain issue.

**📸 Placeholder — Battery Product Photo**  
```markdown
![SH03XL battery](../images/spectre-battery.jpg)
```

---

### ✅ 2. SSD Upgrade — 1 TB NVMe

**Model:** PNY CS2230 M.2 2280  
**Type:** PCIe 3.0 x4 NVMe SSD  
**Size:** 1 TB  

Enough space for Pop!_OS, tools, scripts, lightweight VMs, and projects.

**📸 Placeholder — PNY SSD Photo**  
```markdown
![PNY CS2230 SSD](../images/spectre-ssd.jpg)
```

---

### ✅ 3. Thermal Paste — Arctic MX-6 Ultimate  

Improves CPU/GPU thermal contact and stability.

**📸 Placeholder — MX-6 Photo**  
```markdown
![Arctic MX-6 thermal paste](../images/spectre-mx6.jpg)
```

---

### ✅ 4. Thermal Pad — Thermal Grizzly Minus Pad 8  

Improves VRM / component cooling.

**📸 Placeholder — Thermal Pad Photo**  
```markdown
![Thermal Grizzly Minus Pad 8](../images/spectre-thermal-pad.jpg)
```

---

# 🛠 Summary of Upgrade Goals

These upgrades will:

- restore battery runtime  
- improve thermals  
- provide modern SSD performance  
- prepare hardware for Pop!_OS  
- extend lifespan of the device  

When parts arrive (Dec 10–15), I will begin teardown and document a second log:

`2025-12-hp-spectre-post-repair-and-popos-install.md`

---

# 🛠️ Planned Work Sequence  

1. Backup existing SSD  
2. Open chassis  
3. Replace battery  
4. Upgrade SSD  
5. Apply thermal paste + thermal pads  
6. Reassemble  
7. Validate power, temps, SSD, and battery  
8. Install Pop!_OS  

All steps will receive photos and documentation during the repair.

---

# 📸 Photos To Add Later  

**1. Current Exterior Condition**  
```markdown
![HP Spectre closed on desk](../images/hp-spectre-closed-before.jpg)
```

