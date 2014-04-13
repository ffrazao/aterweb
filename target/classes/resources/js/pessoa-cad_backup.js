$(function(){
	$("div.gerenciar").each(function(index_gerenciar){
		var objGerenciar = $(this);
		var tabelaGerenciar = $(objGerenciar).find('table').eq(0);
		var formularioGerenciar = $(objGerenciar).find('.formulario').eq(0);
		var elementos = [];

		$(formularioGerenciar).hide();
		
		//----------------------------------------------------------------------------------------------
		//Construir tabela de acordo com formulário
		$(formularioGerenciar).find(":input").each(function(index){
			if($(this).attr('exibir')=="true"){
				var coluna = '<th>' + $(this).attr('title') +  '</th>';
				elementos.push($(this).attr('nomeCampo'));

				$(tabelaGerenciar).children('thead').append(coluna);
			}
		});
		$(tabelaGerenciar).children('thead').append('<th>Acoes</th>');
		//----------------------------------------------------------------------------------------------

		//----------------------------------------------------------------------------------------------
		//Salvar formulario na tabela
		function salvarNovo(){
			var linha = $('<tr></tr>');
			$(formularioGerenciar).find(":input").not('button').each(function(index){
				var existe = elementos.indexOf($(this).attr('nomeCampo'));
				var coluna;
				var input = $('<input type="hidden" />');
				var valor = $(this).val();

				$(input).attr('id',$(this).attr('id'));
				$(input).attr('nomeCampo',$(this).attr('nomeCampo'));
				$(input).val(valor);
				if(existe > -1){
					coluna = $('<td></td>');
					if($(this).is('select')){
						$(coluna).append( '<p>' + $(this).children('option:selected').text() + '</p>');
					}else{
						$(coluna).append( '<p>' + valor + '</p>');
					}

					$(coluna).append(input);
				}else{
					coluna  = input;
				}
				$(linha).append(coluna);
			});

			var acoes = $('<td></td>');
			acoes.append('<button type="button" class="editar"  data-toggle="modal" data-target="#' + $(formularioGerenciar).children('.modal').attr('id') + '">Editar</button>');
			acoes.append('<button type="button" class="remover">Remover</button>');
			$(linha).append(acoes);

			$(tabelaGerenciar).children('tbody').append(linha);
		}

		function salvarEdicao(e){
			var linha = e.data.linha;

			$(formularioGerenciar).find(":input").not('button').each(function(index){
				var campo = $(linha).find("#"+$(this).attr('id')+":input").eq(0);

				$(campo).val($(this).val());

				if($(this).is('select')){
					$(campo).parents('td').children('p').html($(this).children('option:selected').text());
				}else{
					$(campo).parents('td').children('p').html($(this).val());
				}
			});
		}

		//----------------------------------------------------------------------------------------------
		//Abrir formulario para incluir novo item
		$(this).find("button.novo").click(function(){
			$(formularioGerenciar).find('button.salvar').bind('click',salvarNovo);
			$("div.formulario").show();
		});
		//----------------------------------------------------------------------------------------------

		//----------------------------------------------------------------------------------------------
		//Destroi funcoes e reseta formulario apos salvar
		$(formularioGerenciar).find('button.salvar').click(function(){						
			$(this).unbind('click',salvarNovo);
			$(this).unbind('click',salvarEdicao);

			$(formularioGerenciar).find('button.cancelar').click();
			$("div.formulario").hide();
		});
		//----------------------------------------------------------------------------------------------

		//----------------------------------------------------------------------------------------------
		//Editar item selecionado
		$(tabelaGerenciar).on("click","button.editar",function(){
			var linha = $(this).parents('tr');

			$(formularioGerenciar).find('button.salvar').bind('click',{linha:linha},salvarEdicao);
			$("div.formulario").show();
		});

		//----------------------------------------------------------------------------------------------
		//Remover item selecionado
		$(tabelaGerenciar).on("click","button.remover",function(){
			$(this).parents('tr').eq(0).remove();
		});
		//----------------------------------------------------------------------------------------------

		//----------------------------------------------------------------------------------------------
		//Cancelar novo item
		$(formularioGerenciar).find('button.cancelar').click(function(){
			$(formularioGerenciar).find("[type!='hidden']:input").not('button').each(function(index){
				if($(this).is('select')){
					$(this).val($(this).children('option:first').val());	
				}else{
					$(this).val('');	
				}
			});
		});
		//----------------------------------------------------------------------------------------------
	});
});

