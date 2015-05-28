'use strict';


/**
   * usage: <div ng-model="article.body" quill="{
      theme: 'mytheme'
    }"></div>
   *
   *    extra options:
   *      quill: pass as a string
   *
   */

module.exports = angular.module('angular-quill', [
    require('./QuillCtrl'),
    require('./QuillDrtv'),
    require('./QuillToolbarDrtv'),
    require('./QuillEditorDrtv')
]).name;