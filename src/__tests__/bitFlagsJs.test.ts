import BitFlags from '../bitFlagsJs';

describe('BitFlags', () => {
  // Constructor tests
  describe('constructor', () => {
    test('creates instance with default value', () => {
      const bitFlags = new BitFlags();
      expect(bitFlags.get()).toEqual([0]);
    });

    test('creates instance with custom values', () => {
      const initialValues = [5, 10];
      const bitFlags = new BitFlags(initialValues);
      expect(bitFlags.get()).toEqual(initialValues);
    });
  });

  // get() method tests
  describe('get()', () => {
    test('returns the current bit flags array', () => {
      const initialValues = [7, 11];
      const bitFlags = new BitFlags(initialValues);
      expect(bitFlags.get()).toEqual(initialValues);
    });
  });

  // is() method tests
  describe('is()', () => {
    test('returns true for set bits', () => {
      // [3] = 0b11 (bits 0 and 1 are set)
      const bitFlags = new BitFlags([3]);
      expect(bitFlags.is(0)).toBe(true);
      expect(bitFlags.is(1)).toBe(true);
    });

    test('returns false for unset bits', () => {
      // [3] = 0b11 (bits 0 and 1 are set, bit 2 is not)
      const bitFlags = new BitFlags([3]);

      expect(bitFlags.is(2)).toBe(false);
      expect(bitFlags.is(3)).toBe(false);
    });

    test('returns false for bits in non-existent array elements', () => {
      const bitFlags = new BitFlags([3]);
      // Index 32 would be in the second array element, which doesn't exist
      expect(bitFlags.is(32)).toBe(false);
    });
  });

  // set() method tests
  describe('set()', () => {
    test('sets a bit in the first array element', () => {
      const bitFlags = new BitFlags();
      
      bitFlags.set(0);
      expect(bitFlags.get()).toEqual([1]); // 0b1
      
      bitFlags.set(1);
      expect(bitFlags.get()).toEqual([3]); // 0b11
      
      bitFlags.set(4);
      expect(bitFlags.get()).toEqual([19]); // 0b10011
    });

    test('expands the array when setting bits beyond the first element', () => {
      const bitFlags = new BitFlags();
      
      // Index 32 is the first bit in the second array element
      bitFlags.set(32);
      expect(bitFlags.get()).toEqual([0, 1]);
      
      // Index 64 is the first bit in the third array element
      bitFlags.set(64);
      expect(bitFlags.get()).toEqual([0, 1, 1]);
    });

    test('returns true when the bit is successfully set', () => {
      const bitFlags = new BitFlags();
      expect(bitFlags.set(5)).toBe(true);
    });
  });

  // unset() method tests
  describe('unset()', () => {
    test('unsets a bit in the array', () => {
      const bitFlags = new BitFlags([3]); // 0b11
      
      bitFlags.unset(0);
      expect(bitFlags.get()).toEqual([2]); // 0b10
      
      bitFlags.unset(1);
      expect(bitFlags.get()).toEqual([0]); // 0b0
    });

    test('returns false when trying to unset a bit in a non-existent array element', () => {
      const bitFlags = new BitFlags([3]);
      expect(bitFlags.unset(32)).toBe(false);
    });

    test('returns false when the bit is already unset', () => {
      const bitFlags = new BitFlags([4]); // 0b100
      expect(bitFlags.unset(0)).toBe(false);
      expect(bitFlags.unset(1)).toBe(false);
    });
  });

  // Complex operations
  describe('complex operations', () => {
    test('manages bit flags across multiple operations', () => {
      const bitFlags = new BitFlags();
      
      // Set some bits
      bitFlags.set(1);
      bitFlags.set(5);
      bitFlags.set(10);
      
      // Check states
      expect(bitFlags.is(1)).toBe(true);
      expect(bitFlags.is(5)).toBe(true);
      expect(bitFlags.is(10)).toBe(true);
      expect(bitFlags.is(2)).toBe(false);
      
      // Unset a bit
      bitFlags.unset(5);
      
      // Check states again
      expect(bitFlags.is(1)).toBe(true);
      expect(bitFlags.is(5)).toBe(false);
      expect(bitFlags.is(10)).toBe(true);
      
      // Set a bit in the second array element
      bitFlags.set(33);
      
      // Check states across elements
      expect(bitFlags.is(1)).toBe(true);
      expect(bitFlags.is(10)).toBe(true);
      expect(bitFlags.is(33)).toBe(true);
      
      // Final array should be [0b10000000010, 0b10] => [1026, 2]
      expect(bitFlags.get()).toEqual([1026, 2]);
    });
  });

  // Example from documentation
  describe('user permissions example', () => {
    test('manages permissions as described in documentation', () => {
      const PERMISSIONS = {
        READ: 0,
        WRITE: 1,
        DELETE: 2,
        ADMIN: 3
      };
      
      const userPermissions = new BitFlags();
      userPermissions.set(PERMISSIONS.READ);
      userPermissions.set(PERMISSIONS.WRITE);
      
      expect(userPermissions.is(PERMISSIONS.READ)).toBe(true);
      expect(userPermissions.is(PERMISSIONS.WRITE)).toBe(true);
      expect(userPermissions.is(PERMISSIONS.DELETE)).toBe(false);
      expect(userPermissions.is(PERMISSIONS.ADMIN)).toBe(false);
      
      userPermissions.unset(PERMISSIONS.WRITE);
      
      expect(userPermissions.is(PERMISSIONS.READ)).toBe(true);
      expect(userPermissions.is(PERMISSIONS.WRITE)).toBe(false);
    });
  });
}); 