/**
 * Script do módulo
 */
/* Definições */

var objetoTeste = undefined;

/* Máscaras */

$(function(){
	
	$(".cpf").mask('999.999.999-99');
	$(".cnpj").mask('99.999.999/9999-99');
	$(".cep").mask('99999-999');
	$(".data").mask('99/99/9999');
	
	$(".nis").mask('99999999999');
	
	$("#tituloNumero").mask('999999999999');
	
	$("#cnhNumero").mask('99999999999');



  $(".numero").keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      return false;
    }
   });
});


/* Funções */
function retornarFinalidade(v){
	if(v == 'C'){
		v = 'Comercial';
	}else if (v == 'R') {
		v = 'Residencial';	
	}else {
		v = 'Comercial e Residencial';
	}
	return v;
}

function retornarPais(elemento){
    $.getJSON(baseUrl + "dominio",
      {ent: 'LocalizacaoPaisVi'}
     ,function(data){
        $(elemento).html('<option>Selecione</option>');
         $.each(data.resultado,function(index,value){
            $(elemento).append('<option value="' + value.id + '">' + value.nome + '</option>');
             console.log(value);
        });
         
    });
}

function retornarEstado(elemento,paisId){
    $.getJSON(baseUrl + "dominio",
      {ent: 'LocalizacaoEstadoVi',npk: 'localizacaoPaisVi.id',vpk: paisId}
     ,function(data){
        $(elemento).html('<option>Selecione</option>');
         $.each(data.resultado,function(index,value){
            $(elemento).append('<option value="' + value.id + '">' + value.nome + '</option>');
             console.log(value);
        });
         
    });
}


function retornarMunicipio(elemento,estadoId){
    $.getJSON(baseUrl + "dominio",
      {ent: 'LocalizacaoMunicipioVi',npk: 'localizacaoEstadoVi.id',vpk: estadoId}
     ,function(data){
        $(elemento).html('<option>Selecione</option>');
         $.each(data.resultado,function(index,value){
            $(elemento).append('<option value="' + value.id + '">' + value.nome + '</option>');
             console.log(value);
        });
         
    });
}


function retornarCidade(elemento,municipioId){
    $.getJSON(baseUrl + "dominio",
      {ent: 'LocalizacaoCidadeVi',npk: 'localizacaoMunicipioVi.id',vpk: municipioId}
     ,function(data){
        $(elemento).html('<option>Selecione</option>');
         $.each(data.resultado,function(index,value){
             console.log(value);
            $(elemento).append('<option value="' + value.id + '">' + value.nome + '</option>');
             
        });
         
    });
}


$(function(){
    $(".paises").each(function(){
        retornarPais($(this));
    });
    
    $(".paises").change(function(){
        console.log($(this).parent().parent().find('.estados').eq(0));
        retornarEstado($(this).parent().parent().find('.estados').eq(0),$(this).val());
        
    });
    
    $(".estados").change(function(){
        retornarMunicipio($(this).parent().parent().find('.municipios').eq(0),$(this).val());
    });
    
    $(".municipios").change(function(){
        retornarCidade($(this).parent().parent().find('.cidades').eq(0),$(this).val());
    });

});



function retornarColuna(nome,texto,value,tag){
	if(value == undefined || value == null){value = texto;}
	return '<td><input type="hidden"  name="' + nome + '" value="' +  value + '" tag="' + tag + '" /><p>' + texto + '</p></td>';
}
function retornarCampo(nome,value,tag){
	return '<input type="hidden"  name="' + nome + '" value="' +  value + '" tag="' + tag + '" />';
}

function btnFiltrar() {
	// $("#div_filtro").show().delay(1000);

}

function mostrarDadosPessoaFisica(){
	$(".pessoaFisica,#navDocumentos").show();
	$(".pessoaJuridica").hide();
	$(".pessoaFisica").find('input,textarea,select').each(function(){
		$(this).removeAttr('disabled');
	});
	$(".pessoaJuridica").find('input,textarea,select').each(function(){
		$(this).attr('disabled','disabled');
	});
	
	$("#classePessoa").val('gov.emater.aterweb.model.PessoaFisica');
	$("#typePessoa").val('PessoaFisica');
};

