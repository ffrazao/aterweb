/**
 * Script do módulo 
 */

var cadastroUsuario = function ($scope) {
    $scope.pessoa = [];
    console.log("1");
    console.log($scope.pessoa);
    
    $scope.filtrarPessoas = function() {
        nome = $("#filtro_nome").val();
        login = $("#filtro_login").val();
        
        $.get("login-cad/filtrar", { nome: nome, login: login }, function(pessoas) {
            $scope.pessoa = [];            
            $scope.pessoa = pessoas;
            /*
            for(i=0; i<pessoas.length; i++) {
                $scope.pessoa.push({ id: pessoas[i].id, nome: pessoas[i].nome, login: pessoas[i].login, senha: pessoas[i].senha });      
            }*/
            console.log("2");
            console.log($scope.pessoa);
        });
    }
    
    //$scope.filtrarPessoas();
    
    $scope.addPessoa = function() {
        var txt_nome = $("#formulario_nome").val();
        var txt_login = $("#formulario_login").val();
        var txt_senha = $("#formulario_senha").val();
        
        $.post("login-cad/salvar", { nome: txt_nome, login: txt_login, senha: txt_senha })
        .success(function (pessoa){ 
            //Adiciona pessoa e atualiza a lista;
            $scope.pessoa.push({ id: pessoa.id, nome: pessoa.nome, login: pessoa.login, senha: pessoa.senha });  
            
            $scope.filtrarPessoas();            
            $scope.total();
            $("#div_formulario").hide().delay(1000);
            $("#div_listagem").show();
        })
        .error(function (erro){ console.log(erro.result) })
    };
    
    $scope.delPessoa = function() {
        check = $(".usuario_selecionado:checked");
        id = $(".usuario_selecionado:checked").val();
        
        $.get("login-cad/excluir", { id: id })
        .success(function (result) {
            if(data.status) {
                $(check).parent().parent().remove();
                alert(result.result);
                
                //$scope.filtrarPessoas();
                $scope.pessoa = $scope.pessoa;
                $scope.total();
            }
        })
        .error(function (erro) { console.log(erro.result) })
    }
    
    $scope.total = function() {
        return $scope.pessoa.length;
    }
}

/* Funções */
function btnFiltrar() {
    $("#div_filtro").show().delay(1000);
    $("#div_filtro").toggle();
}

function incluir() {
    $("#formulario_titulo").html("Incluir Usuário");
    $("#btn_formulario_inserir").text("Inserir");
    
    $("#formulario_id").val('');
    $("#formulario_nome").val('');
    $("#formulario_login").val('');
    $("#formulario_senha").val('');
    
    $("#formulario_nome").focus();
    
    //$("#div_formulario").visible();
}

function editar() {
    check = $(".usuario_selecionado:checked");    
    id = $(".usuario_selecionado:checked").val();
    
    $.get("login-cad/restaurar", { id: id }, function(data) {
        console.log(data);
        if(data) {
            $("#formulario_titulo").html("Editar '" + data.nome + "'");
    
            $("#formulario_id").val(data.id);
            $("#formulario_nome").val(data.nome);
            $("#formulario_login").val(data.login);
            $("#formulario_senha").val(data.senha);

            $("#btn_formulario_inserir").text("Atualizar");
            
            $("#div_formulario").show();
        }
    })
}

function excluir() {
    check = $(".usuario_selecionado:checked");
    id = $(".usuario_selecionado:checked").val();
    $.get("login-cad/excluir", { id: id }, function(data) {
        console.log(data);
        if(data.status) {
            $(check).parent().parent().remove();
            alert(data.result);
        }
    });
}

//Clicar no botão de executar filtro
function filtrar() {
    $("#filtrar").click();
}

/* ESPECIFICO */
$(document).on("click", "#btn_formulario_inserir", function() {
    $("#add").click();
});

$(document).on("click", ".usuario_selecionado", function() {
    console.log(this.value);
    $("#btn_ferramenta_editar").show();
    $("#btn_ferramenta_excluir").show();
    //$("#usuario_selecionado_"+check).attr('checked', 'true');
});


//Ativa��o do Angular JS
function cadastroCtrl($scope, $window) {}
