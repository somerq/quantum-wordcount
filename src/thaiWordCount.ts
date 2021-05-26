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
            words = words.split('\n');
        }

        for (let word of words) {
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
        let path = this.wordTree;
        for (let c of word) {
            if (!path[c]) {
                path[c] = {};
            }
            path = path[c];
        }
    }

    queryWordTree(word: any) {
        let isFound = true;
        let path = this.wordTree;
        for (let c of word) {
            if (!path[c]) {
                isFound = false;
                break;
            }
            path = path[c];
        }
        return isFound;
    }

    tokenize(content: string) {
        content = this.filterSymbols(content);
        content = this.convertLowerCase(content);

        console.log('handled content 3', content);
    
        const workingArray = content.split(' ');
        console.log('workingArray', workingArray);
        const resultArray = [];
    
        for (let str of workingArray) {
            if (str.search(/[ก-๙]/) >= 0) {
                const thaiTokens = this.breakThaiWords(str);
                for (let j in thaiTokens) {
                    if (thaiTokens.hasOwnProperty(j)) {
                        str = thaiTokens[j];
                        if (str.length > 0) {
                            resultArray.push(str);
                        }
                    }
                }
                // Object.values(thaiTokens).forEach(item => {
                //     if (item.length > 0) {
                //         resultArray.push(str);
                //     }
                // });
            } else {
                if (str.length > 0) {
                    resultArray.push(str);
                }
            }
        }
        return resultArray;
    }

    filterSymbols(content: string) {
        content = content.replace(/(\n)/g, '').replace(/[^a-z0-9ก-๙]/gi, ' ');
        console.log('handled content 1', content);
        return content;
    }

    convertLowerCase(content: string) {
        content = content.toLowerCase();
        console.log('handled content 2', content);
        return content;
    }

    breakThaiWords(word: any) {
        let words = [];
        let index = 0;
        let currentWord = '';
        let spareWord = '';
        let badWord = '';
        let nextWordAble = false;
        for (let i = 0; i < word.length; i++) {
            const c = word[i];
            const checkWord = currentWord + c;
    
            if (this.queryWordTree(checkWord)) {
                currentWord = checkWord;
                if (this.thaiWords[currentWord]) {
                    if (badWord !== '') {
                        words[index] = badWord.substring(0, badWord.length - 1);
                        badWord = '';
                        index++;
                    }
    
                    if (this.compoundWords[checkWord]) {
                        const brokenWords = this.compoundWords[checkWord]
                        for (let j in brokenWords) {
                            if (brokenWords.hasOwnProperty(j)) {
                                words[index++] = brokenWords[j];
                            }
                        }
                        // Object.values(brokenWords).forEach(item => {
                        //     words[index++] = item;
                        // });
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
                    if (badWord === '') {
                        badWord = currentWord + c;
                    } else {
                        badWord += c;
                    }
                    currentWord = c;
                }
            }
        }
        if (badWord !== '') {
            words[index] = badWord;
        }
        return words;
    }
}

export default ThaiWordCount;