function mostrarDadosPessoaJuridica(){
	$(".pessoaJuridica").show();
	$(".pessoaFisica,#navDocumentos").hide();
	$(".pessoaJuridica").find('input,textarea,select').each(function(){
		$(this).removeAttr('disabled');
	});
	$(".pessoaFisica").find('input,textarea,select').each(function(){
		$(this).attr('disabled','disabled');
	});
	
	$("#classePessoa").val('gov.emater.aterweb.model.PessoaJuridica');
	$("#typePessoa").val('PessoaJuridica');
};

function retornaValorElemento(elemento){
	if(elemento.is('[val]')){
		return elemento.attr('val');
	}else{
		return elemento.text();
	}
}

function incluir() {
	$("#formularioPessoa").hide();
	$("#modalSelecionarPessoa").modal('show');
	return 0;
}

$("#btnInserirFisica, #btnInserirJuridica").click(function(){
	if($(this).val()=='PF'){
		mostrarDadosPessoaFisica();
	}else{
		mostrarDadosPessoaJuridica();
	}
	$("#pessoaTipo").val($(this).val());
	$("#formulario_titulo").html("Cadastrar Pessoa");
	
	$("#formularioPessoa").reset();
	$("#btn_formulario_inserir").text("Inserir");
	$("#modalSelecionarPessoa").modal('hide');
	$("#div_formulario").show();
	$("#formularioPessoa").fadeIn(1000);
});

function salvar(){
	var tipoPessoa = $("#pessoaTipo").val();
	var classe = '';

	if(tipoPessoa == 'PF'){
	   classe = 'Fisica';
	}else{
	   classe = 'Juridica';
	}
	var testeArr = [];
	$(".gerenciar").each(function(){
		var tipo = $(this).attr('id');
			$(this).children('tbody').find('tr').each(function(){
				var obj = $(this).serializeAnything('pessoaMeioContatos');
				obj.meioContato = $(this).serializeAnything('meioContato');
				
				if(tipo=='enderecosTable'){
					obj.meioContato.localizacao = $(this).serializeAnything('localizacao');
				}
				testeArr.push(obj);
			});
		});
	var objForm = $("#div_formulario").find('form').serializeObject();
	objForm.pessoaMeioContatos = testeArr;
	var jsontxt = JSON.stringify(objForm);
	console.log(objForm);
	console.log(jsontxt);
	//data: {pessoa: JSON.stringify($("#div_formulario").find('form').serializeObject()) },


	$.ajax({
		url: baseUrl + "pessoa-cad/salvar" + classe,
		type: 'POST', 
		data: jsontxt,		
		contentType: 'application/json',
		dataType: 'json',
		async: false,
		success: function(data) {
			if(data.executou === true){
				alert('salvo com sucesso');
			}else{
				alert('não foi possivel salvar');	
			}
			console.log(data);
		}
	});
}

