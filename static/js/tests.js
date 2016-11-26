/// <reference path="defs/require.d.ts" />
/// <reference path="defs/qunit.d.ts" />
/// <reference path="./webeditor.ts" />
require.config({
    baseUrl: "/js"
});
requirejs(['webeditor'], function (WebEditor) {
    QUnit.test("default editor", function (assert) {
        var editor = new WebEditor.Editor();
        assert.ok("" == editor.textBeforeCaret());
        assert.ok("" == editor.textAfterCaret());
        assert.ok(1 == editor.numberOfLines());
        assert.ok(0 == editor.currentLine());
        assert.ok(0 == editor.currentColumn(), "Column is instead " + editor.currentColumn());
    });
    QUnit.test("test numberOfColumnsForLine", function (assert) {
        var editor = new WebEditor.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 0);
        assert.ok(17 == editor.numberOfColumnsForLine(0));
        assert.ok(21 == editor.numberOfColumnsForLine(1));
        assert.ok(13 == editor.numberOfColumnsForLine(2));
        assert.ok(26 == editor.numberOfColumnsForLine(3));
    });
    QUnit.test("editor with a few lines (i=0)", function (assert) {
        var editor = new WebEditor.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 0);
        assert.ok("" == editor.textBeforeCaret(), editor.textBeforeCaret());
        assert.ok("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened." == editor.textAfterCaret(), editor.textAfterCaret());
        assert.ok(4 == editor.numberOfLines(), editor.numberOfLines());
        assert.ok(0 == editor.currentLine());
        assert.ok(0 == editor.currentColumn(), "Column is instead " + editor.currentColumn());
    });
    QUnit.test("editor with a few lines (i=15)", function (assert) {
        var editor = new WebEditor.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 15);
        assert.ok("Hi, I am Federi" == editor.textBeforeCaret(), editor.textBeforeCaret());
        assert.ok("co\nI am using TypeScript\nWriting tests\nWondering why JS happened." == editor.textAfterCaret(), editor.textAfterCaret());
        assert.ok(4 == editor.numberOfLines(), editor.numberOfLines());
        assert.ok(0 == editor.currentLine());
        assert.ok(15 == editor.currentColumn(), "Column is instead " + editor.currentColumn());
    });
    QUnit.test("editor with a few lines (i=20)", function (assert) {
        var editor = new WebEditor.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 20);
        assert.ok("Hi, I am Federico\nI " == editor.textBeforeCaret(), editor.textBeforeCaret());
        assert.ok("am using TypeScript\nWriting tests\nWondering why JS happened." == editor.textAfterCaret(), editor.textAfterCaret());
        assert.ok(4 == editor.numberOfLines(), editor.numberOfLines());
        assert.ok(1 == editor.currentLine());
        assert.ok(2 == editor.currentColumn(), "Column is instead " + editor.currentColumn());
    });
    QUnit.test("editor with a few lines (i=29)", function (assert) {
        var editor = new WebEditor.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 29);
        assert.ok("Hi, I am Federico\nI am using " == editor.textBeforeCaret(), editor.textBeforeCaret());
        assert.ok("TypeScript\nWriting tests\nWondering why JS happened." == editor.textAfterCaret(), editor.textAfterCaret());
        assert.ok(4 == editor.numberOfLines());
        assert.ok(1 == editor.currentLine());
        assert.ok(11 == editor.currentColumn(), "Column is instead " + editor.currentColumn());
    });
    QUnit.test("editor moving up", function (assert) {
        var editor = new WebEditor.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 29);
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
        var editor = new WebEditor.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 29);
        assert.ok(true == editor.moveUp());
        assert.ok(false == editor.moveUp());
        assert.ok("Hi, I am Fe" == editor.textBeforeCaret(), editor.textBeforeCaret());
        assert.ok("derico\nI am using TypeScript\nWriting tests\nWondering why JS happened." == editor.textAfterCaret(), editor.textAfterCaret());
        assert.ok(0 == editor.currentLine());
        assert.ok(11 == editor.currentColumn(), "Column is instead " + editor.currentColumn());
        assert.ok(11 == editor.currentIndex(), "Index is instead " + editor.currentIndex());
    });
    QUnit.test("editor moving down", function (assert) {
        var editor = new WebEditor.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 29);
        assert.ok(true == editor.moveDown());
        assert.ok(2 == editor.currentLine(), "Actual current line " + editor.currentLine());
        assert.ok(11 == editor.currentColumn(), "Column is instead " + editor.currentColumn());
    });
    QUnit.test("editor moving down twice", function (assert) {
        var editor = new WebEditor.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 29);
        assert.ok(true == editor.moveDown());
        assert.ok(true == editor.moveDown());
        assert.ok(3 == editor.currentLine());
        assert.ok(11 == editor.currentColumn(), "Column is instead " + editor.currentColumn());
    });
    QUnit.test("editor moving down three times", function (assert) {
        var editor = new WebEditor.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 29);
        assert.ok(true == editor.moveDown());
        assert.ok(true == editor.moveDown());
        assert.ok(false == editor.moveDown());
        assert.ok(3 == editor.currentLine());
        assert.ok(11 == editor.currentColumn(), "Column is instead " + editor.currentColumn());
    });
});
//# sourceMappingURL=tests.js.map