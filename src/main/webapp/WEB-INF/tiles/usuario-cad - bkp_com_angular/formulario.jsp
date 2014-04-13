<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>

<!--sec:authorize var="adm" access="hasRole('ROLE_ADMIN')"-->
<form action="login-cad" method="POST">
	<input type="hidden" name="${_csrf.parameterName}"
		value="${_csrf.token}" />
	<div class="col-sm-4"></div>
	<div class="col-sm-4">
		<center>
			<h2 id="formulario_titulo"></h2>
			<!--div class="input-group">
                        <span class="input-group-addon">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Id&nbsp;&nbsp;</span>
                        <input id="formulario_id" class="form-control" placeholder="Id" />
                    </div>
                    <br /-->
			<div class="input-group">
				<span class="input-group-addon">
					<!--i class="glyphicon glyphicon-italic"></i-->&nbsp;Nome
				</span>
				<input id="formulario_nome" class="form-control"
					placeholder="Nome" />
			</div>
			<br />
			<div class="input-group">
				<span class="input-group-addon">
					<!--i class="glyphicon glyphicon-user"></i-->&nbsp;Login
				</span>
				<input id="formulario_login" class="form-control"
					placeholder="Login" />
			</div>
			<br />
			<div class="input-group">
				<span class="input-group-addon">
					<!--i class="glyphicon glyphicon-asterisk"></i-->Senha
				</span>
				<input id="formulario_senha" class="form-control"
					placeholder="Senha" />
			</div>

			<br />
			<button id="btn_formulario_inserir" type="button"
				class="btn btn-primary" name="action">Inserir</button>
			<!--input type="submit" name="action" value="restore" />
                    <input type="submit" name="action" value="update" />
                    <input type="submit" name="action" value="delete" /-->
		</center>
	</div>
</form>
<!--/sec:authorize-->