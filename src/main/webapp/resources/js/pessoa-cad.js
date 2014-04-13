/////////////////////////////////////////////////////////////////////////////
//  GERENCIADOR DE TABELAS COM FOMULARIOS (MODAL)
/////////////////////////////////////////////////////////////////////////////
// Jean Soares Fernandes
/////////////////////////////////////////////////////////////////////////////
$(function() {
    $("div.gerenciar").each(function(index_gerenciar) {
        var objGerenciar = $(this);
        var tabelaGerenciar = $(objGerenciar).find('table').eq(0);
        var formularioGerenciar = $(objGerenciar).find('.formulario').eq(0);
        var elementos = [];

        $(formularioGerenciar).modal('hide');

        //----------------------------------------------------------------------------------------------
        //Construir tabela de acordo com formulário
        $(formularioGerenciar).find(":input").each(function(index) {
            if ($(this).attr('exibir') == "true") {
                var coluna = '<th>' + $(this).attr('title') + '</th>';
                elementos.push($(this).attr('nomeCampo'));

                $(tabelaGerenciar).children('thead').append(coluna);
            }
        });
        $(tabelaGerenciar).children('thead').append('<th>Acoes</th>');
        //----------------------------------------------------------------------------------------------

        //----------------------------------------------------------------------------------------------
        //Salvar formulario na tabela
        function salvarNovo() {
            var linha = $('<tr></tr>');
            $(formularioGerenciar).find(":input").not('button').each(function(index) {
                var existe = elementos.indexOf($(this).attr('nomeCampo'));
                var coluna;
                var input = $('<input type="hidden" />');
                var valor = $(this).val();

                $(input).attr('id', $(this).attr('id'));
                $(input).attr('name', $(this).attr('nomeCampo'));
                //$(input).attr('nomeCampo',$(this).attr('nomeCampo'));
                $(input).val(valor);

                if ($(this).attr('tag') != undefined) {
                    $(input).attr('tag', $(this).attr('tag'));
                }

                if (existe > -1) {
                    if ($(this).is(':disabled')) {
                        $(input).attr('name', '');
                        $(input).val('');

                        coluna = $('<td></td>');
                        $(coluna).append('<p></p>');
                        $(coluna).append(input);
                    } else if ($(this).is('input[type="hidden"]')) {
                        coluna = input;
                        $(coluna).append(input);
                    } else if ($(this).is('[type="radio"],[type="checkbox"]')) {
                        if ($(this).is(':checked')) {
                            coluna = $('<td></td>');
                            $(coluna).append('<p>' + $(this).attr('descricao') + '</p>');
                            $(coluna).append(input);
                        }//multiple
                    } else if ($(this).is('select')) {
                        coluna = $('<td></td>');
                        if ($(this).is('[multiple]')) {
                            var textos = new Array();
                            var valores = new Array();
                            $(this).children(":selected").each(function() {
                                textos.push($(this).text());
                                valores.push($(this).attr('value'));
                            });

                            $(coluna).append('<p>' + textos.join() + '</p>');
                            $(input).val(valores.join());
                            $(coluna).append(input);

                        } else {

                            $(coluna).append('<p>' + $(this).children('option:selected').text() + '</p>');
                            $(coluna).append(input);
                        }

                    } else {
                        coluna = $('<td></td>');
                        $(coluna).append('<p>' + valor + '</p>');
                        $(coluna).append(input);
                    }

                } else {
                    coluna = input;
                }
                $(linha).append(coluna);
            });

            var acoes = $('<td><p></p></td>');
            if($(formularioGerenciar).attr('editar') !== 'false'){
                acoes.append('&nbsp;<button type="button" class="btn btn-warning btn-sm editar"><span class="glyphicon glyphicon-pencil"></span</button>');
            }
            acoes.append('&nbsp;<button type="button" class="btn btn-danger btn-sm remover"><span class="glyphicon glyphicon-trash"></span></button>');
            $(linha).append(acoes);

            $(tabelaGerenciar).children('tbody').append(linha);
        }

        function salvarEdicao(e) {
            var linha = e.data.linha;

            $(formularioGerenciar).find(":input").not('button').each(function(index) {
                var campo = $(linha).find("#" + $(this).attr('id') + ":input").eq(0);
                if ($(this).is(':disabled')) {
                    $(campo).val('');
                    $(campo).parents('td').children('p').html('');
                } else if ($(this).is('[type="radio"],[type="checkbox"]')) {
                    if ($(this).is(':checked')) {
                        $(campo).val($(this).val());
                        $(campo).parents('td').children('p').html($(this).attr('descricao'));
                    }
                } else if ($(this).is('select')) {

                    if ($(this).is('select[multiple]')) {
                        var textos = new Array();
                        var valores = new Array();
                        $(this).children(":selected").each(function() {
                            textos.push($(this).text());
                            valores.push($(this).attr('value'));
                        });

                        $(campo).val(valores.join());
                        $(campo).parents('td').children('p').html(textos.join());
                    } else {
                        $(campo).val($(this).val());
                        $(campo).parents('td').children('p').html($(this).children('option:selected').text());
                    }
                } else {
                    $(campo).val($(this).val());
                    $(campo).parents('td').children('p').html($(this).val());
                }

            });
        }

        //----------------------------------------------------------------------------------------------
        //Abrir formulario para incluir novo item
        $(objGerenciar).find("button.novo").eq(0).click(function() {
            $(formularioGerenciar).find('button.salvar').eq(0).bind('click', salvarNovo);
            $(formularioGerenciar).modal('show');
        });
        //----------------------------------------------------------------------------------------------

        //----------------------------------------------------------------------------------------------
        //Destroi funcoes e reseta formulario apos salvar
        $(formularioGerenciar).find('button.salvar').eq(0).click(function() {
            $(formularioGerenciar).modal('hide');
        });

        $(formularioGerenciar).on('hidden.bs.modal', function(e) {
            $(formularioGerenciar).find('button.salvar').eq(0).unbind('click', salvarNovo);
            $(formularioGerenciar).find('button.salvar').eq(0).unbind('click', salvarEdicao);

            $(formularioGerenciar).find('button.cancelar').eq(0).click();
        })

        /*
         $(formularioGerenciar).hide(function(){
         $(this).unbind('click',salvarNovo);
         $(this).unbind('click',salvarEdicao);
         
         $(formularioGerenciar).find('button.cancelar').click();
         });
         */

        //----------------------------------------------------------------------------------------------
        //Editar item selecionado
        $(tabelaGerenciar).on("click", "button.editar", function() {
            var linha = $(this).parents('tr');
            $.ajaxSetup({async:false});

            $(linha).find(":input").not('button').each(function(index) {
                var campo = $(formularioGerenciar).find("#" + $(this).attr('id') + ":input");
                if ($(campo).is('[type="checkbox"],[type="radio"]')) {
                    $(campo).filter('[value="' + $(this).val() + '"]').click();
                } else if ($(campo).is('select')) {
                    if($(campo).is('[multiple]')){
                         var valores = $(this).val().split(',');
                        $.each(valores, function(key, val) {
                            $(campo).children('[value="' + val + '"]').attr('selected', 'selected');
                        });
                    }else{
                        $(campo).val($(this).val());
                        $(campo).change();
                    }
                   
                } else {
                    $(campo).val($(this).val());
                }
            });
            $.ajaxSetup({async:true});
            $(formularioGerenciar).find('button.salvar').bind('click', {linha: linha}, salvarEdicao);
            $(formularioGerenciar).modal('show');
        });

        //----------------------------------------------------------------------------------------------
        //Remover item selecionado
        $(tabelaGerenciar).on("click", "button.remover", function() {
            $(this).parents('tr').eq(0).remove();
        });
        //----------------------------------------------------------------------------------------------

        //----------------------------------------------------------------------------------------------
        //Cancelar novo item
        $(formularioGerenciar).find('button.cancelar').eq(0).click(function() {
            $(formularioGerenciar).find("[type!='hidden']:input").not('button').each(function(index) {
                if ($(this).is('select')) {
                    if ($(this).attr('resetar') === "true") {
                        $(this).html('');
                    }else{
                        if ($(this).is('[multiple]')) {
                            $(this).children('option:selected').removeAttr('selected');
                        } else {
                            $(this).val($(this).children('option:first').val());
                        }
                    }
                } else if ($(this).is('[type="radio"],[type="checkbox"]')) {
                    $(this).removeAttr('checked');
                } else {
                    $(this).val('');
                }
            });
        });
        //----------------------------------------------------------------------------------------------
    });
});
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