function editar() {
	$("#formularioPessoa").hide();
	var check = $(".usuario_selecionado:checked");
	var id = $(".usuario_selecionado:checked").val();

	$.getJSON(baseUrl + "pessoa-cad/restaurar", {
		id: id
	}, function (data) {
		objetoTeste = data.resultado;
		if(!data.executou){
			return 0;	
		}
	
		var pessoa = data.resultado;
		console.log(pessoa);
		if (pessoa) {
			$("#formulario_titulo").html("Editar '" + pessoa.nome.split(" ")[0] + "'");
			$("#nome").val(pessoa.nome);
			$("#apelidoSigla").val(pessoa.apelidoSigla);
			$("#situacao").val(pessoa.situacao);
			$("#observacoes").text(pessoa.observacoes);
			$("#pessoaTipo").val(pessoa.pessoaTipo);
			
			$("#inputId").val(pessoa.id);
			
			$("#tituloNumero").val(pessoa.tituloNumero);
			$("#tituloSecao").val(pessoa.tituloSecao);
			$("#tituloZona").val(pessoa.tituloZona);
			
			$("#rgDataEmissao").val(pessoa.rgDataEmissao);
			$("#rgLocalizacao").val(pessoa.rgLocalizacao);
			$("#rgNumero").val(pessoa.rgNumero);
			$("#rgOrgaoEmissor").val(pessoa.rgOrgaoEmissor);
			
			$("#camNumero").val(pessoa.camNumero);
			$("#camOrgao").val(pessoa.camOrgao);
			$("#camSerie").val(pessoa.camSerie);
			$("#camUnidade").val(pessoa.camUnidadeMilitar);
			
			$("#cnhCategoria").val(pessoa.cnhCategoria);
			$("#cnhNumero").val(pessoa.cnhNumero);
			$("#cnhPrimeiraHabilitacao").val(pessoa.cnhPrimeiraHabilitacao);
			$("#cnhValidade").val(pessoa.cnhValidade);
			
			$("#certidaoCasamentoCartorio").val(pessoa.certidaoCasamentoCartorio);
			$("#certidaoCasamentoFolha").val(pessoa.certidaoCasamentoFolha);
			$("#certidaoCasamentoLivro").val(pessoa.certidaoCasamentoLivro);
			$("#certidaoCasamentoRegime").val(pessoa.certidaoCasamentoRegime);
			
			if(pessoa.pessoaMeioContatos.length>0){
				var enderecos = '';
				var emails = '';
				var telefones = '';
				var indexAux = 0;
				
				$.each(pessoa.pessoaMeioContatos,function(index,value){
					
					var acoes = '<td><p><button name="editar" class="btn btn-warning btn-sm" type="button"><span class="glyphicon glyphicon-pencil"></span></button> ';
			acoes += '<button name="excluir" class="btn btn-danger btn-sm" type="button"><span class="glyphicon glyphicon-trash"></span></button></p></td>';

			$(this).parents('.modal').eq(0).modal('hide');
					var meioContato = value.meioContato;
					var nomeObjeto = 'pessoaMeioContatos';
					var nomeSubObjeto = 'meioContato';
						if(meioContato.meioContatoTipo == "END"){
							
							enderecos += '<tr>' + retornarCampo('.id',value.id,nomeObjeto);
							enderecos += retornarCampo('.@class','gov.emater.aterweb.model.PessoaMeioContato',nomeObjeto);
                            enderecos += retornarCampo('.@class','gov.emater.aterweb.model.MeioContatoEndereco',nomeSubObjeto);
							enderecos += retornarCampo('.id',meioContato.id,nomeSubObjeto);
							enderecos += retornarCampo('.meioContatoTipo',meioContato.meioContatoTipo,nomeSubObjeto);
							enderecos += retornarColuna('.finalidade',retornarFinalidade(value.finalidade),value.finalidade,nomeObjeto);
							enderecos += retornarColuna('.cep',meioContato.cep,meioContato.cep,nomeSubObjeto);
							
							var pais = meioContato.localizacao.localizacao.localizacao.localizacao;
							enderecos += retornarColuna('',pais.nome,pais.nome,pais.id);
							var estado = meioContato.localizacao.localizacao.localizacao;
							enderecos += retornarColuna('',estado.nome,estado.nome,estado.id);
							
							var municipio = meioContato.localizacao.localizacao;
							enderecos += retornarColuna('',municipio.nome,municipio.nome,municipio.id);
							
							var cidade = meioContato.localizacao;
							enderecos += retornarColuna('.id',cidade.nome,cidade.id,'localizacao');
							enderecos += retornarColuna('.descricao',meioContato.descricao,meioContato.descricao,nomeSubObjeto);
							enderecos += acoes;
							enderecos += '</tr>';
						}else if(meioContato.meioContatoTipo == "TEL"){
							telefones += '<tr>' + retornarCampo('.id',value.id,nomeObjeto);
							telefones += retornarCampo('.@class','gov.emater.aterweb.model.PessoaMeioContato',nomeObjeto);
                            telefones += retornarCampo('.@class','gov.emater.aterweb.model.MeioContatoTelefonico',nomeSubObjeto);
							telefones += retornarCampo('.id',meioContato.id,nomeSubObjeto);
							telefones += retornarColuna('.meioContatoTipo','Telefone',meioContato.meioContatoTipo,nomeSubObjeto);
							telefones += retornarColuna('.finalidade',retornarFinalidade(value.finalidade),value.finalidade,nomeObjeto);
							telefones += retornarColuna('.numero',meioContato.numero,meioContato.numero,nomeSubObjeto);
							telefones += acoes;
							telefones += '</tr>';
						}else if(meioContato.meioContatoTipo == "EMA"){
							emails += '<tr>' + retornarCampo('.id',value.id,nomeObjeto);
							emails += retornarCampo('.@class','gov.emater.aterweb.model.PessoaMeioContato',nomeObjeto);
							emails += retornarCampo('.@class','gov.emater.aterweb.model.MeioContatoEmail',nomeSubObjeto);
							emails += retornarCampo('.id',meioContato.id,nomeSubObjeto);
                            
							emails += retornarColuna('.meioContatoTipo','E-Mail',meioContato.meioContatoTipo,nomeSubObjeto);
							emails += retornarColuna('.finalidade',retornarFinalidade(value.finalidade),value.finalidade,nomeObjeto);
							emails += retornarColuna('.email',meioContato.email,meioContato.email,nomeSubObjeto);
							emails += acoes
							emails += '</tr>';
						}else{
							console.log('Tipo meio de contato desconhecido!');	
						}
					
						
				});
				$("#enderecosTable").children("tbody").html(enderecos);
				$("#meiosContatoTable").children("tbody").html(telefones + emails);
			}
			
			
			
			if (pessoa.publicoAlvo == 'S') {
					$("input[name='publicoAlvoConfirmacao']").eq(0).click();
				} else {
					$("input[name='publicoAlvoConfirmacao']").eq(1).click();
				}
			if (pessoa.pessoaTipo == 'PF') {
				mostrarDadosPessoaFisica();

				$("#cpf").val(pessoa.cpf);
				$("#nascimento").val(pessoa.nascimento);
				
				
		
				$("#estadoCivil").val(pessoa.estadoCivil);
				$("#escolaridade").val(pessoa.escolaridade);
		

				if (pessoa.nacionalidade == 'BN') {
					$("input[name='nacionalidade']").eq(0).click();
				} else {
					$("input[name='nacionalidade']").eq(1).click();
				}
				

				if (pessoa.sexo == 'M') {
					$("input[name='sexo']").eq(0).click();
				} else {
					$("input[name='sexo']").eq(1).click();
				}

			} else {
				mostrarDadosPessoaJuridica();
					
				$("#cnpj").val(pessoa.cnpj);
				$("#inscricaoEstadual").val(pessoa.inscricaoEstadual);
			}
			
			$("#btn_formulario_inserir").text("Atualizar");
			$("#div_formulario").show();
			$("#formularioPessoa").fadeIn(1000);
		}
	})
	.fail(function(){
		alert('Erro ao tentar construir o formulário!');
	});
}

