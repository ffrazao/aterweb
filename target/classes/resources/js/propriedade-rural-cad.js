/*
 * Script do módulo
 */
var meusArquivos = [];
var minhaGaleria = [];
// identificacao do endereco url para este script
const PAGINA = "propriedade-rural-cad";

// Clicar no botão de executar filtro
function filtrar() {
	//$("#div_listagem .panel-body").mask("Carregando...");
	var nome = $("#nome").val();

	$("#listagem").html('');
	$.get(baseUrl + PAGINA + ACAO_FILTRAR,	{ nome : nome },
					function(data) {
						if (data.executou) {
							for (var i = 0; i < data.resultado.length; i++) {
								var id = data.resultado[i].id;
								var nome = data.resultado[i].nome;
                                
								var situacao = data.resultado[i].situacaoFundiaria;
                                if(situacao == 'E') { situacao = "Escritura Definitiva"; } else if(situacao == 'C') { situacao = "Concessão de uso"; } else if(situacao == 'P') { situacao = "Posse"; }
                                
								var comunidade = '';
								var produtores = '';
                                
								var outorga = data.resultado[i].outorga;
                                if(outorga == 'S') { outorga = "Sim"; } else if(outorga == 'N') { outorga = "Não"; }
                                
								var sistemaProducao = '';

								var checkbox = '<input type="radio" name="opcao" class="propriedade_selecionada" id="propriedade_selecionada_'
										+ id + '" value="' + id + '"/>';

								$("#listagem").append(
										"<tr>" +
                                                                                "<td>" + checkbox + "</td>" +
                                                                                "<td>" + nome + "</td>" +
                                                                                "<td>" + situacao + "</td>" +
                                                                                "<td>" + comunidade + "</td>" +
                                                                                "<td>" + produtores + "</td>" +
                                                                                "<td>" + outorga + "</td>" +
                                                                                "<td>" + sistemaProducao + "</td>" +
                                                                                "</tr>");
							}
							$("#div_listagem .panel-body").unmask();
						};
					});
}

function carregaDados(obj) {
    var campo = [];
    var valor = [];
    /*$.each(obj, function(i, data){
        console.error(data);
    });*/
}

