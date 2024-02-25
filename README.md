# CoolChatX - Frontend Challenge

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [Technical stack](#technical-stack)

## Prerequisites

- Node.js 16 or later

## Installation

Instal the dependencies required for the project

```bash
npm i
```

## Getting Started

To start the development server, run next command:

```bash
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) to see the result.

You can find source files in `/src` folder.

To build production artefacts, run next command:

```bash
npm run build
```

## Testing

To run unit tests, run next command

```bash
npm run test
```

To include coverage info, run next command

```bash
npm run test:coverage
```

Before running e2e test make sure the app is up and running.

To run e2e tests in headless mode (run tests in terminal), run next command

```bash
npm run e2e:headless
```

To run e2e tests in headed mode (opens up browser window), run next command

```bash
npm run e2e:headed
```

## Technical stack

- [React](https://react.dev) - library for building UI components
- [TypeScript](https://www.typescriptlang.org/docs/) - for static type checking
- [Vitest](https://vitest.dev/)- A Vite-native testing framework. In challenge, it's said to use `Jest` but since I'm using `Vite` as build tool it requires too much effort to make `Vite` work with `Jest` so I went with `Vitest`. But `Vitest` is compatible with `Jest` api.
- [Tailwind.css](https://tailwindcss.com/docs/installation) - A utility-first CSS framework
- [msw](https://mswjs.io/) -Mock Service Worker is an API mocking library
```
