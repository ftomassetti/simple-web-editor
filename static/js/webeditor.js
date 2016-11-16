/// <reference path="defs/jquery.d.ts" />
var Editor = (function () {
    function Editor() {
        this.caretIndex = 0;
        this.text = "";
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
    Editor.prototype.deleteChar = function () {
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
    return Editor;
}());
var updateHtml = function () {
    $("#content")[0].innerHTML = window.editor.generateContentHtml();
    $("#lines")[0].innerHTML = window.editor.generateLinesHtml();
    var cursorPos = $(".cursor-placeholder").position();
    var delta = $(".cursor-placeholder").height() / 4.0;
    $(".blinking-cursor").css({ top: cursorPos.top, left: cursorPos.left - delta });
};
$(document).ready(function () {
    window.editor = new Editor();
    updateHtml();
    $(document).keypress(function (e) {
        var c = String.fromCharCode(e.which);
        if (e.which == 13) {
            c = "\n";
        }
        window.editor.type(c);
        updateHtml();
    });
    $(document).keydown(function (e) {
        if (e.which == 8 && window.editor.deleteChar()) {
            updateHtml();
        }
        ;
        if (e.which == 37 && window.editor.moveLeft()) {
            updateHtml();
        }
        ;
        if (e.which == 39 && window.editor.moveRight()) {
            updateHtml();
        }
        ;
    });
});
