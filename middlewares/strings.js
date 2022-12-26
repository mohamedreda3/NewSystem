module.exports = class Strings {
    constructor() { }
    convertFirstLetterToUpper(string) {
        return string[0].toUpperCase() + string.toLowerCase().substring(1, (string.length));
    }

}