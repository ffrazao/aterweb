<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<br>
<br>
<center>
	<img width="450" height="150"
		src='<spring:url value="resources/img/logo.gif"/>' />
</center>
<br>
<br>

<div class="container">
	<div class="col-md-4 col-md-offset-4">
		<form action="<c:url value='j_spring_security_check' />" method="POST">
			<input type="hidden" name="${_csrf.parameterName}"
				value="${_csrf.token}" />
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h3 class="panel-title">
						<span class="glyphicon glyphicon-leaf"></span> Acesso Negado (403)
					</h3>
				</div>
				<div class="panel-body">
					<div>
						SEU ACESSO A ESTE RECURSO FOI NEGADO!<br /> CONTATE O
						ADMINISTRADOR DO SISTEMA PARA MAIORES ESCLARECIMENTOS!
					</div>
					<br />
					<div style="text-align: center;">
						<input type="button" value="Voltar" class="btn btn-danger"
							onclick="javascript: history.back();" />
					</div>
				</div>
			</div>
		</form>
	</div>
</div>