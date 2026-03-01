# KBench 面向个人的AI知识工作台

## 项目简介

一AI Knowledge Workbench 是一个面向个人的轻量级 RAG 知识工作台，
支持知识资产管理、AI 对话增强（RAG）、工具编排（MCP）以及任务日志管理。

目标是构建一个前端主导的 AI 应用最小闭环系统， 强调模块分层设计、数据流清晰、可扩展性。

---

## 技术栈

- Vue3 + Composition API
- Vite
- Pinia
- Vue Router
- TypeScript
- GitHub Pages
- VitePress（项目博客）

---

## 在线体验 & 仓库地址

🌐 Demo: https://akillmm.github.io/kbench/
📦 GitHub: https://github.com/akiLLMM/kbench/

---

## 功能模块结构

```text
src/pages/
├─ login      登录与权限控制
├─ knowledge  知识资产管理
├─ chat       RAG增强对话系统
├─ mcp        工具调用模块
└─ tasks      任务日志模块
```

---

## 系统架构设计

**整体架构**

- 前端单页应用 SPA
- 模块解耦
- 状态集中管理（Pinia）
- 统一数据流

---

## 本地启动方式

```bash
pnpm install
pnpm dev
pnpm build
```

---

## 博客记录

📚 项目开发过程记录：
https://akillmm.github.io/frontend-learning-blog/

---

## 致谢

本项目基于开源项目 [v3-admin-vite](https://un-pany.github.io/v3-admin-vite/) 搭建基础工程结构，
并结合实际业务需求进行了模块重构与系统化扩展开发。
