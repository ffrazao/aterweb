<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<form>
	<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" /> 

	<input type="hidden" name="id" ng-model="registro.id" />
	<input type="hidden" name="@class" ng-model="registro['@class']" />
	<input type="hidden" name="pessoaTipo" ng-model="registro.pessoaTipo" /> 
	<input type="hidden" name="pessoaGrupoTipo" ng-model="registro.pessoaGrupoTipo" />
	<input type="hidden" name="publicoAlvoConfirmacao" ng-model="registro.publicoAlvoConfirmacao" /> 
	<input type="hidden" name="pessoaGrupo" ng-model="registroPessoaGrupoPai" />

	<div class="row">
		<div class="form-group col-sm-9">
			<label for="selecionado" class="control-label">Grupo Social Selecionado [{{selecionado.nome == null ? "raiz" : selecionado.nome}}]</label> <br /> 
			<input type="radio" name="selecionado" ng-model="registroLocal" value="mesmoNivel" ng-disabled="selecionado.nome == null"> No mesmo nível <br />
			<input type="radio" name="selecionado" ng-model="registroLocal" value="noDescendente"> Como um Subgrupo de [{{selecionado.nome == null ? "raiz" : selecionado.nome}}]
		</div>
	</div>
	<div class="row">
		<div class="form-group col-sm-9">
			<label for="nome" class="control-label">Nome do Grupo Social</label>
			<input class="form-control" id="nome" name="nome" placeholder="Nome do Grupo Social" ng-model="registro.nome" />
		</div>
	</div>
	<div class="row">
		<div class="form-group col-sm-9">
			<label for="nome" class="control-label">Sigla do Grupo Social</label>
			<input class="form-control" id="nome" name="nome"
				placeholder="Nome do Grupo Social" ng-model="registro.apelidoSigla" />
		</div>
	</div>
	<div class="row">
		<div class="form-group col-sm-9">
			<label for="gestorGrupo" class="control-label">Nível de Gestão do Grupo Social</label> <br /> 
 			<input type="radio" name="nivelGestao" ng-model="registro.nivelGestao" value="T" ng-change="mudarNivelGestao()" /> Técnico <br /> 
			<input type="radio" name="nivelGestao" ng-model="registro.nivelGestao" value="U" ng-change="mudarNivelGestao()" /> Unidade Organizacional <br /> 
			<input type="radio" name="nivelGestao" ng-model="registro.nivelGestao" value="E" ng-change="mudarNivelGestao()" /> Empresa <br /> 
		</div>
	</div>

	<div class="row">
		<div class="form-group col-sm-9">
			<label for="nome" class="control-label">Gestão e Compartilhamento[{{registro.pessoaRelacionamentos}}]</label><br />
			<div class="panel panel-default">
				<div class="panel-heading">
					<h3 class="panel-title">Membro(s)</h3>
				</div>
				<div class="panel-body">
					<div class="table-responsive text-center">
						<table class="table table-striped">
							<thead>
								<tr>
									<td>Membro</td>
									<td>Pode Modificar</td>
									<td>Proprietário</td>
								</tr>
							</thead>
							<tbody>
								<tr ng-repeat="membro in registro.pessoaRelacionamentos">
									<td>{{membro.pessoa.nome}}</td>
									<td>{{membro.podeModificar}}</td>
									<td>{{membro.proprietario}}</td>
								</tr>
							</tbody>
							<tfoot></tfoot>
						</table>
					</div>
				</div>
				<div class="panel-footer text-right">
					<button class="btn btn-success novo" type="button" ng-click="novoMembroGrupo()" ng-disabled="registro.nivelGestao == null">Incluir novo Membro</button>
				</div>
			</div>
		</div>
	</div>

	<div class="panel panel-default">
		<div class="panel-heading">
			<label class="panel-title">Situacao</label>
		</div>
		<div class="panel-body">
			<label for="situacao" class="control-label">Ativo
				<input type="radio" ng-model="registro.situacao" value="A" name="situacao">
			</label>
			<label for="situacao" class="control-label">Inativo
				<input type="radio" ng-model="registro.situacao" value="O" name="situacao">
			</label>
		</div>
	</div>		

	<div class="row">
		<div class="form-group col-sm-9">
			<label for="nome" class="control-label">Observações</label><br />
			<textarea rows="5" cols="100" ng-model="registro.observacoes"></textarea>
		</div>
	</div>
	[{{registro}}]
