const weightSequence = [2, 3, 4, 5, 6, 7];

// Array of 5 weightSequences - because that is the precise number of sequences Norwegian numbers will ever need.
const weights = new Array(5).fill(1).reduce(p => p.concat(weightSequence), []);

function calculateMod11Digit(stringOfNumbers) {
    const digits = stringOfNumbers.split('').map(s => parseInt(s, 10));

    const sumProduct = digits.reverse()
        .reduce((previous, current, index) => {
            return previous + current * weights[index];
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

function gyldigKontonummerRapport(stringOfNumbers) {
    const result = {
        lengde: false,
        checksum: false,
        checkDigit: ''
    };

    // if (!stringOfNumbers || 
    //     stringOfNumbers.length !== 11 ||
    //     !/\d{11}/.test(stringOfNumbers)
    // ) {
    //     return result;
    // }

    result.lengde = stringOfNumbers.length === 11;

    const firstTenNumbersInString = stringOfNumbers.substr(0, 10);

    const checkDigit = calculateMod11Digit(firstTenNumbersInString);
    
    result.checkDigit = checkDigit;

    result.checksum = (stringOfNumbers === (firstTenNumbersInString + checkDigit));


    return result;
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

function gyldigKIDnummerRapport(stringOfNumbers) {
    const result = {
        lengde: 0,
        mod10DigitAll: '',
        mod11DigitAll: '',
        mod10Digit: '',
        mod11Digit: '',
        isMod10: false,
        isMod11: false
    };

    result.lengde = stringOfNumbers.length;

    const firstPart = stringOfNumbers.substr(0, stringOfNumbers.length - 1);

    result.mod10DigitAll = calculateLuhnDigit(stringOfNumbers);
    result.mod11DigitAll = calculateMod11Digit(stringOfNumbers);

    result.mod10Digit = calculateLuhnDigit(firstPart);
    result.mod11Digit = calculateMod11Digit(firstPart);

    result.isMod10 = (stringOfNumbers === (firstPart + result.mod10Digit));
    result.isMod11 = (stringOfNumbers === (firstPart + result.mod11Digit));

    return result;
}