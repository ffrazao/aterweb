//'use strict';

// diretiva do estado da barra de navegação de dados
// aterwebApp.directive('frzNavegadorEstado', function() {
//   return {
//     controller: function($scope) {}
//   }
// });

aterwebApp.factory('frzNavegadorParams', ['', function(){
    var frzNavegadorParams = function (params) {
        var cadastro = params;
        this.adicionaEstado = function (novoEstado) {
            cadastro.estadoAtual = novoEstado;
            cadastro.historicoEstados.push(cadastro.estadoAtual);
        }
        this.removeEstado = function () {
            cadastro.estadoAtual = cadastro.historicoEstados.pop();
        }
        this.getEstadoAtual = function() {
            return cadastro.estadoAtual;
        }
        var iniciarBotoes = function() {
            this.botoes = {
                agirBotaoVisivel: false,
                cancelarBotaoVisivel: false,
                confirmarBotaoVisivel: false,
                excluirBotaoVisivel: false,
                filtrarBotaoVisivel: false,
                incluirBotaoVisivel: false,
                limparBotaoVisivel: false,
                navegarBotaoVisivel: false,
                restaurarBotaoVisivel: false,
                tamanhoPaginaBotaoVisivel: false,
                visualizarBotaoVisivel: false,
                voltarBotaoVisivel: false
            };
        };

    };
    return frzNavegadorParams;
}])

aterwebApp.controller('frzNavegadorCtrl', ['$scope', function($scope) {
    
}]);

