<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Teste Master Detail com o Angular JS</title>
</head>
<body ng-app ng-controller="ctrl">

	<h1>Master</h1>
	<table id="masterTbl">
		<thead>
			<tr>
				<td>Id</td>
				<td>Nome</td>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="itemM in master" ng-click="seleciona(itemM.id)">
				<td>{{itemM.id}}</td>
				<td>{{itemM.nome}}</td>
			</tr>
		</tbody>
	</table>
	<h1>Detail [{{selecionado}}]</h1>
	<table>
		<thead>
			<tr>
				<td>Id</td>
				<td>Nome</td>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="itemD in selecionado">
				<td>{{itemD.id}}</td>
				<td>{{itemD.nome}}</td>
			</tr>
		</tbody>
	</table>
</body>

<script
	src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.5/angular.min.js"></script>
<script>
	function ctrl($scope) {
		console.log("entrou 1");
/*		$(document).on("click","#masterTbl tbody tr", function() {
			console.log("entrou 2");
			$scope.seleciona($(this).children("td").eq(0).text());
		});*/
		$scope.seleciona = function(pai) {
			console.log("asiiisss");
			$scope.selecionado = new Array();
			$.each($scope.detail, function(key, val) {
				if (pai === val.pai) {
					$scope.selecionado.push(val);
				}
			});
		}
		$scope.master = [ {
			id : 1,
			nome : "teste1"
		}, {
			id : 2,
			nome : "teste2"
		}, {
			id : 3,
			nome : "teste3"
		} ];
		$scope.detail = [ {
			id : 1,
			nome : "teste1sub1",
			pai : 1
		}, {
			id : 2,
			nome : "teste1sub2",
			pai : 1
		}, {
			id : 3,
			nome : "teste1sub3",
			pai : 1
		}, {
			id : 4,
			nome : "teste2sub1",
			pai : 2
		}, {
			id : 5,
			nome : "teste2sub2",
			pai : 2
		}, {
			id : 6,
			nome : "teste2sub3",
			pai : 2
		}, {
			id : 7,
			nome : "teste3sub1",
			pai : 3
		}, {
			id : 8,
			nome : "teste3sub2",
			pai : 3
		}, {
			id : 9,
			nome : "teste3sub3",
			pai : 3
		} ];

		$scope.selecionado = null;
	}
</script>
</html>