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
        template: '<div class="painel-vidro"><div class="carregando"></div></div>', 
        link: function (scope, element, attrs) {

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