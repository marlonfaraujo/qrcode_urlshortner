/**
 * Created by marlon on 10/04/2016.
 */

'use strict';

/* Services */

angular.module('app.services', ['ngResource', 'ngCookies']).
    factory('Index', ['$resource', '$http',
        function ($resource, $http) {
            return $resource('/api/url/:_id', {}, {
                query: {
                    method: 'GET',
                    isArray: true
                },
                all: {
                    method: 'POST'
                }
            });
        }
    ]);
