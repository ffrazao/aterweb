
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<form action="login-cad/filtro" method="POST">
	<input type="hidden" name="${_csrf.parameterName}"
		value="${_csrf.token}" />
	<div class="col-sm-4"></div>
	<div class="col-sm-4">
		<div class="input-group">
			<span class="input-group-addon"><i
				class="glyphicon glyphicon-italic"></i></span>
			<input class="form-control" id="filtro_nome"
				name="nome" placeholder="Nome" />
		</div>

		<div class="input-group">
			<span class="input-group-addon"><i
				class="glyphicon glyphicon-user"></i></span>
			<input class="form-control" id="filtro_login"
				name="login" placeholder="Login" />
		</div>
	</div>
	<div class="col-sm-12 hide">
		<br />
		<center>
			<button type="button" id="btn_filtro_executar"
				class="btn btn-success" value="Filtrar">Executar</button>
		</center>
	</div>
</form>