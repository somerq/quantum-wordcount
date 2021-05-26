interface IThaiWords {
    [propName: string]: boolean;
}
interface IWordTree {
    [propName: string]: any;
}
interface ICompoundWords {
    [propName: string]: Array<string>;
}
declare class ThaiWordCount {
    thaiWords: IThaiWords;
    wordTree: IWordTree;
    compoundWords: ICompoundWords;
    constructor();
    readDictionry(words: Array<string> | string): void;
    generateWordTree(word: any): void;
    queryWordTree(word: any): boolean;
    tokenize(content: string): string[];
    filterSymbols(content: string): string;
    convertLowerCase(content: string): string;
    breakThaiWords(word: any): string[];
}
export default ThaiWordCount;
