<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<form action="pessoa-cad" method="POST">
	<input type="hidden" name="${_csrf.parameterName}"
		value="${_csrf.token}" />
	<table>
		<tr>
			<td>nome:</td>
			<td><input name="login" /></td>
			<td></td>
		</tr>
		<tr>
			<td>identificação:</td>
			<td><input name="nome" /></td>
			<td></td>
		</tr>
		<tr>
			<td colspan="3"><input type="submit" value="Filtrar"></td>
		</tr>
	</table>
</form>