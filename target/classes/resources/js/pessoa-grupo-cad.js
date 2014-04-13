/**
 * Script do módulo pessoa-grupo-cad
 */

// identificacao do endereco url para este script
var PAGINA = "pessoa-grupo-cad";

function carregaArvore(dados, root, pk, nomeCampo, fk, valor) {
	// se não houver dados retornar
	if (dados == null || dados.length <= 0) {
		return null;
	}
	$
			.each(
					dados,
					function(key, value) {
						// captar dados
						value = valorCampoJson(dados, value);

						var campo_pk = valorCampoJson(dados, value[pk]);
						var campo_nomeCampo = valorCampoJson(dados,
								value[nomeCampo]);
						var campo_fk = valorCampoJson(dados, value[fk]);

						var pai = valorCampoJson(dados, valor);

						// console.log("pk: [" + campo_pk + "] nomeCampo: ["
						// + campo_nomeCampo + "] fk: [" + campo_fk + "] pai
						// =>" + pai+"]");

						// se a foreign key for igual ao valor pesquisado
						if ((campo_fk == null && pai == null)
								|| (campo_fk != null && campo_fk == pai)
								|| (campo_fk != null && campo_fk['id'] != null && campo_fk['id'] == pai)) {
							// criar um novo no
							var no = {
								title : campo_nomeCampo,
								valor : value,
							};
							// verificar se há sub itens
							sub = carregaArvore(dados, new Array(), pk,
									nomeCampo, fk, campo_pk);
							if (sub.length > 0) {
								no.children = sub;
								no.isFolder = true;
							}
							// adicionar no a arvore
							root.push(no);
						}
					});
	return root;
}

// Clicar no botão de executar filtro
function filtrar() {
}
function incluir() {
}
function salvar() {
}

