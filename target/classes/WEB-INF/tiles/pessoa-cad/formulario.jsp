<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<style>
    #map-canvas {
        height: 100%;
        height: 500px;
        margin: 0px;
        padding: 0px
    }
</style>
<link href="<spring:url value='resources/js/libs/jquery.dynatree/skin-vista/ui.dynatree.css'/>" rel="stylesheet" type="text/css">

<div class="modal fade" id="modalMapa">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">MAPA</h4>
            </div>
            <div class="modal-body"><br>
                <p> <div id="map-canvas"></div></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-default">Google Maps</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalSelecionarPessoa">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Cadastrar Pessoa</h4>
            </div>
            <div class="modal-body"><br>
                <p class="text-center">
                    <button type="button" id="btnInserirFisica" class="btn btn-primary btn-lg" value="PF">Pessoa Física</button>
                    <button type="button" id="btnInserirJuridica" class="btn btn-primary btn-lg" value="PJ">Pessoa Jurídica</button>
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>



<form action="pessoa-cad" method="POST" id="formularioPessoa">
    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
    <input type="hidden" class="form-control" id="inputId" name="id" />
    <input type="hidden" class="form-control" id="pessoaTipo" name="pessoaTipo" />
    <input type="hidden" class="form-control" id="classePessoa" name="@class" />
    <!--<input type="hidden" class="form-control" id="typePessoa" name="@type" />-->

    <div class="row">
        <div class="col-sm-8">
            <div class="row">
                <div class="form-group col-sm-9">
                    <label for="nome" class="control-label">Nome</label>
                    <input class="form-control" id="nome" name="nome" placeholder="Nome" />
                </div>
                <div class="form-group col-sm-3">
                    <label for="apelido" class="control-label">Apelido</label>
                    <input class="form-control" id="apelidoSigla" name="apelidoSigla" placeholder="Apelido" />
                </div>
            </div>

            <div class="pessoaFisica">
                <div class="row">
                    <div class="form-group col-sm-4">
                        <label for="inputSexo" class="control-label">Sexo</label><br>
                        <input type="radio" id="sexo" name="sexo" value="M" /> Masculino
                        <input type="radio" id="sexo" name="sexo" value="F" /> Feminino
                    </div>

                    <div class="form-group col-sm-3">
                        <label for="cpf" class="control-label">CPF</label>
                        <input class="form-control cpf" id="cpf" name="cpf" placeholder="CPF" />
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputBrasileiro" class="control-label">Brasileiro</label><br>
                        <input type="radio" id="nacionalidade" name="nacionalidade" value="BN" /> Sim
                        <input type="radio" id="nacionalidade" name="nacionalidade" value="N" /> Não
                        <script>
                            $(function() {
                                $("input[name='nacionalidade']").eq(0).change(function() {
                                    $('.naoBrasileiro').hide();
                                    $('.naoBrasileiro').find('input,select,textarea').each(function() {
                                        $(this).attr('disabled', 'disabled');
                                    });
                                    $('.brasileiro').show();
                                    $('.brasileiro').find('input,select,textarea').each(function() {
                                        $(this).removeAttr('disabled');
                                    });
                                });
                                $("input[name='nacionalidade']").eq(1).click(function() {
                                    $('.brasileiro').hide();
                                    $('.brasileiro').find('input,select,textarea').each(function() {
                                        $(this).attr('disabled', 'disabled');
                                    });
                                    $('.naoBrasileiro').show();
                                    $('.naoBrasileiro').find('input,select,textarea').each(function() {
                                        $(this).removeAttr('disabled');
                                    });
                                });
                            });
                        </script>
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="nascimento" class="control-label">Nascimento</label>
                        <input class="form-control data" id="nascimento" name="nascimento" placeholder="Data de Nascimento" />
                    </div>

