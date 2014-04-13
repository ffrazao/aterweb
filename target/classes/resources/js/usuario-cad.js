/**
 * Script do módulo 
 */

$("#btn_ferramenta_incluir").hide();
$("#btn_ferramenta_deletar").hide();
$("#formulario_nome").attr('disabled', 'disabled');

/* Funções */
function btnFiltrar() {
    /*$("#div_filtro").show().delay(1000);
    $("#div_filtro").toggle();*/
    
    $("#btn_formulario_inserir").remove();
}

function incluir() {
    $("#formulario_titulo").html("Incluir Usuário");
    $("#btn_formulario_inserir").text("Inserir");
    
    $("#formulario_id").val('');
    $("#formulario_nome").val('');
    $("#formulario_nomeUsuario").val('');
    
    $("#formulario_senha").parent().removeClass('hide');
    $("#formulario_senha").removeClass('hide');
    $("#formulario_senha").val('');
    
    $("#formulario_nome").focus();
    
    //$("#div_formulario").visible();
}

function editar() {
    check = $(".usuario_selecionado:checked");    
    id = $(".usuario_selecionado:checked").val();
    $("#btn_ferramenta_editar").hide();
    
    $(".checkbox_modulos").removeAttr("checked");
    $(".checkbox_perfils").removeAttr("checked");
    
    $.get("usuario-cad/restaurar", { id: id }, function(data) {
        if(data.executou) {
    
            $("#formulario_id").val(data.resultado.id);
            $("#formulario_nome").val(data.resultado.pessoa.nome);
            $("#formulario_usuario").val(data.resultado.nomeUsuario);
            $("#formulario_situacao").val(data.resultado.usuarioStatusConta);
            //$("#formulario_senha").val(data.senha);
            $("#formulario_senha").parent().addClass('hide');
            $("#formulario_senha").addClass('hide');
            
            $.each(data.resultado.usuarioModulos, function(k, modulos) {
                id = campoRecursivo(modulos.modulo, 'id');
                $(".checkbox_modulos[id="+id+"]").click();
                $(".checkbox_modulos[id="+id+"]").append('<input type="hidden" name="usuarioModulos['+k+'].id" value="'+modulos.id+'" />');
            }); 
            
            $.each(data.resultado.usuarioPerfils, function(l, perfils) {
                id2 = campoRecursivo(perfils.perfil, 'id');
                $(".checkbox_perfils[id="+id2+"]").click();
                $(".checkbox_perfils[id="+id2+"]").append('<input type="hidden" name="usuarioPerfils['+l+'].id" value="'+perfils.id+'" />');
            });

            $("#btn_formulario_inserir").text("Atualizar");
            
            $("#div_formulario").show();
        }
    })
    
    $("#barra-ferramenta").children().eq(1).append('<button id="btn_formulario_inserir" type="button" class="btn btn-success" name="action">Salvar</button>')
}
/*
function excluir() {
    check = $(".usuario_selecionado:checked");
    id = $(".usuario_selecionado:checked").val();
    $.get("usuario-cad/excluir", { id: id }, function(data) {
        console.log(data);
        if(data.executou) {
            $(check).parent().parent().remove();
            alert(data.result);
        } else {
            alert("Falha " + data.resultado.message)
        }
    });
}
*/
//Clicar no botão de executar filtro
function filtrar() {
    var nome = $("#filtro_nome").val();
    var usuarioNome = $("#filtro_usuarioNome").val();
    
    var modulosArray = new Array();
    var perfilsArray = new Array();
    
    $.get("usuario-cad/filtrar", { nome: nome, usuarioNome: usuarioNome }, function(pessoas) {  
        var modulosFinal = '';
        var perfilsFinal = '';
        
        $("#listagem").html('');
        
        $.each(pessoas.resultado, function(i, pessoa){ 
            
            $.each(pessoa, function(j, dados) {
                
                $.each(dados.usuarioModulos, function(k, modulos) {
                    modulosFinal += ' <span class="label label-primary">' + campoRecursivo(modulos.modulo, 'nome') + "</span>";
                })
                
                $.each(dados.usuarioPerfils, function(l, perfils) {
                    perfilsFinal += ' <span class="label label-warning">' + campoRecursivo(perfils.perfil, 'nome') + "</span>";
                })
                var txt_situacao = dados.usuarioStatusConta;
                if(txt_situacao == 'B') { txt_situacao = "Bloqueado" } else if(txt_situacao == 'A') { txt_situacao = "<span class='label label-success'>Ativo</span>" } else if(txt_situacao == "I") { txt_situacao = "<span class='label label-danger'>Inativo</span>" }
                
                $("#listagem").append("<tr> <td> <input id='"+dados.id+"' value='"+dados.id+"' name='usuario' type='radio' class='usuario_selecionado' /> <td>"+dados.pessoa.nome+"</td> <td>"+dados.nomeUsuario+"</td> <td>"+txt_situacao+"</td> <td>"+modulosFinal+"</td> <td>"+perfilsFinal+"</td> </tr>");
                
                modulosFinal = '';
                perfilsFinal = '';
            })
        })
    });
}

