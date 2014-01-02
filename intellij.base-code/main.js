define(function (require, exports, module) {
	"use strict";
	
	var CommandManager = brackets.getModule("command/CommandManager");
	Menus = brackets.getModule("command/Menus");
	
	var file = FileSystem.getFileForPath('base.txt');
	var promise = FileUtils.readAsText(file);
	var baseCode = '';
	promise.done(function(text) {
		console.log('Loaded base code contents. Ready for usage.');
		baseCode = text;
	});
	
	
	
	function handleInsertBaseCode() {
		var editor = EditorManager.getFocusedEditor();
		if (editor) {
			if (baseCode != '') {
				editor.replace(baseCode);
			}
		}
	}
	
	var INSERT_BASE_CODE = "basecode.insert";
	CommandManager.register("Insert Base Code", INSERT_BASE_CODE, handleInsertBaseCode);
	
	var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
	menu.addMenuItem(INERT_BASE_CODE, "Ctrl-Shift-I");
	
	exports.handleInsertBaseCode = handleInsertBaseCode;
});