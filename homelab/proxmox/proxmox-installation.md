# 🖥️ Proxmox VE Installation & Base Configuration  
**System:** Old Gaming PC (Proxmox Node)  
**Author:** Robert Reed  
**Date:** 2025-12-04  
**Status:** Completed (Base Install)

This document records the steps performed during the Proxmox installation and first-time configuration on my homelab node.  
It includes networking, package repository changes, storage verification, and connectivity tests.

---

# 1. 🔧 Hardware Overview

| Component | Details |
|----------|---------|
| CPU      | AMD FX-4350 Quad-Core |
| RAM      | ~8 GB |
| Storage (SDA) | 465GB Toshiba HDD |
| Storage (SDB) | 447GB PNY SSD (Proxmox Installed Here) |
| USB      | 64GB USB (installer) |

---

# 2. 📥 Downloading the ISO (Workstation – Windows 11)

1. Download Proxmox VE ISO from the official site.  
2. Use **Rufus** on Windows to flash the ISO to a USB drive.  
3. Boot the old gaming PC from USB and choose **Install Proxmox VE**.

---

# 3. 🌐 Network Configuration (During Installer)

**Final Network Settings Used:**

| Setting | Value (redacted) |
|--------|-------------------|
| Interface        | `nic0 (realtek r8169)` |
| Hostname (FQDN)  | `pve.cronosarc.local` |
| Static IP        | `<PVE-IP>/24` |
| Gateway          | `<ROUTER-IP>` |
| DNS              | `<ROUTER-IP>` |

I confirmed the address I wanted to use was free by checking connected devices in the ASUS Router app.

---

# 4. 🔑 Logging into Proxmox (Console)

After installation and reboot, the console showed the URL for the web interface:

    https://<PVE-IP>:8006/

Console login (direct monitor/keyboard):

- Username: `root`  
- Password: (set during install)

Once logged in, the shell prompt confirmed the node:

    root@pve:~#

---

# 5. 🛠️ Configure No-Subscription Repository

Proxmox defaults to a **subscription (enterprise) repo**, which requires a paid license.  
I switched it to the **no-subscription** repository.

## 5.1 Backup Existing Repo Files

    cp /etc/apt/sources.list.d/pve-enterprise.sources \
       /etc/apt/sources.list.d/pve-enterprise.sources.bak

Disable enterprise repo:

    echo "Enabled: no" >> /etc/apt/sources.list.d/pve-enterprise.sources

## 5.2 Add No-Subscription Repository

    cat << 'EOF' > /etc/apt/sources.list.d/pve-no-subscription.sources
    Types: deb
    URIs: http://download.proxmox.com/debian/pve
    Suites: bookworm
    Components: pve-no-subscription
    Signed-By: /usr/share/keyrings/proxmox-release-bookworm.gpg
    EOF

## 5.3 Update Packages

    apt update
    apt full-upgrade -y

After DNS hiccups were resolved, `apt update` finished cleanly and reported all packages up to date.

---

# 6. 🌐 Network & DNS Verification

Test connectivity with an external IP:

    ping -c 4 1.1.1.1

Result: 0% packet loss.

Test DNS resolution:

    ping -c 4 download.proxmox.com

Result: 0% packet loss and normal latency.  
`apt update` then completed without errors.

---

# 7. 💾 Storage Layout Verification

Check disk and LVM layout:

    lsblk -o NAME,SIZE,TYPE,MOUNTPOINT

Relevant output (simplified):

- `sda` – 465.8G HDD (unused so far)  
- `sdb` – 447.1G SSD with:
  - `pve-root` (≈96G) → `/`
  - `pve-swap` (8G) → swap
  - `pve-data` (≈320G) → VM / container storage (thin pool)

Filesystem usage:

    df -h

Storage configuration in Proxmox:

    pvesm status

Result (simplified):

- `local` – dir, active, ~89G free (ISO/templates/backups)  
- `local-lvm` – lvmthin, active, ~335G free (VM disks)

System is ready for ISOs and VMs.

---

# 8. 🌐 Accessing the Web UI

From my Windows 11 workstation browser:

    https://<PVE-IP>:8006/

Login: `root@pam` with the Proxmox root password.  
The Proxmox dashboard showed node health, CPU/RAM usage, and storage pools.

---

# 9. 📥 Uploading ISOs to Proxmox

In the Proxmox web UI:

1. Go to: `Datacenter → pve → local (pve)`  
2. Select **ISO Images**  
3. Click **Upload** and select the ISO file from the workstation

If the UI prompts for a **Hash Algorithm**, choose:

- `SHA256`

If the upload complains about temporary storage:

> Uploads are stored temporarily in `/var/tmp/`

Check free space:

    df -h /var/tmp

---

# 10. 📦 Recommended ISO Library (Next Steps)

ISOs to download and store in Proxmox for future labs:

| OS / Tool            | Purpose                          | Notes           |
|----------------------|----------------------------------|-----------------|
| **Kali Linux**       | Security tools / pentesting     | Use installer ISO |
| **Alpine Linux**     | Lightweight Linux VMs           | Standard ISO |
| **pfSense**          | Firewall / router VM            | AMD64 ISO installer |
| **TrueNAS SCALE**    | NAS / storage server            | ISO installer |
| **Ubuntu Server**    | General-purpose Linux server    | LTS ISO |
| **Rocky Linux**      | RHEL-like server environment    | Minimal ISO |
| **Windows Server 2022 Eval** | AD / domain lab       | Eval ISO from Microsoft |
| **Windows 10/11**    | Client OS for lab endpoints     | Standard ISO |

Details for each will go into:

- `docs/homelab/proxmox/iso-library.md`
- `docs/homelab/proxmox/vm-templates.md`

---

# 11. ✅ Current Status

| Task                        | Status |
|-----------------------------|--------|
| Proxmox installed           | ✔ Done |
| Static IP + hostname set    | ✔ Done |
| DNS and internet verified   | ✔ Done |
| Enterprise repo disabled    | ✔ Done |
| No-subscription repo added  | ✔ Done |
| Storage (local + local-lvm) | ✔ Verified |
| Web UI reachable            | ✔ Done |

---

# 12. 🚀 Next Steps

1. Build an ISO library and upload to `local` storage.  
2. Create base VM templates (Ubuntu, Rocky, Windows, etc.).  
3. Deploy **pfSense** and design homelab network.  
4. Deploy **TrueNAS** as storage backend.  
5. Create Windows Server AD lab.  
6. Begin integrating with AIDEN and Cronos for automation and monitoring.

---

# 📚 Changelog

| Date       | Change                                      |
|------------|---------------------------------------------|
| 2025-12-04 | Initial Proxmox installation completed      |
| 2025-12-04 | Repositories switched to no-subscription    |
| 2025-12-05 | Documentation written and added to repo     |
