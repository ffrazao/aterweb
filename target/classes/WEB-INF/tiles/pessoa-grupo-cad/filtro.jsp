<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<form>
	<input type="hidden" name="${_csrf.parameterName}"
		value="${_csrf.token}" />
<!-- <div class="row">
		<div class="form-group col-sm-9">
			<label for="pessoaGrupoTipo.id" class="control-label">Tipo de
				Grupo Social</label>
			<!-- Exemplo de como se deve fazer com campos do tipo select no angujarjs. Nao utilize o ng-option -- >
			<select id="pessoaGrupoTipo.id" name="pessoaGrupoTipo.id"
				class="form-control" ng-model="filtro.pessoaGrupoTipo">
				<option value="null">-- Todos --</option>
				<option ng-repeat="campo in pessoaGrupoTipoList"
					value="{{campo.id}}">{{campo.nome}}</option>
			</select>
		</div>
	</div> -->
	<div class="row">
		<div class="form-group col-sm-9">
			<label for="nome" class="control-label">Nome do Grupo Social</label>
			<input id="nome" name="nome" class="form-control"
				placeholder="Nome do Grupo Social" ng-model="filtro.nome" />
		</div>
	</div>
	<div class="row">
		<div class="form-group col-sm-9">
			<label for="gestorGrupo" class="control-label">Nível de Gestão do
				Grupo Social</label> <br /> <input id="gestorGrupoTodosCheck"
				name="gestorGrupoTodosCheck" type="checkbox"
				ng-click="selectAll($event)" ng-checked="isSelectAll()" /> Todos <br />
			<input id="gestorGrupoTecnicoCheck" name="gestorGrupoTecnicoCheck"
				type="checkbox" ng-checked="gestorGrupoTecnicoCheck"
				ng-click="isSelectAll()" /> Técnico [] <br /> <input
				id="gestorGrupoUnidadeOrganizacionalCheck"
				name="gestorGrupoUnidadeOrganizacionalCheck" type="checkbox"
				ng-checked="gestorGrupoUnidadeOrganizacionalCheck"
				ng-click="isSelectAll()" /> Unidade Organizacional [] <br />
			<input id="gestorGrupoEmpresaCheck" name="gestorGrupoEmpresaCheck"
				type="checkbox" ng-checked="gestorGrupoEmpresaCheck"
				ng-click="isSelectAll()" /> Empresa [] <br />
		</div>
	</div>
	<div class="row">
		<div class="form-group col-sm-3">
			<label for="situacao" class="control-label">Situação</label> <br />
			<select id="situacaoGrupo" name="situacaoGrupo" class="form-control"
				ng-model="filtro.situacaoGrupo">
				<option value="">-- Todos --</option>
				<option value="A">Ativo</option>
				<option value="U">Inativo</option>
			</select>
		</div>
	</div>
</form>
