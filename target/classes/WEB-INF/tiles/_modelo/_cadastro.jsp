<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>

<div id="corpo" class="container" style="background-color: #FFF;"
	ng-controller="cadastroCtrl">
	<div>
		<div class="col-sm-5">
			<br />
			<h1>
				<tiles:getAsString name="titulo" />
			</h1>
		</div>

		<div class="col-sm-7">
			<div id="barra-ferramenta" style="z-index: 1000; margin: 50px 0 0 0;">
				<jsp:include page="barra-ferramenta.jsp" />
			</div>
		</div>
	</div>

	<div class="row"></div>

	<div>
		<div id="div_filtro">
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h3 class="panel-title">Filtro</h3>
				</div>
				<div class="panel-body">
					<tiles:insertAttribute name="filtro" />
				</div>
			</div>
		</div>

		<div id="div_formulario">
			<div class="panel panel-success">
				<div class="panel-heading">
					<h3 class="panel-title">Formulário</h3>
				</div>
				<div class="panel-body">
					<tiles:insertAttribute name="formulario" />
				</div>
			</div>
		</div>

		<div id="div_listagem">
			<div class="panel panel-success">
				<div class="panel-heading">
					<h3 class="panel-title">Listagem</h3>
				</div>
				<div class="panel-body">
					<tiles:insertAttribute name="listagem" />
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript"
	src='${pageContext.request.contextPath}<tiles:getAsString name="script"/>'></script>