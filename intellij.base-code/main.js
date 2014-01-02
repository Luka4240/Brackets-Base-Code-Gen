define(function (require, exports, module) {
	"use strict";
	
	var CommandManager = brackets.getModule("command/CommandManager"),
		EditorManager = brackets.getModule("editor/EditorManager"),
		FileSystem = brackets.getModule("filesystem/FileSystem"),
		FileUtils = brackets.getModule("file/FileUtils"),
		Menus = brackets.getModule("command/Menus");
	
	var file = FileSystem.getFileForPath(require.toUrl('./html_template.txt'));
	var promise = FileUtils.readAsText(file);
	var baseCode = '';
	promise.done(function (text) {
		baseCode = text;
	});
	
	function insertBaseCode() {
		var editor = EditorManager.getFocusedEditor();
		if (editor) {
			if (baseCode != '') {
				editor.document.replaceRange(baseCode, editor.getCursorPos());
			}
		}
	}
	
	var INSERT_BASE_CODE = "basecode.insert";
	CommandManager.register("Insert Base Code", INSERT_BASE_CODE, insertBaseCode);
	
	var menu = Menus.addMenu("IntelliJ", "intellij.menu");
	menu.addMenuItem(INSERT_BASE_CODE, "Ctrl-Shift-I");
	
	exports.handleInsertBaseCode = insertBaseCode;
});