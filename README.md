# norsk-nummer-validering

Eksempler og info om noen hyppig brukte norske numre; fødselsnummer, DUF-nummer, KID-nummer.

Burde være riktig info og test-resultat, men garanti gis ikke.

## Online test

https://tonneask.github.io/norsk-nummer-validering/

Koden bak ligger i [docs/](docs/)

## Litt info om nummertypene

### Fødselsnummer

* Skattetaten og Folkeregisteret
* 11 siffer
* Oppbygging: DD MM YY III KK
  * DD, MM, YY
    * Vanligvis fødseldato. Finnes unntak for f.eks. D-nummer.
  * III
    * Individnummer. Kan ofte utlede kjønn, årstall o.l.
  * KK
    * To kontrollsifre til slutt.
* Algoritme: Vektet Mod11. 
  * Egen utregning for hvert av kontrollsifrene.
  * Egne vekter for hver utregning.
* Masse info på nett om oppbygging og algoritme.

### DUF-nummer

* UDI
* 12 siffer
* Oppbygging: YYYY LLLLLL KK
  * YYYY: Årstall
  * LLLLLL: Løpenummer
  * KK: Kontroll-siffer
* Algoritme: Vektet Mod11. 
* Lite info på nett om algoritme.

### KID-nummer

* Bank/betaling
* 2-25 siffer
* Oppbygging: xxxx K
  * xxxx
    * Et variabelt antall sifre.
    * Inneholder ofte kundenummer, fakturanummer o.l.
  * K
    * Kontrollsiffer
* Algoritme:
  * Enten: Standard Mod10/Luhn
  * Eller: Vektet Mod11
* Noe info på nett.

### Kontonummer

* Bank/betaling
* 11 siffer
* Oppbygging: BBBB GG OOOO K
  * BBBB: Bankregisternummer
  * GG: Kontogruppe
  * OOOO: Kundekontonummer
  * K: Kontrollsiffer
* Algoritme: Vektet Mod11.
* Noe info på nett.

### Mod11-algoritmen

* Likt for fødselsnummer, KID-nummer og kontonummer:
  * Regn ut sum-produkt av nummer og vekter
    * `11 - (sum_produkt % 11)`
      * `10 -> -` (minus-tegn/ugyldig/ikke tillatt)
      * `11 -> 0`
* Fødselsnummer - vekter
  * Første kontroll-siffer: `[3, 7, 6, 1, 8, 9, 4, 5, 2]`
  * Andre kontroll-siffer :  `[5, 4, 3, 2, 7, 6, 5, 4, 3, 2]`
  * Fra venstre til høyre.
* Kontonummer og KID-nummer - vekter:
  * `[2, 3, 4, 5, 6, 7, 2, 3, ....]` 
  * Fra høyre til venstre.  
    * I praksis samme framgangsmåte som andre kontroll-siffer i fødselsnummer
* DUF-nummer:
  * `[4, 6, 3, 2, 7, 5, 4, 6, 3, 2]`
  * Fra venstre til høyre.
  * For "omstokket format" LLLLLL YYYY
  * Regn ut sum-produkt av nummer og vekter
    * `sum_produkt % 11`
      * `10 -> 10`
      * `5 -> 05`
      * `0 -> 00`


## Kanskje nyttig

* https://github.com/navikt/fnrvalidator/  
  Fødselsnummer-validering i JavaScript laget av NAV.

* https://no.wikipedia.org/wiki/F%C3%B8dselsnummer  
  Wikipedia-artikkel med det meste som er verdt å vite om fødselsnummer.

* https://no.wikipedia.org/wiki/Kontonummer  
  Wikipedia-artikkel med det meste som er verdt å vite om kontonummer

* https://www.lefdal.cc/div/moduluskontroll.php  
  Alf Kåre Lefdal sin blogg går gjennom matematikken i validering av ulike nummere med modulus-algortimer.
  
* https://lovas.info/2013/12/01/identitetsnummer-i-norge/  
  Snorre Løvås sin blogg beskriver blandt annet validering og oppbygging av DUF-nummer.
