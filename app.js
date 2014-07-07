/**
 * Created by Lucas on 04/07/2014.
 */
var app = angular.module('myApp', ['movie-directives']);


app.controller('MovieController', function($http, $scope){
    $scope.movies = [];
    $scope.toWatch = [];

    $scope.searchMovie = function() {

        if ($scope.searchText) {
            if(debug) console.log('searchText: ' + $scope.searchText);
            var url = api + '/search/movie?'
                + 'api_key=' + api_key
                + '&query=' + $scope.searchText
                + '&search_type=ngram'; // Parametro para fazer a busca estilo "Contains"

            $http.get(url).success(function (data) {
                if (debug) console.log(data);
                $scope.movies = data.results;
            });
        }else{
            $scope.movies = [];
        }
    }

    // Chamando a busca para quando carregar a view já ter uma listagem.
    $scope.searchMovie();

    // Teste com Imagens
    $scope.getImage = function(id){
        var url = api + '/movie/' + id + '/images?api_key=' + api_key;
        $http.get(url).success(function(data){
           if (debug) console.log(data);
           for(var i = 0 ; i < data.backdrops.length ; i++){
               if (debug) console.log(api_images + '/' + data.backdrops[i].file_path);
           }
        });
    }

    $scope.addToWatch = function(id){
        var url = api + '/movie/' + id + '?api_key=' + api_key;
        $http.get(url).success(function(data){
           if($scope.isToWatch(id)) {
               if(debug) console.log(data.title + ' já pertence a lista toWatch');
               return;
           }
           if(debug) console.log('Adicionado ' + data.title);
           $scope.toWatch.push(data);
        });
    }

    $scope.isToWatch = function(id){
        for(i = 0 ; i < $scope.toWatch.length ; i++){
            if($scope.toWatch[i].id == id) return true;
        }
        return false;
    }

    $scope.showToWatch = function(){
        return $scope.searchText == '';
    }
});





