/// <reference path="defs/jquery.d.ts" />
"use strict";
var Editor = (function () {
    function Editor(initialText) {
        if (initialText === void 0) { initialText = ""; }
        this.caretIndex = 0;
        this.text = initialText;
        this.nLines = 1;
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
    Editor.prototype.numberOfLines = function () {
        return this.nLines;
    };
    Editor.prototype.currentColumn = function () {
        var i = this.textBeforeCaret().lastIndexOf("\n");
        return this.caretIndex - i;
    };
    Editor.prototype.numberOfColumnsForLine = function (line) {
        var lines = (this.text.match(/\n/g) || []);
        return lines[line].length;
    };
    Editor.prototype.goTo = function (line, column) {
        var newIndex = 0;
        if (line >= this.numberOfLines()) {
            line = this.numberOfLines() - 1;
        }
        if (column >= this.numberOfColumnsForLine(line)) {
            column = this.numberOfColumnsForLine(line) - 1;
        }
        for (var i = 0; i < line; i++) {
            newIndex = this.text.indexOf("\n", newIndex);
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
    return Editor;
}());
exports.Editor = Editor;
