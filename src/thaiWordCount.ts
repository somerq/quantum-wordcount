import dicts from './thaiDicts';
// import compounds from './thaiCompoundWords';

interface IThaiWords {
    [propName: string]: boolean;
}

interface IWordTree {
    [propName: string]: any;
}

interface ICompoundWords {
    [propName: string]: Array<string>;
}

class ThaiWordCount {
    thaiWords: IThaiWords = {};
    wordTree: IWordTree = {};
    compoundWords: ICompoundWords = {};

    constructor() {
        this.readDictionry(dicts);
    }

    readDictionry(words: Array<string> | string) {
        if (!Array.isArray(words)) {
            words = words.split("\n");
        }

        for (var i in words) {
            var word = words[i];
            if (word.length > 0) {
                if (word.search(/,/) >= 0) {
                    const compoundWord = word.split(':');
                    word = compoundWord[0];
                    this.compoundWords[word] = compoundWord[1].split(',');
                }
                this.thaiWords[word] = true;
                this.generateWordTree(word);
            }
        }
    }

    generateWordTree(word: any) {
        var path = this.wordTree;
        for (var i in word) {
            var c = word[i];
            if (!path[c]) {
                path[c] = {};
            }
            path = path[c];
        }
    }

    queryWordTree(word: any) {
        var isFound = true;
        var path = this.wordTree;
        for (var i in word) {
            var c = word[i];
            if (!path[c]) {
                isFound = false;
                break;
            }
            path = path[c];
        }
        return isFound;
    }

    tokenize(string: string) {
        string = this.filterSymbols(string);
        string = this.convertLowerCase(string);
    
        const workingArray = string.split(" ");
        var resultArray = [];
    
        for (var i in workingArray) {
            var string = workingArray[i];
            if (string.search(/[ก-๙]/) >= 0) {
                var thaiTokens = this.breakThaiWords(string);
                for (var j in thaiTokens) {
                    string = thaiTokens[j];
                    if (string.length > 0) {
                        resultArray.push(string);
                    }
                }
            } else {
                if (string.length > 0) {
                    resultArray.push(string);
                }
            }
        }
        return resultArray;
    }

    filterSymbols(data: string) {
        data = data.replace(/(\n)/g, '');
        data = data.replace(/[^a-z 0-9 ก-๙]/gi, ' ');
        return data;
    }

    convertLowerCase(string: string) {
        return string.toLowerCase();
    }

    breakThaiWords(string: any) {
        var words = [];
        var index = 0;
        var currentWord = '';
        var spareWord = '';
        var badWord = '';
        var nextWordAble = false;
        for (var i in string) {
            var c = string[i];
            var checkWord = currentWord + c;
    
            if (this.queryWordTree(checkWord)) {
                currentWord = checkWord;
                if (this.thaiWords[currentWord]) {
                    if (badWord != '') {
                        words[index] = badWord.substring(0, badWord.length - 1);
                        badWord = '';
                        index++;
                    }
    
                    if (this.compoundWords[checkWord]) {
                        const brokenWords = this.compoundWords[checkWord]
                        for (var j in brokenWords) {
                            words[index++] = brokenWords[j];
                        }
                        index--;
                    } else {
                        words[index] = checkWord;
                    }
                    spareWord = '';
                } else {
                    spareWord += c;
                }
                nextWordAble = true;
            } else {
                if (nextWordAble) {
                    nextWordAble = false;
                    currentWord = spareWord + c;
                    spareWord = c;
                    index++;
                } else {
                    if (badWord == '') {
                        badWord = currentWord + c;
                    } else {
                        badWord += c;
                    }
                    currentWord = c;
                }
            }
        }
        if (badWord != '') {
            words[index] = badWord;
        }
        return words;
    }
}

export default ThaiWordCount;