function excluir() {
	check = $(".usuario_selecionado:checked");
	id = $(".usuario_selecionado:checked").val();
	$.get(baseUrl + "pessoa-cad/excluir", {
		id: id
	}, function (data) {

		if (data) {
			$(check).parent().parent().remove();
			alert("Deletado com sucesso!");
		}
	});
}

// Clicar no botão de executar filtro
function filtrar() {
	var nome = $("#filtroNome").val();
	//$("#pessoa_visualizar").html("Selecione uma pessoa!").hide();

	$("#listagem").html('');
	$.getJSON(baseUrl + "pessoa-cad/filtrar", {
		nome: nome
	},
	 function (data) {
		
		 if(!data.executou){
			return 0;	
		}
		 
				  if (data.resultado.length > 0) {
					  var pessoas = data.resultado;
					  $.each(pessoas,function(index,value){
					
						   var id = value.id;
						  var nome = value.nome;
						  var tipoPessoa = value.pessoaTipo;
						  var CPFCNPJ = '';
						  
		
							  if(tipoPessoa=='PF'){
								  if(value.cpf != null)
									CPFCNPJ  = value.cpf;
							  }else{
								  if(value.cnpj != null)
									CPFCNPJ = value.cnpj;
							  }
							  
						 
						   var checkbox = '<input type="radio" name="opcao" class="usuario_selecionado" id="usuario_selecionado_' + id + '" value="' + id + '"/>';
						  $("#listagem").append("<tr> <td>" + checkbox + "</td> <td>" + id + "</td> <td>" + nome + "</td> <td>" + CPFCNPJ + "</td> </tr>");
					  });
				  }else{
					  $("#listagem").html("<tr> <td colspan='4' style='color: red; font-weight:bold;'> <center>Pessoa '" + $("#nome").val() + "' não foi encontrada! <br /> Clique em <button class='btn btn-success'>Incluir</button> para adicionar nova pessoa.</center> </td> </tr>");
				  }

			  })
	.fail(function(){
		alert('Falha ao carregar a página!');
	});
};

