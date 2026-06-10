# JIGISHA 2026

> [!NOTE]
> If you are a developer and developing JIGISHA, visit [CONTRIBUTING.md](./CONTRIBUTING.md) for the detailed contribution guide.

Official website for **JIGISHA 2026**, the annual quiz fest.

Built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**.

---

## Overview

This repository contains the source code for the official JIGISHA 2026 website.

The website serves as the central platform for:

- Event information
- Schedule and announcements
- Registration links
- Sponsors
- Team information
- Contact information

This project does not include a dedicated backend. Most content is maintained through static files and constants within the codebase.

---

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

---

## Prerequisites

Before starting development, ensure the following are installed:

- Node.js (LTS version recommended)
- npm

Verify installation:

```bash
node -v
npm -v
```

---

## If npm Is Not Available

If running:

```bash
npm -v
```

returns an error such as:

```text
npm: command not found
```

install Node.js from:

https://nodejs.org

After installation, restart your terminal and verify:

```bash
node -v
npm -v
```

---

## Getting Started

Clone the repository:

```bash
git clone <repository-url>
cd jigisha-2026
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## First Contribution

If this is your first time contributing:

1. Clone the repository.
2. Run `npm install`.
3. Run `npm run dev`.
4. Verify the website loads successfully at `localhost:3000`.
5. Create a feature branch before making changes.
6. Read `CONTRIBUTING.md` before opening a Pull Request.

---

## Project Structure

```text
src/
├── app/            # Next.js App Router pages and routes
├── components/     # Reusable UI components
├── constants/      # Static content, configuration, and data
├── hooks/          # Custom React hooks
├── lib/            # Utility/helper functions
├── types/          # TypeScript type definitions
└── styles/         # Global styles

public/
├── images/
├── icons/
└── assets/
```

---

## Available Scripts

Start development server:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

Run production build locally:

```bash
npm run start
```

Run lint checks:

```bash
npm run lint
```

---

## Local Testing on Mobile Devices

Real-device testing is highly encouraged before submitting changes.

### Method 1: Same Wi-Fi Network

Expose the development server on your local network:

```bash
npm run dev -- --hostname 0.0.0.0
```

or

```bash
npx next dev --hostname 0.0.0.0
```

Find your local IP address.

#### Windows

```bash
ipconfig
```

Look for:

```text
IPv4 Address . . . . . . . . . . : 192.168.x.x
```

#### macOS / Linux

```bash
ifconfig
```

or

```bash
ip addr
```

Look for an address similar to:

```text
192.168.x.x
```

Open the website on a phone connected to the same Wi-Fi network:

```text
http://YOUR_IP:3000
```

Example:

```text
http://192.168.1.25:3000
```

If the page does not load:

- Ensure both devices are connected to the same network.
- Check firewall settings.
- Verify the development server is running.

---

### Method 2: Cloudflare Tunnel

Cloudflare Tunnel allows testing on devices outside your local network without deploying the application.

#### Install Cloudflared

##### Windows

Download:

https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/

##### macOS

```bash
brew install cloudflared
```

##### Linux

Follow the official Cloudflare installation guide.

---

#### Start Next.js

```bash
npm run dev
```

---

#### Create Tunnel

```bash
cloudflared tunnel --url http://localhost:3000
```

Cloudflare will generate a public URL similar to:

```text
https://random-name.trycloudflare.com
```

Open that URL on any device.

#### Notes

- Tunnel URLs are temporary.
- A new URL is generated every time a new tunnel is created.
- Do not expose sensitive information through public tunnels.
- Tunnels are intended for testing and demonstration purposes only.

---

## Environment Variables

Create:

```bash
.env.local
```

Example:

```env
NEXT_PUBLIC_REGISTRATION_URL=
```

Only add environment variables when required.

---

## Contributing

Please read:

```text
CONTRIBUTING.md
```

before creating branches, commits, or pull requests.

---

## Maintainers

JIGISHA 2026 Web Team