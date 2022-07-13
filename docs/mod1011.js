function calculateMod11Digit(stringOfNumbers) {
    const weightSequence = [2, 3, 4, 5, 6, 7];
    
    const digits = stringOfNumbers.split('').map(s => parseInt(s, 10));

    const sumProduct = digits.reverse()
        .reduce((previous, current, index) => {
            const weight = weightSequence[index % 6];
            return previous + current * weight;
        }, 0);

    const possiblyCheckDigit = 11 - (sumProduct % 11);

    if (possiblyCheckDigit === 10) {
        return "-";
    }

    if (possiblyCheckDigit === 11) {
        return "0";
    }

    return String(possiblyCheckDigit);
}

function calculateLuhnDigit(stringOfNumbers) {
    const weightsSequence = [2, 1];

    const digits = stringOfNumbers.split('').map(s => parseInt(s, 10));

    const sumProductString = digits.reverse()
        .reduce((previous, current, index) => {
            const weight = weightsSequence[index % 2];

            return previous + (current * weight);
        }, "");

    const luhnSum = sumProductString.split('')
        .map(s => parseInt(s, 10))
        .reduce((p,c) => p + c, 0);
    
    const remainder = luhnSum % 10;

    if (remainder === 0) {
        return 0;
    }

    return 10 - remainder;
}

function checkAllTheThings(stringOfNumbers) {
    const input = stringOfNumbers;
    const length = stringOfNumbers.length;        

    const firstPart = stringOfNumbers.substr(0, stringOfNumbers.length - 1);
    const mod10Digit = calculateLuhnDigit(firstPart);
    const mod11Digit = calculateMod11Digit(firstPart);

    const addedMod10Digit = calculateLuhnDigit(stringOfNumbers);
    const addedMod11Digit = calculateMod11Digit(stringOfNumbers);

    const validMod10 = stringOfNumbers === (firstPart + mod10Digit);
    const validMod11 = stringOfNumbers === (firstPart + mod11Digit);

    const gyldigKontoNummer = length === 11 && validMod11;
    const gyldigKIDNummer = (length > 1 && length < 26) &&
        (validMod10 || validMod11);

    const result = {
        input,
        length,
        firstPart,
        mod10Digit,
        mod11Digit,
        addedMod10Digit,
        addedMod11Digit,
        validMod10,
        validMod11,
        gyldigKontoNummer,
        gyldigKIDNummer
    };

    return result;
}

