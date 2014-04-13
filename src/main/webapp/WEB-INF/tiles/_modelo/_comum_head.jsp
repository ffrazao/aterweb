<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!doctype html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="pt_BR"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="pt_BR"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="pt_BR"> <![endif]-->
<!--[if IE 9]>    <html class="no-js ie9" lang="pt_BR"> <![endif]-->
<!-- Consider adding an manifest.appcache: h5bp.com/d/Offline -->
<!--[if gt IE 9]><!-->

<html ng-app itemscope itemtype="http://schema.org/Product"
	class="no-js" lang="pt_BR">
<!--<![endif]-->
<head>
<c:set var="temp" value="${pageContext.request}" />
<c:set var="baseUrl" value="${fn:replace(temp.requestURL, temp.requestURI, temp.contextPath)}/" />
<base href="${baseUrl}" />
<script>
//variaveis padroes para chamar os enderecos das paginas e suas acoes
const baseUrl = "${baseUrl}";
const ACAO_EXCLUIR = "/excluir";
const ACAO_FILTRAR = "/filtrar";
const ACAO_PREPARAR = "/preparar";
const ACAO_RESTAURAR = "/restaurar";
const ACAO_SALVAR = "/salvar";
const ACAO_DETALHAR = "/detalhar";
const ACAO_DOMINIO = "/dominio";
</script>

<meta charset="utf-8">

<!-- Use the .htaccess and remove these lines to avoid edge case issues.
			 More info: h5bp.com/b/378 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<title>ATER Web</title>
<meta name="description" content="" />
<meta name="keywords" content="" />
<meta name="author" content="humans.txt">

<link rel="shortcut icon" href="<spring:url value="resources/img/logo.ico"/>" type="image/x-icon" />

<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">

<!-- PROTECAO AJAX CONTRA ATAQUES CSRF -->
<meta name="_csrf" content="${_csrf.token}" />
<meta name="_csrf_header" content="${_csrf.headerName}" />

<!-- We highly recommend you use SASS and write your custom styles in sass/_custom.scss.
		 However, there is a blank style.css in the css directory should you prefer -->
<link rel="stylesheet" href="<spring:url value="resources/css/bootstrap.css"/>">
<link rel="stylesheet" href="<spring:url value="resources/css/style.css"/>">
<link rel="stylesheet" href="<spring:url value="resources/css/jquery.loadmask.css"/>">
<link rel="stylesheet" href="<spring:url value="resources/css/style.css"/>">
<link rel="stylesheet" href="<spring:url value="resources/css/jquery.fileupload.css"/>">
<link rel="stylesheet" href="<spring:url value="resources/css/jquery.fileupload-ui.css"/>">
<link rel="stylesheet" href="<spring:url value="resources/js/libs/owl-carousel/owl.carousel.css"/>">
<link rel="stylesheet" href="<spring:url value="resources/js/libs/owl-carousel/owl.theme.css"/>">
<link rel="stylesheet" href="http://blueimp.github.io/Gallery/css/blueimp-gallery.min.css">
    
<script src="<spring:url value="resources/js/jquery-2.0.2.min.js"/>"></script>
<script src="<spring:url value="resources/js/bootstrap.min.js"/>"></script>
<script src="<spring:url value="resources/js/jquery.pin.js"/>"></script>
<script src="<spring:url value="resources/js/jquery.loadmask.min.js"/>"></script>
<script src="<spring:url value="resources/js/jquery.maskedinput.min.js"/>"></script>
<script src="<spring:url value="resources/js/angular.min.js"/>"></script>
    
<script src="<spring:url value="resources/js/libs/vendor/jquery.ui.widget.js"/>"></script>
<!-- The Templates plugin is included to render the upload/download listings -->
<script src="http://blueimp.github.io/JavaScript-Templates/js/tmpl.min.js"></script>
<!-- The Load Image plugin is included for the preview images and image resizing functionality -->
<script src="http://blueimp.github.io/JavaScript-Load-Image/js/load-image.min.js"></script>
<!-- The Canvas to Blob plugin is included for image resizing functionality -->
<script src="http://blueimp.github.io/JavaScript-Canvas-to-Blob/js/canvas-to-blob.min.js"></script>
<script src="http://blueimp.github.io/Gallery/js/jquery.blueimp-gallery.min.js"></script>
    
 
<script src="<spring:url value="resources/js/libs/jquery.iframe-transport.js"/>"></script>
<!-- ADLER - esta biblioteca está causando problemas na pagina de login -->
<script src="<spring:url value="resources/js/libs/jquery.fileupload.js"/>"></script>
<script src="<spring:url value="resources/js/libs/jquery.fileupload-process.js"/>"></script>
<script src="<spring:url value="resources/js/libs/jquery.fileupload-image.js"/>"></script>
<script src="<spring:url value="resources/js/libs/jquery.fileupload-audio.js"/>"></script>
<script src="<spring:url value="resources/js/libs/jquery.fileupload-video.js"/>"></script>
<script src="<spring:url value="resources/js/libs/jquery.fileupload-validate.js"/>"></script>
<script src="<spring:url value="resources/js/libs/jquery.fileupload-fp.js"/>"></script>

<script src="<spring:url value="resources/js/libs/jquery.fileupload-ui.js"/>"></script>
<script src="<spring:url value="resources/js/libs/main.js"/>"></script>

<script src="<spring:url value="resources/js/libs/owl-carousel/owl.carousel.js"/>"></script>

</head>