<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<link
	href="<spring:url value="resources/js/libs/jquery.dynatree/skin-vista/ui.dynatree.css"/>"
	rel="stylesheet" type="text/css">

<div class="row">
	<div class="form-group col-sm-9">
		<label for="pessoaGrupoAtivo" class="control-label">
			Grupos Sociais [{{selecionado.nome == null ? "raiz" : selecionado.nome}}]
		</label>
		<div id="pessoaGrupoTree"></div>
	</div>
</div>

<script src="<spring:url value="resources/js/libs/jquery-ui.custom.js"/>"></script>
<script src="<spring:url value="resources/js/libs/jquery.cookie.js"/>"></script>
<script src="<spring:url value="resources/js/libs/jquery.dynatree/jquery.dynatree.min.js"/>"></script>