function preVisualizar(id) {
	//$("#listagem").parent().attr('style', 'width:80% !important');

	//console.log($("#"+botao.id).parent().parent().css('background-color','red'));
	$(".usuario_selecionado").parent().parent().removeClass('selecionado');
	$("#usuario_selecionado_" + id).parent().parent().addClass('selecionado');

	$.getJSON(baseUrl + "pessoa-cad/restaurar", {
		id: id
	},function (data) {
		if(!data.executou){
			return 0;	
		}
	
		var pessoa = data.resultado;
		var id = pessoa.id;
		var imagem = "http://placehold.it/120x130/4D99E0/ffffff.png&text=120x130";
		var nome = pessoa.nome;
		var apelido = pessoa.apelidoSigla;
		var nacionalidade = '';
		var situacao = pessoa.situacao;

		if (nome == "Emater") imagem = baseUrl + "resources/img/enterprise-logo.png";

		var sexo;
		if (pessoa.sexo == 'M') {
			sexo = "Masculino"
		} else {
			sexo = "Feminino"
		};
		//if(pessoa.pessoaTipo == "PJ") sexo = "Empresa";
		var tipoPessoa;
		if (pessoa.pessoaTipo == 'PF') {
			tipoPessoa = "Física";
		} else {
			tipoPessoa = "Jurídica";
		};
		var publicoAlvo;
		if (pessoa.publicoAlvo == 'S') {
			publicoAlvo = "Sim";
		} else {
			publicoAlvo = "Não";
		};

		var tabela = "";
		tabela += "<table width='100%'>";
		tabela += " <tr> <th>Tipo</th><td>" + tipoPessoa + "</td> </tr>";
		tabela += " <tr> <th>Alvo</th><td>" + publicoAlvo + "</td> </tr>";
		tabela += " <tr> <th>Situação</th><td>" + situacao + "</td> </tr>";
		tabela += "</table>";

		$("#pessoa_visualizar").html("<img src='" + imagem + "' /> <br /><b>" + nome + "</b><br />" + sexo + "<br /><br />" + tabela);
	})
	.fail(function () {
		$("#pessoa_visualizar").html("Erro ao construir a página!");
	});

}

$(document).on("click", "#btn_formulario_inserir",
			   function () {

					var  nome = $("#formulario_nome").val();
					var tipoPessoa = $("#pessoaTipo").val();
				   var classe = '';
				   
				   if(tipoPessoa == 'PF'){
					   classe = 'Fisica';
				   }else{
					   classe = 'Juridica';
				   }
				   
				   
				   $.post("pessoa-cad/salvar" + classe, {
					   nome: nome
				   },
						  function (data) {
		
							  if (data) {
								  $("#listagem").prepend("<tr> <td></td> <td>1</td> <td>2</td> <td>3</td> <td>4</td> </tr>"); // TODO:
								  // TERMINAR
								  $("#div_formulario").hide().delay(1000);
								  $("#div_listagem").show();
							  }
						  });
			   });

$(document).on("click", ".usuario_selecionado", function () {

	preVisualizar(this.value);
	$("#btn_ferramenta_editar").show();
	$("#btn_ferramenta_excluir").show();
    $("#btn_ferramenta_acoes").show();
	return false;
});

