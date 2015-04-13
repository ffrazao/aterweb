'use strict';

// diretiva para manter campos iguais
aterwebApp.directive('mesmoValorQue', function() {
    return {
        require: "ngModel",
        scope: {
            outroValor: "=mesmoValorQue"
        },
        link: function(scope, element, attributes, ngModel) {
           
            ngModel.$validators.mesmoValorQue = function(valor) {
                return valor === scope.outroValor;
            };
            
            scope.$watch("outroValor", function() {
                ngModel.$validate();
            });
        }
    };
});