function editar() {
    check = $(".propriedade_selecionada:checked");    
    id = $(".propriedade_selecionada:checked").val();
    $("#btn_ferramenta_editar").hide();

    $.get(baseUrl + PAGINA + ACAO_RESTAURAR, { id: id }, function(data) {
        if(data.executou) {
            //console.log(data)
            var res = data.resultado;
            //carregaDados(res);
            $("#inputNome").val(res.nome);
            
            $("#inputId").val(res.id);
            $("#inputNome").val(res.nome);
            $("#cepEndereco").val(res.meioContatoEndereco.cep);
            $("#localEndereco").val(res.meioContatoEndereco.descricao);
            //$("#inputRA").val(res.meioContatoEndereco.localizacao.id);
            
            $("#inputLatitude").val(res.meioContatoEndereco.latitude);
            $("#inputLongitude").val(res.meioContatoEndereco.longitude);
            
            $("#inputRegistro").val(res.numeroRegistro);
            
            $("#selectOutorga").val(res.outorga);
            $("#inputNumOutorga").val(res.outorgaNumero);
            $("#inputValidadeOutorga").val(res.outorgaValidade);

            $("#selectFonteAguaPrincipal").val(res.fonteAguaPrincipal);
            $("#inputVazaoPrincipal").val(res.fonteAguaPrincipalVazao);
            $("#selectFonteAguaDomestica").val(res.fonteAguaDomestica);
            $("#inputVazaoDomestica").val(res.fonteAguaDomesticaVazao);
            
            $("#inputUsoSoloCulturasPerenesArea").val(res.usoSoloCulturaPereneHa);
            $("#inputUsoSoloCulturasPerenesUnitario").val(res.usoSoloCulturaPereneVlUnit);
            $("#inputUsoSoloCulturasPerenesTotal").val(res.usoSoloCulturaPereneVlTot);
            
            $("#inputUsoSoloCulturasTermporarias").val(res.usoSoloCulturaTemporariaHa);
            $("#inputUsoSoloCulturasTermporariasUnitario").val(res.usoSoloCulturaTemporariaVlUnit);
            $("#inputUsoSoloCulturasTermporariasTotal").val(res.usoSoloCulturaTemporariaVlTot);
            
            $("#inputUsoSoloPastagens").val(res.usoSoloPastagemHa);
            $("#inputUsoSoloPastagensUnitario").val(res.usoSoloPastagemVlUnit);
            $("#inputUsoSoloPastagensTotal").val(res.usoSoloPastagemVlTot);
            
            $("#inputUsoSoloBenfeitoria").val(res.usoSoloBenfeitoriaHa);
            $("#inputUsoSoloBenfeitoriaUnitario").val(res.usoSoloBenfeitoriaVlUnit);
            $("#inputUsoSoloBenfeitoriaTotal").val(res.usoSoloBenfeitoriaVlTot);
            
            $("#inputUsoSoloReservaLegal").val(res.usoSoloReservaLegalHa);
            $("#inputUsoSoloReservaLegalUnitario").val(res.usoSoloReservaLegalVlUnit);
            $("#inputUsoSoloReservaLegalTotal").val(res.usoSoloReservaLegalVlTot);
            
            $("#inputUsoSoloReservaPermanente").val(res.usoSoloPreservPermanenteHa);
            $("#inputUsoSoloReservaPermanenteUnitario").val(res.usoSoloPreservPermanenteVlUnit);
            $("#inputUsoSoloReservaPermanenteTotal").val(res.usoSoloPreservPermanenteVlTot);
            
            $("#inputUsoSoloOutras").val(res.usoSoloOutrasHa);
            $("#inputUsoSoloOutrasUnitario").val(res.usoSoloOutrasVlUnit);
            $("#inputUsoSoloOutrasTotal").val(res.usoSoloOutrasVlTot);
            
            $("#inputUsoSoloTotal").val(res.usoSoloTotalHa);
            $("#inputUsoSoloTotalB").val(res.usoSoloTotalHa);
            $("#inputUsoSoloValorTotal").val(res.usoSoloTotalVlTot);
            $("#inputUsoSoloValorTotalB").val(res.usoSoloTotalVlTot);
            
            $("#inputPastagemCanavial").val(res.pastagemCanavial);
            $("#inputPastagemCapineira").val(res.pastagemCapineira);
            $("#inputPastagemSilagem").val(res.pastagemSilagem);
            $("#inputPastagemFeno").val(res.pastagemFeno);
            $("#inputPastagemPastagemNatural").val(res.pastagemNatural);
            $("#inputPastagemPastagemArtificial").val(res.pastagemArtificial);
            $("#inputPastagemPastagemRotacionada").val(res.pastagemRotacionada);
            $("#inputPastagemILPILPF").val(res.pastagemIlpIlpf);
            
            $("#inputAreaIrrigadaAspersao").val(res.areaIrrigadaAspersao);
            $("#inputAreaIrrigadaAutoPropelido").val(res.areaIrrigadaAutoPropelido);
            $("#inputAreaIrrigadaPivoCentral").val(res.areaIrrigadaPivoCentral);
            $("#inputAreaIrrigadaGotejamento").val(res.areaIrrigadaGotejamento);
            $("#inputAreaIrrigadaMicroAspersao").val(res.areaIrrigadaMicroAspersao);
            $("#inputAreaIrrigadaSuperficie").val(res.areaIrrigadaSuperficie);
            $("#inputAreaIrrigadaOutros").val(res.areaIrrigadaOutros);
            $("#inputAreaIrrigadaTotal").val(res.areaIrrigadaTotal);
            
            $(function(){
                var total1 = $("#inputUsoSoloCulturasPerenesUnitario").val() * $("#inputUsoSoloCulturasPerenesArea").val();
                var total2 = $("#inputUsoSoloCulturasTermporariasUnitario").val() * $("#inputUsoSoloCulturasTermporarias").val();
                var total3 = $("#inputUsoSoloPastagensUnitario").val() * $("#inputUsoSoloPastagens").val();
                var total4 = $("#inputUsoSoloBenfeitoriaUnitario").val() * $("#inputUsoSoloBenfeitoria").val();
                var total5 = $("#inputUsoSoloReservaLegalUnitario").val() * $("#inputUsoSoloReservaLegal").val();
                var total6 = $("#inputUsoSoloReservaPermanenteUnitario").val() * $("#inputUsoSoloReservaPermanente").val();
                var total7 = $("#inputUsoSoloOutrasUnitario").val() * $("#inputUsoSoloOutras").val();
                
                $("#inputUsoSoloCulturasPerenesTotal").val(total1);
                $("#inputUsoSoloCulturasTermporariasTotal").val(total2);
                $("#inputUsoSoloPastagensTotal").val(total3);
                $("#inputUsoSoloBenfeitoriaTotal").val(total4);
                $("#inputUsoSoloReservaLegalTotal").val(total5);
                $("#inputUsoSoloReservaPermanenteTotal").val(total6);
                $("#inputUsoSoloOutrasTotal").val(total7);
                
                $("#inputUsoSoloValorTotalB").val(total1+total2+total3+total4+total5+total6+total7);
            });
            
            var tipoLocalizacao = res.propriedadeRuralLocalizacaos;
            
            var idsComunidades = [];
            var idsBacias = [];
           
            $.each(tipoLocalizacao, function(i, data){
                if(campoRecursivo(data.localizacao.localizacaoTipo, 'codigo') === "COMUNIDADE") {
                    id = data.localizacao.id;
                    rel = data.id;
                    $('#comuEndereco option[value="'+id+'"]').attr('data-rel', rel);
                    idsComunidades.push(id);
                } else if(campoRecursivo(data.localizacao.localizacaoTipo, 'codigo') === "BACIA_HIDROGRAFICA") {
                    id = data.localizacao.id;
                    rel = data.id;
                    $('#baciaEndereco option[value="'+id+'"]').attr('data-rel', rel);
                    idsBacias.push(id);
                }
            });
            
            $("#comuEndereco").val(idsComunidades);
            $("#baciaEndereco").val(idsBacias);
           
            montarArquivos(res.propriedadeRuralArquivoList);
            
            $("#btn_formulario_inserir").text("Atualizar");
            $("#div_formulario").show();
        }
    });
    
    $("#barra-ferramenta").children().eq(1).append('<button id="btn_formulario_inserir" type="button" class="btn btn-success" name="action">Salvar</button>')
}

