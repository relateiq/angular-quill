module.exports = angular.module('QuillDrtv', [require('./QuillCtrl')])
    .directive("quill", ['$timeout',
        function($timeout) {
            return {
                restrict: 'A',
                require: ['ngModel', 'quill'],
                controller: 'QuillCtrl',
                link: function(scope, element, attrs, ctrls) {
                    var ngModel = ctrls[0];
                    var QuillCtrl = ctrls[1];

                    var extraOptions = attrs.quill ? scope.$eval(attrs.quill) : {};
                    QuillCtrl.init(ngModel, extraOptions);

                }
            };
        }
    ]).name;