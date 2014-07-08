/**
 * Created by Lucas on 04/07/2014.
 */

(function(){
    var app = angular.module('movie-directives', []);

    // Attributes
    app.directive('popoverMovieInfo', function($http){
        // Cria um popover do bootstrap para o filme.
        return {
            restrict: 'A',
            link: function(scope, el, attrs){
                var url = window.api + '/movie/' + attrs.movieId + '?api_key=' + window.api_key;
                $http.get(url).success(function(data){
                    if(debug) console.log(data);
                    $(el).popover({
                        trigger: 'hover',
                        html: true,
                        content: data.tagline || 'No Overview...',
                        title: attrs.popoverTitle,
                        container: 'body'
                    });
                });
            }
        };
    });

    // Elements
    app.directive('spanMovieInfo', function(){
        // Elemento de span com o icone de info para encapsular a diretiva de popoverMovieInfo
        return {
            restrict: 'E',
            templateUrl: 'templates/span-movie-info.html'
        }
    });
})();

