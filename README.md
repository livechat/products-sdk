# Products SDK's

> This project contains a collection of sdk's for our products to help developers with building integrations.

[![mit](https://img.shields.io/badge/license-MIT-blue.svg)](https://choosealicense.com/licenses/mit/)
[![turborepo](https://img.shields.io/badge/maintained%20with-turborepo-blueviolet)](https://turbo.build/repo)

| 🛠 Framework                                                                                                                                    | 📦 Library                                                                       | ⚖️ Size                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| <img src="https://livechat.design/images/livechat/DIGITAL%20%28RGB%29/SVG/Mark_RGB_Orange.svg" widht="12px" height="12px" /> **Agent App SDK** | [@livechat/agent-app-sdk](https://www.npmjs.com/package/@livechat/agent-app-sdk) | ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@livechat/agent-app-sdk?label=%20) |
| <img widht="12px" height="12px" src ="https://www.livechat.com/hello-again/helpdesk.svg" /> **HelpDesk SDK**                                   | [@livechat/helpdesk-sdk](https://www.npmjs.com/package/@livechat/helpdesk-sdk)   | ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@livechat/helpdesk-sdk?label=%20)  |

## 📦 Installation

Use the package manager [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install choosen package in your project.

### <img src="https://livechat.design/images/livechat/DIGITAL%20%28RGB%29/SVG/Mark_RGB_Orange.svg" widht="16px" height="16px" /> Agent App SDK

```bash
npm install @livechat/agent-app-sdk
# or
yarn add @livechat/agent-app-sdk
```

### <img widht="16px" height="16px" src ="https://www.livechat.com/hello-again/helpdesk.svg" /> HelpDesk SDK

```bash
npm install @livechat/helpdesk-sdk
# or
yarn add @livechat/helpdesk-sdk
```

## 🚀 Usage

### <img src="https://livechat.design/images/livechat/DIGITAL%20%28RGB%29/SVG/Mark_RGB_Orange.svg" widht="16px" height="16px" /> Agent App SDK

#### Details Widget

```ts
// App.tsx

import { createDetailsWidget } from "@livechat/agent-app-sdk";

const getDetailsWidget = async () => {
  const detailsWidget = await createDetailsWidget();
};
```

#### Fullscreen Widget

```ts
// App.tsx

import { createFullscreenWidget } from "@livechat/agent-app-sdk";

const getFullscreenWidget = async () => {
  const fullscreenWidget = await createFullscreenWidget();
};
```

#### Messagebox Widget

```ts
// App.tsx

import { createMessageBoxWidget } from "@livechat/agent-app-sdk";

const getMessageboxWidget = async () => {
  const messageboxWidget = await createMessageBoxWidget();
};
```

### <img widht="16px" height="16px" src ="https://www.livechat.com/hello-again/helpdesk.svg" /> HelpDesk SDK

#### Details Widget

```ts
// App.tsx

import { createDetailsWidget } from "@livechat/helpdesk-sdk";

const getDetailsWidget = async () => {
  const detailsWidget = await createDetailsWidget();
};
```

#### Fullscreen Widget

```ts
// App.tsx

import { createFullscreenWidget } from "@livechat/helpdesk-sdk";

const getFullscreenWidget = async () => {
  const fullscreenWidget = await createFullscreenWidget();
};
```

## 🏗 Contributing

Read our [Contributing Guide](CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.

This project has adopted a [Code of Conduct](CODE_OF_CONDUCT.md) that we expect project participants to adhere to. Please read the full text so that you can understand what actions will and will not be tolerated.

## 📃 License

The code and documentation in this project are released under the [MIT License](https://choosealicense.com/licenses/mit/).
