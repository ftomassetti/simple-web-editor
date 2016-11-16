/// <reference path="defs/jquery.d.ts" />

class Editor {
    private caretIndex: number;
    private text: string;

    constructor() {
        this.caretIndex = 0;
        this.text = "";
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
        return text.replace("\n", "<br/>");
    }

    generateHtml() {
        return this.toHtml(this.textBeforeCaret())
                + "<span class='cursor-placeholder'>|</span>"
                + this.toHtml(this.textAfterCaret());
    }

    type(c:string) {
        console.log("ADDING " + c);
        this.text = this.textBeforeCaret() + c + this.textAfterCaret();
        console.log("TEXT '" + this.text+"'");
        this.caretIndex = this.caretIndex + 1;
    }

    deleteChar() : boolean {
        if (this.textBeforeCaret().length > 0) {
            this.text = this.textBeforeCaret().substring(0, this.textBeforeCaret().length - 1) + this.textAfterCaret();
            this.caretIndex--;
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
    $("#content")[0].innerHTML = (window as any).editor.generateHtml();
    var cursorPos = $(".cursor-placeholder").position();
    var delta = $(".cursor-placeholder").height() / 4.0;
    $(".blinking-cursor").css({top: cursorPos.top, left: cursorPos.left - delta});        
};

$( document ).ready(function() {        
    (window as any).editor = new Editor();

    updateHtml();
    $(document).keypress(function(e){
        var c = String.fromCharCode(e.which);        
        if (e.which == 13) {
            c = "\n";
        }
        (window as any).editor.type(c);        
        updateHtml();
    });
    $(document).keydown(function(e){
        if (e.which == 8 && (window as any).editor.deleteChar()) {            
            updateHtml();
        };
        if (e.which == 37 && (window as any).editor.moveLeft()) {
            updateHtml();
        };
        if (e.which == 39 && (window as any).editor.moveRight()) {
            updateHtml();
        };
    });
});