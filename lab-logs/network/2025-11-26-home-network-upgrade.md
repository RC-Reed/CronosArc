# 📄 **2025-11-26 — Home Network Upgrade: Ethernet Run + ASUS Router Setup**

**Engineering Log — Physical Network Installation & LAN Optimization**

This log documents the first major physical networking upgrade I completed for my home setup and the early foundation of the CronosArc environment. This work involved drilling through the floor, routing Ethernet between levels, configuring my ASUS router, and improving the wired infrastructure for my workstation and future homelab.

---

# 🔧 Summary

To improve network reliability and prepare for future projects like Proxmox and AIDEN/Cronos systems, I ran a dedicated Ethernet cable from the downstairs AT&T gateway up into my room. I routed it cleanly under the carpet, installed my ASUS router, enabled passthrough mode, and hardwired my gaming PC and Xbox.

This upgrade establishes the **physical transport layer** for CronosArc.

---

# 📍 Work Performed (Technical Breakdown)

## 1. Drilling the Floor Penetration

To get a clean vertical path from the downstairs AT&T gateway to my upstairs room, I drilled a hole through the floor.

* Chose a safe area away from electrical and plumbing
* Drilled straight down through the subfloor
* Verified breakthrough location
* Smoothed the edges so the Ethernet jacket wouldn’t get damaged

**📸 Photo Placeholder — Drilling Through Floor**

```markdown
![Drilling through the floor](../images/drill-floor.jpg)
```

---

## 2. Running and Routing the Ethernet Cable

After creating the penetration, I fed the Ethernet cable through the opening and pulled it up into my room.

* Guided the cable through the drilled hole
* Pulled it upward into the room
* Ran the cable under the carpet for a clean look
* Ensured no sharp bends or pinch points
* Confirmed physical integrity of the cable

**📸 Photo Placeholder — Cable Routing Under Carpet**

```markdown
![Routing Ethernet under carpet](../images/cable-under-carpet.jpg)
```

**📸 Photo Placeholder — Cable Coming Up Into Room**

```markdown
![Ethernet cable emerging into room](../images/cable-emerge-room.jpg)
```

---

## 3. ASUS Router Installation (Temporary Desk Placement)

With the Ethernet uplink established, I connected the cable to my ASUS router.

* Plugged cable into ASUS WAN port
* Powered on router and completed initial setup
* Configured SSID + verified DHCP
* Confirmed normal firewall and NAT operation

At this stage the router sits temporarily on my desk until I build the micro–data center.

**📸 Photo Placeholder — ASUS Router On Desk (Temporary Setup)**

```markdown
![ASUS router temporary desk placement](../images/asus-router-desk.jpg)
```

---

## 4. Enabling AT&T Passthrough Mode

To avoid double NAT and give the ASUS router full control:

* Logged into AT&T gateway admin UI
* Enabled **IP Passthrough Mode**
* Assigned ASUS router as the passthrough device
* Disabled AT&T Wi-Fi radios
* Rebooted both devices to finalize configuration

This ensures:

* Open NAT
* Cleaner routing
* Better gaming performance
* Correct environment for future homelab subnets

---

## 5. Commissioning Wired Devices

Once the network was fully configured, I hardwired the primary devices:

* Gaming PC (Ethernet)
* Xbox Series S (Ethernet)

Then ran verification:

* NAT Type = **Open**
* Latency improvements verified
* Stability confirmed under load

**📸 Photo Placeholder — Finished Router & Wired Device Setup**

```markdown
![Finished router and wired device setup](../images/router-final-setup.jpg)
```

---

# 📝 Notes

This upgrade marks the first physical engineering step of CronosArc.
With this wired backbone in place, I now have:

* Consistent low-latency connections
* A stable route for my future Proxmox host
* Reliable SSH access for development
* A clean foundation for future VLANs and segmentation
* A network topology that supports AIDEN and Cronos later

This is the beginning of the infrastructure that future layers will sit on.
