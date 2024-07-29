// index.ts
import { generateAddressWithBits } from "./bitwiseHelper";

const position = [91, 3];
const address = generateAddressWithBits(position);

console.log(
  `Generated address with single bit at position ${position}: ${address}`
);
