module.exports = angular.module('QuillDrtv', [require('./QuillCtrl')])
    .directive("quill", ['$timeout', '$parse',
        function($timeout, $parse) {
            return {
                restrict: 'A',
                require: ['ngModel', 'quill'],
                controller: 'QuillCtrl',
                link: function(scope, element, attrs, ctrls) {
                    var ngModel = ctrls[0];
                    var QuillCtrl = ctrls[1];

                    var extraOptions = attrs.quill ? scope.$eval(attrs.quill) : {};
                    var onSetupFn;
                    if (attrs.quillOnSetup) {
                        var parse = $parse(attrs.quillOnSetup);
                        onSetupFn = function(editor) {
                            return parse(scope, {
                                editor: editor
                            });
                        };
                    }
                    QuillCtrl.init(ngModel, extraOptions, onSetupFn);

                }
            };
        }
    ]).name;