'use strict';

/*
 * @author Fernando Frazao
 * @date 14/02/2015
 * @modify 14/02/2015
 */

var endereco = angular.module("endereco", []);

endereco.directive('endereco', function($http, toastr, $rootScope, $q/*, uiGmapGoogleMapApi*/) {
	
	return {
		restrict : 'E',
		templateUrl : 'scripts/directives/endereco.html',
		scope : {
			dados : "="
		},
		replace : true,
		transclude : true,
		link : function(scope, element, attrs) {
			
			var dominio = "/aterweb/dominio";
			
			scope.iniciar = function () {
				// iniciar estrutura
				if (isUndefOrNull(scope.dados)) {
					scope.dados = {};
					scope.dados["@class"] = "gov.emater.aterweb.model.MeioContatoEndereco";
				}
				if (isUndefOrNull(scope.dados.propriedadeRuralConfirmacao)) {
					scope.dados.propriedadeRuralConfirmacao = "N";
				}
				if (isUndefOrNull(scope.dados.pessoaGrupoCidadeVi)) {
					scope.dados.pessoaGrupoCidadeVi = {};
				}
				if (isUndefOrNull(scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi)) {
					scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi = {};
				}
				if (isUndefOrNull(scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.pessoaGrupoEstadoVi)) {
					scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.pessoaGrupoEstadoVi = {};
				}
				if (isUndefOrNull(scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.pessoaGrupoEstadoVi.pessoaGrupoPaisVi)) {
					scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.pessoaGrupoEstadoVi.pessoaGrupoPaisVi = {};
				}
				if (isUndefOrNull(scope.dados.propriedadeRural)) {
					scope.dados.propriedadeRural = {};
				}
				if (isUndefOrNull(scope.dados.propriedadeRural.pessoaGrupoComunidadeVi)) {
					scope.dados.propriedadeRural.pessoaGrupoComunidadeVi = {};
				}
				if (isUndefOrNull(scope.dados.propriedadeRural.pessoaGrupoBaciaHidrograficaVi)) {
					scope.dados.propriedadeRural.pessoaGrupoBaciaHidrograficaVi = {};
				}
				// iniciar valores
				if (!isUndefOrNull(scope.brasil) && isUndefOrNull(scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.pessoaGrupoEstadoVi.pessoaGrupoPaisVi.id)) {
					scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.pessoaGrupoEstadoVi.pessoaGrupoPaisVi.id = scope.brasil.id;
				}
				if (!isUndefOrNull(scope.distritoFederal) && isUndefOrNull(scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.pessoaGrupoEstadoVi.id)) {
					scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.pessoaGrupoEstadoVi.id = scope.distritoFederal.id;
				}
				if (!isUndefOrNull(scope.brasilia) && isUndefOrNull(scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.id)) {
					scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.id = scope.brasilia.id;
				}
			}
			
			scope.novo = function () {
				scope.dados = null;
				iniciar();
			}
			
			if (isUndefOrNull(scope.dados)) {
				iniciar();
			}
			
			// funcao generica para captacao das tabelas de apoio do endereco 
			scope.getDominio = function(entidade, nomePrimaryKey, valorPrimaryKey, lista) {
				lista.splice(0, lista.length);
				return $http.get(dominio, {
					params : {
						ent : entidade,
						npk : nomePrimaryKey,
						vpk : valorPrimaryKey
					}
				}).success(function(data, status, headers, config) {
					if (!isUndefOrNull(data.resultado)) {
						for (reg in data.resultado) {
							lista.push(data.resultado[reg]);
						}
					}
				}).error(function(data) {
					console.log(data);
				}, true);
			};
			scope.atualizaPais = function(lista) {
				$q.all([scope.getDominio("PessoaGrupoPaisVi", null, null, lista)]).then(function(response) {
					if (isUndefOrNull(scope.brasil)) {
						for (idx in response[0].data.resultado) {
							if (response[0].data.resultado[idx].sigla === 'BR') {
								scope.brasil = response[0].data.resultado[idx]; 
								break;
							}
						}
					}
					if (isUndefOrNull(scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.pessoaGrupoEstadoVi.pessoaGrupoPaisVi.id)) {
						scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.pessoaGrupoEstadoVi.pessoaGrupoPaisVi.id = scope.brasil.id;
					}
				});
			};
			scope.atualizaEstado = function(lista, paiId) {
				$q.all([scope.getDominio("PessoaGrupoEstadoVi", "pessoaGrupoPaisVi.id", paiId, lista)]).then(function(response) {
					if (isUndefOrNull(scope.distritoFederal)) {
						for (idx in response[0].data.resultado) {
							if (response[0].data.resultado[idx].sigla === 'DF') {
								scope.distritoFederal = response[0].data.resultado[idx]; 
								break;
							}
						}
					}
					if (!isUndefOrNull(scope.distritoFederal) && isUndefOrNull(scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.pessoaGrupoEstadoVi.id)) {
						scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.pessoaGrupoEstadoVi.id = scope.distritoFederal.id;
					}
				});
			};
			scope.atualizaMunicipio = function(lista, paiId) {
				$q.all([scope.getDominio("PessoaGrupoMunicipioVi", "pessoaGrupoEstadoVi.id", paiId, lista)]).then(function(response) {
					if (!isUndefOrNull(response[0].data.resultado) && !isUndefOrNull(response[0].data.resultado[0])) {
						if (isUndefOrNull(scope.brasilia)) {
							scope.brasilia = response[0].data.resultado[0]; 
						}
						if (isUndefOrNull(scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.id)) {
							scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.id = scope.brasilia.id;
						}
					}
				});
			};
			scope.atualizaCidade = function(lista, paiId) {
				return scope.getDominio("PessoaGrupoCidadeVi", "pessoaGrupoMunicipioVi.id", paiId, lista);
			};
			scope.atualizaBaciaHidrografica = function(lista, paiId) {
				return scope.getDominio("PessoaRelacionamentoCidadeBaciaHidrograficaVi", "cidId", paiId, lista);
			};
			scope.atualizaComunidade = function(lista, paiId) {
				return scope.getDominio("PessoaRelacionamentoCidadeComunidadeVi", "cidId", paiId, lista);
			};

			if (isUndefOrNull(scope.lista)) {
				scope.lista = {
					paisList : [],
					estadoList : [],
					municipioList : [],
					cidadeList : [],
					comunidadeList : [],
					baciaHidrograficaList : []
				};
				scope.atualizaPais(scope.lista.paisList);
			}

			// ativar o atualizador de endereço
			scope.$watch("dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.pessoaGrupoEstadoVi.pessoaGrupoPaisVi.id", function(newValue, oldValue, scope) {
				console.log("pais mudou");
				if (!isUndefOrNull(newValue) && newValue > 0) {
					scope.atualizaEstado(scope.lista.estadoList, newValue);
				} else {
					scope.lista.estadoList.splice(0, scope.lista.estadoList.length);
				}
			});

			scope.$watch("dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.pessoaGrupoEstadoVi.id", function(newValue, oldValue, scope) {
				console.log("estado mudou");
				if (!isUndefOrNull(newValue) && newValue > 0) {
					scope.atualizaMunicipio(scope.lista.municipioList, newValue);
				} else {
					scope.lista.municipioList.splice(0, scope.lista.municipioList.length);
				}
			});

			scope.$watch("dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.id", function(newValue, oldValue, scope) {
				console.log("municipio mudou");
				if (!isUndefOrNull(newValue) && newValue > 0) {
					scope.atualizaCidade(scope.lista.cidadeList, newValue);
				} else {
					scope.lista.cidadeList.splice(0, scope.lista.cidadeList.length);
				}
			});

			scope.$watch("dados.pessoaGrupoCidadeVi.id", function(newValue, oldValue, scope) {
				console.log("cidade mudou");
				if (!isUndefOrNull(newValue) && newValue > 0) {
					scope.atualizaComunidade(scope.lista.comunidadeList, newValue);
					scope.atualizaBaciaHidrografica(scope.lista.baciaHidrograficaList, newValue);
				} else {
					scope.lista.comunidadeList.splice(0, scope.lista.comunidadeList.length);
					scope.lista.baciaHidrograficaList.splice(0, scope.lista.baciaHidrograficaList.length);
				}
			});

			scope.$watch("dados.logradouro + dados.pessoaGrupoCidadeVi.id + dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.id + dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.pessoaGrupoEstadoVi.id + dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.pessoaGrupoEstadoVi.pessoaGrupoPaisVi.id + dados.cep", function(newValue, oldValue, scope) {
				console.log("pesquisa");
				scope.pesquisaGoogle = nn(scope.dados.logradouro) + " " + 
					nn(pessoaGrupo(scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.id, scope.lista.municipioList)) + " " + 
					nn(pessoaGrupo(scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.pessoaGrupoEstadoVi.id, scope.lista.estadoList)) + " " + 
					nn(pessoaGrupo(scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.pessoaGrupoEstadoVi.pessoaGrupoPaisVi.id, scope.lista.paisList)) + " " + 
					nn(scope.dados.cep);
			});
			
			function pessoaGrupo(id, lista) {
				if (isUndefOrNull(id) || isUndefOrNull(lista)) {
					return null;
				}
				for (i in lista) {
					if (lista[i].id === id) {
						return isUndefOrNull(lista[i].nome) ? lista[i].sigla : lista[i].nome; 
					}
				}
				return null;
			}

			function nn(str) {
				return isUndefOrNull(str) ? "" : str;
			}
			
			scope.buscaCep = function() {
				scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.pessoaGrupoEstadoVi.pessoaGrupoPaisVi.id = scope.brasil;
				$rootScope.emProcessamento(true);
				if (!isUndefOrNull(scope.dados)
						&& !isUndefOrNull(scope.dados.cep)
						&& scope.dados.cep.length === 8) {
					$http.get("/aterweb/pessoa-cad/buscarCep/", {"params": {"cep": scope.dados.cep}})
					.success(function(data, status, headers, config) {
						if (!data.executou) {
							toastr.error("CEP {0} não localizado!".format(scope.dados.cep), data.mensagem);
							console.log(data);
						} else {
							scope.dados.codigoIbge = data.resultado.ibge;
							scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.pessoaGrupoEstadoVi.id = data.resultado.uf;
							scope.dados.pessoaGrupoCidadeVi.pessoaGrupoMunicipioVi.id = data.resultado.localidade;
							scope.dados.pessoaGrupoCidadeVi.id = null;
							scope.dados.bairro = data.resultado.bairro;
							scope.dados.propriedadeRural.pessoaGrupoComunidadeVi.id = null;
							scope.dados.propriedadeRural.pessoaGrupoBaciaHidrograficaVi.id = null;
							scope.dados.logradouro = data.resultado.logradouro;
							scope.dados.complemento = null;
							scope.dados.numero = null;
							toastr.info("CEP localizado", "O CEP {0} foi localizado!".format(scope.dados.cep));
						}
						$rootScope.emProcessamento(false);
					}).error(function(data) {
						toastr.error("Erro ao acessar o serviço de busca de CEP", data.mensagem);
						console.log(data);
						$rootScope.emProcessamento(false);
					}, true);
				} else {
					toastr.error("CEP", "Informações incompletas!");
					$rootScope.emProcessamento(false);
				}
			};
			
			// scope.map = {
			// 	center : {
			// 		latitude : -15.732805,
			// 		longitude : -47.903791
			// 	},
			// 	zoom : 10
			// };

			// uiGmapGoogleMapApi.then(function(maps) {
			// 	console.log(maps);
		 //    });
			
			scope.procuraNome = "";
			
			scope.procuraDocumento = "";
			
			scope.tamanhoPagina = 10;
			
			scope.enderecoList = [];
			
			scope.selecionaEnderecos = function (enderecos) {
				scope.enderecoList = enderecos;
			};
			
			scope.selecionaEndereco = function (endereco) {
				scope.dados = angular.copy(endereco);
				scope.dados["@class"] = "gov.emater.aterweb.model.MeioContatoEndereco";
				scope.procurarPorPessoa = false;
			};
			
			scope.procurarEnderecoPorPessoa = function () {
				$rootScope.emProcessamento(true);
				scope.procurarResultado = false;
				var p =	{"nome": scope.procuraNome, "documento": scope.procuraDocumento, "somentePropriedadeRural": false};
				$http.get("/aterweb/pessoa-cad/procurarEnderecoPorPessoa/", {"params" : p})
				.success(function(data, status, headers, config) {
					if (!data.executou) {
						toastr.error("Nenhum registro localizado!");
						scope.pessoaList = [];
						console.log(data);
					} else {
						scope.pessoaList = data.resultado;
						scope.procurarResultado = true;
					}
					$rootScope.emProcessamento(false);
				}).error(function(data) {
					toastr.error("Erro ao consutar o sistema", data.mensagem);
					console.log(data);
					$rootScope.emProcessamento(false);
				}, true);

			};
			
			
			
			
			
			
			// funcoes procurar por pessoa
			if (isUndefOrNull(scope.procurarPorPessoa)) {
				scope.procurarPorPessoa = false;
			}
			scope.procurarPorPessoaFn = function () {
				if (!scope.procurarPorPessoa) {
					scope.procuraNome = "";
					scope.procuraDocumento = "";
					scope.filtroPessoa = "";
					scope.pessoaList = [];
					scope.enderecoList = [];
				}
			}
		}
	};
});