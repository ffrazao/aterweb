/* global aterwebApp */

'use strict';

// diretiva para manter campos iguais
aterwebApp.directive('valorDiferenteDe', function() {
    return {
        require: 'ngModel',
        scope: {
            outroValor: '=valorDiferenteDe'
        },
        link: function(scope, element, attributes, ngModel) {
           
            ngModel.$validators.valorDiferenteDe = function(valor) {
                return valor !== scope.outroValor;
            };
            
            scope.$watch('outroValor', function() {
                ngModel.$validate();
            });
        }
    };
});