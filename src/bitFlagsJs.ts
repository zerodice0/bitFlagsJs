/**
 * BitFlags class is a utility class for managing bit flags.
 */
export default class BitFlags {
  private flags: number[];

  /**
   * @param flags Initial flag value array (optional)
   */
  constructor(flags?: number[]) {
    this.flags = flags || [0];
  }

  /**
   * Returns the current bit flag array.
   * @returns Current flag array
   */
  get = (): number[] => this.flags;
  
  /**
   * Checks if the bit flag at the specified index is set.
   * @param index Bit index to check
   * @returns true if the bit is set, otherwise false
   */
  is = (index: number): boolean => {
    const arrayIndex = Math.floor(index / 32);
    const bitsIndex = index % 32;
    
    // Check if array size is sufficient
    if (arrayIndex >= this.flags.length) {
      return false;
    }
    
    return (this.flags[arrayIndex] & (1 << bitsIndex)) !== 0;
  }

  /**
   * Sets the bit flag at the specified index.
   * @param index Bit index to set
   * @returns State of the bit after setting
   */
  set = (index: number): boolean => {
    const arrayIndex = Math.floor(index / 32);
    const bitsIndex = index % 32;
    
    // Expand the array if size is insufficient
    while (this.flags.length <= arrayIndex) {
      this.flags.push(0);
    }
    
    this.flags[arrayIndex] |= (1 << bitsIndex);
    return (this.flags[arrayIndex] & (1 << bitsIndex)) !== 0;
  }

  /**
   * Unsets the bit flag at the specified index.
   * @param index Bit index to unset
   * @returns State of the bit after unsetting
   */
  unset = (index: number): boolean => {
    const arrayIndex = Math.floor(index / 32);
    const bitsIndex = index % 32;
    
    // Do nothing if array size is insufficient
    if (arrayIndex >= this.flags.length) {
      return false;
    }
    
    this.flags[arrayIndex] &= ~(1 << bitsIndex);
    return (this.flags[arrayIndex] & (1 << bitsIndex)) !== 0;
  }

  /**
   * Clears all bit flags.
   */
  clear = (): void => {
    this.flags = [0];
  }

  /**
   * Returns the number of bits set in the bit flag array.
   * @returns Number of bits set
   */
  count = (): number => {
    function popcount(v: number): number { // HAKMEM style popcount
      v = v - ((v >> 1) & 0x55555555);
      v = (v & 0x33333333) + ((v >> 2) & 0x33333333);
      v = (v + (v >> 4)) & 0x0F0F0F0F;
      v = v + (v >> 8);
      v = v + (v >> 16);
      return v & 0x3F;
    }
    
    return this.flags.reduce((acc, curr) => acc + popcount(curr), 0);
  }

  /**
   * Returns a new BitFlags instance with the bit flags that are set in both this and the other BitFlags instance.
   * @param other The other BitFlags instance to compare with
   * @returns A new BitFlags instance with the bit flags that are set in both this and the other BitFlags instance
   */
  and = (other: BitFlags): BitFlags => {
    const result = new Array(Math.max(this.flags.length, other.flags.length)).fill(0);
    
    for (let i = 0; i < result.length; i++) {
      const thisValue = i < this.flags.length ? this.flags[i] : 0;
      const otherValue = i < other.flags.length ? other.flags[i] : 0;
      result[i] = thisValue & otherValue;
    }
    
    return new BitFlags(result);
  }

  /**
   * Returns a new BitFlags instance with the bit flags that are set in either this or the other BitFlags instance.
   * @param other The other BitFlags instance to compare with
   * @returns A new BitFlags instance with the bit flags that are set in either this or the other BitFlags instance
   */
  or = (other: BitFlags): BitFlags => {
    const result = new Array(Math.max(this.flags.length, other.flags.length)).fill(0);
    
    for (let i = 0; i < result.length; i++) {
      const thisValue = i < this.flags.length ? this.flags[i] : 0;
      const otherValue = i < other.flags.length ? other.flags[i] : 0;
      result[i] = thisValue | otherValue;
    }
    
    return new BitFlags(result);
  }

  /**
   * Returns a new BitFlags instance with the bit flags that are set in either this or the other BitFlags instance, but not in both.
   * @param other The other BitFlags instance to compare with
   * @returns A new BitFlags instance with the bit flags that are set in either this or the other BitFlags instance, but not in both
   */
  xor = (other: BitFlags): BitFlags => {
    const result = new Array(Math.max(this.flags.length, other.flags.length)).fill(0);
    
    for (let i = 0; i < result.length; i++) {
      const thisValue = i < this.flags.length ? this.flags[i] : 0;
      const otherValue = i < other.flags.length ? other.flags[i] : 0;
      result[i] = thisValue ^ otherValue;
    }
    
    return new BitFlags(result);
  }

  /**
   * Returns a new BitFlags instance with all bits flipped.
   * @returns A new BitFlags instance with all bits flipped
   */
  not = (): BitFlags => {
    const result = this.flags.map(flag => ~flag);
    return new BitFlags(result);
  }
}