<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="_comum_head.jsp" />

<body>

	<div id="corpo" class="container" style="background-color: #FFF;">
		<div>
			<div class="col-sm-5">
				<br />
				<h1>
					<tiles:getAsString name="titulo" />
				</h1>
			</div>

		</div>
		<div>
			<tiles:insertAttribute name="corpo" />
		</div>
		<div>
			<input type="button" value="OK"> <input type="button"
				value="Cancelar">
		</div>
	</div>

	<script src="<spring:url value="resources/js/main.js"/>"></script>
	<script type="text/javascript"
		src='${pageContext.request.contextPath}<tiles:getAsString name="script"/>'></script>

</body>
</html>