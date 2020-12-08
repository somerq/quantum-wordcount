import StringBuffer from 'quantum-stringbuffer';
import breakSpace from './breakSpace';
import fullWidthChars from './fullWidthChars';

class WordCounter {
    private mBreakSpaceRanges;
    private mFullWidthCharRanges;

    constructor() {
        this.mBreakSpaceRanges = breakSpace;
        this.mFullWidthCharRanges = fullWidthChars;
    }
    // 计算字数
    getWordCount(content: string, needFilterTag: boolean = true) {
        if (typeof content === 'undefined' || content === null) {
            return 0;
        }
        if (needFilterTag) {
            content = this.filterTag(content);
        }
        const wordBuffer = new StringBuffer();
        let clearBuffer = false;
        let wordCount = 0;
        // 按单个字符逐一遍历整个内容串
        const chars = content.split('');
        const count = chars.length;
        for (let i = 0; i < count; i++) {
            const c = chars[i];
            // 是否是单词拆分符号
            if (this.isBreakSpace(c)) {
                clearBuffer = true;
            } else {
                // 是否是全角字符、全形符号
                if (this.isFullWidthChar(c)) {
                    wordCount++;
                    clearBuffer = true;
                } else {
                    // 不满足情况时将此次遍历字符加入到Buffer中
                    wordBuffer.Append(c);
                }
            }
            // 末尾字符
            if (i == count - 1) {
                clearBuffer = true;
            }
            // 单词拆分符号、全角字符、字符末尾时clearBuffer为true
            if (clearBuffer) {
                clearBuffer = false;
                // 碰到以上3种情况时需要清空Buffer对象，字数需要累加
                if (!wordBuffer.IsEmpty()) {
                    wordBuffer.Clear();
                    wordCount++;
                }
            }
        }
        return wordCount;
    }
    // 过滤标签
    filterTag(text: string) {
        text = text.replace(/&nbsp;/g, ' ').replace(/<[\/p|br][^>]*>/gi, ' ').replace(/<\/?[a-z][^>]*>/gi, '').replace(/\s+/g, ' ');
        text = text.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        return text;
    }
    // 判断是否是单词拆分符号
    private isBreakSpace(str: string) {
        return this.compareCode(str, this.mBreakSpaceRanges);
    }
    // 判断是否是全角字符、全形符号
    private isFullWidthChar(str: string) {
        return this.compareCode(str, this.mFullWidthCharRanges);
    }
    // 判断字符是否在字符集区间内
    private compareCode(str: string, codeArr: Array<number | number[]>) {
        const code = str.charCodeAt(0);
        let _is = false;
        codeArr.forEach(item => {
            if (Array.isArray(item)) {
                const [min, max] = item;
                if (code >= min && code <= max) {
                    _is = true;
                }
            } else {
                if (code === item) {
                    _is = true;
                }
            }
        });
        return _is;
    }
}

const wordCounter = new WordCounter();

export default wordCounter;