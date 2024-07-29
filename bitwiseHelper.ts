// src/utils/bitwiseHelper.ts

/**
 * Generates an address with 1 bits at the specified positions.
 * @param {number | number[]} positions - The position(s) of the 1 bit(s) (0-based).
 * @returns {string} - The generated address as a hexadecimal string.
 */
export function generateAddressWithBits(positions: number | number[]): string {
  if (Array.isArray(positions)) {
    if (positions.some((pos) => pos < 0 || pos >= 160)) {
      throw new Error("Positions must be between 0 and 159 inclusive.");
    }
  } else {
    if (positions < 0 || positions >= 160) {
      throw new Error("Position must be between 0 and 159 inclusive.");
    }
    positions = [positions];
  }

  let flags = BigInt(0);
  for (const pos of positions) {
    flags |= BigInt(1) << BigInt(pos);
  }

  const address = `0x${flags.toString(16).padStart(40, "0")}`;
  return address;
}
