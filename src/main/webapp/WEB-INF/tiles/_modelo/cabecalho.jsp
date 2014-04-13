<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<style>
.inline {
    display: inline-flex;
}
</style>
<div style="background-color: #FFF; overflow: hidden; position: fixed; left: 0; right: 0; z-index: 99999 !important; padding: 7px 0 6px 0; box-shadow: 0 2px 5px #888888; width:100%;">
	<div class="col-md-1 text-center">
		<a href="./"> <img
			src="<spring:url value="resources/img/logo.gif"/>" width="80px" />
		</a>
	</div>
                   <div class="hidden-lg hidden-md"><hr style="margin:3px 0;"></div>
	<div class="col-md-8">
		<div class="col-md-4">
			<div class="input-group">
				<input type="text" class="form-control" placeholder="Pesquisar">
				<span class="input-group-btn">
					<button class="btn btn-default" type="button" style="height:34px;">
						<i class="glyphicon glyphicon-search"></i>
					</button>
				</span>
			</div>
		</div>
	</div>
                <div class="hidden-lg hidden-md"><hr style="margin:3px 0;"></div>
	<div class="col-md-3 right  text-right">
		<sec:authorize access="isAuthenticated()">
	<span style="vertical-align: middle; line-height: 30px; height: 20px; display: inline-block;">Bem vindo,
                        <b><sec:authentication property="name" /></b>
                  </span>
            <c:url var="logoutUrl" value="/logout" />
			<form class="inline" action="${logoutUrl}" method="post">
				&nbsp;
                <input class="btn btn-danger" type="submit" value="Sair" style="margin-bottom: -15px;" /> 
                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
			</form>
			<%-- <sec:authentication property="authorities" /> --%>
		</sec:authorize>
		<sec:authorize access="isAnonymous()">
			<a href="login">Efetuar o Login de Acesso ao Sistema</a>
		</sec:authorize>
	</div>
                    
	<div class="col-md-1 right">
		<!--button class="small"><i class="icon-bell-alt icon-3x"></i></button-->
		<a href="#" alt="Notificações" title="Notificações" class="tooltip">
			<i class="icon-bell-alt icon-large" style="color: #000;"></i>
		</a>
	</div>

</div>
<br />
<br />
<br />
<div class="row">
	<br />
	<div class="col-md-3 media-hide">
		<a href="./"><img
			src="<spring:url value="resources/img/enterprise-logo.png"/>"
			width="200px" /></a>
	</div>

	<div class="col-md-7 media-hide">
		<h4>
			<b>Gestão das Atividades Operacionais, Táticas e Estratégicas</b>
		</h4>
	</div>
	<br /> <br /> <br />
</div>