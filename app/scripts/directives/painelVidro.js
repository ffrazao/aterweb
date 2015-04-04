'use strict';

// necessário registrar o listener das chamadas XHR na configuração da aplicação
aterwebApp.config(function($httpProvider) {
    $httpProvider.interceptors.push(function ($rootScope) {
        if ($rootScope.chamadasAtivas === undefined) {
            $rootScope.chamadasAtivas = 0;
        }

        return {
            request: function (config) {
                $rootScope.chamadasAtivas += 1;
                return config;
            },
            requestError: function (rejection) {
                $rootScope.chamadasAtivas -= 1;
                return rejection;
            },
            response: function (response) {
                $rootScope.chamadasAtivas -= 1;
                return response;
            },
            responseError: function (rejection) {
                $rootScope.chamadasAtivas -= 1;
                return rejection;
            }
        };
    });
});

// aqui está a diretiva em si
aterwebApp.directive('painelVidro', function ($http) {
    return {
        restrict: 'M',
        replace: true,
        template: '<div style=" position: fixed; width: 100%; height: 100%; margin: 0; padding: 0; top: 0; left: 0; background-color: gray; opacity: 0.4; z-index: 1000;">carregando...</div>', 
        link: function (scope, element, attrs) {

            console.log('painelVidro');

            scope.$watch('chamadasAtivas', function (newVal) {
                if (newVal === 0) {
                    $(element).hide();
                }
                else {
                    $(element).show();
                }
            });

            // tentativa de também enxergar as mudanças de fases do angular
            // scope.$watch('$$phase', function(newVal) {
            //     console.log('phase', newVal);
            // });
        }
    };
});