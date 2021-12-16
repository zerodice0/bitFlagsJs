# BitFlagsJs
Make easy management bit-flags on javascripts. 

# install
```
npm i BitFlagJs
```

# Usage
## Constructor(flags)
Initializes the bitmask value with the array value passed as an argument value. Default is [0].

## get()
Returns a bit-masked array of numbers.
```
let bitFlags = new BitFlags();
bitFlags.set(2); // [0x00000010, 0x00000000]
bitFlags.set(1); // [0x00000011, 0x00000000]
bitFlags.set(35) // [0x00000011, 0x00001000]
```

## is(index)
Check whether the bit corresponding to the index value is masked.
```
let bitFlags = new BitFlags([3]); // [0x00000011]
const isMaskedFirstBit = bitFlags.is(0); // true
const isMaskedSecondBit = bitFlags.is(1); // true
const isMaskedThirdBit = bitFlags.is(2); // false
```

## set(index)
The bit corresponding to the index value is masked.
```
let bitFlags = new BitFlags(); // [0x00000000]
bitFlags.set(0); // [0x00000001]
bitFlags.set(1); // [0x00000011]
bitFlags.set(4); // [0x00001011]
```

## unset(index)
Unmask the bit corresponding to the index value.
```
let bitFlags = new BitFlags([3]); // [0x00000011]
bitFlags.unset(0); // [0x00000010]
bitFlags.unset(1); // [0x00000000]
```