$(document).on("click", ".propriedade_selecionada", function() {
    $("#btn_ferramenta_editar").show();    
});

/*$(document).on("change", ".propriedade_selecionada", function() {
    $(this).val()
})*/

function idsArquivosUpload() {
    var retorno = [];
    
    $.each(arquivosUpload, function(i, data){
        //console.log(data);
        retorno.push({arquivo : {id : data.id}});
        console.log(data.id);
    })
    //console.log(arquivosUpload);
    //console.warn(arquivosUpload[0].id);
    return retorno;
}

function salvar() {
    var objForm = $('#form_propriedade').eq(0).serializeObject();    
    var obj = $('#form_propriedade').eq(0).serializeAnything('meioContatoEndereco');
    var obj2 = $('#form_propriedade').eq(0).serializeAnything('propriedadeRuralLocalizacaos');
    
    obj.localizacao = $('#form_propriedade').eq(0).serializeAnything('localizacao');
    objForm.meioContatoEndereco = obj;
    objForm.propriedadeRuralLocalizacaos = [];
    objForm.meioContatoEndereco['id'] = objForm.id;
    objForm.meioContatoEndereco['@class'] = "gov.emater.aterweb.model.MeioContatoEndereco";
    /*
    $.each($("#comuEndereco").val(), function(i, data){
        //console.log(data);
        rel = $(this).attr('data-rel').val();
        console.warn(rel);
        objForm.propriedadeRuralLocalizacaos.push( {id: rel, localizacao : { id : data } });
    });
    
    $.each($("#baciaEndereco").val(), function(i, data){
        //console.log(data);
        rel = $(this).attr('data-rel').val();
        console.warn(rel);
        objForm.propriedadeRuralLocalizacaos.push( {id: rel, localizacao : { id : data } });
    });
    */
    $.each($("#comuEndereco").val(), function(i, data){
        el = $("#comuEndereco option[value='"+data+"']");
        id = $(el).val();
        rel = $(el).attr('data-rel');
        
        objForm.propriedadeRuralLocalizacaos.push( { id : rel, localizacao : { id : id } });
    });
    
    $.each($("#baciaEndereco").val(), function(i, data){
        el = $("#baciaEndereco option[value='"+data+"']");
        id = $(el).val();
        rel = $(el).attr('data-rel');

        objForm.propriedadeRuralLocalizacaos.push( { id : rel, localizacao : { id : id } });
    });  
    
    objForm.propriedadeRuralArquivoList = idsArquivosUpload();
    
    $.ajax({
		url: baseUrl + PAGINA + ACAO_SALVAR,
		type: 'POST', 
		data: JSON.stringify(objForm),		
		contentType: 'application/json',
		dataType: 'json',
		async: false,
		success: function(data) {
			if(data.executou == true){
				alert("salvou");
			}else{
				console.error("Erro");
                alert("Não salvou");
			}
		}
	});
}

