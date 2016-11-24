define(["require", "exports", "./webeditor"], function (require, exports, webeditor_1) {
    "use strict";
    QUnit.test("default editor", function (assert) {
        var editor = new webeditor_1.Editor();
        assert.ok("" == editor.textBeforeCaret());
        assert.ok("" == editor.textAfterCaret());
        assert.ok(1 == editor.numberOfLines());
        assert.ok(0 == editor.currentLine());
    });
});
