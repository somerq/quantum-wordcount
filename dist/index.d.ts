declare class WordCounter {
    private mBreakSpaceRanges;
    private mFullWidthCharRanges;
    constructor();
    getWordCount(content: string, needFilterTag?: boolean): number;
    filterTag(text: string): string;
    private isBreakSpace;
    private isFullWidthChar;
    private compareCode;
}
declare const wordCounter: WordCounter;
export default wordCounter;