/* ESPECIFICO */
$(document).on("click", "#btn_formulario_inserir", function() {
    $.post("usuario-cad/salvar", $('#form_usuario').serialize() )
    //id: int_id, nome: txt_nome, usuario: txt_usuario, senha: txt_senha, usuarioModulos: [1]
    .success(function (pessoa){ 
        //Adiciona pessoa e atualiza a lista;
        int_id = $("#formulario_id").val();
        if(pessoa.resultado.id) {
            txt_nome = pessoa.resultado.pessoa.nome;
            txt_usuario = pessoa.resultado.nomeUsuario;
            txt_situacao = pessoa.resultado.statusUsuario;
            
            txt_modulos = '';
            txt_perfils = '';
            
            $.each($(".checkbox_modulos:checked"), function(i, data) {
                txt_modulos += $(data).parent().parent().find('b').text() + '<br />';
            })
            
            $.each($(".checkbox_perfils:checked"), function(j, data) {
                txt_perfils += $(data).parent().parent().find('b').text() + '<br />';
            })
            
            pessoa = $("#listagem #"+int_id).parent().parent().children();
            $(pessoa).eq(2).text(txt_nome);
            $(pessoa).eq(3).text(txt_usuario);
            if(txt_situacao == 'B') { txt_situacao = "Bloqueado" } else if(txt_situacao == 'A') { txt_situacao = "Ativo" } else if(txt_situacao == "I") { txt_situacao = "Inativo" }
            $(pessoa).eq(4).html(txt_situacao);
            $(pessoa).eq(5).html(txt_modulos);
            $(pessoa).eq(6).html(txt_perfils);
            
            //$("#barra-ferramenta").children().eq(1).find('#btn_formulario_inserir').remove();
        } else {
            //$("#listagem").append("<tr> <td> <input id='"+pessoa.id+"' value='"+pessoa.id+"' type='radio' class='usuario_selecionado' /> </td> <td>"+pessoa.id+"</td> <td>"+txt_nome+"</td> <td>"+txt_usuario+"</td> <td>"+txt_senha+"</td> </tr>");   
        }
        $(".usuario_selecionado").removeAttr('checked');
        $("#btn_ferramenta_editar").show();
        $("#btn_formulario_inserir").remove();

        $("#div_formulario").hide().delay(1000);
        $("#div_listagem").show();
        /*
        $("#div_modulos").html('');
        $("#div_perfils").html('');*/
    })
    .error(function (erro){ console.log(erro.result) })
});

$(document).on("click", ".usuario_selecionado", function() {
    $("#btn_ferramenta_editar").show();
    //$("#btn_ferramenta_excluir").show();
    //$(".usuario_selecionado").removeAttr("checked");
    
    //$(".usuario_selecionado[id="+this.value+"]").click();
    //return false;
});

$(document).on("click", "table tbody tr", function() { 
    var id = $(this).children('td').eq(0).find('input').val();
    
    $("input[type=checkbox]").attr('checked', false);
    
    $("#"+id).attr('checked', true);
    $("#"+id).click();
});

//Ativa��o do Angular JS
function cadastroCtrl($scope, $window) {}
