# Devices and network

<!-- SETUP: fill only if the user has more than one machine or wants printing/LAN help. Otherwise delete this file and its row in AGENTS.md. -->

Checked: {{date}}

| Device | Role | Tailscale name | Reach it |
|---|---|---|---|
| {{machine}} | {{main / server / laptop}} | {{name or —}} | {{local, ssh, Tailscale}} |

## Publishing on Tailscale

Check `tailscale serve status` first, then `tailscale serve --bg --https=<port> http://127.0.0.1:<port>`. Tailnet only: never `tailscale funnel` unless I ask.