<!-- // TODO jean temos que conversar a respeito do local de nascimento
                    <div class="form-group col-sm-3 brasileiro">
                        <label for="inputLocalNascimento" class="control-label">Local de Nascimento</label>
                        <input class="form-control" id="inputLocalNascimento" placeholder="Local de Nascimento" />
                    </div>

                    <div class="form-group col-sm-3 naoBrasileiro">
                        <label for="paisOrigem" class="control-label">País de Origem</label>
                        <select class="form-control paises" id="paisOrigem" name="paisOrigem">
                        </select>
                    </div>
                    <div class="form-group col-sm-3 naoBrasileiro">
                        <label for="naturalizado" class="control-label">Naturalizado</label><br>
                        <input type="radio" id="naturalizado" name="naturalizado" /> Sim
                        <input type="radio" id="naturalizado" name="naturalizado" /> Não
                    </div> -->
                </div>

                <div class="row">


                    <div class="form-group col-sm-3">
                        <label for="inputEstadoCivil" class="control-label">Estado Civil</label>
                        <select class="form-control" id="estadoCivil" name="estadoCivil">
                            <option value="S">Solteiro</option>
                            <option value="C">Casado</option>
                            <option value="D">Desquitado</option>
                            <option value="P">Separado</option>
                            <option value="V">Viúvo</option>
                            <option value="U">União Estável</option>
                        </select>
                    </div>

                    <div class="form-group col-sm-4">
                        <label for="inputEscolaridade" class="control-label">Escolaridade</label>
                        <select class="form-control" id="escolaridade" name="escolaridade">
							<option value="AI">Não sabe ler / escrever (Analfabeto)</option>
							<option value="AC">Sabe ler / escrever (Alfabetizado)</option>
							<option value="FI">Fundamental Incompleto</option>
							<option value="FC">Fundamental Completo</option>
							<option value="MI">Médio Incompleto</option>
							<option value="MC">Médio Completo</option>
							<option value="SI">Superior Incompleto</option>
							<option value="SC">uperior Completo</option>
							<option value="ES">Especialização/ Residência</option>
							<option value="ME">Mestrado</option>
							<option value="DO">Doutorado</option>                            
                        </select>
                    </div>

                    <!--
                    <div class="form-group col-sm-3">
                        <label for="tipoSangue" class="control-label">Tipo Sanguíneo</label>
                        <select class="form-control" id="tipoSangue">
                            <option>A+</option>
                            <option>A-</option>
                            <option>B+</option>
                            <option>B-</option>
                            <option>O+</option>
                            <option>O-</option>
                            <option>AB+</option>
                            <option>AB-</option>
                        </select>
                    </div>
                    -->
                </div>


            </div>

            <div class="pessoaJuridica">
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="cnpj" class="control-label">CNPJ</label>
                        <input class="form-control cnpj" id="cnpj" placeholder="cnpj" />
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputInscricaoEstadual" class="control-label">Iscrição Estadual</label>
                        <input class="form-control" id="inscricaoEstadual inscricao" name="inscricaoEstadual" placeholder="Iscrição Estadual" />
                    </div>

                </div>
            </div>

            <div class="row">
                <div class="form-group col-sm-3">
                    <label for="situacao" class="control-label">Situação</label><br>
                    <select class="form-control" id="situacao" name="situacao">
                        <option value="A">Ativo</option>
                        <option value="U">Inativo por falta de uso</option>
                        <option value="F">Inativo por falecimento</option>
                        <option value="O">Inativo por outro motivo</option>
                    </select>
                </div>

                <div class="form-group col-sm-3">
                    <label for="publicoAlvoConfirmacao" class="control-label">Público alvo</label><br>
                    <input type="radio" id="publicoAlvoConfirmacao" name="publicoAlvoConfirmacao" value="S" /> Sim
                    <input type="radio" id="publicoAlvoConfirmacao" name="publicoAlvoConfirmacao" value="N" /> Não
                    <script>
                        $(function() {

                            $("#navPublico").hide();
                        });
                    </script>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-sm-12">
                    <label for="observacoes" class="control-label">Observações</label>
                    <textarea class="form-control" id="observacoes" name="observacoes"></textarea>
                </div>
            </div>

        </div>
        <div class="col-sm-4">
            <div class="visible-md visible-lg">
                <img  src="http://placehold.it/350x350/4D99E0/ffffff.png&text=350x350" />
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs">
                <li id="navMeioContatos"><a href="#meioContatos" data-toggle="tab">Meios de Contato</a></li>
                <li id="navRelacionamentos"><a href="#relacionamentos" data-toggle="tab">Relacionamentos</a></li>
                <li id="navDocumentos"><a href="#documentos" data-toggle="tab">Documentos</a></li>
                <li id="navGruposSociais" class="active"><a href="#gruposSociais" data-toggle="tab">Grupos Sociais</a></li>
                <li id="navPublico"><a href="#publico" data-toggle="tab">Público Alvo</a></li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
                <div class="tab-pane fade in active" id="gruposSociais">
                    <div class="container col-sm-12"><br>
                        <div class="row">
                            <label for="gestorGrupo" class="control-label">
                                Nível de Gestão do Grupo Social
                            </label> <br />
                            <input type="radio" name="nivelGestao" value="" /> Todos |
                            <input type="radio" name="nivelGestao" value="T" /> Técnico |
                            <input type="radio" name="nivelGestao" value="U" /> Unidade Organizacional |
                            <input type="radio" name="nivelGestao" value="E" /> Empresa<br/><br/>
                        </div>
                        <div class="row">
                            <label class="control-label">Grupos
                                Sociais [] </label>
                            <div id="pessoaGrupoTree">
                                <ul>
                                    <li>Atividade Rural
                                        <ul>
                                            <li>Agricola
                                                <ul>
                                                    <li>Soja</li>
                                                    <li>Hortaliças</li>
                                                </ul>
                                            </li>
                                            <li>Animal
                                                <ul>
                                                    <li>Bovino</li>
                                                    <li>Suino</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>Programas Sociais
                                        <ul>
                                            <li>Brasil Sem Miseria</li>
                                            <li>PAA</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="meioContatos">
                    <div class="container col-sm-12"><br>
                        <div class="row">
                            <div class="gerenciar col-sm-12">
                                <div>
                                    <div class="panel panel-default">
                                        <div class="panel-heading">
                                            <h3 class="panel-title">Endereço(s)</h3>
                                        </div>
                                        <div class="panel-body">
                                            <div class="table-responsive text-center">
                                                <table class="table table-striped">
                                                    <thead></thead>
                                                    <tbody></tbody>
                                                    <tfoot></tfoot>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="panel-footer text-right">
                                            <button class="btn btn-success novo" type="button"> Incluir novo Endereço</button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="modal fade formulario" id="modalMeioContatoEndereco" tabindex="-1" role="dialog" aria-labelledby="Endereço" aria-hidden="true">
                                        <div class="modal-dialog modal-lg">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                                    <h4 class="modal-title" id="myModalLabel">Meio de Contato</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <input type="hidden" id="classeMeioContato" nomeCampo=".@class" value="gov.emater.aterweb.model.MeioContatoEndereco" tag="meioContato" />
                                                    <input type="hidden" id="meioContatoTipo" nomeCampo=".meioContatoTipo" value="END" tag="meioContato" />

                                                    <div class="form-group">
                                                        <div class="col-sm-6">
                                                            <label for="finalidadeEndereco" class="control-label">Finalidade</label><br>

                                                            <input type="radio" exibir="true" title="Finalidade" name="finalidadeEndereco" id="finalidadeEndereco" nomeCampo=".finalidade" tag="pessoaMeioContatos" value="P" descricao="Pessoal" /> Residencial |
                                                            <input type="radio" name="finalidadeEndereco"  id="finalidadeEndereco" nomeCampo=".finalidade" tag="pessoaMeioContatos" value="C" descricao="Comercial" /> Comercial |
                                                            <input type="radio" name="finalidadeEndereco"  id="finalidadeEndereco" nomeCampo=".finalidade" tag="pessoaMeioContatos" value="P,C" descricao="Ambos" /> Ambos
                                                        </div>
                                                    </div>
                                                    <div class="clearfix "></div>
                                                    <div class="form-group">
                                                        <div class="col-sm-2">
                                                            <label for="cepEndereco" class="control-label">CEP</label><br>
                                                            <input class="form-control cep" exibir="true" title="CEP" id="cepEndereco" nomeCampo=".cep"  tag="meioContato" />
                                                        </div>
                                                        <div class="col-sm-2">
                                                            <label for="paisEndereco" class="control-label">País</label><br>
                                                            <select class="form-control paises" id="paisEndereco">
                                                                <!--GERADO POR JSON-->
                                                            </select>
                                                        </div>
                                                        <div class="col-sm-2">
                                                            <label for="ufEndereco" class="control-label">Estado</label><br>
                                                            <select class="form-control estados" id="ufEndereco">
                                                                <!--GERADO POR JSON-->
                                                            </select>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <label for="municipioEndereco" class="control-label">Município</label><br>
                                                            <select class="form-control municipios" id="municipioEndereco">
                                                                <!--GERADO POR JSON-->
                                                            </select>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <label for="cidadeEndereco" class="control-label">Cidade</label><br>
                                                            <select class="form-control cidades" exibir="true" title="Cidade" id="cidadeEndereco" nomeCampo=".id"  tag="localizacao">
                                                                <!--GERADO POR JSON-->
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix "></div>
                                                    <div class="form-group col-sm-12">
                                                        <label for="localEndereco" class="control-label">Endereço</label><br>
                                                        <input class="form-control" exibir="true" title="Endereço" id="localEndereco" nomeCampo=".descricao" tag="meioContato" />
                                                    </div>
                                                    <div class="form-group itensPropriedadeRural">
                                                        <div class="col-sm-3">
                                                            <label for="propriedadeRural" class="control-label">Propriedade Rural</label><br>
                                                            <input type="radio" id="propriedadeRural" name="propriedadeRural" exibir="true" title="P.R." descricao="Sim" nomeCampo=".propriedadeRuralConfirmacao" value="S" tag="meioContato" /> Sim |
                                                            <input type="radio" id="propriedadeRural" name="propriedadeRural" descricao="Não" nomeCampo=".propriedadeRuralConfirmacao" value="N" tag="meioContato" /> Não
                                                        </div>

                                                        <div class="col-sm-3 subItensPropriedadeRural">
                                                            <label for="comuEndereco" class="control-label">Comunidade</label><br>
                                                            <select class="form-control comunidades" exibir="true" title="Comunidade" id="comuEndereco" nomeCampo=".comunidades" tag="propriedadeRural" multiple>
                                                                <!--GERADO POR JSON-->
                                                            </select>
                                                        </div>

                                                        <div class="col-sm-3 subItensPropriedadeRural">
                                                            <label for="baciaEndereco" class="control-label">Bacia</label><br>
                                                            <select class="form-control bacias" exibir="true" title="Bacia" id="baciaEndereco" nomeCampo=".bacias" tag="propriedadeRural" multiple>
                                                                <!--GERADO POR JSON-->
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix "></div>
                                                </div>
                                                <div class="modal-footer">
                                                    <div class="text-left col-sm-3">
                                                        <sup>P.R. - Propriedade Rural</sup>
                                                    </div>
                                                    <button type="button" class="btn btn-default cancelar" data-dismiss="modal">Cancelar</button>
                                                    <button type="button" class="btn btn-primary salvar">Salvar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="row">
                            <div class="gerenciar col-sm-6">
                                <div>
                                    <div class="panel panel-default">
                                        <div class="panel-heading">
                                            <h3 class="panel-title"> E-Mail(s)</h3>
                                        </div>
                                        <div class="panel-body">
                                            <div class="table-responsive text-center">
                                                <table class="table table-striped">
                                                    <thead></thead>
                                                    <tbody></tbody>
                                                    <tfoot></tfoot>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="panel-footer text-right">
                                            <button class="btn btn-success novo" type="button"> Incluir novo E-Mail</button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="modal fade formulario" id="modalMeioContatoEmail" tabindex="-1" role="dialog" aria-labelledby="Email" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                                    <h4 class="modal-title" id="myModalLabel">Meio de Contato</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <input type="hidden" id="classeMeioContato" nomeCampo=".@class" value="gov.emater.aterweb.model.MeioContatoEmail" tag="meioContato" />
                                                    <input type="hidden" id="meioContatoTipo" nomeCampo=".meioContatoTipo" value="EMA" tag="meioContato" />

                                                    <div class="form-group">
                                                        <label for="finalidadeMeioContato" class="control-label">Finalidade</label><br>

                                                        <input type="radio" exibir="true" title="Finalidade" name="finalidadeMeioContato" id="finalidadeMeioContato" nomeCampo=".finalidade" tag="pessoaMeioContatos" value="P" descricao="Pessoal" /> Pessoal |
                                                        <input type="radio" name="finalidadeMeioContato"  id="finalidadeMeioContato" nomeCampo=".finalidade" tag="pessoaMeioContatos" value="C" descricao="Comercial" /> Comercial

                                                    </div>
                                                    <div class="form-group">
                                                        <label for="meioMeioContato" class="control-label">Meio de Contato</label><br>
                                                        <input class="form-control" exibir="true" title="E-Mail" id="meioMeioContato" nomeCampo=".email" tag="meioContato" />
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-default cancelar" data-dismiss="modal">Cancelar</button>
                                                    <button type="button" class="btn btn-primary salvar">Salvar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="gerenciar col-sm-6">
                                <div>
                                    <div class="panel panel-default">
                                        <div class="panel-heading">
                                            <h3 class="panel-title">Telefone(s)</h3>
                                        </div>
                                        <div class="panel-body">
                                            <div class="table-responsive text-center">
                                                <table class="table table-striped">
                                                    <thead></thead>
                                                    <tbody></tbody>
                                                    <tfoot></tfoot>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="panel-footer text-right">
                                            <button class="btn btn-success novo" type="button"> Incluir novo Telefone</button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="modal fade formulario" id="modalMeioContatoTelefone" tabindex="-1" role="dialog" aria-labelledby="Telefone" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                                    <h4 class="modal-title" id="myModalLabel">Meio de Contato</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <input type="hidden" id="classeMeioContato" nomeCampo=".@class" value="gov.emater.aterweb.model.MeioContatoTelefonico" tag="meioContato" />
                                                    <input type="hidden" id="meioContatoTipo" nomeCampo=".meioContatoTipo" value="TEL" tag="meioContato" />

                                                    <div class="form-group">
                                                        <label for="finalidadeMeioContato" class="control-label">Finalidade</label><br>

                                                        <input type="radio" exibir="true" title="Finalidade" name="finalidadeMeioContato" id="finalidadeMeioContato" nomeCampo=".finalidade" tag="pessoaMeioContatos" value="P" descricao="Pessoal" /> Pessoal |
                                                        <input type="radio" name="finalidadeMeioContato"  id="finalidadeMeioContato" nomeCampo=".finalidade" tag="pessoaMeioContatos" value="C" descricao="Comercial" /> Comercial
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="meioMeioContato" class="control-label">Meio de Contato</label><br>
                                                        <input class="form-control" exibir="true" title="Número" id="meioMeioContato" nomeCampo=".numero" tag="meioContato" />
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-default cancelar" data-dismiss="modal">Cancelar</button>
                                                    <button type="button" class="btn btn-primary salvar">Salvar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>

                </div>

                <div class="tab-pane fade" id="relacionamentos">
                    <div class="container col-sm-12"><br>
                        <div class="row">
                            <div class="gerenciar col-sm-12">
                                <div>
                                    <div class="panel panel-default">
                                        <div class="panel-heading">
                                            <h3 class="panel-title">Relacionamento(s)</h3>
                                        </div>
                                        <div class="panel-body">
                                            <div class="table-responsive text-center">
                                                <table class="table table-striped">
                                                    <thead></thead>
                                                    <tbody></tbody>
                                                    <tfoot></tfoot>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="panel-footer text-right">
                                            <button class="btn btn-success novo" type="button"> Incluir novo Relacionamento</button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="modal fade formulario" id="modalRelacionamento" editar="false" tabindex="-1" role="dialog" aria-labelledby="Relacionamento" aria-hidden="true">
                                        <div class="modal-dialog modal-lg">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                                    <h4 class="modal-title" id="myModalLabel">Relacionamento</h4>
                                                </div>
                                                <div class="modal-body">
                                                     <input type="hidden" id="classePessoaRelacionamento" nomeCampo=".@class" tag="pessoa" />
                                                    <div class="form-group">
                                                        <div class="col-sm-6">
                                                            <label for="tipoRelacionamento" class="control-label">Tipo</label><br>

                                                            <select class="form-control relacionamento_tipos" exibir="true" title="Tipo" id="idTipoRelacionamento" nomeCampo=".id"  tag="tipoRelacionamento">
                                                                    <!--GERADO POR JSON-->
                                                            </select>
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <label for="funcaoRelacionamento" class="control-label">Função</label><br>
                                                            <select class="form-control relacionamento_funcoes" exibir="true" title="Função" id="idFuncaoRelacionamento" nomeCampo=".id"  tag="funcaoRelacionamento">
                                                                <!--GERADO POR JSON-->
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix "></div>
                                                    <hr>
                                                    <div class="clearfix "></div>
                                                    <div class="form-group col-sm-8">
                                                        <label for="nomeRelacionamento" class="control-label">Nome</label><br>
                                                        <input class="form-control"  type="text" id="nomeRelacionamento" exibir="true" title="Nome" nomeCampo=".nome" tag="pessoaRelacionamento" />
                                                    </div>
                                                    <div class="form-group col-sm-3">
                                                        <label for="nomeRelacionamento" class="control-label">CPF</label><br>
                                                        <input class="form-control cpf" type="text"  id="cpfRelacionamento" exibir="true" title="CPF/CNPJ" nomeCampo=".cpfCnpj" tag="pessoaRelacionamento" />
                                                    </div>
                                                    <div class="form-group com-sm-1">
                                                        <label class="control-label">&nbsp;</label><br>
                                                        <button class="btn btn-default" type="button" id="buscarRelacionamento"><span class="glyphicon glyphicon-search"></span>&nbsp;</button>
                                                    </div>
                                                    <div class="clearfix "></div>
                                                    <div class="form-group col-sm-12">
                                                        <label for="nomeRelacionamento" class="control-label">Pessoas encontradas</label><br>
                                                        <select size="5" style="width:100%;" resetar="true"  id="pessoaRelacionamento" nomeCampo=".id" tag="pessoa">
                                                            <option>Informe o nome e/ou cpf para pesquisa</option>
                                                        </select>
                                                    </div>
                                                    <div class="clearfix "></div>
                                                    
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-default cancelar" data-dismiss="modal">Cancelar</button>
                                                    <button type="button" class="btn btn-primary salvar">Salvar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>





                    </div>

                </div>

                <div class="tab-pane fade" id="documentos">
                    <div class="container col-sm-12"><br>
                        <div class="row">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title">DAP - Declaração de Aptidão ao PRONAF</h3>
                                </div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="form-group col-sm-3">
                                            <label for="dapRegistro" class="control-label">Registro</label>
                                            <input class="form-control" maxlength="30" id="dapRegistro" name="dapRegistro" placeholder="Registro" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title">NIS - Número de Identificação Social </h3>
                                </div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="form-group col-sm-3">
                                            <label for="nisNumero" class="control-label">Número</label>
                                            <input class="form-control nis" id="nisNumero" name="nisNumero" placeholder="Número" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title">RG - Registro Geral</h3>
                                </div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="form-group col-sm-3">
                                            <label for="rgNumero" class="control-label">Registro</label>
                                            <input class="form-control" id="rgNumero" name="rgNumero" placeholder="Registro" />
                                        </div>
                                        <div class="form-group col-sm-3">
                                            <label for="rgOrgaoEmissor" class="control-label">Órgão Emissor</label>
                                            <input class="form-control numero" id="rgOrgaoEmissor" name="rgOrgaoEmissor" placeholder="Órgão Emissor" />
                                        </div>
