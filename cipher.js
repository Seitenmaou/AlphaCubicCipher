const defaultDecipherCube = [
    [
        [" ", "A", "B"],
        ["C", "D", "E"],
        ["F", "G", "H"]
    ],
    [
        ["I", "J", "K"],
        ["L", "M", "N"],
        ["O", "P", "Q"]
    ],
    [
        ["R", "S", "T"],
        ["U", "V", "W"],
        ["X", "Y", "Z"]
    ]
]

const defaultCipherCube = {
    " ":"000",
    "A":"001",
    "B":"002",
    "C":"010",
    "D":"011",
    "E":"012",
    "F":"020",
    "G":"021",
    "H":"022",
    "I":"100",
    "J":"101",
    "K":"102",
    "L":"110",
    "M":"111",
    "N":"112",
    "O":"120",
    "P":"121",
    "Q":"122",
    "R":"200",
    "S":"201",
    "T":"202",
    "U":"210",
    "V":"211",
    "W":"212",
    "X":"220",
    "Y":"221",
    "Z":"222"
}

function turnCipher(inputCipherCube){ //not really a cube...
    for (var alphabet in inputCipherCube){
        switch(inputCipherCube[alphabet]){
            case "000":
                inputCipherCube[alphabet] = "002"
                break
            case "001":
                inputCipherCube[alphabet] = "012"
                break
            case "002":
                inputCipherCube[alphabet] = "022"
                break
            case "010":
                inputCipherCube[alphabet] = "001"
                break
            case "011":
                inputCipherCube[alphabet] = "011"
                break
            case "012":
                inputCipherCube[alphabet] = "021"
                break
            case "020":
                inputCipherCube[alphabet] = "000"
                break
            case "021":
                inputCipherCube[alphabet] = "010"
                break
            case "022":
                inputCipherCube[alphabet] = "020"
                break
            case "100":
                inputCipherCube[alphabet] = "102"
                break
            case "101":
                inputCipherCube[alphabet] = "112"
                break
            case "102":
                inputCipherCube[alphabet] = "122"
                break
            case "110":
                inputCipherCube[alphabet] = "101"
                break
            case "111":
                inputCipherCube[alphabet] = "111"
                break
            case "112":
                inputCipherCube[alphabet] = "121"
                break
            case "120":
                inputCipherCube[alphabet] = "100"
                break
            case "121":
                inputCipherCube[alphabet] = "110"
                break
            case "122":
                inputCipherCube[alphabet] = "120"
                break
            case "200":
                inputCipherCube[alphabet] = "202"
                break
            case "201":
                inputCipherCube[alphabet] = "212"
                break
            case "202":
                inputCipherCube[alphabet] = "222"
                break
            case "210":
                inputCipherCube[alphabet] = "201"
                break
            case "211":
                inputCipherCube[alphabet] = "211"
                break
            case "212":
                inputCipherCube[alphabet] = "221"
                break
            case "220":
                inputCipherCube[alphabet] = "200"
                break
            case "221":
                inputCipherCube[alphabet] = "210"
                break
            case "222":
                inputCipherCube[alphabet] = "220"
                break
        }
    }
    return inputCipherCube
}
function rotateCipher(inputCipherCube){
    for (var alphabet in inputCipherCube){
        switch(inputCipherCube[alphabet]){
            case "000":
                inputCipherCube[alphabet] = "200"
                break
            case "001":
                inputCipherCube[alphabet] = "201"
                break
            case "002":
                inputCipherCube[alphabet] = "202"
                break
            case "010":
                inputCipherCube[alphabet] = "100"
                break
            case "011":
                inputCipherCube[alphabet] = "101"
                break
            case "012":
                inputCipherCube[alphabet] = "102"
                break
            case "020":
                inputCipherCube[alphabet] = "000"
                break
            case "021":
                inputCipherCube[alphabet] = "001"
                break
            case "022":
                inputCipherCube[alphabet] = "002"
                break
            case "100":
                inputCipherCube[alphabet] = "210"
                break
            case "101":
                inputCipherCube[alphabet] = "211"
                break
            case "102":
                inputCipherCube[alphabet] = "212"
                break
            case "110":
                inputCipherCube[alphabet] = "110"
                break
            case "111":
                inputCipherCube[alphabet] = "111"
                break
            case "112":
                inputCipherCube[alphabet] = "112"
                break
            case "120":
                inputCipherCube[alphabet] = "010"
                break
            case "121":
                inputCipherCube[alphabet] = "011"
                break
            case "122":
                inputCipherCube[alphabet] = "012"
                break
            case "200":
                inputCipherCube[alphabet] = "220"
                break
            case "201":
                inputCipherCube[alphabet] = "221"
                break
            case "202":
                inputCipherCube[alphabet] = "222"
                break
            case "210":
                inputCipherCube[alphabet] = "120"
                break
            case "211":
                inputCipherCube[alphabet] = "121"
                break
            case "212":
                inputCipherCube[alphabet] = "122"
                break
            case "220":
                inputCipherCube[alphabet] = "020"
                break
            case "221":
                inputCipherCube[alphabet] = "021"
                break
            case "222":
                inputCipherCube[alphabet] = "022"
                break
        }
    }
    return inputCipherCube
}

