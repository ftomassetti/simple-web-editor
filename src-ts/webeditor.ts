/// <reference path="defs/jquery.d.ts" />

class Editor {
    private caretIndex: number;
    private nLines: number;
    private text: string;

    constructor() {
        this.caretIndex = 0;
        this.text = "";
        this.nLines = 1;
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
}

var updateHtml = function() {   
    $("#content")[0].innerHTML = (window as any).editor.generateContentHtml();
    $("#lines")[0].innerHTML = (window as any).editor.generateLinesHtml();
    var cursorPos = $(".cursor-placeholder").position();
    var delta = $(".cursor-placeholder").height() / 4.0;
    $(".blinking-cursor").css({top: cursorPos.top, left: cursorPos.left - delta});        
};

$( document ).ready(function() {        
    let editor = (window as any).editor = new Editor();

    updateHtml();
    $(document).keypress(function(e){
        var c = String.fromCharCode(e.which);        
        if (e.which == 13) {
            c = "\n";
        }
        editor.type(c);
        updateHtml();
    });
    $(document).keydown(function(e){
        if (e.which == 46 && editor.deleteNextChar()) {
            updateHtml();
        };
        if (e.which == 8 && editor.deletePrevChar()) {
            updateHtml();
        };
        if (e.which == 37 && editor.moveLeft()) {
            updateHtml();
        };
        if (e.which == 39 && editor.moveRight()) {
            updateHtml();
        };
    });
});