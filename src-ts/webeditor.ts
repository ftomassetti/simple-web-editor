/// <reference path="defs/jquery.d.ts" />

class Editor {
    caretIndex: number;
    text: string;

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

    generateHtml() {
        return this.textBeforeCaret() 
                + "<span class='cursor-placeholder'>|</span>"
                + this.textAfterCaret();
    }

    type(c:string) {
        this.text = this.textBeforeCaret() + c + this.textAfterCaret();
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
    $("#editor")[0].innerHTML = (window as any).editor.generateHtml();
    var cursorPos = $(".cursor-placeholder").position();
    var delta = $(".cursor-placeholder").height() / 4.0;
    $(".blinking-cursor").css({top: cursorPos.top, left: cursorPos.left - delta});        
};

$( document ).ready(function() {        
    (window as any).editor = new Editor();

    updateHtml();
    $(document).keypress(function(e){
        var c = String.fromCharCode(e.which);   
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