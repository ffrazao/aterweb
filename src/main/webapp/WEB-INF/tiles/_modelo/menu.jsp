<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<style>
.navbar a {
	color: #DDD !important;
}

.navbar a:hover {
	color: #FFF !important;
}

.dropdown ul li a {
	color: #000 !important;
}

.dropdown ul li a:hover {
	color: #000 !important;
}
</style>

<nav class="navbar navbar-inverse navbar-static-top" role="navigation">
	<div class="container-fluid">
		<!-- Brand and toggle get grouped for better mobile display -->

		<ul class="nav navbar-nav">
			<li><a href="/aterweb"><i
					class="glyphicon glyphicon-asterisk"></i> Dashboard</a></li>
		</ul>
		<!-- Collect the nav links, forms, and other content for toggling -->
		<div class="collapse navbar-collapse"
			id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav">
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown"><i class="glyphicon glyphicon-plus"></i>
						Gestão <b class="caret"></b></a>
					<ul class="dropdown-menu">
						<li><a href="pessoa-cad">Pessoas</a></li>
						<li class="divider"></li>
						<li><a href="propriedade-rural-cad">Propriedades Rurais</a></li>
						<li class="divider"></li>
						<li><a href="pessoa-grupo-cad">Grupos Sociais</a></li>
					</ul></li>
			</ul>

			<ul class="nav navbar-nav">
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown"><i class="glyphicon glyphicon-list-alt"></i>
						Atividades <b class="caret"></b></a>
					<ul class="dropdown-menu">
						<li><a href="agenda-cad">Planejar Atividades</a></li>
						<li class="divider"></li>
						<li><a href="agenda-cad">Registrar Atividade</a></li>
						<li class="divider"></li>
						<li><a href="agenda">Agenda</a></li>
					</ul></li>
			</ul>

			<ul class="nav navbar-nav">
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown"><i class="glyphicon glyphicon-saved"></i>
						Diagnóstico <b class="caret"></b></a>
					<ul class="dropdown-menu">
						<li><a href="indice-producao-cad">Índices de Produção</a></li>
						<li class="divider"></li>
						<li><a href="indice-social-cad">Índices Sociais</a></li>
						<li class="divider"></li>
						<li><a href="enquete-cad">Enquetes</a></li>
					</ul></li>
			</ul>

			<ul class="nav navbar-nav">
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown"><i class="glyphicon glyphicon-cog"></i>
						Configurações <b class="caret"></b></a>
					<ul class="dropdown-menu">
						<li><a href="usuario-cad"><span
								class="glyphicon glyphicon-user"></span> Usuários</a></li>
						<li class="divider"></li>
						<li><a href="modulo-cad"><span
								class="glyphicon glyphicon-th-large"></span> Módulos</a></li>
					</ul></li>
			</ul>
		</div>
		<!-- /.navbar-collapse -->
	</div>
	<!-- /.container-fluid -->
</nav>