$.getJSON(baseUrl + "dominio", {ent: 'Setor'}
, function(data) {
    var opcoes = '';
    opcoes += '<option>Selecione</option>';
    $.each(data.resultado, function(index, value) {
        opcoes += '<option value="' + value.id + '">' + value.nome + '</option>';
    });

    $(".setores").each(function() {
        $(this).html(opcoes);
    });
});

$.getJSON(baseUrl + "dominio", {ent: 'OrganizacaoTipo'}
, function(data) {
    var opcoes = '';
    opcoes += '<option>Selecione</option>';
    $.each(data.resultado, function(index, value) {
        opcoes += '<option value="' + value.id + '">' + value.nome + '</option>';
    });

    $(".organizacoes").each(function() {
        $(this).html(opcoes);
    });
});

$.getJSON(baseUrl + "dominio", {ent: 'RelacionamentoTipo'}
, function(data) {
    var opcoes = '';
    opcoes += '<option>Selecione</option>';
    $.each(data.resultado, function(index, value) {
        opcoes += '<option value="' + value.id + '">' + value.nome + '</option>';
    });

    $(".relacionamento_tipos").each(function() {
        $(this).html(opcoes);
    });
});

$("#modalRelacionamento #buscarRelacionamento").click(function(){
    var cpfcnpj = $("#modalRelacionamento #cpfRelacionamento").filter("input[type='text']").val();
    var nome = $("#modalRelacionamento #nomeRelacionamento").filter("input[type='text']").val();
    
    $.get(baseUrl + "pessoa-cad/filtrar", {nome: nome,cpfCnpj:cpfcnpj}
    , function(data) {
        var opcoes = '';

        $.each(data.resultado, function(index, value) {
            if(value.pessoaTipo === 'PF'){
                opcoes += '<option value="' + value.id + '" tipo="'+ value.pessoaTipo +'" cpf="'+value.cpf+'">' + value.nome + '          ' + value.cpf + '</option>';
            }else{
                opcoes += '<option value="' + value.id + '" tipo="'+ value.pessoaTipo +'" cnpj="'+value.cnpj+'">' + value.nome + '          ' + value.cnpj + '</option>';
            }
            
        });
        
        opcoes += '<option value="' + nome + '#' + cpfcnpj +'">' + nome + '          ' + cpfcnpj + '</option>';

         $("#modalRelacionamento #pessoaRelacionamento").html(opcoes);

    },'json');
});