$(function(){
    $.get(baseUrl + "/dominio?ent=LocalizacaoCidadeVi&ord=nome", null, function(data) {
        $.each(data.resultado, function(i,data){
            $("#inputRA").append("<option value='"+data.id+"'>"+data.nome+"</option>");
        });
    });
    
    $.get(baseUrl + "/dominio?ent=SistemaProducao&ord=nome", null, function(data) {
        $.each(data.resultado, function(i,data){
            $("#inputSistemaProducao").append("<option value='"+data.id+"'>"+data.nome+"</option>");
        });
    });   
});

function montarArquivos(arquivos) {
    $.each(arquivos, function(i, data) {
        console.log(data);
        tipo = data.arquivo.tipo.split("/")[0];
        extensao = data.arquivo.extensao.split(".")[1];
        
        meusArquivos.push(data.arquivo);
        
        if(tipo == 'image') { //Verifica se o tipo de arquivo é imagem, se for jogar para o array galeria e para montarGaleria
            urlExtensao = baseUrl + "resources/upload/" + data.arquivo.md5 + data.arquivo.extensao;
            minhaGaleria.push(data.arquivo);
        } else {
            urlExtensao = baseUrl + "resources/img/extensao/"+extensao+".png";
        }
        
        arquivo = '<div class="col-sm-2 meus-arquivos-grade-miniatura">';
        arquivo += '<div id="'+data.arquivo.id+'" class="meus-arquivos-grade-imagem" style="background-image:url(\''+urlExtensao+'\')"></div>';
        arquivo += '<span class="meus-arquivos-grade-texto"><input id="' + data.id + '" type="checkbox" class="arquivo_deletar" />' + data.arquivo.nome + '</span><br />';
        arquivo += '</div>';
        
        $("#meus-arquivos").append(arquivo);
    })    
    
    montarGaleria(minhaGaleria);
}

function removerArquivos() {
    var checado = $(".arquivo_deletar:checked");
    var tamanho = checado.size();
    var deletar = [];
        
    for(i=0; i<tamanho; i++) {
        deletar.push( { id: parseInt( checado.eq(i).attr('id') ) } );
    }
    
    console.log(deletar);
}

