<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<form action="pessoa-cad" method="POST">
	<input type="hidden" name="${_csrf.parameterName}"
		value="${_csrf.token}" />
	<div class="col-sm-4"></div>
	<div class="col-sm-4">
		<div class="input-group">
			<span class="input-group-addon"><i
				class="glyphicon glyphicon-italic"></i></span> <input class="form-control"
				id="nome" name="nome" placeholder="Nome da Pessoa" />
		</div>
	</div>
</form>