$("#modalRelacionamento #pessoaRelacionamento").change(function(){
    var classe;
    var nome = $(this).val();
    var cpfCnpj;
    if($(this).children(':selected').attr('tipo') === 'PF'){
        classe = 'gov.emater.aterweb.model.PessoaFisica';
        cpfCnpj = $(this).children(':selected').attr('cpf');
    }else if($(this).children(':selected').attr('tipo') === 'PJ'){
        classe = 'gov.emater.aterweb.model.PessoaJuridica';
        cpfCnpj = $(this).children(':selected').attr('cnpj');
    }else{
        //teste
       classe = 'gov.emater.aterweb.model.PessoaFisica';
    }
    $("#modalRelacionamento #nomeRelacionamento").val(nome);
    $("#modalRelacionamento #cpfCnpjRelacionamento").val(cpfCnpj);
    $("#modalRelacionamento #classePessoaRelacionamento").val(classe);
});

$("#relacionamentos").on('click','button.editar',function(){
    var linha = $(this).parents('tr');
    var nome = $(linha).children('td').eq(2).find('p').eq(0).text();
    var id = $(linha).children('td').eq(2).find('input').eq(0).val();
   
    $("#modalRelacionamento #pessoaRelacionamento").html('<option value="' + id +'" selected>' + nome + '</option>');
    
});

$(".relacionamento_tipos").change(function(){
    var elemento = $(this).parents('.modal-body').find('.relacionamento_funcoes');
    var campo = "relacionamento_tipo_id";
    var chave = $(this).val();
    
    $.getJSON(baseUrl + "dominio", {ent: 'RelacionamentoConfiguracaoVi',npk:campo,vpk:chave}
    , function(data) {
        var opcoes = '';
        opcoes += '<option>Selecione</option>';
        $.each(data.resultado, function(index, value) {
            opcoes += '<option value="' + value.id + '">' + value.relacionadoNome + '</option>';
        });

        $(elemento).html(opcoes);
    }).fail(function(){
        $(elemento).html('<option>Erro</option>');
    });
});



function preencherCampos(obj, tag)
{
    for (var k in obj)
    {
        if (typeof obj[k] == "object" && obj[k] !== null) {
            //eachRecursive(obj[k],k);
        } else {
            var elemento;
            if (tag != undefined) {
                elemento = $("[name='" + k + "'][tag='" + tag + "']");
            } else {
                elemento = $("[name='" + k + "']");
            }

            if ($(elemento).is('[type="radio"],[type="checkbox"]')) {
                $(elemento).filter('[value="' + obj[k] + '"]').click();
            } else {
                $(elemento).val(obj[k]);
            }
        }
    }
}

