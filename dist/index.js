(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.QuantumWordCount = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn) {
	  var module = { exports: {} };
		return fn(module, module.exports), module.exports;
	}

	var dist = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
	     module.exports = factory() ;
	}(commonjsGlobal, (function () {
	    var StringBuffer = (function () {
	        function StringBuffer() {
	            var arg = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                arg[_i] = arguments[_i];
	            }
	            this.buffers = [];
	            this.length = 0;
	            this.splChar = '';
	            if (arg.length > 0) {
	                for (var i = 0, iLen = arg.length; i < iLen; i++) {
	                    this.Append(arg[i]);
	                }
	            }
	        }
	        StringBuffer.prototype.Restore = function () {
	            var arg = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                arg[_i] = arguments[_i];
	            }
	            this.buffers = [];
	            this.Append(arg[0]);
	            this.length = this.buffers.join(this.splChar).length;
	        };
	        StringBuffer.prototype.Append = function () {
	            var arg = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                arg[_i] = arguments[_i];
	            }
	            if (arg.length >= 1) {
	                this.length += arg[0].length;
	                this.buffers[this.buffers.length] = arg[0];
	                return true;
	            }
	            else {
	                return false;
	            }
	        };
	        StringBuffer.prototype.Remove = function () {
	            var arg = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                arg[_i] = arguments[_i];
	            }
	            var _iStart = arg[0];
	            var _iEnd = arg[1];
	            if (arg.length >= 2 && !isNaN(_iStart) && !isNaN(_iEnd)) {
	                var sReturn = this.buffers.join(this.splChar);
	                sReturn = sReturn.substring(0, _iStart) + sReturn.substring(_iStart + _iEnd, sReturn.length);
	                this.Restore(sReturn);
	                return sReturn;
	            }
	            else {
	                return this.buffers.join(this.splChar);
	            }
	        };
	        StringBuffer.prototype.Clear = function () {
	            this.buffers = [];
	            this.length = 0;
	            return true;
	        };
	        StringBuffer.prototype.Replace = function () {
	            var arg = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                arg[_i] = arguments[_i];
	            }
	            if (arg.length >= 2) {
	                var sReturn = this.buffers.join(this.splChar).replace(arg[0], arg[1]);
	                this.Restore(sReturn);
	                return sReturn;
	            }
	            else {
	                return this.buffers.join(this.splChar);
	            }
	        };
	        StringBuffer.prototype.IndexOf = function () {
	            var arg = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                arg[_i] = arguments[_i];
	            }
	            if (arg.length >= 1) {
	                return this.buffers.join(this.splChar).indexOf(arg[0]);
	            }
	            else {
	                return -1;
	            }
	        };
	        StringBuffer.prototype.ToString = function () {
	            return this.buffers.join(this.splChar);
	        };
	        StringBuffer.prototype.Length = function () {
	            if (this.splChar.length > 0 && (!this.IsEmpty())) {
	                return this.length + (this.splChar.length * (this.buffers.length - 1));
	            }
	            else {
	                return this.length;
	            }
	        };
	        StringBuffer.prototype.IsEmpty = function () {
	            return this.buffers.length <= 0;
	        };
	        return StringBuffer;
	    }());

	    return StringBuffer;

	})));
	});

	var breakSpace = [
	    0x20,
	    0x3000,
	    0x0A,
	    0x09,
	    0x0B,
	    0x0D,
	    0xA0
	];

	var fullWidthChars = [
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
	    [0x4E00, 0x9FFF],
	    [0xF900, 0xFAFF],
	    [0x3400, 0x4DBF],
	    [0x20000, 0x2A6DF],
	    [0x2000, 0x206F],
	    [0x02B0, 0x02FF],
	    [0x3000, 0x303F],
	    [0x3300, 0x33FF],
	    [0xFE30, 0xFE4F],
	    [0x1100, 0x11FF],
	    [0x20A0, 0x20CF],
	    [0x2700, 0x27BF],
	    [0x25A0, 0x25FF],
	    [0xAC00, 0xD7AF],
	    [0x3130, 0x318F],
	    [0xA960, 0xA97F],
	    [0xD7B0, 0xD7FF],
	    [0xFE10, 0xFE1F],
	    [0x31F0, 0x31FF],
	    [0x30A0, 0x30FF],
	    [0x3040, 0x309F],
	    [0xFF00, 0xFFEF],
	    [0x0300, 0x036F]
	];

	var WordCounter = (function () {
	    function WordCounter() {
	        this.mBreakSpaceRanges = breakSpace;
	        this.mFullWidthCharRanges = fullWidthChars;
	    }
	    WordCounter.prototype.getWordCount = function (content, needFilterTag) {
	        if (needFilterTag === void 0) { needFilterTag = true; }
	        if (typeof content === 'undefined' || content === null) {
	            return 0;
	        }
	        if (needFilterTag) {
	            content = this.filterTag(content);
	        }
	        var wordBuffer = new dist();
	        var clearBuffer = false;
	        var wordCount = 0;
	        var chars = content.split('');
	        var count = chars.length;
	        for (var i = 0; i < count; i++) {
	            var c = chars[i];
	            if (this.isBreakSpace(c)) {
	                clearBuffer = true;
	            }
	            else {
	                if (this.isFullWidthChar(c)) {
	                    wordCount++;
	                    clearBuffer = true;
	                }
	                else {
	                    wordBuffer.Append(c);
	                }
	            }
	            if (i == count - 1) {
	                clearBuffer = true;
	            }
	            if (clearBuffer) {
	                clearBuffer = false;
	                if (!wordBuffer.IsEmpty()) {
	                    wordBuffer.Clear();
	                    wordCount++;
	                }
	            }
	        }
	        return wordCount;
	    };
	    WordCounter.prototype.filterTag = function (text) {
	        text = text.replace(/&nbsp;/g, ' ').replace(/<[\/p|br][^>]*>/gi, ' ').replace(/<\/?[a-z][^>]*>/gi, '').replace(/\s+/g, ' ');
	        text = text.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	        return text;
	    };
	    WordCounter.prototype.isBreakSpace = function (str) {
	        return this.compareCode(str, this.mBreakSpaceRanges);
	    };
	    WordCounter.prototype.isFullWidthChar = function (str) {
	        return this.compareCode(str, this.mFullWidthCharRanges);
	    };
	    WordCounter.prototype.compareCode = function (str, codeArr) {
	        var code = str.charCodeAt(0);
	        var _is = false;
	        codeArr.forEach(function (item) {
	            if (Array.isArray(item)) {
	                var min = item[0], max = item[1];
	                if (code >= min && code <= max) {
	                    _is = true;
	                }
	            }
	            else {
	                if (code === item) {
	                    _is = true;
	                }
	            }
	        });
	        return _is;
	    };
	    return WordCounter;
	}());
	var wordCounter = new WordCounter();

	return wordCounter;

})));
