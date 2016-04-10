/**
 * Created by marlon on 10/04/2016.
 */

'use strict';

var request = require('request');

var key = '';

var GoogleApi = function(){

    var self = this;

    this.short = function(data, cb){
        var options = {
            url: "https://www.googleapis.com/urlshortener/v1/url?key=" + key,
            method: "POST",
            json: true,
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        requestApi(options, cb);
    };

    this.qrCode = function(data, cb){
        var options = {
            url: "https://chart.googleapis.com/chart?chs="+data.chs+"&cht="+data.cht+"&chl="+data.chl+"&choe=UTF-8",
            method: "GET",
            json: true,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        requestApi(options, cb);

    };

    function requestApi(options, cb){
        request(options, function (error, res, body) {
            if (res.statusCode != 200) {
                return cb({
                    "code": res.statusCode,
                    "message": "Erro na geração."
                }, null);
            }

            cb(null, body);
        });
    };
};

module.exports = GoogleApi;
