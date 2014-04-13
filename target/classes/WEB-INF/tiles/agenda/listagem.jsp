<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<table>
	<thead>
		<tr>
			<th>Tipo</th>
			<th>Nome</th>
			<th>Identificação</th>
			<th>Ações</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><img alt="Tipo de Pessoa"
				src='<spring:url value="resources/img/farmer-icon.gif"/>'></td>
			<td>João da Silva</td>
			<td>CPF 123.456.789-01</td>
			<td><img alt="Editar"
				src='<spring:url value="resources/img/salvar.png"/>' /> <img
				alt="Excluir" src='<spring:url value="resources/img/salvar2.png"/>' />
			</td>
		</tr>
	</tbody>
	<tfoot>
		<tr>
			<td colspan="4">1 de 1 registros</td>
		</tr>
	</tfoot>
</table>