</form>

<div class="modal fade" id="modalMembroGrupoSocial">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close btn btn-danger"
					data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">Membro do Grupo Social [{{registro.nome}}] /{{membroGrupo.pessoasEncontradas | json}}/</h4>
			</div>
		<!--
		 Técnico nome e cpf
		 Unidade organizacional empresa e nome
		 Empresa nome e cnpj
		 -->
			<div class="modal-body" ng-show="registro.nivelGestao === 'T'">
				<div class="form-group">
					<div class="col-sm-7">
						<label for="nomeMembro" class="control-label">Nome</label><br>
						<input class="form-control" title="Nome do Membro do Grupo" id="nomeMembro" ng-model="membroGrupo.filtro.nome" />
					</div>
					<div class="col-sm-4">
						<label for="cpfMembro" class="control-label">CPF</label><br>
						<input class="form-control cpf" title="CPF do Membro do Grupo" id="cpfMembro" ng-model="membroGrupo.filtro.cpfCnpj" />
					</div>
	                <div class="com-sm-1">
	                    <label class="control-label">&nbsp;</label><br>
	                    <button class="btn btn-default" type="button" id="buscarMembro" ng-click="buscarMembroGrupo()"><span class="glyphicon glyphicon-search"></span>&nbsp;</button>
	                </div>
				</div>
                <div class="clearfix "></div>
                
                <div class="form-group col-sm-12">
                    <label for="pessoasEncontradas" class="control-label">Pessoas encontradas</label><br>
                    <select size="5" style="width:100%;" title="Pessoas" id="pessoasEncontradas" ng-model="membroGrupo.pessoaSelecionada">
                        <option ng-repeat="membro in membroGrupo.pessoasEncontradas" value="{{membro}}">{{membro.nome}}</option>
                    </select>
                </div>
                <div class="clearfix "></div>

				<div class="form-group">
					<div class="panel panel-default">
						<div class="panel-heading">
							<label class="panel-title">Privilégios</label>
						</div>
						<div class="panel-body">
							<div class="form-group">
								<div class="col-sm-4">
									<div class="checkbox">
										<label> <input type="checkbox" id="podeModificar" title="Pode Modificar" ng-disabled="membroGrupo.pessoaSelecionada == null" ng-model="membroGrupo.podeModificar" ng-true-value="Sim" ng-false-value="Não"> Pode Modificar </label>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="checkbox">
										<label> <input type="checkbox" id="proprietario" title="Proprietario" ng-disabled="membroGrupo.pessoaSelecionada == null" ng-model="membroGrupo.proprietario" ng-true-value="Sim" ng-false-value="Não"> Proprietário </label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="clearfix "></div>
				
				<div class="form-group">
					<div class="panel panel-default">
						<div class="panel-heading">
							<label> 
								<input type="checkbox" id="acessoGrupoIndeterminado" title="Acesso ao Grupo por Tempo Indeterminado" ng-model="membroGrupo.acessoGrupoTempoIndeterminado" ng-disabled="membroGrupo.pessoaSelecionada == null" ng-true-value="S" ng-false-value="N">
								Acesso ao Grupo por Tempo Indeterminado 
							</label>
						</div>
						<div class="panel-body" ng-show="membroGrupo.acessoGrupoTempoIndeterminado === 'N'">
							<div class="form-group">
								<div class="col-sm-3">
									<label for="inicioAcessoGrupo" class="control-label">Início Acesso</label><br>
									<input class="form-control data" title="Início de Acesso ao Grupo" id="inicioAcessoGrupo" ng-model="membroGrupo.filtro.inicio" />
								</div>
								<div class="col-sm-3">
									<label for="nomeMembro" class="control-label">Término Acesso</label><br>
									<input class="form-control data" title="Término de Acesso ao Grupo" id="terminoAcessoGrupo" ng-model="membroGrupo.filtro.termino" />
								</div>
							</div>								
						</div>
					</div>
				</div>
				<div class="clearfix "></div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
				<button type="button" class="btn btn-default" data-dismiss="modal"ng-click="salvarMembroGrupo()" ng-disabled="membroGrupo.pessoaSelecionada == null">
					Salvar
				</button>
			</div>
		</div>
	</div>
</div>
