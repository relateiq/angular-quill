var angular = require('angular');
require('angular-mocks');

describe('QuillCtrl', function() {
    beforeEach(function() {
        angular.mock.module(require('./QuillCtrl'));
    });

    beforeEach(inject(function($controller, $rootScope) {
        this.QuillCtrl = $controller('QuillCtrl', {
            $scope: $rootScope.$new()
        });
    }));

    it('should exist', function() {
        expect(this.QuillCtrl).toBeDefined();
    });
});