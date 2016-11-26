/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="../defs/require.d.ts" />
	/// <reference path="../defs/qunit.d.ts" />
	/// <reference path="../webeditor.ts" />
	var webeditor_1 = __webpack_require__(1);
	QUnit.test("default editor", function (assert) {
	    var editor = new webeditor_1.Editor();
	    assert.ok("" == editor.textBeforeCaret());
	    assert.ok("" == editor.textAfterCaret());
	    assert.ok(1 == editor.numberOfLines());
	    assert.ok(0 == editor.currentLine());
	    assert.ok(0 == editor.currentColumn(), "Column is instead " + editor.currentColumn());
	});
	QUnit.test("test numberOfColumnsForLine", function (assert) {
	    var editor = new webeditor_1.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 0);
	    assert.ok(17 == editor.numberOfColumnsForLine(0));
	    assert.ok(21 == editor.numberOfColumnsForLine(1));
	    assert.ok(13 == editor.numberOfColumnsForLine(2));
	    assert.ok(26 == editor.numberOfColumnsForLine(3));
	});
	QUnit.test("editor with a few lines (i=0)", function (assert) {
	    var editor = new webeditor_1.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 0);
	    assert.ok("" == editor.textBeforeCaret(), editor.textBeforeCaret());
	    assert.ok("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened." == editor.textAfterCaret(), editor.textAfterCaret());
	    assert.ok(4 == editor.numberOfLines(), "" + editor.numberOfLines());
	    assert.ok(0 == editor.currentLine());
	    assert.ok(0 == editor.currentColumn(), "Column is instead " + editor.currentColumn());
	});
	QUnit.test("editor with a few lines (i=15)", function (assert) {
	    var editor = new webeditor_1.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 15);
	    assert.ok("Hi, I am Federi" == editor.textBeforeCaret(), editor.textBeforeCaret());
	    assert.ok("co\nI am using TypeScript\nWriting tests\nWondering why JS happened." == editor.textAfterCaret(), editor.textAfterCaret());
	    assert.ok(4 == editor.numberOfLines(), "" + editor.numberOfLines());
	    assert.ok(0 == editor.currentLine());
	    assert.ok(15 == editor.currentColumn(), "Column is instead " + editor.currentColumn());
	});
	QUnit.test("editor with a few lines (i=20)", function (assert) {
	    var editor = new webeditor_1.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 20);
	    assert.ok("Hi, I am Federico\nI " == editor.textBeforeCaret(), editor.textBeforeCaret());
	    assert.ok("am using TypeScript\nWriting tests\nWondering why JS happened." == editor.textAfterCaret(), editor.textAfterCaret());
	    assert.ok(4 == editor.numberOfLines(), "" + editor.numberOfLines());
	    assert.ok(1 == editor.currentLine());
	    assert.ok(2 == editor.currentColumn(), "Column is instead " + editor.currentColumn());
	});
	QUnit.test("editor with a few lines (i=29)", function (assert) {
	    var editor = new webeditor_1.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 29);
	    assert.ok("Hi, I am Federico\nI am using " == editor.textBeforeCaret(), editor.textBeforeCaret());
	    assert.ok("TypeScript\nWriting tests\nWondering why JS happened." == editor.textAfterCaret(), editor.textAfterCaret());
	    assert.ok(4 == editor.numberOfLines());
	    assert.ok(1 == editor.currentLine());
	    assert.ok(11 == editor.currentColumn(), "Column is instead " + editor.currentColumn());
	});
	QUnit.test("editor moving up", function (assert) {
	    var editor = new webeditor_1.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 29);
	    assert.ok(1 == editor.currentLine());
	    assert.ok(29 == editor.currentIndex());
	    assert.ok(11 == editor.currentColumn(), "Column is instead " + editor.currentColumn());
	    assert.ok(true == editor.moveUp());
	    assert.ok(0 == editor.currentLine());
	    assert.ok(11 == editor.currentColumn(), "Column is instead " + editor.currentColumn());
	    assert.ok(11 == editor.currentIndex(), "Index is instead " + editor.currentIndex());
	    assert.ok("Hi, I am Fe" == editor.textBeforeCaret(), editor.textBeforeCaret());
	    assert.ok("derico\nI am using TypeScript\nWriting tests\nWondering why JS happened." == editor.textAfterCaret(), editor.textAfterCaret());
	});
	QUnit.test("editor moving up twice", function (assert) {
	    var editor = new webeditor_1.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 29);
	    assert.ok(true == editor.moveUp());
	    assert.ok(false == editor.moveUp());
	    assert.ok("Hi, I am Fe" == editor.textBeforeCaret(), editor.textBeforeCaret());
	    assert.ok("derico\nI am using TypeScript\nWriting tests\nWondering why JS happened." == editor.textAfterCaret(), editor.textAfterCaret());
	    assert.ok(0 == editor.currentLine());
	    assert.ok(11 == editor.currentColumn(), "Column is instead " + editor.currentColumn());
	    assert.ok(11 == editor.currentIndex(), "Index is instead " + editor.currentIndex());
	});
	QUnit.test("editor moving down", function (assert) {
	    var editor = new webeditor_1.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 29);
	    assert.ok(true == editor.moveDown());
	    assert.ok(2 == editor.currentLine(), "Actual current line " + editor.currentLine());
	    assert.ok(11 == editor.currentColumn(), "Column is instead " + editor.currentColumn());
	});
	QUnit.test("editor moving down twice", function (assert) {
	    var editor = new webeditor_1.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 29);
	    assert.ok(true == editor.moveDown());
	    assert.ok(true == editor.moveDown());
	    assert.ok(3 == editor.currentLine());
	    assert.ok(11 == editor.currentColumn(), "Column is instead " + editor.currentColumn());
	});
	QUnit.test("editor moving down three times", function (assert) {
	    var editor = new webeditor_1.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 29);
	    assert.ok(true == editor.moveDown());
	    assert.ok(true == editor.moveDown());
	    assert.ok(false == editor.moveDown());
	    assert.ok(3 == editor.currentLine());
	    assert.ok(11 == editor.currentColumn(), "Column is instead " + editor.currentColumn());
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	/// <reference path="defs/jquery.d.ts" />
	"use strict";
	var Editor = (function () {
	    function Editor(initialText, initialIndex) {
	        if (initialText === void 0) { initialText = ""; }
	        if (initialIndex === void 0) { initialIndex = 0; }
	        if (initialIndex > initialText.length) {
	            throw new Error("Invalid initial index");
	        }
	        this.caretIndex = initialIndex;
	        this.text = initialText;
	        this.nLines = (this.text.match(/\n/g) || []).length + 1;
	    }
	    Editor.prototype.textBeforeCaret = function () {
	        if (this.caretIndex == 0) {
	            return "";
	        }
	        else {
	            return this.text.substring(0, this.caretIndex);
	        }
	    };
	    Editor.prototype.textAfterCaret = function () {
	        if (this.caretIndex == this.text.length) {
	            return "";
	        }
	        else {
	            return this.text.substring(this.caretIndex);
	        }
	    };
	    Editor.prototype.currentLine = function () {
	        return (this.textBeforeCaret().match(/\n/g) || []).length;
	    };
	    Editor.prototype.currentIndex = function () {
	        return this.caretIndex;
	    };
	    Editor.prototype.numberOfLines = function () {
	        return this.nLines;
	    };
	    Editor.prototype.currentColumn = function () {
	        var i = this.textBeforeCaret().lastIndexOf("\n");
	        if (i == -1) {
	            return this.caretIndex;
	        }
	        return this.caretIndex - i - 1;
	    };
	    Editor.prototype.numberOfColumnsForLine = function (line) {
	        var lines = (this.text.match(/[^\r\n]+/g) || []);
	        return lines[line].length;
	    };
	    Editor.prototype.goTo = function (line, column) {
	        var newIndex = 0;
	        if (line >= this.numberOfLines()) {
	            line = this.numberOfLines() - 1;
	        }
	        if (column > this.numberOfColumnsForLine(line)) {
	            column = this.numberOfColumnsForLine(line);
	        }
	        for (var i = 0; i < line; i++) {
	            newIndex = this.text.indexOf("\n", newIndex) + 1;
	        }
	        newIndex += column;
	        this.caretIndex = newIndex;
	    };
	    Editor.prototype.toHtml = function (text) {
	        return text.replace(/\n/g, "<br/>");
	    };
	    Editor.prototype.removeLine = function () {
	        if (this.nLines == 0) {
	            return;
	        }
	        this.nLines--;
	    };
	    Editor.prototype.addLine = function () {
	        this.nLines++;
	    };
	    Editor.prototype.generateContentHtml = function () {
	        return this.toHtml(this.textBeforeCaret())
	            + "<span class='cursor-placeholder'>|</span>"
	            + this.toHtml(this.textAfterCaret());
	    };
	    Editor.prototype.generateLinesHtml = function () {
	        var code = "";
	        for (var i = 1; i <= this.nLines; i++) {
	            code += "<span>" + i + "</span><br/>";
	        }
	        return code;
	    };
	    Editor.prototype.type = function (c) {
	        if (c == '\n') {
	            this.addLine();
	        }
	        this.text = this.textBeforeCaret() + c + this.textAfterCaret();
	        this.caretIndex = this.caretIndex + 1;
	    };
	    Editor.prototype.deletePrevChar = function () {
	        if (this.textBeforeCaret().length > 0) {
	            if (this.text[this.caretIndex - 1] == '\n') {
	                this.removeLine();
	            }
	            this.text = this.textBeforeCaret().substring(0, this.textBeforeCaret().length - 1) + this.textAfterCaret();
	            this.caretIndex--;
	            return true;
	        }
	        else {
	            return false;
	        }
	    };
	    Editor.prototype.deleteNextChar = function () {
	        if (this.textAfterCaret().length > 0) {
	            if (this.text[this.caretIndex + 1] == '\n') {
	                this.removeLine();
	            }
	            this.text = this.textBeforeCaret() + this.textAfterCaret().substr(1);
	            return true;
	        }
	        else {
	            return false;
	        }
	    };
	    Editor.prototype.moveLeft = function () {
	        if (this.caretIndex == 0) {
	            return false;
	        }
	        else {
	            this.caretIndex--;
	            return true;
	        }
	    };
	    Editor.prototype.moveRight = function () {
	        if (this.caretIndex == this.text.length) {
	            return false;
	        }
	        else {
	            this.caretIndex++;
	            return true;
	        }
	    };
	    Editor.prototype.moveUp = function () {
	        if (this.currentLine() == 0) {
	            return false;
	        }
	        else {
	            this.goTo(this.currentLine() - 1, this.currentColumn());
	            return true;
	        }
	    };
	    Editor.prototype.moveDown = function () {
	        if (this.currentLine() == (this.numberOfLines() - 1)) {
	            return false;
	        }
	        else {
	            this.goTo(this.currentLine() + 1, this.currentColumn());
	            return true;
	        }
	    };
	    Editor.prototype.goToStartOfLine = function () {
	        this.goTo(this.currentLine(), 0);
	    };
	    Editor.prototype.goToEndOfLine = function () {
	        this.goTo(this.currentLine(), this.numberOfColumnsForLine(this.currentLine()));
	    };
	    return Editor;
	}());
	exports.Editor = Editor;


/***/ }
/******/ ]);