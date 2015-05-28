module.exports = angular.module('QuillEditorDrtv', [])
    .directive("quillEditor", function() {
        return {
            restrict: 'A',
            require: ['^quill'],
            link: function(scope, element, attrs, ctrls) {
                var QuillCtrl = ctrls[0];
                QuillCtrl.registerEditor(element);
            }
        };
    }).name;