function habilitarCamposTipoPessoa(tipo) {
    if (tipo == 'PF') {//PESSOA FISICA
        $(".pessoaFisica,#navDocumentos").show();
        $(".pessoaJuridica").hide();
        $(".pessoaFisica").find('input,textarea,select').removeAttr('disabled');

        $(".pessoaJuridica").find('input,textarea,select').attr('disabled', 'disabled');

        $("#classePessoa").val('gov.emater.aterweb.model.PessoaFisica');
        $("#typePessoa").val('PessoaFisica');
    } else if ('PJ') {//PESSOA JURIDICA
        $(".pessoaJuridica").show();
        $(".pessoaFisica,#navDocumentos").hide();
        $(".pessoaJuridica").find('input,textarea,select').removeAttr('disabled');

        $(".pessoaFisica").find('input,textarea,select').attr('disabled', 'disabled');

        $("#classePessoa").val('gov.emater.aterweb.model.PessoaJuridica');
        $("#typePessoa").val('PessoaJuridica');
    } else {
        console.log('Tipo de pessoa desconhecido para habilitar os campos');
    }
}

function textoFinalidade(tipo) {
    if (tipo == 'C') {
        return 'Comercial';
    } else if (tipo == 'P') {
        return 'Pessoal';
    } else if (tipo == 'R,C') {
        return 'Pessoal e Comercial';
    } else {
        return 'Desconhecido';
    }
}

function textoConfirmacao(tipo) {
    if (tipo == 'S') {
        return 'Sim';
    } else if (tipo == 'N') {
        return 'Não';
    } else {
        return 'Desconhecido';
    }
}

function retornarColuna(id, name, value, titulo, tag) {
    var element = $('<input type="hidden" />');
    var text = $("<p></p>");

    if (id != undefined && id != '')
        $(element).attr('id', id);
    if (name != undefined && name != '')
        $(element).attr('name', name);
    if (value != undefined && value != '')
        $(element).attr('value', value);
    if (titulo != undefined && titulo != '')
        $(text).text(titulo);
    if (tag != undefined && tag != '')
        $(element).attr('tag', tag);

    return $('<td></td>').append(element).append(text);
}

function retornarCampo(id, name, value, tag) {
    var element = $('<input type="hidden" />');
    if (id != undefined && id != '')
        $(element).attr('id', id);
    if (name != undefined && name != '')
        $(element).attr('name', name);
    if (value != undefined && value != '')
        $(element).attr('value', value);
    if (tag != undefined && tag != '')
        $(element).attr('tag', tag);
    return element;
}

function incluir() {
    $("#formularioPessoa").hide();
    $("#modalSelecionarPessoa").modal('show');
    return 0;
}

$("#btnInserirFisica, #btnInserirJuridica").click(function() {
    habilitarCamposTipoPessoa($(this).val());

    $("#pessoaTipo").val($(this).val());
    $("#formulario_titulo").html("Cadastrar Pessoa");

    $("#formularioPessoa").reset();
    $("#btn_formulario_inserir").text("Inserir");
    $("#modalSelecionarPessoa").modal('hide');
    $("#div_formulario").show();
    $("#formularioPessoa").fadeIn(1000);
});

$(function() {
    var opcoesTradicao = '';

    for (var i = (new Date().getFullYear() - 60); i < new Date().getFullYear(); i++) {
        opcoesTradicao += '<option>' + i + '</option>';
    }

    $('.tradicao').html(opcoesTradicao);

    $("input[name='publicoAlvoConfirmacao']").click(function() {
        if ($(this).val() == 'S') {
            $("#navPublico").show();
            $('#navPublico').find('input,select,textarea').removeAttr('disabled');
        } else {
            $("#navPublico").hide();
            $('#navPublico').find('input,select,textarea').attr('disabled', 'disabled');
            $(".nav-tabs li:first a").click();
        }
    });

    $('input[name="finalidadeEndereco"]').change(function() {
        if ($(this).val() == "R") {
            $(".itensPropriedadeRural").hide();
            $(".itensPropriedadeRural").find(":input").attr('disabled', 'disabled');
        } else {
            $(".itensPropriedadeRural").show();
            $(".itensPropriedadeRural").find(":input").removeAttr('disabled');
        }
    });

    $('input[name="propriedadeRural"]').change(function() {
        if ($(this).val() == "N") {
            $(".subItensPropriedadeRural").hide();
            $(".subItensPropriedadeRural").find(":input").attr('disabled', 'disabled');
        } else {
            $(".subItensPropriedadeRural").show();
            $(".subItensPropriedadeRural").find(":input").removeAttr('disabled');
        }
    });

});

