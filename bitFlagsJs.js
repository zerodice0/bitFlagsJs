export default class BitFlags {
  constructor(flags) {
    this.flags = flags || [0];
  }

  get = () => this.flags;
  
  is = (index) => {
    const arrayIndex = parseInt(index / 32);
    const bitsIndex = parseInt(index % 32);
    return (this.flags[arrayIndex] & (1<<bitsIndex)) !== 0;
  }

  set = (index) => {
    const arrayIndex = parseInt(index / 32);
    const bitsIndex = parseInt(index % 32);
    this.flags[arrayIndex] |= (1<<bitsIndex);
    return (this.flags[arrayIndex] & (1<<bitsIndex)) !== 0;
  }

  unset = (index) => {
    const arrayIndex = parseInt(index / 32);
    const bitsIndex = parseInt(index % 32);
    this.flags[arrayIndex] &= ~(1<<bitsIndex);
    return (this.flags[arrayIndex] & (1<<bitsIndex)) !== 0;
  }
}