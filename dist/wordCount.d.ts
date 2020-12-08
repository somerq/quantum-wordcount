export = wordCounter;
declare var wordCounter: WordCounter;
declare class WordCounter {
    mBreakSpaceRanges: any[];
    mFullWidthCharRanges: any[];
    getWordCount(content: any): number;
    isBreakSpace(str: any): boolean;
    isFullWidthChar(str: any): boolean;
    compareCode(str: any, codeArr: any): boolean;
}