function editar() {
    $("#formularioPessoa").hide();
    var check = $(".usuario_selecionado:checked");
    var id = $(".usuario_selecionado:checked").val();

    $.getJSON(baseUrl + "pessoa-cad/restaurar", {
        id: id
    }, function(data) {

        habilitarCamposTipoPessoa(data.resultado.pessoaTipo);
        preencherCampos(data.resultado);
        preencherCampos(data.resultado.publicoAlvo, 'publicoAlvo');
        $(".gerenciar table tbody").html('');
        if (data.resultado.pessoaMeioContatos != null) {
            $.each(data.resultado.pessoaMeioContatos, function(key, val) {
                var linha = $("<tr></tr>");
                var local = null;
                var coluna = new Array();

                var acoes = $('<td><p></p></td>');

                //coluna.push(retornarCampo('pessoaMeioContatos','.@class',val["@class"]));

                coluna.push(retornarCampo('idPessoaMeioContato', '.id', val.id, 'pessoaMeioContatos'));
                coluna.push(retornarCampo('idMeioContato', '.id', val.meioContato.id, 'meioContato'));
                if (val.meioContato.numero != undefined) {
                    local = '#modalMeioContatoTelefone';
                    coluna.push(retornarColuna('finalidadeMeioContato', '.finalidade', val.finalidade, textoFinalidade(val.finalidade), 'pessoaMeioContatos'));
                    coluna.push(retornarColuna('meioMeioContato', '.numero', val.meioContato.numero, val.meioContato.numero, 'meioContato'));
                    coluna.push(retornarCampo('classeMeioContato', '.@class', 'gov.emater.aterweb.model.MeioContatoTelefonico', 'meioContato'));
                    coluna.push(retornarCampo('meioContatoTipo', '.meioContatoTipo', 'TEL', 'meioContato'));
                } else if (val.meioContato.email != undefined) {
                    local = '#modalMeioContatoEmail';
                    coluna.push(retornarColuna('finalidadeMeioContato', '.finalidade', val.finalidade, textoFinalidade(val.finalidade), 'pessoaMeioContatos'));
                    coluna.push(retornarColuna('meioMeioContato', '.email', val.meioContato.email, val.meioContato.email, 'meioContato'));
                    coluna.push(retornarCampo('classeMeioContato', '.@class', 'gov.emater.aterweb.model.MeioContatoEmail', 'meioContato'));
                    coluna.push(retornarCampo('meioContatoTipo', '.meioContatoTipo', 'EMA', 'meioContato'));
                } else if (val.meioContato.descricao != undefined) {
                    local = '#modalMeioContatoEndereco';

                    var cidade = valorCampoJson(data.resultado, val.meioContato.localizacao);
                    var municipio = valorCampoJson(data.resultado, cidade.localizacao);
                    var estado = valorCampoJson(data.resultado, municipio.localizacao);
                    var pais= valorCampoJson(data.resultado, estado.localizacao);
                    
                    coluna.push(retornarColuna('finalidadeEndereco', '.finalidade', val.finalidade, textoFinalidade(val.finalidade), 'pessoaMeioContatos'));
                    coluna.push(retornarColuna('cepEndereco', '.cep', val.meioContato.cep, val.meioContato.cep, 'meioContato'));

                    coluna.push(retornarCampo('paisEndereco', '', pais.id, 'localizacao'));
                    coluna.push(retornarCampo('ufEndereco', '', estado.id, 'localizacao'));
                    coluna.push(retornarCampo('municipioEndereco', '', municipio.id, 'localizacao'));
                    coluna.push(retornarColuna('cidadeEndereco', '.id', cidade.id,cidade.nome, 'localizacao'));
                    coluna.push(retornarColuna('localEndereco', '.descricao', val.meioContato.descricao, val.meioContato.descricao, 'meioContato'));
                    coluna.push(retornarColuna('propriedadeRural', '.propriedadeRuralConfirmacao', val.meioContato.propriedadeRuralConfirmacao, textoConfirmacao(val.meioContato.propriedadeRuralConfirmacao), 'meioContato'));

                    if (val.meioContato.propriedadeRuralConfirmacao == 'S' && val.meioContato.propriedadeRural != null && val.meioContato.propriedadeRural.propriedadeRuralLocalizacaos != null) {

                        var arrComunidades = new Array();
                        var txtComunidades = new Array();
                        var arrBacias = new Array();
                        var txtBacias = new Array();
                        $.each(val.meioContato.propriedadeRural.propriedadeRuralLocalizacaos, function(keyK, valK) {
                            var local = valorCampoJson(data.resultado, valK.localizacao);
                            var tipo =  valorCampoJson(data.resultado, local.localizacaoTipo);
                            if (tipo.codigo === 'COMUNIDADE') {
                                arrComunidades.push(local.id);
                                txtComunidades.push(local.nome);
                            } else {
                                arrBacias.push(local.id);
                                txtBacias.push(local.nome);
                            }
                        });
                        coluna.push(retornarColuna('comuEndereco', '.comunidades', arrComunidades.join(), txtComunidades.join(), 'propriedadeRural'));
                        coluna.push(retornarColuna('baciaEndereco', '.bacias', arrBacias.join(), txtBacias.join(), 'propriedadeRural'));
                    } else {
                        coluna.push(retornarColuna('comuEndereco', '.comunidades', '', '', 'propriedadeRural'));
                        coluna.push(retornarColuna('baciaEndereco', '.bacias', '', '', 'propriedadeRural'));
                    }



                    coluna.push(retornarCampo('classeMeioContato', '.@class', 'gov.emater.aterweb.model.MeioContatoEndereco', 'meioContato'));
                    coluna.push(retornarCampo('meioContatoTipo', '.meioContatoTipo', 'END', 'meioContato'));
                    acoes.append('&nbsp;<button type="button" class="btn btn-default btn-sm" title="Visualizar propriedade"><span class="glyphicon glyphicon-search"></span></button>');
                }

                $.each(coluna, function(keyCol, valCol) {
                    linha.append(valCol);
                });

                acoes.append('&nbsp;<button type="button" class="btn btn-warning btn-sm editar"><span class="glyphicon glyphicon-pencil"></span</button>');
                acoes.append('&nbsp;<button type="button" class="btn btn-danger btn-sm remover"><span class="glyphicon glyphicon-trash"></span></button>');
                linha.append(acoes);
                $(local).parents('.gerenciar').find('table').find('tbody').append(linha);
            });
        }
        
         if (data.resultado.pessoaRelacionamentos != null) {
            $.each(data.resultado.pessoaRelacionamentos, function(key, val) {
                var linha = $("<tr></tr>");
                var coluna = new Array();

                var acoes = $('<td><p></p></td>');

                //coluna.push(retornarCampo('pessoaMeioContatos','.@class',val["@class"]));

                coluna.push(retornarCampo('idPessoaRelacionamento', '.id', val.id, 'pessoaRelacionamento'));
                
                var relacionamento = valorCampoJson(data.resultado, val.relacionamento);
                coluna.push(retornarCampo('idRelacionamento', '.id', relacionamento.id, 'relacionamento'));
                
                var tipo = valorCampoJson(data.resultado, relacionamento.relacionamentoTipo);
                coluna.push(retornarColuna('idTipoRelacionamento', '.id', tipo.id, tipo.nome, 'tipoRelacionamento'));
                
                
                var funcao = valorCampoJson(data.resultado, val.relacionamentoFuncao);
                coluna.push(retornarColuna('idFuncaoRelacionamento', '.id', funcao.id, funcao.nomeSeMasculino + ' | ' + funcao.nomeSeFeminino, 'funcaoRelacionamento'));
                
                var pessoa = valorCampoJson(data.resultado, val.pessoa);
                console.log(pessoa);
                if(pessoa !== null){
                    coluna.push(retornarColuna('nomeRelacionamento', '.nome', pessoa.nome, pessoa.nome, 'pessoaRelacionamento'));
                    coluna.push(retornarCampo('idPessoa', '.id', pessoa.id, 'pessoa'));
                    if(pessoa.pessoaTipo==='PF'){
                        coluna.push(retornarColuna('cpfCnpjRelacionamento', '.cpfCnpj', pessoa.cpf, pessoa.cpf, 'pessoaRelacionamento'));
                        coluna.push(retornarCampo('classePessoaRelacionamento', '.@class', 'gov.emater.aterweb.model.PessoaFisica', 'pessoa'));
                    }else{
                        coluna.push(retornarColuna('cpfCnpjRelacionamento', '.cpfCnpj', pessoa.cnpj, pessoa.cnpj, 'pessoaRelacionamento'));
                        coluna.push(retornarCampo('classePessoaRelacionamento', '.@class', 'gov.emater.aterweb.model.PessoaJuridica', 'pessoa'));
                    }
                }else{
                    coluna.push(retornarColuna('nomeRelacionamento', '.nome', val.nome, val.nome, 'pessoaRelacionamento'));
                    coluna.push(retornarColuna('cpfCnpjRelacionamento', '.cpfCnpj', val.cpfCnpj,val.cpfCnpj, 'pessoaRelacionamento'));
                }
                
                $.each(coluna, function(keyCol, valCol) {
                    linha.append(valCol);
                });
               // acoes.append('&nbsp;<button type="button" class="btn btn-warning btn-sm editar"><span class="glyphicon glyphicon-pencil"></span</button>');
                acoes.append('&nbsp;<button type="button" class="btn btn-danger btn-sm remover"><span class="glyphicon glyphicon-trash"></span></button>');
                linha.append(acoes);
                $("#modalRelacionamento").parents('.gerenciar').find('table').find('tbody').append(linha);
            });
        }

        $("#btn_formulario_inserir").text("Atualizar");
        $("#div_formulario").show();
        $("#formularioPessoa").fadeIn(1000);

    });

}

