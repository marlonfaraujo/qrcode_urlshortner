/**
 * Created by marlon on 10/04/2016.
 */


'use strict';

var app = angular.module('app', [
    'app.services',
    'ngRoute',
    'ngSanitize'
])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {templateUrl: '/index', controller: IndexCtrl}).
        otherwise({templateUrl: '/index', controller: IndexCtrl});
    });

app.run(function ($rootScope, $http) {

});