function cadastroCtrl($scope, $http) {

	// variáveis do formulário
	$scope.filtro = null;
	$scope.registro = null;
	$scope.lista = null;
	$scope.selecionado = null;

	// variáveis de apoio ao filtro
	$scope.pessoaGrupoTipoList = null;
	$scope.gestorGrupoEmpresaCheck = false;
	$scope.gestorGrupoUnidadeOrganizacionalCheck = false;
	$scope.gestorGrupoTecnicoCheck = true;
	$scope.gestor = "Tecnico";
	$scope.entities = [ "gestorGrupoEmpresaCheck",
			"gestorGrupoUnidadeOrganizacionalCheck", "gestorGrupoTecnicoCheck" ];
	$scope.todos = "gestorGrupoTodosCheck";

	// variaveis de apoio ao formulario
	$scope.registroLocal = null;
	$scope.registroPessoaGrupoPai = null;

	$scope.mudarNivelGestao = function() {
		// TODO Encontrar um jeito de perguntar antes de apagar os membros
		$scope.registro.pessoaRelacionamentos = new Array();
	};

	// inicializador do formulário
	$scope.init = function() {
		$
				.ajax({
					url : baseUrl + PAGINA + ACAO_PREPARAR,
					type : 'GET',
					contentType : 'application/json',
					dataType : 'json',
					async : false,
					success : function(data) {
						if (data.executou == true) {
							$scope.filtro = data.resultado.filtro;
							$scope.registro = data.resultado.registro;
							$scope.lista = data.resultado.lista;
							$scope.selecionado = null;

							$scope.pessoaGrupoTipoList = data.resultado.PessoaGrupoTipoList;

							// TODO essa atribuicao nao deveria ser necessaria.
							// So existe porque nao descobri como inicializar o
							// valor todos da forma correta. O tipo original é
							// um Enum
							$scope.filtro.situacaoGrupo = "";

							$scope.registro['@class'] = "gov.emater.aterweb.model.PessoaGrupo";
							$scope.registro.nivelGestao = "T";
							// $scope.$digest();
						} else {
							alert('Erro ao preparar a exibição do formulário');
						}
					}
				});

		// --- Inicializar tipos de grupos sociais
		$("#pessoaGrupoTree")
				.dynatree(
						{
							autoFocus : true,
							onActivate : function(node) {
								$scope.selecionado = node.data.valor;
								$scope.selecionado['@class'] = "gov.emater.aterweb.model.PessoaGrupo";
								$scope.$digest();
							}
						});
	};

	$scope.filtrar = function() {
		// alert(JSON.stringify($("#div_filtro").find('form').serializeObject()));
		// alert($("#div_filtro").find('form').serialize());
		$.ajax({
			url : baseUrl + PAGINA + ACAO_FILTRAR,
			type : 'GET',
			contentType : 'application/json',
			dataType : 'json',
			data : $("#div_filtro").find('form').serialize(),
			async : false,
			success : function(data) {
				$scope.registro = null;
				$scope.lista = null;
				$scope.selecionado = null;
				$("#pessoaGrupoTree").dynatree("getRoot").removeChildren();
				if (data.executou == true) {
					// Atualizar a arvore de Tipo de Grupos Sociais
					$scope.lista = data.resultado;
					$("#pessoaGrupoTree").dynatree("getRoot").addChild(
							carregaArvore($scope.lista, new Array(), 'id',
									'nome', 'pessoaGrupo', null));
				} else {
					alert('Erro ao executar o filtro do formulário');
				}
			}
		});
	};

	$scope.salvarMembroGrupo = function() {
		if ($scope.registro.pessoaRelacionamentos == null) {
			$scope.registro.pessoaRelacionamentos = new Array();
		}
		var pessoaSelecionada = $.parseJSON($scope.membroGrupo.pessoaSelecionada);
		
		delete pessoaSelecionada["cpf"];
		delete pessoaSelecionada["cnpj"];
		
		relacionamento = {
			pessoa : pessoaSelecionada,
			podeModificar : $scope.membroGrupo.podeModificar,
			proprietario : $scope.membroGrupo.proprietario
		};
		if (relacionamento.pessoa.pessoaTipo == 'PF') {
			relacionamento.pessoa['@class'] = "gov.emater.aterweb.model.PessoaFisica";
		} else if (relacionamento.pessoa.pessoaTipo == 'PJ') {
			relacionamento.pessoa['@class'] = "gov.emater.aterweb.model.PessoaJuridica";
		}
		if ($scope.membroGrupo.acessoGrupoTempoIndeterminado === 'N') {
			relacionamento.inicio = $scope.membroGrupo.filtro.inicio;
			relacionamento.termino = $scope.membroGrupo.filtro.termino;
		}
		$scope.registro.pessoaRelacionamentos.push(relacionamento);

		console.log("relacionamentos", $scope.registro.pessoaRelacionamentos);

		$scope.novoMembro = null;
	};

	$scope.gestorTodos = function(marcado) {
		console.log(marcado);
	};

	$scope.isSelectAll = function() {
		result = true;
		for (var i = 0; i < $scope.entities.length; i++) {
			if (!document.getElementById($scope.entities[i]).checked) {
				result = false;
				break;
			}
		}
		document.getElementById($scope.todos).checked = result;
	};

	$scope.selectAll = function($event) {
		for (var i = 0; i < $scope.entities.length; i++) {
			document.getElementById($scope.entities[i]).checked = $event.target.checked;
		}
	};

	$scope.novoMembroGrupo = function() {
		console.info("novo membro");
		$scope.iniciarMembroGrupo();
		$("#modalMembroGrupoSocial").modal('show');
		if ($scope.registro.nivelGestao === null
				|| $scope.registro.nivelGestao === "") {
			// alert("informe o nivel de gestao");
		} else if ($scope.registro.nivelGestao === "E") {
			// $("#modalMeioContatoEndereco").modal('show');
		} else if ($scope.registro.nivelGestao === "U") {
		} else if ($scope.registro.nivelGestao === "T") {
			// value="T" /> Técnico
			// value="U" /> Unidade
			// value="E" /> Empresa
		}
	};

	$scope.buscarMembroGrupo = function() {
		console.log($scope.membroGrupo);
		$http.get(baseUrl + 'pessoa-cad' + ACAO_FILTRAR, {
			params : $scope.membroGrupo.filtro
		}).success(function(data, status, headers, config) {
			$scope.membroGrupo.pessoasEncontradas = data.resultado;
		});
	};

	$scope.membroGrupo = {};

	$scope.iniciarMembroGrupo = function() {
		$scope.pessoaRelacionamento = {
			id : null,
			inicio : null,
			pessoa : null,
			podeModificar : null,
			proprietario : null,
			relacionamento : null,
			relacionamentoFuncao : null,
			termino : null,
			cpfCnpj : null,
			nome : null
		};

		$scope.membroGrupo = {
			filtro : {
				tipoPessoa : "PF",
				nome : null,
				cpfCnpj : null
			},
			pessoasEncontradas : null,
			pessoaSelecionada : null,
			acessoGrupoTempoIndeterminado : "S"
		};
	};

	$scope.salvar = function() {
		$scope.registro['@class'] = "gov.emater.aterweb.model.PessoaGrupo";

		if ($scope.selecionado != null) {
			if ($scope.registroLocal === 'mesmoNivel') {
				$scope.registro.pessoaGrupo = $scope.selecionado.pessoaGrupo;
			} else {
				$scope.registro.pessoaGrupo = $scope.selecionado;
			}
		}

		if ($scope.registro.pessoaGrupo != null) {
			$scope.registro.pessoaGrupo['@class'] = "gov.emater.aterweb.model.PessoaGrupo";
		}

		$http.post(baseUrl + PAGINA + ACAO_SALVAR, $scope.registro).success(
				function(data, status, headers, config) {
					if (data.executou) {
						alert("Registro Salvo!!!");
					} else {
						alert("Erro ao salvar o registro");
						console.log(data.resultado);
					}
				});
	};

	// inicializar a tela
	$scope.init();
}
