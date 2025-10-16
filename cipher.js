function assignTrinaryIDs(input) {
  const result = {};
  const uniqueChars = [...new Set(input)];
  const length = uniqueChars.length;

  // Calculate minimum trinary length needed to represent all IDs
const trinaryLength = Math.ceil(Math.log(Math.max(length - 1, 1)) / Math.log(3)) || 1;


  for (let i = 0; i < length; i++) {
    const char = uniqueChars[i];
    const trinary = i.toString(3);
    // Pad only if shorter than required length
    const paddedTrinary = trinary.length < trinaryLength ? trinary.padStart(trinaryLength, '0') : trinary;
    result[char] = paddedTrinary;
  }

  return result;
}

function stringTo3DArray(str) {
    const len = str.length;
    const cubeRoot = Math.cbrt(len);

    // Ensure it's a perfect cube
    if (!Number.isInteger(cubeRoot)) {
        throw new Error("String length must be a perfect cube (1, 8, 27, 64, ...)");
    }

    const size = cubeRoot;
    const result = [];

    let index = 0;

    for (let z = 0; z < size; z++) {
        const layer = [];
        for (let y = 0; y < size; y++) {
            const row = [];
            for (let x = 0; x < size; x++) {
                row.push(str[index++]);
            }
            layer.push(row);
        }
        result.push(layer);
    }

    return result;
}

const cipherString = " abcdefghijklmnopqrstuvwxyz";
const defaultMatrix = stringTo3DArray(cipherString);
const defaultCipher = assignTrinaryIDs(cipherString);

console.log(defaultMatrix);
console.log(defaultCipher);

