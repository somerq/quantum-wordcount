import StringBuffer from 'quantum-stringbuffer';
import breakSpace from './breakSpace';
import fullWidthChars from './fullWidthChars';
import ThaiWordCount from './thaiWordCount';

const thaiUnicode = [0x0E00, 0x0E7F];
const thaiContentRatio = 0.2;
const TWC = new ThaiWordCount();
// 判断是否是单词拆分符号
function isBreakSpace(str: string) {
    return compareCode(str, breakSpace);
}
// 判断是否是全角字符、全形符号
function isFullWidthChar(str: string) {
    return compareCode(str, fullWidthChars);
}
// 判断字符是否在字符集区间内
function compareCode(str: string, codeArr: Array<number | number[]>) {
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
// 验证是否为某种语言
function isLangOf(text: string, langUnicode: number[] | number, ratio: number = 0.5) {
    if (typeof text !== 'string' || !text) {
        console.log('Not a valid text.');
        return false;
    }

    if (!Array.isArray(langUnicode) && typeof langUnicode !== 'number') {
        console.log('Please enter a valid unicode range.');
        return false;
    }

    let score = 0;
    const textLength = text.length;
    const [min, max] = Array.isArray(langUnicode) ? langUnicode : [langUnicode, langUnicode];


    for (let i = 0; i < textLength; i++) {
        const charCode = text.charCodeAt(i);

        if (charCode >= min && charCode <= max) {
            score += 1;
        }
    }

    const scoreRatio = score / textLength;

    return scoreRatio >= ratio;
}

class WordCounter {
    // 计算字数
    getWordCount(content: string, needFilterTag: boolean = true) {
        if (typeof content === 'undefined' || content === null) {
            return 0;
        }
        if (needFilterTag) {
            content = this.filterTag(content);
        }
        if (isLangOf(content, thaiUnicode, thaiContentRatio)) {
            return TWC.tokenize(content).length;
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
            if (isBreakSpace(c)) {
                clearBuffer = true;
            } else {
                // 是否是全角字符、全形符号
                if (isFullWidthChar(c)) {
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
}

const wordCounter = new WordCounter();

export default wordCounter;