function montarGaleria(lista) {
    $.each(lista, function(i, data){
        $("#galeria").prepend('<div class="item link"><img src="resources/upload/'+ data.md5 + data.extensao +'" alt="'+data.nome+'" style="height: 250px; width: 100%;"></div>');
    })
    
    iniciarGaleria();
}

function iniciarGaleria() {
    $(".owl-carousel").owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        autoPlay: true,
        navigationText: ["Anterior", "Próximo"],
        stopOnHover: true,
        autoHeight: true
    });
}

function cadastroCtrl($scope, $window) {
}

function guardaArquivosUpload(arquivos) {
    console.error(arquivos);
}

function montaPorTipo(data) {
    var link = '';
    var tipo = '';
    var url = baseUrl + "resources/upload/";
    tipo = data.tipo.split('/')[0];
    
    $("#galeria_bg").html("");
    $("#galeria_bg").css("background-image", '');

    switch(tipo) {
        case 'image':
            link = "url("+ url + data.md5 + data.extensao + ")";
            $("#galeria_bg").css("background-image", link);
            break;
        case 'audio':
            $("#galeria_bg").html('<audio controls autoplay><source src="'+url+data.md5+data.extensao+'"></audio>');
            break;
        case 'video':
            $("#galeria_bg").html('<video controls autoplay><source src="'+url+data.md5+data.extensao+'"></video>');
            break;
        default:
            $("#galeria_bg").html("Não há visualização para este tipo de arquivo!");
    }
}

$("#meus-arquivos").on('click', '.meus-arquivos-grade-imagem, .meus-arquivos-lista-imagem', function(event){
    var $this = $(this);
    idClick = $this[0].id;
    
    $.each(meusArquivos, function(i, data) {
        if(data.id == idClick) {
            montaPorTipo(data);
        }
    })
    $("#galeria_imagem_nome").text('');
    $('#btn_galeria').click();
});

$("#btn_arquivos_remover").click(function() {
    removerArquivos();
});

$("#arquivos_enviar").click(function(){
    $("#fileupload").show();
    $("#listagemArquivos").hide();
    $("#myModalLabel").text("Upload de Arquivos");
});

$("#arquivos_meus").click(function(){
    $("#fileupload").hide();
    $("#listagemArquivos").show();
    $("#myModalLabel").text("Meus Arquivos");
});

$("#visualizacao_lista").click(function(){
    $(".meus-arquivos-grade-miniatura").addClass("col-sm-12 meus-arquivos-lista-miniatura");
    $(".meus-arquivos-lista-miniatura").removeClass("col-sm-2 meus-arquivos-grade-miniatura");
    
    $(".meus-arquivos-grade-imagem").addClass("meus-arquivos-lista-imagem");
    $(".meus-arquivos-lista-imagem").removeClass("meus-arquivos-grade-imagem");
    
    $(".meus-arquivos-grade-texto").addClass("meus-arquivos-lista-texto");
    $(".meus-arquivos-lista-texto").removeClass("meus-arquivos-grade-texto");
    
    $(".visualizacaoArquivos").addClass("col-sm-12");
});

$("#visualizacao_grade").click(function(){
    $(".meus-arquivos-lista-miniatura").addClass("col-sm-2 meus-arquivos-grade-miniatura");
    $(".meus-arquivos-grade-miniatura").removeClass("col-sm-12 meus-arquivos-lista-miniatura");
    
    $(".meus-arquivos-lista-imagem").addClass("meus-arquivos-grade-imagem");
    $(".meus-arquivos-grade-imagem").removeClass("meus-arquivos-lista-imagem");
    
    $(".meus-arquivos-lista-texto").addClass("meus-arquivos-grade-texto");
    $(".meus-arquivos-grade-texto").removeClass("meus-arquivos-lista-texto");
    
    $(".visualizacaoArquivos").addClass("col-sm-2");
});