function filtrar() {
    var nome = $("#filtroNome").val();
    //$("#pessoa_visualizar").html("Selecione uma pessoa!").hide();

    $("#listagem").html('');
    $.getJSON(baseUrl + "pessoa-cad/filtrar", {
        nome: nome
    },
    function(data) {
        if (!data.executou) {
            return 0;
        }

        if (data.resultado.length > 0) {
            var pessoas = data.resultado;
            $.each(pessoas, function(index, value) {
                var id = value.id;
                var nome = value.nome;
                var tipoPessoa = value.pessoaTipo;
                var CPFCNPJ = '';

                if (tipoPessoa == 'PF') {
                    if (value.cpf != null)
                        CPFCNPJ = value.cpf;
                } else {
                    if (value.cnpj != null)
                        CPFCNPJ = value.cnpj;
                }

                var checkbox = '<input type="radio" name="opcao" class="usuario_selecionado" id="usuario_selecionado_' + id + '" value="' + id + '"/>';
                $("#listagem").append("<tr> <td>" + checkbox + "</td> <td>" + id + "</td> <td>" + nome + "</td> <td>" + CPFCNPJ + "</td> </tr>");
            });
        } else {
            $("#listagem").html("<tr> <td colspan='4' style='color: red; font-weight:bold;'> <center>Pessoa '" + $("#nome").val() + "' não foi encontrada! <br /> Clique em <button class='btn btn-success'>Incluir</button> para adicionar nova pessoa.</center> </td> </tr>");
        }

    })
            .fail(function() {
                alert('Falha ao carregar a página!');
            });
}
;
function preVisualizar(id) {
    //$("#listagem").parent().attr('style', 'width:80% !important');

    //console.log($("#"+botao.id).parent().parent().css('background-color','red'));
    $(".usuario_selecionado").parent().parent().removeClass('selecionado');
    $("#usuario_selecionado_" + id).parent().parent().addClass('selecionado');

    $.getJSON(baseUrl + "pessoa-cad/restaurar", {
        id: id
    }, function(data) {
        if (!data.executou) {
            return 0;
        }

        var pessoa = data.resultado;
        var id = pessoa.id;
        var imagem = "http://placehold.it/120x130/4D99E0/ffffff.png&text=120x130";
        var nome = pessoa.nome;
        var apelido = pessoa.apelidoSigla;
        var nacionalidade = '';
        var situacao = pessoa.situacao;

        if (nome == "Emater")
            imagem = baseUrl + "resources/img/enterprise-logo.png";

        var sexo;
        if (pessoa.sexo == 'M') {
            sexo = "Masculino"
        } else {
            sexo = "Feminino"
        }
        ;
        //if(pessoa.pessoaTipo == "PJ") sexo = "Empresa";
        var tipoPessoa;
        if (pessoa.pessoaTipo == 'PF') {
            tipoPessoa = "Física";
        } else {
            tipoPessoa = "Jurídica";
        }
        ;
        var publicoAlvo;
        if (pessoa.publicoAlvo == 'S') {
            publicoAlvo = "Sim";
        } else {
            publicoAlvo = "Não";
        }
        ;

        var tabela = "";
        tabela += "<table width='100%'>";
        tabela += " <tr> <th>Tipo</th><td>" + tipoPessoa + "</td> </tr>";
        tabela += " <tr> <th>Alvo</th><td>" + publicoAlvo + "</td> </tr>";
        tabela += " <tr> <th>Situação</th><td>" + situacao + "</td> </tr>";
        tabela += "</table>";

        $("#pessoa_visualizar").html("<img src='" + imagem + "' /> <br /><b>" + nome + "</b><br />" + sexo + "<br /><br />" + tabela);
    })
            .fail(function() {
                $("#pessoa_visualizar").html("Erro ao construir a página!");
            });

}

