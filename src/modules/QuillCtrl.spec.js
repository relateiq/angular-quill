var angular = require('angular');
require('angular-mocks');

xdescribe('QuillCtrl', function() {
    beforeEach(function() {
        angular.mock.module(require('./QuillCtrl'));
    });

    beforeEach(inject(function($controller, $rootScope) {
        this.QuillCtrl = $controller('QuillCtrl', {
            $scope: $rootScope.$new(),
            $element: angular.element('<div/>')
        });
    }));

    it('should exist', function() {
        expect(this.QuillCtrl).toBeDefined();
    });
});
