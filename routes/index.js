var express = require('express');
var async = require('async');

var GoogleApiUrl = require('../api/google/url.js');
var url = new GoogleApiUrl();

module.exports = function(router){

  router.get('/', function(req, res) {
    res.render('master.ejs');
  });

  router.get('/:name', function(req, res) {
    var name = req.params.name;
    res.render(name + '.ejs');
  });

  router.post('/api/url', function(req, res){
    
    if(!req.body || !req.body.longUrl) { return res.status(500).json({message: "Parâmetros inválidos."}); }

    if(!req.body.qrcode) { return res.status(500).json({message: "Parâmetros inválidos."}); }

    async.series({
      urlShort: function(callback){
        url.short(req.body, callback);
      }, 
      qrcode: function(callback){
        url.qrCode(req.body.qrcode, callback);
      }
      }, 
    function response(err, results){
      if (err) { return res.status(500).json(err); }

      return res.status(200).json(results);
    });

  });

  router.post('/api/url/shortener', function(req, res) {

    if(!req.body || !req.body.longUrl) { return res.status(500).json({message: "Parâmetros inválidos."}); }

    url.short(req.body, function responseShortener(error, data) {
      if (error) { return res.status(500).json(error); }
      return res.status(200).json(data);
    });
  });

  router.get('/api/url/qrcode', function(req, res){

    url.qrCode(req.body, function responseQrcode(error, data){
      if (error) { return res.status(500).json(error); }
      return res.status(200).json(data);
    });
  });

};