// diretiva da barra de navegação de dados
aterwebApp.directive('frzNavegador', function($rootScope, toastr) {
    return {
        require: ['^ngModel'/*, '^frzNavegadorEstado'*/],
        scope: {
            ngModel: '=',
            onAbrir: '&',
            onAgir: '&',
            onCancelarEditar: '&',
            onCancelarExcluir: '&',
            onCancelarFiltrar: '&',
            onCancelarIncluir: '&',
            onConfirmarEditar: '&',
            onConfirmarExcluir: '&',
            onConfirmarFiltrar: '&',
            onConfirmarIncluir: '&',
            onEditar: '&',
            onExcluir: '&',
            onFiltrar: '&',
            onIncluir: '&',
            onLimpar: '&',
            onListar: '&',
            onNavegar: '&',
            onRestaurar: '&',
            onVisualizar: '&',
            onVoltar: '&'
        },
        restrict: 'E', 
        replace: false,
        controller: 'frzNavegadorCtrl',
        link: function(scope, element, attributes) {
            console.log('scope', scope.ngModel);

            scope.exibeTextoBotao = angular.isUndefined(attributes.exibeTextoBotao) || (attributes.exibeTextoBotao.toLowerCase() === 'true');

            var iniciarBotoes = function() {
                scope.botoes = {
                    agirBotaoVisivel: false,
                    cancelarBotaoVisivel: false,
                    confirmarBotaoVisivel: false,
                    excluirBotaoVisivel: false,
                    filtrarBotaoVisivel: false,
                    incluirBotaoVisivel: false,
                    limparBotaoVisivel: false,
                    navegarBotaoVisivel: false,
                    restaurarBotaoVisivel: false,
                    tamanhoPaginaBotaoVisivel: false,
                    visualizarBotaoVisivel: false,
                    voltarBotaoVisivel: false
                };
            };

            scope.historicoEstados = [];

            var setEstadoAtual = function(e) {
                // var e = scope.historicoEstados[scope.historicoEstados.length-1];
                if (e === scope.estados.ABRINDO) {
                    scope.ngModel.estadoAtual = "ABRINDO";
                } else if (e === scope.estados.FILTRANDO) {
                    scope.ngModel.estadoAtual = "FILTRANDO";
                } else if (e === scope.estados.LISTANDO) {
                    scope.ngModel.estadoAtual = "LISTANDO";
                } else if (e === scope.estados.VISUALIZANDO) {
                    scope.ngModel.estadoAtual = "VISUALIZANDO";
                } else if (e === scope.estados.INCLUINDO) {
                    scope.ngModel.estadoAtual = "INCLUINDO";
                } else if (e === scope.estados.EDITANDO) {
                    scope.ngModel.estadoAtual = "EDITANDO";
                } else if (e === scope.estados.EXCLUINDO) {
                    scope.ngModel.estadoAtual = "EXCLUINDO";
                } else if (e === scope.estados.AGINDO) {
                    scope.ngModel.estadoAtual = "AGINDO";
                } else if (e === scope.estados.LIMPANDO) {
                    scope.ngModel.estadoAtual = "LIMPANDO";
                } else if (e === scope.estados.RESTAURANDO) {
                    scope.ngModel.estadoAtual = "RESTAURANDO";
                } else if (e === scope.estados.NAVEGANDO) {
                    scope.ngModel.estadoAtual = "NAVEGANDO";
                } else if (e === scope.estados.VOLTANDO) {
                    scope.ngModel.estadoAtual = "VOLTANDO";
                } else if (e === scope.estados.CONFIRMANDO) {
                    scope.ngModel.estadoAtual = "CONFIRMANDO";
                } else if (e === scope.estados.CANCELANDO) {
                    scope.ngModel.estadoAtual = "CANCELANDO";
                }
            };

            var getEstadoAtual = function() {
                return scope.historicoEstados.length === 0 ? scope.estados.FILTRANDO : scope.historicoEstados[scope.historicoEstados.length - 1];
            };

            var mudarEstado = function(novoEstado) {
                if (novoEstado) {
                    scope.historicoEstados.push(novoEstado);
                    setEstadoAtual(novoEstado);
                }
            };

            var voltarEstado = function() {
                var estado = getEstadoAtual();
                scope.historicoEstados.pop();
                setEstadoAtual(estado);
                return estado;
            };

            // Máquina de estados do navegador
            scope.estados = {
                ABRINDO: function() {
                    scope.onAbrir();

                    // Executar o estado inicial
                    if (scope.ngModel.estadoInicial) {
                        scope.ngModel.estadoInicial = scope.ngModel.estadoInicial.toUpperCase();
                    }
                    if (scope.ngModel.estadoInicial === 'L') {
                        scope.estados.LISTANDO();
                    } else if (scope.ngModel.estadoInicial === 'V') {
                        scope.estados.VISUALIZANDO();
                    } else if (scope.ngModel.estadoInicial === 'I') {
                        scope.estados.INCLUINDO();
                    } else {
                        scope.estados.FILTRANDO();
                    }
                }, 
                FILTRANDO: function() {
                    try {
                        scope.onFiltrar();

                        iniciarBotoes();
                        scope.botoes.confirmarBotaoVisivel = true;
                        scope.botoes.incluirBotaoVisivel = true;
                        scope.botoes.limparBotaoVisivel = true;
                        scope.botoes.voltarBotaoVisivel = true && scope.historicoEstados.length > 0;

                        mudarEstado(scope.estados.FILTRANDO);
                    } catch (erro) {
                        toastr.error('Erro ao filtrar!', erro);
                        console.error('Erro ao filtrar!', erro);
                    }
                }, 
                LISTANDO: function() {
                    try {
                        scope.onListar();

                        iniciarBotoes();
                        scope.botoes.agirBotaoVisivel = true;
                        scope.botoes.excluirBotaoVisivel = true;
                        scope.botoes.filtrarBotaoVisivel = true;
                        scope.botoes.incluirBotaoVisivel = true;
                        scope.botoes.navegarBotaoVisivel = true;
                        scope.botoes.tamanhoPaginaBotaoVisivel = true;
                        scope.botoes.visualizarBotaoVisivel = true;

                        mudarEstado(scope.estados.LISTANDO);
                    } catch (erro) {
                        toastr.error('Erro ao tentar listar!', erro);
                        console.error('Erro ao tentar listar!', erro);
                    }
                }, 
                VISUALIZANDO: function() {
                    try {
                        scope.onVisualizar();

                        iniciarBotoes();
                        scope.botoes.agirBotaoVisivel = true;
                        scope.botoes.excluirBotaoVisivel = true;
                        scope.botoes.filtrarBotaoVisivel = true;
                        scope.botoes.incluirBotaoVisivel = true;
                        scope.botoes.navegarBotaoVisivel = true;
                        scope.botoes.voltarBotaoVisivel = true && scope.historicoEstados.length > 0;

                        mudarEstado(scope.estados.VISUALIZANDO);
                    } catch (erro) {
                        toastr.error('Erro ao tentar visualizar!', erro);
                        console.error('Erro ao tentar visualizar!', erro);
                    }
                }, 
                INCLUINDO: function() {
                    try {
                        scope.onIncluir();

                        iniciarBotoes();
                        scope.botoes.cancelarBotaoVisivel = true;
                        scope.botoes.confirmarBotaoVisivel = true;
                        scope.botoes.limparBotaoVisivel = true;                        

                        mudarEstado(scope.estados.INCLUINDO);
                    } catch (erro) {
                        toastr.error('Erro ao tentar incluir!', erro);
                        console.error('Erro ao tentar incluir!', erro);
                    }
                }, 
                EDITANDO: function() {
                    try {
                        scope.onEditar();

                        iniciarBotoes();
                        scope.botoes.cancelarBotaoVisivel = true;
                        scope.botoes.confirmarBotaoVisivel = true;
                        scope.botoes.restaurarBotaoVisivel = true;

                        mudarEstado(scope.estados.EDITANDO);
                    } catch (erro) {
                        toastr.error('Erro ao tentar editar!', erro);
                        console.error('Erro ao tentar editar!', erro);
                    }
                }, 
                EXCLUINDO: function() {
                    try {
                        scope.onExcluir();

                        iniciarBotoes();
                        scope.botoes.cancelarBotaoVisivel = true;
                        scope.botoes.confirmarBotaoVisivel = true;

                        mudarEstado(scope.estados.EXCLUINDO);
                    } catch (erro) {
                        toastr.error('Erro tentar excluir!', erro);
                        console.error('Erro tentar excluir!', erro);
                    }
                }, 
                AGINDO: function() {
                    try {
                        scope.onAgir();
                    } catch (erro) {
                        toastr.error('Erro ao tentar agir!', erro);
                        console.error('Erro ao tentar agir!', erro);
                    }
                }, 
                LIMPANDO: function() {
                    try {
                        scope.onLimpar();
                        var e = scope.historicoEstados[scope.historicoEstados.length - 1];
                        if (e === scope.estados.FILTRANDO) {
                            scope.ngModel.filtro = {};
                        } else if (e === scope.estados.INCLUINDO) {
                            scope.ngModel.registro = {};
                        }
                    } catch (erro) {
                        toastr.error('Erro ao tentar limpar!', erro);
                        console.error('Erro ao tentar limpar!', erro);
                    }
                }, 
                RESTAURANDO: function() {
                    try {
                        scope.onLimpar();
                    } catch (erro) {
                        toastr.error('Erro ao tentar limpar!', erro);
                        console.error('Erro ao tentar limpar!', erro);
                    }
                }, 
                NAVEGANDO: function(pagina) {
                    try {
                        scope.onNavegar();
                    } catch (erro) {
                        toastr.error('Erro ao tentar navegar!', erro);
                        console.error('Erro ao tentar navegar!', erro);
                    }
                },
                VOLTANDO: function() {
                    try {
                        scope.onVoltar();
                        var e = voltarEstado();
                        e = voltarEstado();
                        e();
                    } catch (erro) {
                        toastr.error('Erro ao tentar voltar!', erro);
                        console.error('Erro ao tentar voltar!', erro);
                    }
                },
                CONFIRMANDO: function() {
                    try {
                        var e = getEstadoAtual();
                        if (e === scope.estados.FILTRANDO) {
                            scope.onConfirmarFiltrar();
                            voltarEstado();
                            voltarEstado();
                            e = scope.estados.LISTANDO;
                        } else if (e === scope.estados.INCLUINDO) {
                            scope.onConfirmarIncluir();
                            voltarEstado();
                            e = voltarEstado();
                        } else if (e === scope.estados.EDITANDO) {
                            scope.onConfirmarEditar();
                            voltarEstado();
                            e = voltarEstado();
                        } else if (e === scope.estados.EXCLUINDO) {
                            scope.onConfirmarExcluir();
                            voltarEstado();
                            e = voltarEstado();
                        } else {
                            throw "Estado atual inválido!";
                        }
                        e();
                    } catch (erro) {
                        toastr.error('Erro ao tentar confirmar!', erro);
                        console.error('Erro ao tentar confirmar!', erro);
                    }
                }, 
                CANCELANDO: function() {
                    try {
                        var e = getEstadoAtual();
                        if (e === scope.estados.FILTRANDO) {
                            scope.onCancelarFiltrar();
                            voltarEstado();
                            voltarEstado();
                            e = scope.estados.LISTANDO;
                        } else if (e === scope.estados.INCLUINDO) {
                            scope.onCancelarIncluir();
                            voltarEstado();
                            e = voltarEstado();
                        } else if (e === scope.estados.EDITANDO) {
                            scope.onCancelarEditar();
                            voltarEstado();
                            e = voltarEstado();
                        } else if (e === scope.estados.EXCLUINDO) {
                            scope.onCancelarExcluir();
                            voltarEstado();
                            e = voltarEstado();
                        } else {
                            throw "Estado atual inválido!";
                        }
                        e();
                    } catch (erro) {
                        toastr.error('Erro ao tentar cancelar!', erro);
                        console.error('Erro ao tentar cancelar!', erro);
                    }
                }
            };

            // executar a abertura do navegador
            scope.estados.ABRINDO();
        },
        template: 
        '<div class="btn-toolbar pull-right" role="toolbar" aria-label="Toolbar with button groups">' +
        '  <div class="btn-group" role="group">' +
        '    <button type="button" class="btn btn-sm btn-success" title="OK" ng-click="estados.CONFIRMANDO()" ng-show="botoes.confirmarBotaoVisivel"><i class="glyphicon glyphicon-ok"></i><small ng-show="exibeTextoBotao">OK</small></button>' +
        '    <button type="button" class="btn btn-sm btn-default" title="Limpar" ng-click="estados.LIMPANDO()" ng-show="botoes.limparBotaoVisivel"><i class="glyphicon glyphicon-trash"></i><small ng-show="exibeTextoBotao">Limpar</small></button>' +
        '    <button type="button" class="btn btn-sm btn-default" title="Restaurar" ng-click="estados.RESTAURANDO()" ng-show="botoes.restaurarBotaoVisivel"><i class="glyphicon glyphicon-repeat"></i><small ng-show="exibeTextoBotao">Restaurar</small></button>' +
        '    <button type="button" class="btn btn-sm btn-danger " title="Cancelar" ng-click="estados.CANCELANDO()" ng-show="botoes.cancelarBotaoVisivel"><i class="glyphicon glyphicon-remove"></i><small ng-show="exibeTextoBotao">Cancelar</small></button>' +
        '    <button type="button" class="btn btn-sm btn-info" title="Voltar" ng-click="estados.VOLTANDO()" ng-show="botoes.voltarBotaoVisivel"><i class="glyphicon glyphicon-share-alt"></i><small ng-show="exibeTextoBotao">Voltar</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-show="botoes.navegarBotaoVisivel">' +
        '    <button type="button" class="btn btn-sm btn-default" title="Primeiro" ng-click="estados.NAVEGANDO()"><i class="glyphicon glyphicon-step-backward"></i><small class="sr-only">Primeiro</small></button>' +
        '    <button type="button" class="btn btn-sm btn-default" title="Anterior" ng-click="estados.NAVEGANDO()"><i class="glyphicon glyphicon-backward"></i><small class="sr-only">Anterior</small></button>' +
        '    <div class="btn-group" ng-show="botoes.tamanhoPaginaBotaoVisivel">' +
        '      <button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="Tamanho da Página">' +
        '        <span ng-init="tamanhoPagina = 10">{{tamanhoPagina}}</span><span class="caret"></span>' +
        '      </button>' +
        '      <ul class="dropdown-menu" role="menu">' +
        '        <li><a ng-click="tamanhoPagina = 10">10</a></li>' +
        '        <li><a ng-click="tamanhoPagina = 25">25</a></li>' +
        '        <li><a ng-click="tamanhoPagina = 50">50</a></li>' +
        '        <li><a ng-click="tamanhoPagina = 100">100</a></li>' +
        '      </ul>' +
        '    </div>' +
        '    <button type="button" class="btn btn-sm btn-default" title="Posterior" ng-click="estados.NAVEGANDO()"><i class="glyphicon glyphicon-forward"></i><small class="sr-only">Posterior</small></button>' +
        '    <button type="button" class="btn btn-sm btn-default" title="Último" ng-click="estados.NAVEGANDO()"><i class="glyphicon glyphicon-step-forward"></i><small class="sr-only">Último</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-show="botoes.filtrarBotaoVisivel">' +
        '    <button type="button" class="btn btn-sm btn-primary" title="Filtrar" ng-click="estados.FILTRANDO()"><i class="glyphicon glyphicon-filter"></i><small ng-show="exibeTextoBotao">filtrar</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-show="botoes.incluirBotaoVisivel">' +
        '    <button type="button" class="btn btn-sm btn-success" title="Incluir" ng-click="estados.INCLUINDO()"><i class="glyphicon glyphicon-plus"></i><small ng-show="exibeTextoBotao">Incluir</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-show="botoes.visualizarBotaoVisivel">' +
        '    <button type="button" class="btn btn-sm btn-warning" title="Visualizar" ng-click="estados.VISUALIZANDO()"><i class="glyphicon glyphicon-eye-open"></i><small ng-show="exibeTextoBotao">Visualizar</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-show="botoes.excluirBotaoVisivel">' +
        '    <button type="button" class="btn btn-sm btn-danger " title="Excluir" ng-click="estados.EXCLUINDO()"><i class="glyphicon glyphicon-minus"></i><small ng-show="exibeTextoBotao">Excluir</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-show="botoes.agirBotaoVisivel">' +
        '    <button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="Ações">' +
        '      <i class="glyphicon glyphicon-menu-hamburger"></i><small ng-show="exibeTextoBotao">Ações</small><span class="caret"></span>' +
        '    </button>' +
        '    <ul class="dropdown-menu pull-right" role="menu">' +
        '      <li><a>Dropdown link</a></li>' +
        '      <li><a>Dropdown link</a></li>' +
        '    </ul>' +
        '  </div>' +
        '</div>' 
    };
});