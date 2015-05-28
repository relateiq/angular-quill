module.exports = angular.module('QuillCtrl', [])
    .controller('QuillCtrl', function($scope, $timeout) {
        var QuillCtrl = this;

        var editor;
        var editorElement;
        var toolbarElement;
        var ngModel;
        var options = {
            modules: {
                'toolbar': {
                    // no default but users could pass something like: container: '.toolbar'
                },
                'image-tooltip': true,
                'link-tooltip': true
            },
            theme: 'snow'
        };

        QuillCtrl.init = init;
        QuillCtrl.registerToolbar = registerToolbar;
        QuillCtrl.registerEditor = registerEditor;

        ngModel.$render = function() {
            if (angular.isDefined(editor)) {
                $timeout(function() {
                    editor.setHTML(ngModel.$viewValue || '');
                });
            }

        };

        function init(ngModelCtrl, extraOptions) {
            ngModel = ngModelCtrl;
            if (extraOptions) {
                angular.extend(options, extraOptions);
            }

            $timeout(setupEditor);
        }

        function setupEditor() {
            if (toolbarElement) {
                options.modules.toolbar.container = toolbarElement;
            }
            editor = new Quill(editorElement, options);

            ngModel.$render();

            editor.on('text-change', function(delta, source) {
                updateModel(this.getHTML());
            });

            editor.once('selection-change', function(hasFocus) {
                angular.element(editor).toggleClass('focus', hasFocus);
                // Hack for inability to scroll on mobile
                if (/mobile/i.test(navigator.userAgent)) {
                    angular.element(editor).css('height', editor.root.scrollHeight + 30) // 30 for padding
                }
            });
        }

        function updateModel(value) {
            $scope.$apply(function() {
                ngModel.$setViewValue(value);
            });
        };

        function registerEditor(editor) {
            editorElement = editor;
        }

        function registerToolbar(toolbar) {
            toolbarElement = toolbar;
        }


    }).name;