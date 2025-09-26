# @livechat/agent-app-sdk

## 1.16.0

### Minor Changes

- 21da94f: Add functionality to notify parent environment about application-specific properties update

### Patch Changes

- Updated dependencies [21da94f]
  - @livechat/widget-core-sdk@1.5.0

## 1.15.0

### Minor Changes

- fd24557: Add functionality to open Chat Widget in the parent environment

### Patch Changes

- Updated dependencies [fd24557]
  - @livechat/widget-core-sdk@1.4.0

## 1.14.0

### Minor Changes

- 906f6fd: Addressed security vulnerabilities in the packages

### Patch Changes

- Updated dependencies [906f6fd]
  - @livechat/widget-core-sdk@1.3.0

## 1.13.1

### Patch Changes

- Add missing types for setToast method
- Updated dependencies
  - @livechat/widget-core-sdk@1.2.1

## 1.13.0

### Minor Changes

- f494673: Add functionality to display toast notifications in the parent environment

### Patch Changes

- Updated dependencies [f494673]
  - @livechat/widget-core-sdk@1.2.0

## 1.12.0

### Minor Changes

- aab5da0: Added support for retrieving theme values via the `getTheme` method or by listening to the `change_theme` event

## 1.11.0

### Minor Changes

- 1f78de6: Added `startTransaction` for all widget types to support One-click Payment flow

### Patch Changes

- Updated dependencies [1f78de6]
  - @livechat/widget-core-sdk@1.1.0

## 1.10.0

### Minor Changes

- [DPS-4294] extend page_data event for Fullscreen apps

## 1.9.0

### Minor Changes

- `navigate` and `setReportsFilters` methods in Fullscreen widgets

## 1.8.0

### Minor Changes

- 01228cd: [PP-10296] added `page_data` event that returns a query params from the main window only for Settings apps

## 1.7.0

### Minor Changes

- 956327e: [PP-10273] added `createSettingsWidget` method that returns a new widget with redirect method

## 1.6.5

### Patch Changes

- b015d5d: [DPS-4103] Problem with initial load of customer profile in message-box plugins

## 1.6.4

### Patch Changes

- 67087a7: Messagebox fix: Use correct type for string type

## 1.6.3

### Patch Changes

- Fix for building umd bundles for agent-app-sdk and helpdesk-sdk.

## 1.6.2

### Patch Changes

- a9d63cb: Versioning fix
- Updated dependencies [a9d63cb]
  - @livechat/widget-core-sdk@1.0.2

## 1.6.1

### Patch Changes

- Packages visibility change
- Updated dependencies
  - @livechat/widget-core-sdk@1.0.1

## 1.6.0

### Minor Changes

- Initial release of the `products-sdk`. Extract shared widget functionality into `widget-core-sdk`. `agent-app-sdk` is a copy/paste from previous repo. `helpdesk-sdk` is a brand new sdk based on `agent-app-sdk` with funcionality related to HelpDesk product.

### Patch Changes

- Updated dependencies
  - @livechat/widget-core-sdk@1.0.0
