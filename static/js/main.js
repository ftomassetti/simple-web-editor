/// <reference path="defs/require.d.ts" />
/// <reference path="./webeditor.ts" />
require.config({
    baseUrl: "/js"
});
requirejs(['webeditor'], function (WebEditor) {
    var updateHtml = function () {
        $("#content")[0].innerHTML = window.editor.generateContentHtml();
        $("#lines")[0].innerHTML = window.editor.generateLinesHtml();
        var cursorPos = $(".cursor-placeholder").position();
        var delta = $(".cursor-placeholder").height() / 4.0;
        $(".blinking-cursor").css({ top: cursorPos.top, left: cursorPos.left - delta });
    };
    $(document).ready(function () {
        var editor = window.editor = new WebEditor.Editor();
        updateHtml();
        $(document).keypress(function (e) {
            var c = String.fromCharCode(e.which);
            if (e.which == 13) {
                c = "\n";
            }
            editor.type(c);
            updateHtml();
        });
        $(document).keydown(function (e) {
            console.log("KD " + e.which);
            if (e.which == 46 && editor.deleteNextChar()) {
                updateHtml();
            }
            ;
            if (e.which == 8 && editor.deletePrevChar()) {
                updateHtml();
            }
            ;
            if (e.which == 37 && editor.moveLeft()) {
                updateHtml();
            }
            ;
            if (e.which == 39 && editor.moveRight()) {
                updateHtml();
            }
            ;
            if (e.which == 38 && editor.moveUp()) {
                updateHtml();
            }
            ;
            if (e.which == 40 && editor.moveDown()) {
                updateHtml();
            }
            ;
        });
    });
});
//# sourceMappingURL=main.js.map