# BitFlagsJs

A lightweight library for easy bit flag management in JavaScript and TypeScript.

[![NPM Version](https://img.shields.io/npm/v/bitflagsjs.svg)](https://www.npmjs.com/package/bitflagsjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install bitflagsjs
# or
yarn add bitflagsjs
```

## Key Features

BitFlagsJs simplifies bit flag operations in JavaScript and TypeScript:
- Manage bit flags using arrays of 32-bit integers
- Simple API for setting, unsetting, and checking bits
- Automatic handling of indices beyond 32-bit boundaries
- First-class TypeScript support with complete type definitions

## Usage

### Importing

```javascript
// ES Modules
import BitFlags from 'bitflagsjs';

// CommonJS
// const BitFlags = require('bitflagsjs').default;
```

### TypeScript Usage

```typescript
import BitFlags from 'bitflagsjs';

// Type-safe bit flags
const flags = new BitFlags();
flags.set(10);
const isSet: boolean = flags.is(10);
const flagArray: number[] = flags.get();
```

### Creating an Instance

```javascript
// Initialize with default value [0]
const bitFlags = new BitFlags();

// Initialize with custom values
const initializedFlags = new BitFlags([5, 10]); // [0x00000101, 0x00000a00]
```

### Methods

#### get()

Returns the current bit mask array.

```javascript
const bitFlags = new BitFlags();
bitFlags.set(2);
bitFlags.set(35);
console.log(bitFlags.get()); // [4, 8]  // [0x00000100, 0x00000008]
```

#### is(index)

Checks if the bit at the specified index is set.

```javascript
const bitFlags = new BitFlags([3]); // [0x00000011]
const isMaskedFirstBit = bitFlags.is(0);  // true
const isMaskedSecondBit = bitFlags.is(1); // true
const isMaskedThirdBit = bitFlags.is(2);  // false
```

#### set(index)

Sets the bit at the specified index.

```javascript
const bitFlags = new BitFlags(); // [0x00000000]
bitFlags.set(0); // [0x00000001]
bitFlags.set(1); // [0x00000011]
bitFlags.set(4); // [0x00001011]
```

#### unset(index)

Unsets the bit at the specified index.

```javascript
const bitFlags = new BitFlags([3]); // [0x00000011]
bitFlags.unset(0); // [0x00000010]
bitFlags.unset(1); // [0x00000000]
```

## Example: User Permissions

```javascript
// Define permissions
const PERMISSIONS = {
  READ: 0,
  WRITE: 1,
  DELETE: 2,
  ADMIN: 3
};

// Set user permissions
const userPermissions = new BitFlags();
userPermissions.set(PERMISSIONS.READ);
userPermissions.set(PERMISSIONS.WRITE);

// Check permissions
if (userPermissions.is(PERMISSIONS.READ)) {
  console.log('User has read permission');
}

if (!userPermissions.is(PERMISSIONS.ADMIN)) {
  console.log('User does not have admin permission');
}

// Remove permissions
userPermissions.unset(PERMISSIONS.WRITE);
```

## Technical Details

BitFlagsJs manages bit flags using arrays of 32-bit integers. When using indices beyond 32, new array elements are automatically allocated.

## Contributing

Want to contribute to this project? You're welcome!

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Message Convention

- `feat`: Add a new feature
- `fix`: Fix a bug
- `docs`: Update documentation
- `style`: Format code, missing semicolons, etc. (no code change)
- `refactor`: Refactor code
- `test`: Add or update tests
- `chore`: Update build process or auxiliary tools

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- Issues: [GitHub Issues](https://github.com/zerodice0/bitFlagsJs/issues)
- Author: [zerodice0](https://github.com/zerodice0)

*Note: A Korean version of this document is available at [README-KR.md](README-KR.md)*