function salvar() {
    var tipoPessoa = $("#pessoaTipo").val();
    var classe = '';

    if (tipoPessoa === 'PF') {
        classe = 'Fisica';
    } else {
        classe = 'Juridica';
    }
    var meioContatoArr = new Array();
    var relacionamentoArr = new Array();
    
    $(".gerenciar").each(function() {
        var tipo = $(this).find('.formulario').attr('id');
        
        if(tipo==='modalRelacionamento'){
            $(this).find('tbody').find('tr').each(function() {
                var obj = $(this).serializeAnything('pessoaRelacionamento');
                obj.pessoa = $(this).serializeAnything('pessoa');
                obj.relacionamento = $(this).serializeAnything('relacionamento');
                obj.relacionamento.relacionamentoTipo = $(this).serializeAnything('tipoRelacionamento');
                obj.relacionamentoFuncao = $(this).serializeAnything('funcaoRelacionamento');
                
                relacionamentoArr.push(obj);
            });
        }else{
            $(this).find('tbody').find('tr').each(function() {
                var obj = $(this).serializeAnything('pessoaMeioContatos');
                obj.meioContato = $(this).serializeAnything('meioContato');
                if (tipo === 'modalMeioContatoEndereco') {
                    obj.meioContato.localizacao = $(this).serializeAnything('localizacao');
                    if (obj.meioContato.propriedadeRuralConfirmacao === 'S') {
                        obj.meioContato.propriedadeRural = $(this).serializeAnything('propriedadeRural');

                        obj.meioContato.propriedadeRural.propriedadeRuralLocalizacaos = new Array();
                        console.log(obj.meioContato.propriedadeRural);
                        if (obj.meioContato.propriedadeRural.comunidades !== undefined) {
                            if (obj.meioContato.propriedadeRural.comunidades.indexOf(',') > 0) {
                                $.each(obj.meioContato.propriedadeRural.comunidades.split(','), function(key, val) {
                                    obj.meioContato.propriedadeRural.propriedadeRuralLocalizacaos.push({localizacao: {id: val}});
                                });
                            } else {
                                obj.meioContato.propriedadeRural.propriedadeRuralLocalizacaos.push({localizacao: {id: obj.meioContato.propriedadeRural.comunidades}});
                            }
                        }

                        if (obj.meioContato.propriedadeRural.bacias !== undefined) {
                            if (obj.meioContato.propriedadeRural.bacias.indexOf(',') > 0) {
                                $.each(obj.meioContato.propriedadeRural.bacias.split(','), function(key, val) {
                                    obj.meioContato.propriedadeRural.propriedadeRuralLocalizacaos.push({localizacao: {id: val}});
                                });
                            } else {
                                obj.meioContato.propriedadeRural.propriedadeRuralLocalizacaos.push({localizacao: {id: obj.meioContato.propriedadeRural.bacias}});
                            }
                        }


                        delete obj.meioContato.propriedadeRural.bacias;
                        delete obj.meioContato.propriedadeRural.comunidades;
                        console.log(obj.meioContato.propriedadeRural);
                        if (obj.meioContato.propriedadeRural.propriedadeRuralLocalizacaos.length <= 0) {
                          delete  obj.meioContato.propriedadeRural;
                        }


                    }
                }
                meioContatoArr.push(obj);
            });
        }
    });
    var objForm = $("#div_formulario").find('form').serializeObject();
    objForm.pessoaMeioContatos = meioContatoArr;
    objForm.pessoaRelacionamentos = relacionamentoArr;
    if (objForm.publicoAlvoConfirmacao === "S") {
        objForm.publicoAlvo = $("#publico").serializeAnything('publicoAlvo');
    }


    var jsontxt = JSON.stringify(objForm);
    console.log(objForm);
    console.log(jsontxt);
    //data: {pessoa: JSON.stringify($("#div_formulario").find('form').serializeObject()) },


    $.ajax({
        url: baseUrl + "pessoa-cad/salvar",
        type: 'POST',
        data: jsontxt,
        contentType: 'application/json',
        dataType: 'json',
        async: false,
        success: function(data) {
            if (data.executou === true) {
                alert('salvo com sucesso');
            } else {
                alert('não foi possivel salvar');
            }
            console.log(data);
        }
    });
}

$(document).on("click", ".usuario_selecionado", function() {

    preVisualizar(this.value);
    $("#btn_ferramenta_editar").show();
    $("#btn_ferramenta_excluir").show();
    $("#btn_ferramenta_acoes").show();
    return false;
});
$(document).on("click", "table tbody tr", function() {
    var id = $(this).children('td').eq(0).find('input').val();

    $("input[type=checkbox]").attr('checked', false);

    $("#usuario_selecionado_" + id).attr('checked', true);
    $("#usuario_selecionado_" + id).click();
});
