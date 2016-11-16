/// <reference path="defs/jquery.d.ts" />
var textBeforeCaret = function () {
    if (window.caret_index == 0) {
        return "";
    }
    else {
        return window.text.substring(0, window.caret_index);
    }
};
var textAfterCaret = function () {
    if (window.caret_index == window.text.length) {
        return "";
    }
    else {
        return window.text.substring(window.caret_index);
    }
};
var htmlGen = function () {
    if (window.caret_index < 0) {
        window.caret_index = 0;
    }
    if (window.caret_index > window.text.length) {
        window.caret_index = window.text.length;
    }
    $("#editor")[0].innerHTML = textBeforeCaret()
        + "<span class='cursor-placeholder'>|</span>"
        + textAfterCaret();
    var cursorPos = $(".cursor-placeholder").position();
    var delta = $(".cursor-placeholder").height() / 4.0;
    $(".blinking-cursor").css({ top: cursorPos.top, left: cursorPos.left - delta });
};
$(document).ready(function () {
    console.log("ready!");
    window.text = "";
    window.caret_index = 0;
    htmlGen();
    $(document).keypress(function (e) {
        // type
        //console.log("EVENT " + JSON.stringify(e));   
        var c = String.fromCharCode(e.which);
        window.text = textBeforeCaret() + c + textAfterCaret();
        window.caret_index = window.caret_index + 1;
        htmlGen();
    });
    $(document).keydown(function (e) {
        if (e.which == 8 && textBeforeCaret().length > 0) {
            window.text = textBeforeCaret().substring(0, textBeforeCaret().length - 1) + textAfterCaret();
            window.caret_index = window.caret_index - 1;
            htmlGen();
        }
        ;
        if (e.which == 37) {
            // arrow left
            window.caret_index = window.caret_index - 1;
            htmlGen();
        }
        ;
        if (e.which == 39) {
            // arrow right
            window.caret_index = window.caret_index + 1;
            htmlGen();
        }
        ;
    });
});
