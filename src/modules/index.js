'use strict';
var Quill = require('quill');

/**
   * usage: <div ng-model="article.body" quill="{
      theme: 'mytheme'
    }"></div>
   *
   *    extra options:
   *      quill: pass as a string
   *
   */

angular.module('angular-quill', [])
    .directive("quill", ['$timeout',
        function($timeout) {
            return {
                restrict: 'A',
                require: "ngModel",
                controller: function() {

                },
                link: function(scope, element, attrs, ngModel) {

                    var updateModel = function updateModel(value) {
                            scope.$apply(function() {
                                ngModel.$setViewValue(value);
                            });
                        },
                        options = {
                            modules: {
                                'toolbar': {
                                    container: '.toolbar'
                                },
                                'image-tooltip': true,
                                'link-tooltip': true
                            },
                            theme: 'snow'
                        },
                        extraOptions = attrs.quill ?
                        scope.$eval(attrs.quill) : {},
                        editor;

                    angular.extend(options, extraOptions);

                    $timeout(function() {

                        editor = new Quill(element.children()[1], options);

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

                    });


                    ngModel.$render = function() {
                        if (angular.isDefined(editor)) {
                            $timeout(function() {
                                editor.setHTML(ngModel.$viewValue || '');
                            });
                        }

                    };

                }
            };
        }
    ]);