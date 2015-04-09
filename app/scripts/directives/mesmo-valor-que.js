'use strict';

// diretiva para manter campos iguais
aterwebApp.directive('mesmoValorQue', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if (viewValue === scope[attrs.mesmoValorQue]) {
          ctrl.$setValidity('mesmoValorQue', true);
          return viewValue;
        } else {
          ctrl.$setValidity('mesmoValorQue', false);
          return undefined;
        }
      });
    }
  };
});