$(document).on("click", "table tbody tr", function () {
	var id = $(this).children('td').eq(0).find('input').val();

	$("input[type=checkbox]").attr('checked', false);

	$("#usuario_selecionado_" + id).attr('checked', true);
	$("#usuario_selecionado_" + id).click();
});

 $(function(){

	$("#modalRelacionamento,#modalMeioContato,#modalEndereco").each(function(){
		$(this)
		.find(".modal-footer").children("button[name='salvar']")
		.click(function(){
			var formulario = $(this).parents('.modal-content').children('.modal-body');
			var classeSub;
			linha = '';
			formulario.find('input,select').each(function(){
				var index = ($('#meiosContatoTable').find('tbody').children('tr').length + $('#enderecosTable').find('tbody').children('tr').length);
				var nomeObjeto = 'pessoaMeioContatos';

				var nome = $(this).attr('nomeCampo');
				var valor = $(this).val();
				var tag = $(this).attr('tag');
				
				if(nome == '.meioContatoTipo'){
					if(valor == 'EMA'){
						classeSub = 'gov.emater.aterweb.model.MeioContatoEmail';
					}else if(valor == 'TEL'){
						classeSub = 'gov.emater.aterweb.model.MeioContatoTelefonico';
					}else{
						classeSub = 'gov.emater.aterweb.model.MeioContatoEndereco';
					}
				}

				if($(this).attr('id') != undefined){
					if($(this).is('select')){
						if($(this).attr('nomeCampo') == undefined){
							linha += retornarColuna('',$(this).children('option:selected').text(),valor,tag);
						}else{
							linha += retornarColuna(nome,$(this).children('option:selected').text(),valor,tag);
						}
					}else{
						if($(this).attr('type') =="hidden"){
							linha += retornarCampo(nome,valor,tag);
						}else{
							linha += retornarColuna(nome,valor,valor,tag);
						}
					}
				}
			});
			
			var valClass = retornarCampo('.@class','gov.emater.aterweb.model.PessoaMeioContato','pessoaMeioContatos');
			valClass += retornarCampo('.@class',classeSub,'meioContato');
			
			var acoes = '<td><p><button name="editar" class="btn btn-warning btn-sm" type="button"><span class="glyphicon glyphicon-pencil"></span></button> ';
			acoes += '<button name="excluir" class="btn btn-danger btn-sm" type="button"><span class="glyphicon glyphicon-trash"></span></button></p></td>';
			$(this).parents('.row').eq(0).find('tbody').eq(0).append('<tr>' + valClass + linha + acoes + '</td>');

			$(this).parents('.modal').eq(0).modal('hide');

		});
	});
});

$("#relacionamentosTable,#meiosContatoTable").on("click","button[name='editar']",function(){
		var formulario = $(this).parents('.row').eq(0).find('.modal').eq(0).find('.modal-body').eq(0);
		var linhaSel = $(this).parents('tr').eq(0);
		
		$(linhaSel).find(':input').each(function(index){
			var nome = $(this).attr('name');
			var tag = $(this).attr('tag');
			var valor = $(this).val();
			
			if(tag!='' || tag != undefined){
				tag = "[tag='" + tag + "']";
			}else{
				tag = '';	
			}
			
			var campo = $(formulario).find("[nomeCampo='" + nome +"']" + tag).eq(0);
			
			
			$(campo).val(valor);
			
			console.log(nome,tag,valor,campo);

			//formulario.eq(index).find('input:last,select:last').eq(0).val($(this).children('input').val());                               
		});
	
		$(this).parents('.row').eq(0).find('.modal').eq(0).modal('show');

		$(this).parents('.row').eq(0).find('.modal').eq(0).find("button[name='salvar']")
		.click(function(){
			linhaSel.remove();
		});
});
$("#enderecosTable").on("click","button[name='editar']",function(){
	var formulario = $(this).parents('.row').eq(0).find('.modal').eq(0).find('.modal-body').eq(0).find('.form-group');
	var linhaSel = $(this).parents('tr').eq(0)
	
	$(this).parents('tr').eq(0).find('td').each(function(index){
			formulario.eq(index).find('input:last').eq(0).val($(this).children('input').val());
			select = formulario.eq(index).find('select:last').eq(0);
	
			if(index > 1){
				if(select != undefined && (select.val() == undefined || select.val()=='Selecione')){
					select.prepend('<option selected="selected">' + $(this).children('input').val() +'</option>');   

				}else{
					select.children('option').eq(0).val($(this).children('input').val());
					select.children('option').eq(0).attr('selected','selected');
				}
			}else{
				formulario.eq(index).find('select:last').eq(0).val($(this).children('input').val());	
			}
			                            
		});
		$(this).parents('.row').eq(0).find('.modal').eq(0).modal('show');

		
		$(this).parents('.row').eq(0).find('.modal').eq(0).find("button[name='salvar']")
		.click(function(){
			linhaSel.remove();
		});
});

$(document).on("click","button[name='excluir']",function(){
	$(this).parents('tr').eq(0).remove();
});

$('#modalEndereco').on('hidden.bs.modal', function (e) {
 	$(this).find('select').each(function(index,value){
	
		if($(value).children('option:first').eq(0).val()!='Selecione'){
			$(value).children('option:first').eq(0).remove();
		}
		$(value).children('option').eq(0).attr('selected','selected');
	});
});

$("#tipoMeioContato").change(function(){
	if($(this).val()=='EMA'){
		$("#meioMeioContato").attr('nomeCampo','.email');
	}else{
		$("#meioMeioContato").attr('nomeCampo','.numero');
	}			
});

//Ativa��o do Angular JS
function cadastroCtrl($scope, $window) {}
