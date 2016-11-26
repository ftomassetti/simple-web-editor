define(["require", "exports", "./webeditor"], function (require, exports, webeditor_1) {
    "use strict";
    //import "JsonLexer"
    //import WebEditor = require("webeditor")
    /*var antlr4 = require('antlr4/index');
    var TodoLexer = require('generated-parser/todoLexer');
    var TodoParser = require('generated-parser/todoParser');
    document.getElementById("parse").addEventListener("click", function(){
        var input = document.getElementById("code").value;
        var chars = new antlr4.InputStream(input);
        var lexer = new TodoLexer.todoLexer(chars);
        var tokens  = new antlr4.CommonTokenStream(lexer);
        var parser = new TodoParser.todoParser(tokens);
        parser.buildParseTrees = true;
        var tree = parser.elements();
        console.log("Parsed: "+ tree);
        updateTree(tree, parser.ruleNames);
    });*/
    var updateHtml = function () {
        $("#content")[0].innerHTML = window.editor.generateContentHtml();
        $("#lines")[0].innerHTML = window.editor.generateLinesHtml();
        var cursorPos = $(".cursor-placeholder").position();
        var delta = $(".cursor-placeholder").height() / 4.0;
        $(".blinking-cursor").css({ top: cursorPos.top, left: cursorPos.left - delta });
    };
    $(document).ready(function () {
        var editor = window.editor = new webeditor_1.Editor();
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
            if (e.which == 36) {
                editor.goToStartOfLine();
                updateHtml();
            }
            if (e.which == 35) {
                editor.goToEndOfLine();
                updateHtml();
            }
        });
        // var findTexts = function(p) : Array<any>{
        //     var res =  [];
        //     for(var child=p.firstChild; child!==null; child=child.nextSibling) {
        //         if (child.nodeName == '#text') {
        //             res.push(child);
        //         }
        //         var childRes = findTexts(child);
        //         for (var i = 0; i < childRes.length; i++) {
        //             res.push(childRes[i]);
        //         }
        //     }
        //     return res;
        // };
        // $(document).click(function (e) {
        //    console.log("CLICK " + e.clientX + " " + e.clientY);
        //     var el = $("#content")[0];
        //     var texts = findTexts(el);
        //     console.log("TEXTS " + texts);
        //     texts.forEach(function(e, i, a) {
        //         console.log(e);
        //         var range = document.createRange();
        //         range.setStart(el, 0);
        //         range.setEnd(el, 1);
        //         var rects = range.getClientRects();
        //         for (var i = 0; i < rects.length; ++i) {
        //             var r = rects[i]
        //             console.log(" RECT " + r.left + " " + r.right);
        //         }
        //     });
        // });
        /*function findClickedWord(parentElt, x, y) {
            if (parentElt.nodeName !== '#text') {
                console.log('didn\'t click on text node');
                return null;
            }
            var range = document.createRange();
            var words = parentElt.textContent.split(' ');
            var start = 0;
            var end = 0;
            for (var i = 0; i < words.length; i++) {
                var word = words[i];
                end = start+word.length;
                range.setStart(parentElt, start);
                range.setEnd(parentElt, end);
                // not getBoundingClientRect as word could wrap
                var rects = range.getClientRects();
                var clickedRect = isClickInRects(rects);
                if (clickedRect) {
                    return [word, start, clickedRect];
                }
                start = end + 1;
            }
    
            function isClickInRects(rects) {
                for (var i = 0; i < rects.length; ++i) {
                    var r = rects[i]
                    if (r.left<x && r.right>x && r.top<y && r.bottom>y) {
                        return r;
                    }
                }
                return false;
            }
            return null;
        }
        function onClick(e) {
            var elt = document.getElementById('info');
            var clicked = findClickedWord(e.target.childNodes[0], e.clientX, e.clientY);
            elt.innerHTML = 'Nothing Clicked';
            if (clicked) {
                var word = clicked[0];
                var start = clicked[1];
                var r = clicked[2];
                elt.innerHTML = 'Clicked: ('+r.top+','+r.left+') word:'+word+' at offset '+start;
            }
        }*/
        //document.addEventListener('click', onClick);
    });
});
//# sourceMappingURL=main.js.map