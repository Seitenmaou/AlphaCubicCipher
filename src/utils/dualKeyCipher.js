// Cipher utility functions ported from ORIGINAL/dualKeyCipher.js
function assignTrinaryIDs(input) {
  const result = {};
  const uniqueChars = [...new Set(input)];
  const length = uniqueChars.length;

  // Calculate minimum trinary length needed to represent all IDs
  const trinaryLength =
    Math.ceil(Math.log(Math.max(length - 1, 1)) / Math.log(3)) || 1;

  for (let i = 0; i < length; i++) {
    const char = uniqueChars[i];
    const trinary = i.toString(3);
    // Pad only if shorter than required length
    const paddedTrinary =
      trinary.length < trinaryLength ? trinary.padStart(trinaryLength, '0') : trinary;
    result[char] = paddedTrinary;
  }

  return result;
}

function stringTo3DArray(str) {
  const len = str.length;
  const cubeRoot = Math.cbrt(len);

  // Ensure it's a perfect cube
  if (!Number.isInteger(cubeRoot)) {
    throw new Error('String length must be a perfect cube (1, 8, 27, 64, ...)');
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

const cleanString = (str) => str.replace(/[^a-zA-Z0-9]/g, '');

function convertDigitsToWords(input) {
  const digitWords = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  return input.toString().replace(/\d/g, (digit) => digitWords[Number(digit)]);
}

function findCoordinates(matrix, target) {
  for (let z = 0; z < matrix.length; z++) {
    for (let y = 0; y < matrix[z].length; y++) {
      for (let x = 0; x < matrix[z][y].length; x++) {
        if (matrix[z][y][x] === target) {
          return [z, y, x]; // Order: x, y, z
        }
      }
    }
  }
  return null; // If not found
}

function locateFace(coord) {
  const faces = [];
  if (coord[1] === 0) faces.push('top');
  if (coord[0] === 0) faces.push('front');
  if (coord[0] === 2) faces.push('back');
  if (coord[2] === 0) faces.push('left');
  if (coord[2] === 2) faces.push('right');
  if (coord[1] === 2) faces.push('bottom');
  return faces;
}

function rotateElements3D(matrix3D, rotationArray, reverse = false) {
  const positions = {};

  // Step 1: Find and store positions of all elements in rotationArray
  for (let x = 0; x < matrix3D.length; x++) {
    for (let y = 0; y < matrix3D[x].length; y++) {
      for (let z = 0; z < matrix3D[x][y].length; z++) {
        const val = matrix3D[x][y][z];
        if (rotationArray.includes(val)) {
          positions[val] = [x, y, z];
        }
      }
    }
  }

  // Step 2: Deep copy to preserve original values
  const tempMatrix = JSON.parse(JSON.stringify(matrix3D));

  let toVal, fromVal;

  // Step 3: Rotate elements to new positions
  for (let i = 0; i < rotationArray.length; i++) {
    if (reverse) {
      toVal = rotationArray[i];
      fromVal = rotationArray[(i - 1 + rotationArray.length) % rotationArray.length]; // previous → current
    } else {
      fromVal = rotationArray[i];
      toVal = rotationArray[(i + 1) % rotationArray.length]; // circular shift
    }
    const [toX, toY, toZ] = positions[toVal];
    const [fromX, fromY, fromZ] = positions[fromVal];
    matrix3D[toX][toY][toZ] = tempMatrix[fromX][fromY][fromZ];
  }

  return matrix3D;
}

function scrambleCipher(matrix, face) {
  let tempMatrix = JSON.parse(JSON.stringify(matrix));
  if (face === 'top') {
    tempMatrix = rotateElements3D(tempMatrix, [matrix[2][0][0], matrix[2][0][2], matrix[0][0][2], matrix[0][0][0]]);
    tempMatrix = rotateElements3D(tempMatrix, [matrix[2][0][1], matrix[1][0][2], matrix[0][0][1], matrix[1][0][0]]);
  } else if (face === 'front') {
    tempMatrix = rotateElements3D(tempMatrix, [matrix[0][0][0], matrix[0][0][2], matrix[0][2][2], matrix[0][2][0]]);
    tempMatrix = rotateElements3D(tempMatrix, [matrix[0][0][1], matrix[0][1][2], matrix[0][2][1], matrix[0][1][0]]);
  } else if (face === 'back') {
    tempMatrix = rotateElements3D(tempMatrix, [matrix[2][0][2], matrix[2][0][0], matrix[2][2][0], matrix[2][2][2]]);
    tempMatrix = rotateElements3D(tempMatrix, [matrix[2][0][1], matrix[2][1][0], matrix[2][2][1], matrix[2][1][2]]);
  } else if (face === 'left') {
    tempMatrix = rotateElements3D(tempMatrix, [matrix[0][0][0], matrix[2][0][0], matrix[2][2][0], matrix[0][2][0]]);
    tempMatrix = rotateElements3D(tempMatrix, [matrix[1][0][0], matrix[2][1][0], matrix[1][2][0], matrix[0][1][0]]);
  } else if (face === 'right') {
    tempMatrix = rotateElements3D(tempMatrix, [matrix[2][0][2], matrix[0][0][2], matrix[0][2][2], matrix[2][2][2]]);
    tempMatrix = rotateElements3D(tempMatrix, [matrix[1][0][2], matrix[0][1][2], matrix[1][2][2], matrix[2][1][2]]);
  } else if (face === 'bottom') {
    tempMatrix = rotateElements3D(tempMatrix, [matrix[0][2][0], matrix[0][2][2], matrix[2][2][2], matrix[2][2][0]]);
    tempMatrix = rotateElements3D(tempMatrix, [matrix[0][2][1], matrix[1][2][2], matrix[2][2][1], matrix[1][2][0]]);
  }
  return tempMatrix;
}

function getMatrixValue(str, matrix) {
  // Split string into chunks of 3 characters
  const indices = str.match(/.{1,3}/g);

  // Traverse the matrix using each set of indices
  let result = '';
  for (const triplet of indices) {
    const [i, j, k] = triplet.split('').map(Number);
    result += matrix[i][j][k];
  }

  return result;
}

function getMatrixLocation(input, tempMatrix) {
  const result = [];

  for (const char of input) {
    let found = false;

    for (let i = 0; i < tempMatrix.length; i++) {
      for (let j = 0; j < tempMatrix[i].length; j++) {
        for (let k = 0; k < tempMatrix[i][j].length; k++) {
          if (tempMatrix[i][j][k] === char) {
            result.push(`${i}${j}${k}`);
            found = true;
            break;
          }
        }
        if (found) break;
      }
      if (found) break;
    }

    if (!found) {
      throw new Error(`Character "${char}" not found in tempMatrix`);
    }
  }

  return result;
}

function decipherText(input) {
  let decipheredText = '';
  for (let i = 0; i < input.length; i++) {
    const triplet = input[i];
    for (const [key, value] of Object.entries(defaultCipher)) {
      if (value === triplet) {
        decipheredText += key;
        break;
      }
    }
  }
  return decipheredText;
}

function encipherText(input) {
  let encipheredText = '';
  for (const char of input) {
    encipheredText += defaultCipher[char];
  }
  return encipheredText;
}

function cipher(input, cipherKey) {
  let tempMatrix = JSON.parse(JSON.stringify(defaultMatrix));

  cleanString(input);
  convertDigitsToWords(input);

  let scrambleOrder = [];

  for (const char of cipherKey) {
    scrambleOrder = scrambleOrder.concat(locateFace(findCoordinates(tempMatrix, char)));
  }

  for (const face of scrambleOrder) {
    tempMatrix = scrambleCipher(tempMatrix, face);
  }

  const encipheredText = encipherText(input);
  return getMatrixValue(encipheredText, tempMatrix);
}

function decipher(input, cipherKey) {
  let tempMatrix = JSON.parse(JSON.stringify(defaultMatrix));

  cleanString(input);
  convertDigitsToWords(input);

  let scrambleOrder = [];

  for (const char of cipherKey) {
    scrambleOrder = scrambleOrder.concat(locateFace(findCoordinates(tempMatrix, char)));
  }

  for (const face of scrambleOrder) {
    tempMatrix = scrambleCipher(tempMatrix, face);
  }

  const deciphered = getMatrixLocation(input, tempMatrix);
  return decipherText(deciphered);
}

function dualKeyCipher(rawInput, cipherKey, isCipher, _options = {}) {
  if (isCipher) {
    return cipher(rawInput, cipherKey);
  }

  // Given the key and ciphered text, derive the original characters from default matrix
  return decipher(rawInput, cipherKey);
}

const REPEAT_ITERATIONS = 1000;

function postInputCipher(rawInput, _cipherKey, isCipher, _options = {}) {
  if (!rawInput) {
    return '';
  }

  if (isCipher) {
    return cipher(rawInput, rawInput);
  }

  const outputs = [];
  let workingValue = rawInput;

  for (let iteration = 1; iteration <= REPEAT_ITERATIONS; iteration += 1) {
    workingValue = decipher(workingValue, workingValue);
    outputs.push(`Iteration ${iteration}: ${workingValue}`);
  }

  return outputs.join('\n');
}

function proceduralDecipherStep(input) {
  const candidates = Object.keys(defaultCipher);
  let plainResult = '';

  for (let index = 0; index < input.length; index += 1) {
    const cipherChar = input[index];
    let decodedChar = null;

    for (const candidate of candidates) {
      const derivedKey = plainResult + candidate;
      const produced = cipher(candidate, derivedKey);

      if (produced === cipherChar) {
        decodedChar = candidate;
        break;
      }
    }

    if (decodedChar === null) {
      throw new Error(`Unable to decode character at position ${index}`);
    }

    plainResult += decodedChar;
  }

  return plainResult;
}

function proceduralCipher(rawInput, _cipherKey, isCipher, _options = {}) {
  if (!rawInput) {
    return '';
  }

  if (isCipher) {
    let result = '';
    for (let index = 0; index < rawInput.length; index += 1) {
      const char = rawInput[index];
      const derivedKey = rawInput.slice(0, index + 1);
      result += cipher(char, derivedKey);
    }
    return result;
  }

  const outputs = [];
  let workingValue = rawInput;

  for (let iteration = 1; iteration <= REPEAT_ITERATIONS; iteration += 1) {
    try {
      workingValue = proceduralDecipherStep(workingValue);
      outputs.push(`Iteration ${iteration}: ${workingValue}`);
    } catch (error) {
      outputs.push(`Iteration ${iteration}: error - ${error.message}`);
      break;
    }
  }

  return outputs.join('\n');
}

const cipherString = ' abcdefghijklmnopqrstuvwxyz';
const defaultMatrix = stringTo3DArray(cipherString);
const defaultCipher = assignTrinaryIDs(cipherString);

const cipherAlgorithms = {
  dualKeyCipher,
  postInputCipher,
  proceduralCipher,
};

const cipherMetadata = {
  dualKeyCipher: {
    label: 'Dual Key Cipher',
    requiresKey: true,
    supportsDecipher: true,
  },
  postInputCipher: {
    label: 'Post Input Cipher',
    requiresKey: false,
    supportsDecipher: true,
  },
  proceduralCipher: {
    label: 'Procedural Cipher',
    requiresKey: false,
    supportsDecipher: true,
  },
};

export {
  cipherAlgorithms,
  cipherMetadata,
  defaultCipher,
  defaultMatrix,
  dualKeyCipher,
  postInputCipher,
  proceduralCipher,
};