function rotateDecipher(inputDecipherCube){
    return [
        [
            [inputDecipherCube[0][2][0],inputDecipherCube[0][2][1],inputDecipherCube[0][2][2]],
            [inputDecipherCube[1][2][0],inputDecipherCube[1][2][1],inputDecipherCube[1][2][2]],
            [inputDecipherCube[2][2][0],inputDecipherCube[2][2][1],inputDecipherCube[2][2][2]]
        ],
        [
            [inputDecipherCube[0][1][0],inputDecipherCube[0][1][1],inputDecipherCube[0][1][2]],
            [inputDecipherCube[1][1][0],inputDecipherCube[1][1][1],inputDecipherCube[1][1][2]],
            [inputDecipherCube[2][1][0],inputDecipherCube[2][1][1],inputDecipherCube[2][1][2]]
        ],
        [
            [inputDecipherCube[0][0][0],inputDecipherCube[0][0][1],inputDecipherCube[0][0][2]],
            [inputDecipherCube[1][0][0],inputDecipherCube[1][0][1],inputDecipherCube[1][0][2]],
            [inputDecipherCube[2][0][0],inputDecipherCube[2][0][1],inputDecipherCube[2][0][2]]
        ]
    ]
}
function turnDecipher(inputDecipherCube){
    return [
        [
            [inputDecipherCube[0][2][0],inputDecipherCube[0][1][0],inputDecipherCube[0][0][0]],
            [inputDecipherCube[0][2][1],inputDecipherCube[0][1][1],inputDecipherCube[0][0][1]],
            [inputDecipherCube[0][2][2],inputDecipherCube[0][1][2],inputDecipherCube[0][0][2]]
        ],
        [
            [inputDecipherCube[1][2][0],inputDecipherCube[1][1][0],inputDecipherCube[1][0][0]],
            [inputDecipherCube[1][2][1],inputDecipherCube[1][1][1],inputDecipherCube[1][0][1]],
            [inputDecipherCube[1][2][2],inputDecipherCube[1][1][2],inputDecipherCube[1][0][2]]
        ],
        [
            [inputDecipherCube[2][2][0],inputDecipherCube[2][1][0],inputDecipherCube[2][0][0]],
            [inputDecipherCube[2][2][1],inputDecipherCube[2][1][1],inputDecipherCube[2][0][1]],
            [inputDecipherCube[2][2][2],inputDecipherCube[2][1][2],inputDecipherCube[2][0][2]]
        ]
    ]
}

function modifyDecipher (seed) {
    let finalCube = defaultDecipherCube

    if (seed.length % 2 != 0) {
        seed.concat("0")
    }

    for (let i = 0; i < seed.length; i++){
        if (i % 2 == 0 && seed.charAt(i) == 1){
            finalCube = rotateDecipher(finalCube)
        } else if (i % 2 == 1 && seed.charAt(i) == 1) {
            finalCube = turnDecipher(finalCube)
        } else if (seed.charAt(i) == 0) {
            //do nothing
        } else {
            return -1
        }
    }
    return finalCube
}
function modifyCipher(finalCube, seed){

    for (let i = 0; i <= seed.length; i++){
        if (i % 2 == 0 && seed.charAt(i) == 1){
            finalCube = rotateCipher(finalCube)
        } else if (i % 2 == 1 && seed.charAt(i) == 1) {
            finalCube = turnCipher(finalCube)
        } else if (seed.charAt(i) == 0){
            //do nothing
        } else {
            //any other charaacter is an error
            return -1
        }
    }

    return finalCube
}

function cloneArray(a){
    return a.map(e => Array.isArray(e) ? cloneArray(e) : e);
  };

function cipher(inputString, seed){
    let cipherCube = {...defaultCipherCube}
    let ciphered = ""
    let capitalString = inputString.toUpperCase()
    if (seed.length % 2 != 0){
        seed.concat("0")
    }
    if (seed.length > 0){
        cipherCube = modifyCipher(cipherCube, seed)
    }
    if (cipherCube == -1){
        return "Seed must be combination of 0 or 1"
    } else {
        for (let i = 0; i < capitalString.length; i++){
            if (capitalString.charAt(i) in cipherCube) {
                ciphered += cipherCube[capitalString.charAt(i)]
            } else {
                return "Invalid character. Only alphabets and spaces."
            }
        }
    }
    return ciphered
}

function decipher(inputCode, seed){
    if (inputCode.length % 3 != 0 || !/^[120]*$/.test(inputCode)){
        return "Code length must be multiples of 3 characters and combination of 0/1/2"
    } else {
        let decipherCube = cloneArray(defaultDecipherCube)
        let deciphered = ""
        if (seed.length > 0){
            decipherCube = modifyDecipher(seed)
        }
        for (let i = 0; i < inputCode.length - 2; i+=3){
            if (decipherCube == -1){
                return "Seed must be combination of 0 or 1"
            } else {
           deciphered += decipherCube[inputCode.charAt(i)][inputCode.charAt(i+1)][inputCode.charAt(i+2)]
            }
        }
        return deciphered
    }
}

function display(inputCode){

}


function displayDecipher(cube) { //for debug purpose
    displayString = ""
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            for (let k = 0; k < 3; k++){
                displayString += `${cube[i][j][k]}`
            }
            displayString += `\n`
        }
        displayString += `\n`
    }
    return displayString
}