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
} 