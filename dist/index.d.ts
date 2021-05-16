declare class WordCounter {
    getWordCount(content: string, needFilterTag?: boolean): number;
    filterTag(text: string): string;
}
declare const wordCounter: WordCounter;
export default wordCounter;