<!-- Jean problemas aqui tb
                                        <div class="form-group col-sm-3">
                                            <label for="rgLocalizacao" class="control-label">Local de Emissão</label>
                                            <input class="form-control" id="rgLocalizacao" name="rgLocalizacao" placeholder="Local de Emissão" />
                                        </div>
 -->
                                        <div class="form-group col-sm-3">
                                            <label for="rgDataEmissao" class="control-label">Data de Emissão</label>
                                            <input class="form-control data" id="rgDataEmissao" name="rgDataEmissao" placeholder="Data de Emissão" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title">Título de Eleitor</h3>
                                </div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="form-group col-sm-3">
                                            <label for="tituloNumero" class="control-label">Número</label>
                                            <input class="form-control numero" id="tituloNumero" name="tituloNumero" placeholder="Número" />
                                        </div>
                                        <div class="form-group col-sm-3">
                                            <label for="tituloSecao" class="control-label">Seção</label>
                                            <input class="form-control numero" id="tituloSecao" name="tituloSecao" placeholder="Seção" />
                                        </div>
                                        <div class="form-group col-sm-3">
                                            <label for="tituloZona" class="control-label">Zona</label>
                                            <input class="form-control" id="tituloZona" name="tituloZona" placeholder="Zona" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title">CNH - Carteira Nacional de Habilitação</h3>
                                </div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="form-group col-sm-3">
                                            <label for="cnhCategoria" class="control-label">Categoria</label>
                                            <select class="form-control" id="cnhCategoria" name="cnhCategoria">
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="AB">AB</option>
                                                <option value="C">C</option>
                                                <option value="D">D</option>
                                                <option value="E">E</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-sm-3">
                                            <label for="cnhNumero" class="control-label">Número</label>
                                            <input class="form-control" id="cnhNumero" name="cnhNumero" placeholder="Número" />
                                        </div>
                                        <div class="form-group col-sm-3">
                                            <label for="cnhPrimeiraHabilitacao" class="control-label">Primeira Habilitação</label>
                                            <input class="form-control data" id="cnhPrimeiraHabilitacao" name="cnhPrimeiraHabilitacao" placeholder="00/00/0000" />
                                        </div>
                                        <div class="form-group col-sm-3">
                                            <label for="cnhValidade" class="control-label">Validade</label>
                                            <input class="form-control data" id="cnhValidade" name="cnhValidade" placeholder="00/00/0000" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title">Certidão de Casamento</h3>
                                </div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="form-group col-sm-3">
                                            <label for="certidaoCasamentoCartorio" class="control-label">Cartório</label>
                                            <input class="form-control" id="certidaoCasamentoCartorio" name="certidaoCasamentoCartorio" placeholder="Cartório" />
                                        </div>
                                        <div class="form-group col-sm-3">
                                            <label for="certidaoCasamentoFolha" class="control-label">Folha</label>
                                            <input class="form-control numero" id="certidaoCasamentoFolha" name="certidaoCasamentoFolha" placeholder="Folha" />
                                        </div>
                                        <div class="form-group col-sm-3">
                                            <label for="certidaoCasamentoLivro" class="control-label">Livro</label>
                                            <input class="form-control numero" id="certidaoCasamentoLivro" name="certidaoCasamentoLivro" placeholder="Livro" />
                                        </div>
                                        <div class="form-group col-sm-3">
                                            <label for="certidaoCasamentoRegime" class="control-label">Regime</label>
                                            <select class="form-control" id="certidaoCasamentoRegime" name="certidaoCasamentoRegime">
                                                <option value="P">Comunhão Parcial de Bens</option>
                                                <option value="U">Comunhão Universal de Bens</option>
                                                <option value="S">Separação Total de Bens</option>
                                                <option value="A">Participação Final nos Aquestos</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title">CAM - Certidão de Alistamento Militar</h3>
                                </div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="form-group col-sm-3">
                                            <label for="camNumero" class="control-label">Número</label>
                                            <input class="form-control numero" id="camNumero" name="camNumero" placeholder="Número" />
                                        </div>
                                        <div class="form-group col-sm-3">
                                            <label for="camOrgao" class="control-label">Órgão</label>
                                            <select class="form-control" id="camOrgao" name="camOrgao">
                                                <option value="M">Marinha</option>
                                                <option value="E">Exercito</option>
                                                <option value="A">Aeronautica</option>
                                                <option value="D">Ministerio da Defesa</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-sm-3">
                                            <label for="camSerie" class="control-label">Série</label>
                                            <input class="form-control numero" id="camSerie" name="camSerie" placeholder="Série" />
                                        </div>
                                        <div class="form-group col-sm-3">
                                            <label for="camUnidadeMilitar" class="control-label">Unidade Militar</label>
                                            <input class="form-control" id="camUnidadeMilitar" name="camUnidadeMilitar" placeholder="Unidade Militar" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="publico">
                    <div class="container col-sm-12"><br>
                        <div class="row">
                            <div class="form-group col-sm-3">
                                <label for="setor" class="control-label">Setor</label>
                                <!--<select class="form-control setores" id="setor" name=".setor" tag="publicoAlvo">
                                        -GERADO POR JSON-
                                </select>-->
                            </div>
                            <div class="form-group col-sm-3">
                                <label for="categoria" class="control-label">Categoria</label>
                                <select class="form-control" id="categoria" name=".categoria" tag="publicoAlvo">
                                    <option value="E">Empreendedor</option>
                                    <option value="H">Habitante</option>
                                    <option value="T">Trabalhador</option>
                                </select>
                            </div>
                            <div class="form-group col-sm-3">
                                <label for="segmento" class="control-label">Segmento</label>
                                <select class="form-control" id="segmento" name=".segmento" tag="publicoAlvo">
                                    <option value="P">Patronal</option>
                                    <option value="F">Familiar</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-sm-3">
                                <label for="organizacao" class="control-label">Organização</label>
                                <select class="form-control organizacoes" id="organizacao" name=".organizacao" tag="publicoAlvo">
                                    <!--GERADO POR JSON-->
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-sm-3">
                                <label for="geracao" class="control-label">Geração</label>
                                <div>
                                    Muito velho, beira da morte.
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-sm-3">
                                <label for="atividades" class="control-label">Principais atividades produtivas</label>
                                <input class="form-control" id="atividades" name=".atividades" tag="publicoAlvo" />
                            </div>
                            <div class="form-group col-sm-3">
                                <label for="tradicao" class="control-label">Tradição</label>
                                <select class="form-control tradicao" id="tradicao" name=".tradicao" tag="publicoAlvo">
                                    <!--GERADO POR JSON-->
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-sm-3">
                                <label for="carteira" class="control-label">Carteira do Produtor</label>
                                <div>
                                    30/01/2011
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-sm-3">

                                <label for="profissao" class="control-label">Profissão</label>
                                <select class="form-control" id="profissao" name=".profissao" tag="publicoAlvo">
                                    <option>Agropecuarista</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
<script src="https://maps.googleapis.com/maps/api/js?v=3.9&sensor=false"></script>

<script src="<spring:url value='resources/js/libs/jquery-ui.custom.js'/>"></script>
<script src="<spring:url value='resources/js/libs/jquery.cookie.js'/>"></script>
<script src="<spring:url value='resources/js/libs/jquery.dynatree/jquery.dynatree.min.js'/>"></script>
<script>
$("#pessoaGrupoTree").dynatree({
    autoFocus: true,
    selectMode: 3,
    checkbox: true,
    minExpandLevel: 2,
    classNames: {checkbox: "dynatree-checkbox"},
    onActivate: function(node) {
        $scope.selecionado = node.data.valor;
        $scope.$digest();
    }
});
</script>
