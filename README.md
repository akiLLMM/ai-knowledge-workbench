# KBench — Personal AI Knowledge Workbench

## Overview

KBench is a lightweight **personal AI Knowledge Workbench** designed for individual knowledge management and AI-assisted workflows.

It integrates knowledge asset management, Retrieval-Augmented Generation (RAG) chat, tool orchestration (MCP), and task logging into a unified system.

The project aims to build a **frontend-driven minimal AI application loop**, emphasizing modular architecture, clear data flow, and extensibility.

---

## Tech Stack

- Vue 3 + Composition API
- Vite
- Pinia
- Vue Router
- TypeScript
- GitHub Pages (Deployment)
- VitePress (Project Blog)

---

## Live Demo & Repository

🌐 **Live Demo**
https://akillmm.github.io/kbench/

📦 **GitHub Repository**
https://github.com/akiLLMM/kbench/

---

## Module Structure

```text
src/pages/
├─ login       Authentication & access control
├─ knowledge   Knowledge asset management
├─ chat        RAG-enhanced chat system
├─ mcp         Tool orchestration module
└─ tasks       Task & activity logging
```

---

## System Architecture

**Architecture Highlights**

- Single Page Application (SPA)
- Decoupled module design
- Centralized state management (Pinia)
- Unified data flow architecture

---

## Local Development

```bash
pnpm install
pnpm dev
pnpm build
```

---

## Development Blog

📚 Project development logs and architectural notes:
https://akillmm.github.io/frontend-learning-blog/

---

## Acknowledgement

This project is based on [v3-admin-vite](https://un-pany.github.io/v3-admin-vite/),
with significant modifications and extensions.
