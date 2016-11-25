/// <reference path="defs/require.d.ts" />
/// <reference path="defs/qunit.d.ts" />
/// <reference path="./webeditor.ts" />
require.config({
    baseUrl: "/js",
});

requirejs(['webeditor'], function (WebEditor) {

    QUnit.test("default editor", function (assert) {
        var editor = new WebEditor.Editor();
        assert.ok("" == editor.textBeforeCaret());
        assert.ok("" == editor.textAfterCaret());
        assert.ok(1 == editor.numberOfLines());
        assert.ok(0 == editor.currentLine());
    });

    QUnit.test("editor with a few lines (i=0)", function (assert) {
        var editor = new WebEditor.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 0);
        assert.ok("" == editor.textBeforeCaret(), editor.textBeforeCaret());
        assert.ok("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened." == editor.textAfterCaret(), editor.textAfterCaret());
        assert.ok(4 == editor.numberOfLines(), editor.numberOfLines());
        assert.ok(0 == editor.currentLine());
    });

    QUnit.test("editor with a few lines (i=15)", function (assert) {
        var editor = new WebEditor.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 15);
        assert.ok("Hi, I am Federi" == editor.textBeforeCaret(), editor.textBeforeCaret());
        assert.ok("co\nI am using TypeScript\nWriting tests\nWondering why JS happened." == editor.textAfterCaret(), editor.textAfterCaret());
        assert.ok(4 == editor.numberOfLines(), editor.numberOfLines());
        assert.ok(0 == editor.currentLine());
    });

    QUnit.test("editor with a few lines (i=20)", function (assert) {
        var editor = new WebEditor.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 20);
        assert.ok("Hi, I am Federico\nI " == editor.textBeforeCaret(), editor.textBeforeCaret());
        assert.ok("am using TypeScript\nWriting tests\nWondering why JS happened." == editor.textAfterCaret(), editor.textAfterCaret());
        assert.ok(4 == editor.numberOfLines(), editor.numberOfLines());
        assert.ok(1 == editor.currentLine());
    });

    QUnit.test("editor with a few lines (i=29)", function (assert) {
        var editor = new WebEditor.Editor("Hi, I am Federico\nI am using TypeScript\nWriting tests\nWondering why JS happened.", 29);
        assert.ok("Hi, I am Federico\nI am using " == editor.textBeforeCaret(), editor.textBeforeCaret());
        assert.ok("TypeScript\nWriting tests\nWondering why JS happened." == editor.textAfterCaret(), editor.textAfterCaret());
        assert.ok(4 == editor.numberOfLines());
        assert.ok(1 == editor.currentLine());
    });

}
