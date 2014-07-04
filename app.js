/**
 * Created by Lucas on 04/07/2014.
 */
var app = angular.module('myApp', []);

var api = 'https://api.themoviedb.org/3/';
var api_key = '';

app.controller('AppController', function($http, $scope){
    $scope.movies = [];
    $scope.searchMovie = function(){
        if($scope.searchText){
            var url = api + 'search/movie?'
                + 'api_key=' + api_key
                + '&query=' + $scope.searchText
                + '&search_type=ngram';

            $scope.movies = [];
            $http.get(url).success(function(data){
                console.log(data);

                $scope.movies = data.results;
            });


        }


    }

});