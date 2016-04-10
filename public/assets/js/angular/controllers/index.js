/**
 * Created by marlon on 10/04/2016.
 */
'use strict';

function IndexCtrl($scope, $location, Index) {

    $scope.gerar = function(){

        if((!$scope.data || !$scope.data.longUrl) || !validate($scope.data.longUrl)){
            reset();
            $scope.errorMsg = "URL inválida. Exemplo: http://google.com";
            return false;
        }

        Index.all({ _id: 'shortener'}, $scope.data, function (data) {
            $scope.errorMsg = null;
            $scope.data = data;
            $scope.image = "https://chart.googleapis.com/chart?chs=280x280&cht=qr&choe=UTF-8&chl="+$scope.data.id;
        }, function (error) {
            reset();
            $scope.errorMsg = error;
        });
    };
    $scope.copy = function(element){
        element.currentTarget.select();
        if(document.execCommand('copy')){
            console.log('copy');
        }
    };

    function validate(value){
        var tests = {
            url: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        };

        return tests.url.test(value);
    }

    function reset(){
        $scope.errorMsg = null;
        $scope.image = null;
        $scope.data.id = null;
    }

}
IndexCtrl.$inject = ['$scope', '$location', 'Index'];