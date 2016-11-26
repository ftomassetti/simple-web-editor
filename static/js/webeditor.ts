/// <reference path="defs/jquery.d.ts" />

export class Editor {
    private caretIndex: number;
    private nLines: number;
    private text: string;

    constructor(initialText = "", initialIndex = 0) {
        if (initialIndex > initialText.length) {
            throw new Error("Invalid initial index")
        }
        this.caretIndex = initialIndex;
        this.text = initialText;
        this.nLines = (this.text.match(/\n/g) || []).length + 1;
    }

    textBeforeCaret() {
        if (this.caretIndex == 0) {
            return "";
        } else {
            return this.text.substring(0, this.caretIndex);
        }
    }

    textAfterCaret() {
        if (this.caretIndex  == this.text.length) {
            return "";
        } else {
            return this.text.substring(this.caretIndex );
        }
    }

    currentLine() : number {
        return (this.textBeforeCaret().match(/\n/g) || []).length
    }

    currentIndex() : number {
        return this.caretIndex;
    }

    numberOfLines() : number  {
        return this.nLines
    }

    private currentColumn() : number  {
        var i = this.textBeforeCaret().lastIndexOf("\n")
        if (i == -1) {
            return this.caretIndex;
        }
        return this.caretIndex - i - 1
    }

    private numberOfColumnsForLine(line: number) : number  {
        var lines = (this.text.match(/[^\r\n]+/g) || [])
        return lines[line].length
    }

    private goTo(line: number, column: number) {
        var newIndex = 0
        if (line >= this.numberOfLines()) {
            line = this.numberOfLines() - 1
        }
        if (column >= this.numberOfColumnsForLine(line)) {
            column = this.numberOfColumnsForLine(line) - 1
        }
        for (var i=0;i<line;i++) {
            newIndex = this.text.indexOf("\n", newIndex) + 1;
        }
        newIndex += column;
        this.caretIndex = newIndex
    }

    private toHtml(text) {
        return text.replace(/\n/g, "<br/>");
    }

    private removeLine() {
        if (this.nLines == 0) {
            return;
        }
        this.nLines--;
    }

    private addLine() {
        this.nLines++;
    }

    generateContentHtml() {
        return this.toHtml(this.textBeforeCaret())
            + "<span class='cursor-placeholder'>|</span>"
            + this.toHtml(this.textAfterCaret());
    }

    generateLinesHtml() {
        var code = "";
        for (var i=1;i<=this.nLines;i++) {
            code += "<span>" + i + "</span><br/>";
        }
        return code;
    }

    type(c:string) {
        if (c == '\n') {
            this.addLine();
        }
        this.text = this.textBeforeCaret() + c + this.textAfterCaret();
        this.caretIndex = this.caretIndex + 1;
    }

    deletePrevChar() : boolean {
        if (this.textBeforeCaret().length > 0) {
            if (this.text[this.caretIndex - 1] == '\n') {
                this.removeLine();
            }
            this.text = this.textBeforeCaret().substring(0, this.textBeforeCaret().length - 1) + this.textAfterCaret();
            this.caretIndex--;
            return true;
        } else {
            return false;
        }
    }

    deleteNextChar() : boolean {
        if (this.textAfterCaret().length > 0) {
            if (this.text[this.caretIndex + 1] == '\n') {
                this.removeLine();
            }
            this.text = this.textBeforeCaret() + this.textAfterCaret().substr(1);
            return true;
        } else {
            return false;
        }
    }

    moveLeft() : boolean {
        if (this.caretIndex == 0) {
            return false;
        } else {
            this.caretIndex--;
            return true;
        }
    }

    moveRight() : boolean {
        if (this.caretIndex == this.text.length) {
            return false;
        } else {
            this.caretIndex++;
            return true;
        }
    }

    moveUp() : boolean {
        if (this.currentLine() == 0) {
            return false;
        } else {
            this.goTo(this.currentLine() - 1, this.currentColumn())
            return true;
        }
    }

    moveDown() : boolean {
        if (this.currentLine() == (this.numberOfLines() - 1)) {
            return false;
        } else {
            this.goTo(this.currentLine() + 1, this.currentColumn())
            return true;
        }
    }
}

