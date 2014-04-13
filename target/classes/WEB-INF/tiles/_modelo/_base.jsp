<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<style>
    height: 100%;
</style>
<jsp:include page="_comum_head.jsp" />

<body>
	<div id="cabecalho" class="container">
		<tiles:insertAttribute name="cabecalho" />
	</div>
	<div id="menu" style="width: 100% !important; left: 0; right: 0;">
		<tiles:insertAttribute name="menu" />
	</div>

	<tiles:insertAttribute name="corpo" />

	<div id="footer">
		<div class="container">
			<tiles:insertAttribute name="rodape" />
		</div>
	</div>

	<script src="<spring:url value="resources/js/main.js"/>"></script>

</body>
</html>