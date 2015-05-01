'use strict';

// diretiva do estado da barra de navegação de dados
// aterwebApp.directive('frzNavegadorEstado', function() {
//   return {
//     controller: function($scope) {}
//   }
// });

// diretiva da barra de navegação de dados
aterwebApp.directive('frzNavegador', function($rootScope, toastr) {
    return {
        require: ['^ngModel'/*, '^frzNavegadorEstado'*/],
        scope: {
            ngModel: '=',
            onAbrir: '&',
            onAgir: '&',
            onCancelar: '&',
            onConfirmarListar: '&',
            onConfirmarIncluir: '&',
            onConfirmarEditar: '&',
            onConfirmarExcluir: '&',
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
        link: function(scope, element, attributes) {
            scope.exibeTextoBotao = angular.isUndefined(attributes.exibeTextoBotao) || (attributes.exibeTextoBotao == 'true');
            console.log('scope', scope.ngModel);

            scope.botoes = null;
            scope.iniciarBotoes = function() {
                scope.botoes = {
                    agirBotaoVisivel: false,
                    cancelarBotaoVis: false,
                    confirmarBotaoVisivel: false,
                    excluirBotaoVisivel: false,
                    filtrarBotaoVisivel: false,
                    incluirBotaoVisivel: false,
                    limparBotaoVisivel: false,
                    navegarBotaoVisivel: false,
                    restaurarBotaoVisivel: false,
                    visualizarBotaoVisivel: false,
                    voltarBotaoVisivel: false
                };
            };

            scope.estados = {
                ABRINDO: function(estadoAtual) {
                    scope.onAbrir();
                    scope.estados.FILTRANDO();
                }, 
                FILTRANDO: function(estadoAtual) {
                    try {
                        scope.onFiltrar();

                        scope.iniciarBotoes();
                        scope.botoes.confirmarBotaoVisivel = true;
                        scope.botoes.limparBotaoVisivel = true;
                        scope.botoes.voltarBotaoVisivel = true && scope.historicoEstados.length > 0;
                        scope.botoes.incluirBotaoVisivel = true;

                        scope.mudarEstado(scope.estados.FILTRANDO);
                    } catch (erro) {
                        toastr.error('Erro ao filtrar!', erro);
                        console.error('Erro ao filtrar!', erro);
                    }
                }, 
                LISTANDO: function(estadoAtual) {
                    try {
                        scope.onListar();

                        scope.iniciarBotoes();
                        scope.botoes.filtrarBotaoVisivel = true;
                        scope.botoes.incluirBotaoVisivel = true;
                        scope.botoes.excluirBotaoVisivel = true;
                        scope.botoes.agirBotaoVisivel = true;
                        scope.botoes.navegarBotaoVisivel = true;
                        scope.botoes.visualizarBotaoVisivel = true;
                        scope.botoes.voltarBotaoVisivel = true && scope.historicoEstados.length > 0;

                        scope.mudarEstado(scope.estados.LISTANDO);
                    } catch (erro) {
                        toastr.error('Erro ao listar!', erro);
                        console.error('Erro ao listar!', erro);
                    }
                }, 
                VISUALIZANDO: function(estadoAtual) {
                    try {
                        scope.onVisualizar();

                        scope.iniciarBotoes();
                        scope.botoes.filtrarBotaoVisivel = true;
                        scope.botoes.voltarBotaoVisivel = true && scope.historicoEstados.length > 0;
                        scope.botoes.incluirBotaoVisivel = true;
                        scope.botoes.navegarBotaoVisivel = true;
                        scope.botoes.agirBotaoVisivel = true;
                        scope.botoes.excluirBotaoVisivel = true;
                        scope.botoes.visualizarBotaoVisivel = true;

                        scope.mudarEstado(scope.estados.VISUALIZANDO);
                    } catch (erro) {
                        toastr.error('Erro ao visualizar!', erro);
                        console.error('Erro ao visualizar!', erro);
                    }
                }, 
                INCLUINDO: function(estadoAtual) {
                    try {
                        scope.onIncluir();

                        scope.iniciarBotoes();
                        scope.botoes.confirmarBotaoVisivel = true;
                        scope.botoes.cancelarBotaoVisivel = true;
                        scope.botoes.limparBotaoVisivel = true;                        

                        scope.mudarEstado(scope.estados.INCLUINDO);
                    } catch (erro) {
                        toastr.error('Erro ao tentar incluir!', erro);
                        console.error('Erro ao tentar incluir!', erro);
                    }
                }, 
                EDITANDO: function(estadoAtual) {
                    try {
                        scope.onEditar();

                        scope.iniciarBotoes();
                        scope.botoes.confirmarBotaoVisivel = true;
                        scope.botoes.cancelarBotaoVisivel = true;
                        scope.botoes.restaurarBotaoVisivel = true;

                        scope.mudarEstado(scope.estados.EDITANDO);
                    } catch (erro) {
                        toastr.error('Erro tentar editar!', erro);
                        console.error('Erro tentar editar!', erro);
                    }
                }, 
                EXCLUINDO: function(estadoAtual) {
                    try {
                        scope.onExcluir();

                        scope.iniciarBotoes();
                        scope.botoes.confirmarBotaoVisivel = true;
                        scope.botoes.cancelarBotaoVisivel = true;

                        scope.mudarEstado(scope.estados.EXCLUINDO);
                    } catch (erro) {
                        toastr.error('Erro tentar excluir!', erro);
                        console.error('Erro tentar excluir!', erro);
                    }
                }, 
                AGINDO: function(estadoAtual) {
                    try {
                        scope.onAgir();
                    } catch (erro) {
                        toastr.error('Erro ao agir!', erro);
                        console.error('Erro ao agir!', erro);
                    }
                }, 
                LIMPANDO: function(estadoAtual) {
                    try {
                        scope.onLimpar();
                    } catch (erro) {
                        toastr.error('Erro ao limpar!', erro);
                        console.error('Erro ao limpar!', erro);
                    }
                }, 
                RESTAURANDO: function(estadoAtual) {
                    try {
                        scope.onLimpar();
                    } catch (erro) {
                        toastr.error('Erro ao limpar!', erro);
                        console.error('Erro ao limpar!', erro);
                    }
                }, 
                NAVEGANDO: function(pagina) {
                    try {
                        scope.onNavegar();
                    } catch (erro) {
                        toastr.error('Erro ao navegar!', erro);
                        console.error('Erro ao navegar!', erro);
                    }
                },
                VOLTANDO: function(estadoAtual) {
                    try {
                        scope.onVoltar();
                        scope.mudarEstado(scope.historicoEstados.pop());
                    } catch (erro) {
                        toastr.error('Erro ao navegar!', erro);
                        console.error('Erro ao navegar!', erro);
                    }
                },
                CONFIRMANDO: function(estadoAtual) {
                    try {
                        var e = scope.historicoEstados.lenght === 0 ? scope.estados.FILTRANDO : scope.historicoEstados[scope.historicoEstados.length -1];
                        if (e === scope.LISTANDO) {
                            scope.onConfirmarListar();
                        } else if (e === scope.INCLUINDO) {
                            scope.onConfirmarIncluir();
                        } else if (e === scope.EDITANDO) {
                            scope.onConfirmarEditar();
                        } else if (e === scope.EXCLUINDO) {
                            scope.onConfirmarExcluir();
                        } else {
                            throw "Estado atual inválido!";
                        }
                        scope.mudarEstado(e);
                    } catch (erro) {
                        toastr.error('Erro ao confirmar!', erro);
                        console.error('Erro ao confirmar!', erro);
                    }
                }, 
                CANCELANDO: function(estadoAtual) {
                    try {
                        scope.onCancelar();                
                        scope.mudarEstado(scope.historicoEstados.pop());
                        scope.mudarEstado(scope.historicoEstados.pop());
                    } catch (erro) {
                        toastr.error('Erro ao cancelar!', erro);
                        console.error('Erro ao cancelar!', erro);
                    }
                }
            };
            scope.historicoEstados = [];
            scope.estadoAtual = null;
            scope.folhaAtual = null;
            scope.paginaAtual = null;
            scope.mudarEstado = function(novoEstado) {
                if (novoEstado) {
                    scope.historicoEstados.push(novoEstado);
                }
                scope.estadoAtual = novoEstado;
            };

            // executar a abertura do navegador
            scope.estados.ABRINDO(null);
        },
        template: 
        '<div class="btn-toolbar pull-right" role="toolbar" aria-label="Toolbar with button groups">' +
        '  <div class="btn-group" role="group">' +
        '    <button type="button" class="btn btn-sm btn-success" title="OK" ng-click="estados.CONFIRMANDO(estadoAtual)" ng-if="botoes.confirmarBotaoVisivel"><i class="glyphicon glyphicon-ok"></i><small ng-show="exibeTextoBotao">OK</small></button>' +
        '    <button type="button" class="btn btn-sm btn-warning" title="Limpar" ng-click="estados.LIMPANDO(estadoAtual)" ng-if="botoes.limparBotaoVisivel"><i class="glyphicon glyphicon-trash"></i><small ng-show="exibeTextoBotao">Limpar</small></button>' +
        '    <button type="button" class="btn btn-sm btn-warning" title="Restaurar" ng-click="estados.RESTAURANDO(estadoAtual)" ng-if="botoes.voltarBotaoVisivel"><i class="glyphicon glyphicon-repeat"></i><small ng-show="exibeTextoBotao">Restaurar</small></button>' +
        '    <button type="button" class="btn btn-sm btn-danger " title="Cancelar" ng-click="estados.CANCELANDO(estadoAtual)" ng-if="botoes.cancelarBotaoVisivel"><i class="glyphicon glyphicon-remove"></i><small ng-show="exibeTextoBotao">Cancelar</small></button>' +
        '    <button type="button" class="btn btn-sm btn-warning" title="Voltar" ng-click="estados.VOLTANDO(estadoAtual)" ng-if="botoes.voltarBotaoVisivel"><i class="glyphicon glyphicon-share-alt"></i><small ng-show="exibeTextoBotao">Voltar</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-if="botoes.navegarBotaoVisivel">' +
        '    <button type="button" class="btn btn-sm btn-default" title="Primeiro" ng-click="estados.NAVEGANDO(1)"><i class="glyphicon glyphicon-step-backward"></i><small class="sr-only">Primeiro</small></button>' +
        '    <button type="button" class="btn btn-sm btn-default" title="Anterior" ng-click="estados.NAVEGANDO(paginaAtual - 1)"><i class="glyphicon glyphicon-backward"></i><small class="sr-only">Anterior</small></button>' +
        '    <div class="btn-group">' +
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
        '    <button type="button" class="btn btn-sm btn-default" title="Posterior" ng-click="estados.NAVEGANDO(paginaAtual + 1)"><i class="glyphicon glyphicon-forward"></i><small class="sr-only">Posterior</small></button>' +
        '    <button type="button" class="btn btn-sm btn-default" title="Último" ng-click="estados.NAVEGANDO()"><i class="glyphicon glyphicon-step-forward"></i><small class="sr-only">Último</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-if="botoes.filtrarBotaoVisivel">' +
        '    <button type="button" class="btn btn-sm btn-primary" title="Filtrar" ng-click="estados.FILTRANDO(estadoAtual)"><i class="glyphicon glyphicon-filter"></i><small ng-show="exibeTextoBotao">filtrar</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-if="botoes.incluirBotaoVisivel">' +
        '    <button type="button" class="btn btn-sm btn-success" title="Incluir" ng-click="estados.INCLUINDO(estadoAtual)"><i class="glyphicon glyphicon-plus"></i><small ng-show="exibeTextoBotao">Incluir</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-if="botoes.visualizarBotaoVisivel">' +
        '    <button type="button" class="btn btn-sm btn-warning" title="Visualizar" ng-click="estados.VISUALIZANDO(estadoAtual)"><i class="glyphicon glyphicon-eye-open"></i><small ng-show="exibeTextoBotao">Visualizar</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-if="botoes.excluirBotaoVisivel">' +
        '    <button type="button" class="btn btn-sm btn-danger " title="Excluir" ng-click="estados.EXCLUINDO(estadoAtual)"><i class="glyphicon glyphicon-trash"></i><small ng-show="exibeTextoBotao">Excluir</small></button>' +
        '  </div>' +
        '  <div class="btn-group" role="group" ng-if="botoes.agirBotaoVisivel">' +
        '    <button type="button" class="btn btn-sm btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="Ações">' +
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
/*
        '<nav class="navbar navbar-default navbar-static-top">' +
        '  <div class="container-fluid">' +
        '    <!-- Brand and toggle get grouped for better mobile display -->' +
        '    <div class="navbar-header">' +
        '      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">' +
        '        <span class="sr-only">Toggle navigation</span>' +
        '        <span class="icon-bar"></span>' +
        '        <span class="icon-bar"></span>' +
        '        <span class="icon-bar"></span>' +
        '      </button>' +
        '      <a class="navbar-brand" href="#"></a>' +
        '    </div>' +
        '    <!-- Collect the nav links, forms, and other content for toggling -->' +
        '    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">' +
        '      <ul class="nav navbar-nav navbar-right">' +
        '        <li ng-if="botoes.confirmarBotaoVisivel"><button type="button" class="btn btn-sm btn-success" title="OK" ng-click="estados.CONFIRMANDO(estadoAtual)"><i class="glyphicon glyphicon-ok"></i><small ng-show="exibeTextoBotao">OK</small></button></li>' +
        '        <li ng-if="botoes.cancelarBotaoVisivel"><button type="button" class="btn btn-sm btn-danger " title="Cancelar" ng-click="estados.CANCELANDO(estadoAtual)"><i class="glyphicon glyphicon-remove"></i><small ng-show="exibeTextoBotao">Cancelar</small></button></li>' +
        '        <li ng-if="botoes.voltarBotaoVisivel"><button type="button" class="btn btn-sm btn-warning" title="Voltar" ng-click="estados.VOLTANDO(estadoAtual)"><i class="glyphicon glyphicon-share-alt"></i><small ng-show="exibeTextoBotao">Voltar</small></button></li>' +
        '        <li class="divider">&nbsp;&nbsp;</li>' +
        '        <li ng-if="botoes.navegarBotaoVisivel"><button type="button" class="btn btn-sm btn-default" title="Primeiro" ng-click="estados.NAVEGANDO(1)"><i class="glyphicon glyphicon-step-backward"></i><small class="sr-only">Primeiro</small></button></li>' +
        '        <li ng-if="botoes.navegarBotaoVisivel"><button type="button" class="btn btn-sm btn-default" title="Anterior" ng-click="estados.NAVEGANDO(paginaAtual - 1)"><i class="glyphicon glyphicon-backward"></i><small class="sr-only">Anterior</small></button></li>' +
        '        <li ng-if="botoes.navegarBotaoVisivel">' +
        '           <div class="btn-group">' +
        '             <button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="Tamanho da Página">' +
        '               <span ng-init="tamanhoPagina = 10">{{tamanhoPagina}}</span><span class="caret"></span>' +
        '             </button>' +
        '             <ul class="dropdown-menu" role="menu">' +
        '               <li><a ng-click="tamanhoPagina = 10">10</a></li>' +
        '               <li><a ng-click="tamanhoPagina = 25">25</a></li>' +
        '               <li><a ng-click="tamanhoPagina = 50">50</a></li>' +
        '               <li><a ng-click="tamanhoPagina = 100">100</a></li>' +
        '             </ul>' +
        '           </div>' +
        '        </li>' +
        '        <li ng-if="botoes.navegarBotaoVisivel"><button type="button" class="btn btn-sm btn-default" title="Posterior" ng-click="estados.NAVEGANDO(paginaAtual + 1)"><i class="glyphicon glyphicon-forward"></i><small class="sr-only">Posterior</small></button></li>' +
        '        <li ng-if="botoes.navegarBotaoVisivel"><button type="button" class="btn btn-sm btn-default" title="Último" ng-click="estados.NAVEGANDO()"><i class="glyphicon glyphicon-step-forward"></i><small class="sr-only">Último</small></button></li>' +
        '        <li class="divider">&nbsp;&nbsp;</li>' +
        '        <li ng-if="botoes.filtrarBotaoVisivel"><button type="button" class="btn btn-sm btn-primary" title="filtrar" ng-click="estados.FILTRANDO(estadoAtual)"><i class="glyphicon glyphicon-filter"></i><small ng-show="exibeTextoBotao">filtrar</small></button></li>' +
        '        <li class="divider">&nbsp;&nbsp;</li>' +
        '        <li ng-if="botoes.incluirBotaoVisivel"><button type="button" class="btn btn-sm btn-success" title="Incluir" ng-click="estados.INCLUINDO(estadoAtual)"><i class="glyphicon glyphicon-plus"></i><small ng-show="exibeTextoBotao">Incluir</small></button></li>' +
        '        <li class="divider">&nbsp;&nbsp;</li>' +
        '        <li ng-if="botoes.visualizarBotaoVisivel"><button type="button" class="btn btn-sm btn-warning" title="Visualizar" ng-click="estados.VISUALIZANDO(estadoAtual)"><i class="glyphicon glyphicon-eye-open"></i><small ng-show="exibeTextoBotao">Visualizar</small></button></li>' +
        '        <li class="divider">&nbsp;&nbsp;</li>' +
        '        <li ng-if="botoes.excluirBotaoVisivel"><button type="button" class="btn btn-sm btn-danger " title="Excluir" ng-click="estados.EXCLUINDO(estadoAtual)"><i class="glyphicon glyphicon-trash"></i><small ng-show="exibeTextoBotao">Excluir</small></button></li>' +
        '        <li class="divider">&nbsp;&nbsp;</li>' +
        '        <li ng-if="botoes.agirBotaoVisivel">' +
        '           <div class="btn-group">' +
        '             <button type="button" class="btn btn-sm btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="false">' +
        '               <i class="glyphicon glyphicon-menu-hamburger"></i><small ng-show="exibeTextoBotao">Ações</span><span class="caret"></span>' +
        '             </button>' +
        '             <ul class="dropdown-menu" role="menu">' +
        '               <li><a href="#">Action</a></li>' +
        '               <li><a href="#">Another action</a></li>' +
        '               <li><a href="#">Something else here</a></li>' +
        '               <li class="divider"></li>' +
        '               <li><a href="#">Separated link</a></li>' +
        '             </ul>' +
        '           </div>' +
        '        </li>' +
        '      </ul>' +
        '    </div><!-- /.navbar-collapse -->' +
        '  </div><!-- /.container-fluid -->' +
        '</nav>'
*/