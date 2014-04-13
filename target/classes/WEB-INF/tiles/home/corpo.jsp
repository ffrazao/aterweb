<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<div id="corpo" class="container" style="background-color: #FFF;">
	<div>
		<div class="col-sm-5">
			<br />
			<h1>Dashboard</h1>
		</div>
		<div class="row"></div>
		<div>
			<img
				src='<spring:url value="resources/img/grafico1.jpg"></spring:url>'
				width="100" height="100" /> <img
				src='<spring:url value="resources/img/grafico2.jpg"></spring:url>'
				width="100" height="100" /> <img
				src='<spring:url value="resources/img/grafico3.jpg"></spring:url>'
				width="100" height="100" />
				<br/><br/><br/><br/><br/>
		</div>
	</div>
</div>