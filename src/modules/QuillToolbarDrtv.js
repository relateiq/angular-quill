module.exports = angular.module('QuillToolbarDrtv', [])
    .directive("quillToolbar", function() {
        return {
            restrict: 'A',
            require: ['^quill'],
            link: function(scope, element, attrs, ctrls) {
                var QuillCtrl = ctrls[0];
                QuillCtrl.registerToolbar(element);
            }
        };
    }).name;