# taia

A React Native framework

## Usage

### eslint

```js
module.exports = {
  extends: [require.resolve('@txpjs/qa/dist/config/eslint')],
};
```

### prettier

```js
const qa = require('@txpjs/qa');

module.exports = {
  ...qa.prettier,
};
```

### jest

```ts
import { createTestConfig } from '@txpjs/qa';
import type { TestConfig } from '@txpjs/qa';

export default {
  ...createTestConfig(),
} as TestConfig.InitialOptions;
```
