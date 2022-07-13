function mod11DigitDuf(tenFirstDigits) {
    const weights = [ 4, 6, 3, 2, 7, 5, 4, 6, 3, 2 ];

    // Dufnummer has format YYYYLLLLLL. 
    // Sum-product with weights are applied after rearranging to LLLLLLYYYY    
    const tallArray = tenFirstDigits.slice(4).concat(tenFirstDigits.slice(0,4));

    const sumF = tallArray.reduce((previous, current, index) => previous + current * weights[index], 0);
    const remainderF = sumF % 11;
    
    return remainderF;
}

function leggTilSjekksiffer(tiTallsStreng) {
    const toKontrollSifferStreng = regnUtSjekksiffer(tiTallsStreng);

    return tiTallsStreng + toKontrollSifferStreng;
}

function regnUtSjekksiffer(tiTallsStreng) {
    const tenFirstDigits = tiTallsStreng.split('').map(s => parseInt(s, 10));
    
    const kontrollSiffer = mod11DigitDuf(tenFirstDigits);
    
    const toKontrollSifferStreng = String(kontrollSiffer).padStart(2, "0");

    return toKontrollSifferStreng;
}

function erGyldigDufNummer(tolvTallStreng) {
    if (tolvTallStreng.length !== 12) {
        return false;
    }

    const tiTallsStreng = tolvTallStreng.substr(0, 10);

    const sjekkSifreStreng = regnUtSjekksiffer(tiTallsStreng);

    return tolvTallStreng === (tiTallsStreng + sjekkSifreStreng);
}
