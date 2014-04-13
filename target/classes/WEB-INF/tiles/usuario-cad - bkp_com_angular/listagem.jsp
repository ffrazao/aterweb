<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div ng-controller="cadastroUsuario">
	<!--table class="table table-striped table-bordered table-hover" hover>
	<thead>
		<tr>
			<th></th>
			<th>Id</th>
            <th>Nome</th>
			<th>Login</th>
			<th>Senha</th>
		</tr>
	</thead>

	<tbody id="listagem">
		<c:forEach items="${lista}" var="linha">
			<tr id="${linha.id}" class="tr_usuario_selecionado">
				<td><input type="radio" name="opcao" class="usuario_selecionado" id="usuario_selecionado_${linha.id}" value="${linha.id}" /></td>
				<td>${linha.id}</td>
				<td>${linha.nome}</td>
                <td>${linha.login}</td>
				<td>${linha.senha}</td>
			</tr>
		</c:forEach>
	</tbody>
</table-->

	<table class="table table-striped table-bordered table-hover" hover>
		<thead>
			<tr>
				<th></th>
				<!--th>Id</th-->
				<th>Nome</th>
				<th>Login</th>
				<th>Senha</th>
			</tr>
		</thead>

		<tbody id="listagem">
			<b>Listando {{total()}} usuários</b>
			<br />
			<tr ng-repeat="p in pessoa">
				<td><input type="radio" name="opcao"
					class="usuario_selecionado" id="usuario_selecionado_{{p.id}}"
					value="{{p.id}}" /></td>
				<!--td>{{p.id}}</td-->
				<td>{{p.nome}}</td>
				<td>{{p.login}}</td>
				<td>{{p.senha}}</td>
			</tr>
		</tbody>
	</table>
	<form ng-submit="addPessoa()">
		<input id='add' class="btn-primary hide" type="submit" value="add">
	</form>

	<form ng-submit="delPessoa()">
		<input id='del' class="hide btn-primary" type="submit" value="del">
	</form>
 
    <button id="filtrar" ng-click="filtrarPessoas()">Teste</button>
</div>