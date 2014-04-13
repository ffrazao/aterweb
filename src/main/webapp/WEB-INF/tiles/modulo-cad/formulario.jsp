<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>

<!--sec:authorize var="adm" access="hasRole('ROLE_ADMIN')"-->
<form  id="form_usuario" action="modulo-cad/salvar" method="POST">
	<input type="hidden" name="${_csrf.parameterName}"
		value="${_csrf.token}" />
	<div class="col-sm-4"></div>
	<div class="col-sm-4">
		<center>
			<h2 id="formulario_titulo"></h2>
			
            <input id="formulario_id" type="hidden" class="form-control" />
                  
			<div class="input-group">
				<span class="input-group-addon">
					<!--i class="glyphicon glyphicon-italic"></i-->&nbsp;<b>Nome do Módulo</b>
				</span>
				<input id="formulario_nome" class="form-control"
					placeholder="Nome" />
			</div>
			<br />
			
			<!--input type="submit" name="action" value="restore" />
                    <input type="submit" name="action" value="update" />
                    <input type="submit" name="action" value="delete" /-->
		</center>
	</div>
  
    <br />
    <br />
    
    <div class="col-sm-12"></div>
    <div class="col-sm-3"></div>
    
    <div class="col-sm-6">
        <center><h3>Perfis</h3></center>
        <div id="div_perfils" class="scroll"></div>
    </div>
</form>
<!--/sec:authorize-->
<style>
    input[type='checkbox'], input[type='radio'] {
        height: 18px;
        width: 18px;
    }

    .tags {
        margin: 5px;
        padding: 5px;
        background-color: #FFF;
    }

    .tags:hover {
        background-color: #DFDFDF;
    }

    .scroll {
        height: 500px;
        overflow-y: auto;
    }
</style>  
    
<script>
    $.get("dominio?ent=Perfil")
    .success(function(data){ 
        $.each(data.resultado, function(index, data) {
            var retorno = '<div class="col-sm-2"></div> <div class="col-sm-8 tags">';
                retorno += '<div class="col-sm-8 text-left"><span class="glyphicon glyphicon-user"></span> <b>'+data.nome+'</b></div>';
                retorno += '<div class="col-sm-4 text-right"><input id="'+data.id+'" name="moduloPerfils['+index+'].perfil.id" type="checkbox" class="checkbox_perfils" value="' + data.id + '" /> </div>';
                retorno += '</div>';
            $("#div_perfils").append(retorno);
        });
        //a = $(".checkbox_perfils:checked"); $.each(a, function(index, data) { console.log(data.id) })
    })
    .error(function(data) {
        $("#div_modulos").html("ERRO");
    })
</script>