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

  // clear() method tests
  describe('clear()', () => {
    test('clears all bit flags', () => {
      const bitFlags = new BitFlags([15, 7]); // [0x0000000f, 0x00000007]
      bitFlags.clear();
      expect(bitFlags.get()).toEqual([0]);
			expect(bitFlags.is(1)).toBe(false);
			expect(bitFlags.is(2)).toBe(false);
			expect(bitFlags.is(64)).toBe(false);
    });


    test('resets to initial state even after multiple operations', () => {
      const bitFlags = new BitFlags();
      
      // Set bits across multiple array elements
      bitFlags.set(0);
      bitFlags.set(1);
      bitFlags.set(32);
      bitFlags.set(64);
      
      // Should have 3 elements now
      expect(bitFlags.get().length).toBe(3);
      
      // Clear and check result
      bitFlags.clear();
      expect(bitFlags.get()).toEqual([0]);
    });
  });

  // count() method tests
  describe('count()', () => {
    test('returns the correct number of bits set', () => {
      const bitFlags = new BitFlags([3]); // 0b11 (2 bits set)
      expect(bitFlags.count()).toBe(2);
    });

    test('returns 0 for empty bit flags', () => {
      const bitFlags = new BitFlags([0]);
      expect(bitFlags.count()).toBe(0);
    });

    test('counts bits across multiple array elements', () => {
      const bitFlags = new BitFlags([3, 5, 8]); // 0b11, 0b101, 0b1000 (5 bits total)
      expect(bitFlags.count()).toBe(5);
    });

    test('updates count after setting and unsetting bits', () => {
      const bitFlags = new BitFlags([1]); // 0b1 (1 bit set)
      expect(bitFlags.count()).toBe(1);
      
      bitFlags.set(1); // 0b11 (2 bits set)
      expect(bitFlags.count()).toBe(2);
      
      bitFlags.unset(0); // 0b10 (1 bit set)
      expect(bitFlags.count()).toBe(1);
      
      bitFlags.clear(); // 0b0 (0 bits set)
      expect(bitFlags.count()).toBe(0);
    });
  });

  // Bitwise operation tests
  describe('bitwise operations', () => {
    // and() method tests
    describe('and()', () => {
      test('performs bitwise AND operation correctly', () => {
        const flags1 = new BitFlags([5]); // 0b101
        const flags2 = new BitFlags([3]); // 0b011
        const result = flags1.and(flags2);
        expect(result.get()).toEqual([1]); // 0b001
      });

      test('handles operands with different array lengths', () => {
        const flags1 = new BitFlags([5, 3, 10, 12]); // [0b101, 0b11, 0b1010, 0b1100]
        const flags2 = new BitFlags([3]);    // [0b11]
        const result1 = flags1.and(flags2);
        const result2 = flags2.and(flags1);
        expect(result1.get()).toEqual([1, 0, 0, 0]); // [0b001, 0b00, 0b0000, 0b0000]
				expect(result2.get()).toEqual([1, 0, 0, 0]); // [0b001, 0b00, 0b0000, 0b0000]
      });

      test('returns a new instance without modifying originals', () => {
        const flags1 = new BitFlags([5]); // [0b101]
        const flags2 = new BitFlags([3]); // [0b011]
        const result = flags1.and(flags2);
        
        expect(result.get()).toEqual([1]); // [0b001]
        expect(flags1.get()).toEqual([5]); // unchanged
        expect(flags2.get()).toEqual([3]); // unchanged
      });
    });

    // or() method tests
    describe('or()', () => {
      test('performs bitwise OR operation correctly', () => {
        const flags1 = new BitFlags([5]); // 0b101
        const flags2 = new BitFlags([3]); // 0b011
        const result = flags1.or(flags2);
        expect(result.get()).toEqual([7]); // 0b111
      });

      test('handles operands with different array lengths', () => {
        const flags1 = new BitFlags([5]); // [0b101]
        const flags2 = new BitFlags([3, 8, 10, 12]); // [0b11, 0b1000, 0b1010, 0b1100]
        const result1 = flags1.or(flags2);
				const result2 = flags2.or(flags1);
				
        expect(result1.get()).toEqual([7, 8, 10, 12]); // [0b111, 0b1000, 0b1010, 0b1100]
				expect(result2.get()).toEqual([7, 8, 10, 12]); // [0b111, 0b1000, 0b1010, 0b1100]
      });

      test('returns a new instance without modifying originals', () => {
        const flags1 = new BitFlags([5]); // [0b101]
        const flags2 = new BitFlags([3]); // [0b011]
        const result1 = flags1.or(flags2);
				const result2 = flags2.or(flags1);
        
        expect(result1.get()).toEqual([7]); // [0b111]
				expect(result2.get()).toEqual([7]); // [0b111]
        expect(flags1.get()).toEqual([5]); // unchanged
        expect(flags2.get()).toEqual([3]); // unchanged
      });
    });

    // xor() method tests
    describe('xor()', () => {
      test('performs bitwise XOR operation correctly', () => {
        const flags1 = new BitFlags([5]); // 0b101
        const flags2 = new BitFlags([3]); // 0b011
        const result1 = flags1.xor(flags2);
				const result2 = flags2.xor(flags1);
        
        expect(result1.get()).toEqual([6]); // 0b110
				expect(result2.get()).toEqual([6]); // 0b110
      });

      test('handles operands with different array lengths', () => {
        const flags1 = new BitFlags([5, 8]); // [0b101, 0b1000]
        const flags2 = new BitFlags([3]);    // [0b011]
        const result1 = flags1.xor(flags2);
				const result2 = flags2.xor(flags1);
        
        expect(result1.get()).toEqual([6, 8]); // [0b110, 0b1000]
				expect(result2.get()).toEqual([6, 8]); // [0b110, 0b1000]
      });

      test('returns a new instance without modifying originals', () => {
        const flags1 = new BitFlags([5]); // [0b101]
        const flags2 = new BitFlags([3]); // [0b011]
        const result1 = flags1.xor(flags2);
				const result2 = flags2.xor(flags1);
        
        expect(result1.get()).toEqual([6]); // [0b110]
				expect(result2.get()).toEqual([6]); // [0b110]
        expect(flags1.get()).toEqual([5]); // unchanged
        expect(flags2.get()).toEqual([3]); // unchanged
      });
    });

    // not() method tests
    describe('not()', () => {
      test('performs bitwise NOT operation correctly', () => {
        const flags = new BitFlags([5]); // [0b101]
        const result = flags.not();
        
        // When inverting bits of 5 (0b101), the result is -6 (0xfffffffa)
        // JavaScript uses 32-bit integers for bitwise operations,
        // and the leftmost bit being 1 is interpreted as a negative number.
        // Therefore, testing specific bit patterns is more reliable.
        expect(result.is(0)).toBe(false); // Bit 0 of 5 is 1, so it becomes 0 after inversion
        expect(result.is(2)).toBe(false); // Bit 2 of 5 is 1, so it becomes 0 after inversion
        expect(result.is(1)).toBe(true);  // Bit 1 of 5 is 0, so it becomes 1 after inversion
        expect(result.is(3)).toBe(true);  // Bit 3 of 5 is 0, so it becomes 1 after inversion
      });

      test('returns a new instance without modifying original', () => {
        const flags = new BitFlags([5]); // [0b101]
        const result = flags.not();
        
        expect(flags.get()).toEqual([5]); // unchanged
      });

      test('negates all bits in multiple array elements', () => {
        const flags = new BitFlags([1, 2]); // [0b1, 0b10]
        const result = flags.not();
        
        // Inverting 1 (0b1) results in -2 (0xfffffffe)
        // Inverting 2 (0b10) results in -3 (0xfffffffd)
        expect(result.is(0)).toBe(false); // Bit 0 of 1 is 1, so it becomes 0 after inversion
        expect(result.is(1)).toBe(true);  // Bit 1 of 1 is 0, so it becomes 1 after inversion
      });
    });
  });
}); 