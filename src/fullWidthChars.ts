/**
 * 全字符
 */
const fullWidthChars: Array<number | number[]> = [
    0x80,
    0x82,
    [0x84, 0x89],
    0x8B,
    [0x91, 0x99],
    0x9B,
    0xA1,
    0xA4,
    [0xA7, 0xA8],
    0xAF,
    [0xB0, 0xB1],
    [0xB4, 0xB8],
    [0xBC, 0xBF],
    0xF7,
    0xD7,
    // CJK_UNIFIED_IDEOGRAPHS
    [0x4E00, 0x9FFF],
    // CJK_COMPATIBILITY_IDEOGRAPHS
    [0xF900, 0xFAFF],
    // CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A
    [0x3400, 0x4DBF],
    // CJK_UNIFIED_IDEOGRAPHS_EXTENSION_B
    [0x20000, 0x2A6DF],
    // GENERAL_PUNCTUATION
    [0x2000, 0x206F],
    // SPACING_MODIFIER_LETTERS
    [0x02B0, 0x02FF],
    // CJK_SYMBOLS_AND_PUNCTUATION
    [0x3000, 0x303F],
    // CJK_COMPATIBILITY
    [0x3300, 0x33FF],
    // CJK_COMPATIBILITY_FORMS
    [0xFE30, 0xFE4F],
    // HANGUL_JAMO
    [0x1100, 0x11FF],
    // CURRENCY_SYMBOLS
    [0x20A0, 0x20CF],
    // DINGBATS
    [0x2700, 0x27BF],
    // GEOMETRIC_SHAPES
    [0x25A0, 0x25FF],
    // HANGUL_SYLLABLES
    [0xAC00, 0xD7AF],
    // HANGUL_COMPATIBILITY_JAMO
    [0x3130, 0x318F],
    // HANGUL_JAMO_EXTENDED_A
    [0xA960, 0xA97F],
    // HANGUL_JAMO_EXTENDED_B
    [0xD7B0, 0xD7FF],
    // VERTICAL_FORMS
    [0xFE10, 0xFE1F],
    // KATAKANA_PHONETIC_EXTENSIONS
    [0x31F0, 0x31FF],
    // KATAKANA
    [0x30A0, 0x30FF],
    // HIRAGANA
    [0x3040, 0x309F],
    // HALFWIDTH_AND_FULLWIDTH_FORMS
    [0xFF00, 0xFFEF],
    // Combining Diacritical Marks
    [0x0300, 0x036F]
];

export default fullWidthChars;