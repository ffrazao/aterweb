<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<style>
    input[type='checkbox'],input[type='radio'] {
	   height: 18px;
	   width: 18px;
    }
    #map-canvas {
        height: 300px;
        margin: 0px;
        padding: 0px
    }
    .borda_div_mapa {
        border: 2px solid #DDD;
    }
    #div_mapa {
        padding: 5px;
        background-color: #444;
    }
    .div_mapa_full {
        position: fixed;
        
        top: 1px;
        bottom: 35px;
        left: 1px;
        right: 10px;
        
        z-index: 999999;
    }
    .meus-arquivos-grade-miniatura {
        float: left;
        
        border: 0;
        box-shadow: 0;
        
        height: 140px;
        margin-bottom: 50px;
    }
    
    .meus-arquivos-grade-imagem {
        width: 100%;
        height: 100%;
        border: 1px solid #EEE;
        box-shadow: 0 0 4px #EEE;
                
        margin: 2px;
        padding: 2px;
        
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
    }
    .meus-arquivos-grade-imagem:hover {
        box-shadow: 0 0 5px #666;
    }
    .meus-arquivos-grade-texto {
        font-size: 11px; 
        text-align: center; 
        text-overflow: ellipsis; 
        overflow:hidden; 
        white-space:nowrap;
        display: block;
        
        line-height: 20px;
    }
    
    .meus-arquivos-lista-miniatura {
        height: 100px;
        
        border: 1px solid #EEE;
        box-shadow: 0 0 4px #EEE;
        margin: 2px 0 2px 0;
    }
    
    .meus-arquivos-lista-miniatura:hover {
        box-shadow: 0 0 5px #666;
    }
    
    .meus-arquivos-lista-imagem {
        width: 10%;
        height: 100%;
        float:left;
                
        margin: 0 10px 0 0;
        padding: 2px;
        
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
    }
    
    .meus-arquivos-lista-texto {
        font-size: 11px; 
        float:left;
        text-align: center; 
        text-overflow: ellipsis; 
        overflow:hidden; 
        white-space:nowrap;
        
        line-height: 100px;
    }
</style>
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true"></script>
<script src="resources/js/libs/jquery.inputmask.js"></script>
<form id="form_propriedade" action="pessoa-cad" method="POST">
	<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
    <input type="hidden" class="form-control" id="inputId" name="id" placeholder="Id" />
<div class="col-sm-8">
    <div class="row">
        <div class="col-sm-12">
            <div class="row">
                <div class="form-group col-sm-12">
                    <label for="inputNome" class="control-label">Nome da Propriedade</label>
                    <input class="form-control" id="inputNome" name="nome" placeholder="Nome da Propriedade" />
                </div>
            </div>
            
            <div class="row">
                
                   
                        <input type="hidden" id="classeMeioContato" nomeCampo=".@class" value="gov.emater.aterweb.model.MeioContatoEndereco" tag="meioContato" />
                        <input type="hidden" id="meioContatoTipo" nomeCampo=".meioContatoTipo" value="END" tag="meioContato" />

                        <div class="clearfix "></div>
                        <div class="form-group">
                            <div class="col-sm-2">
                                <label for="cepEndereco" class="control-label">CEP</label><br>
                                <input class="form-control cep" exibir="true" title="CEP" id="cepEndereco" nomeCampo=".cep"  tag="meioContatoEndereco" />
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
                        <div class="clearfix "><br/></div>
                        <div class="form-group col-sm-12">
                            <label for="localEndereco" class="control-label">Endereço</label><br>
                            <input class="form-control" exibir="true" title="Endereço" id="localEndereco" nomeCampo=".descricao" tag="meioContatoEndereco" />
                        </div>
                        <div class="form-group itensPropriedadeRural">

                            <div class="col-sm-4 subItensPropriedadeRural">
                                <label for="comuEndereco" class="control-label">Comunidade</label><br>
                                <!--input type="hidden" id="idLocalizacaosComunidade" nomeCampo=".idCom" tag="propriedadeRuralLocalizacaos" /-->
                                <select class="form-control comunidades" exibir="true" title="Comunidade" id="comuEndereco" nomeCampo=".comunidades" tag="propriedadeRuralLocalizacaos" multiple>
                                    <!--GERADO POR JSON-->
                                </select>
                            </div>

                            <div class="col-sm-4 subItensPropriedadeRural">
                                <label for="baciaEndereco" class="control-label">Bacia</label><br>
                                <!--input type="hidden" id="idLocalizacaosBacia" nomeCampo=".idBac" tag="propriedadeRuralLocalizacaos" /-->
                                <select class="form-control bacias" exibir="true" title="Bacia" id="baciaEndereco" nomeCampo=".bacias" tag="propriedadeRuralLocalizacaos" multiple>
                                    <!--GERADO POR JSON-->
                                </select>
                            </div>
                        </div>
                <br />
            </div>
            
            <!--div class="row">
                <div class="form-group col-sm-3">
                    <label for="inputCEP" class="control-label">CEP</label>
                    <input class="form-control" id="inputCEP" tag="meioContatoEndereco" name=".cep" placeholder="CEP" />
                </div>
                <div class="form-group col-sm-9">
                    <label for="inputEndereco" class="control-label">Endereço</label>
                    <input class="form-control" id="inputEndereco" tag="meioContatoEndereco" name=".descricao" placeholder="Endereço" />
                </div>
            </div-->

            <div class="row">
                <!--div class="form-group col-sm-3">
                    <label for="inputComunidade" class="control-label">Comunidade</label>
                    <input class="form-control" id="inputComunidade" name="comunidade" placeholder="Comunidade" />
                </div-->
                <!--div class="form-group col-sm-3">
                    <label for="inputRA" class="control-label">RA / Município-UF</label>
                    <select class="form-control" id="inputRA" tag="localizacao" name=".id">
                        <option>Selecione...</option>
                    </select>
                </div-->
            </div>
            <br />
            <div class="row">
                <div class="form-group col-sm-3">
                    <label for="inputLatitude" class="control-label">Latitude</label>
                    <input class="form-control" id="inputLatitude" tag="meioContatoEndereco" name=".latitude" placeholder="Latitude" />
                </div>
                <div class="form-group col-sm-3">
                    <label for="inputLongitude" class="control-label">Longitude</label>
                    <input class="form-control" id="inputLongitude" tag="meioContatoEndereco" name=".longitude" placeholder="Longitude" />
                </div>
            </div>
        
        </div>    
    </div>
    
    <div class="row">
        <div class="form-group col-sm-3">
            <label for="inputRegistro" class="control-label">Número do Registro</label>
            <input class="form-control" id="inputRegistro" name="numeroRegistro" placeholder="Reg. Núm., LV., FL., Matrícula" />
        </div>
        <div class="form-group col-sm-3">
            <label for="inputDataRegistro" class="control-label">Data de Registro</label>
            <input class="form-control data" id="inputDataRegistro" placeholder="01/01/2000" />
        </div>
    </div>
    
    <!--div class="row">
        <div class="form-group col-sm-3">
            <label for="inputBacia" class="control-label">Bacia Hidrográfica</label>
            <input class="form-control" id="inputBacia" placeholder="Bacia Hidrográfica" />
        </div>
    </div-->
    
    
    <div class="row">
        <div class="form-group col-sm-3">
            <label for="inputSistemaProducao" class="control-label">Sistema de Produção</label>
            <select class="form-control" id="inputSistemaProducao">
                <option>Selecione...</option>
            </select>
        </div>
    </div>
    
    
    <div class="row">
        <div class="form-group col-sm-3">
            <label for="inputOutorga" class="control-label">Outorga</label>
            <select id="selectOutorga" name="outorga" class="form-control">
                <option>Selecione...</option>
                <option value='S'>Sim</option>
                <option value='N'>Não</option>
            </select>
        </div>
        <div class="form-group col-sm-3">
            <label for="inputNumOutorga" class="control-label">Número da Outorga</label>
            <input class="form-control" id="inputNumOutorga" name="outorgaNumero" placeholder="Número da Outorga" />
        </div>
        <div class="form-group col-sm-3">
            <label for="inputValidadeOutorga" class="control-label">Data de Validade</label>
            <input class="form-control data" id="inputValidadeOutorga" name="outorgaValidade" placeholder="Data de Validade" />
        </div>
    </div>
    
    <div class="row">
        <div class="form-group col-sm-4">
            <label for="inputFonteAguaPrincipal" class="control-label">Fonte d'água principal</label>
            <!--input class="form-control" id="inputFonteAguaPrincipal" placeholder="Fonte d'água principal" /-->
            <select id="selectFonteAguaPrincipal" name="fonteAguaPrincipal" class="form-control">
                <option>Selecione...</option>
                <option value="CA">Canal</option>
                <option value="CO">Córrego / Rio</option>
                <option value="LA">Lago / Lagoa</option>
                <option value="NA">Nascente</option>
                <option value="PR">Poço Raso (< 30M)</option>
                <option value="PT">Poço Tubular</option>
                <option value="OU">Outras</option>
            </select>
        </div>
        <div class="form-group col-sm-2">
            <label for="inputVazaoPrincipal" class="control-label">Vazão</label>
            <input class="form-control" id="inputVazaoPrincipal" name="fonteAguaPrincipalVazao" placeholder="0000" />
        </div>
    </div>
    <div class="row">
        <div class="form-group col-sm-4">
            <label for="inputFonteAguaDomestica" class="control-label">Fonte d'água doméstica</label>
            <!--input class="form-control" id="inputFonteAguaDomestica" placeholder="Fonte d'água doméstica" /-->
            <select id="selectFonteAguaDomestica" name="fonteAguaDomestica" class="form-control">
                <option>Selecione...</option>
                <option value="CA">Canal</option>
                <option value="CO">Córrego / Rio</option>
                <option value="LA">Lago / Lagoa</option>
                <option value="NA">Nascente</option>
                <option value="PR">Poço Raso (< 30M)</option>
                <option value="PT">Poço Tubular</option>
                <option value="OU">Outras</option>
            </select>
        </div>
        <div class="form-group col-sm-2">
            <label for="inputVazaoDomestica" class="control-label">Vazão</label>
            <input class="form-control" id="inputVazaoDomestica" name="fonteAguaDomesticaVazao" placeholder="0000" />
        </div>
    </div>
</div>
    <div id="div_mapa" class="col-sm-4"><div id="map-canvas"></div>
        <button id="div_mapa_acao" class="btn btn-primary" style="margin-top: 5px;" type="button">Expandir Mapa</button>        
        <br /><br />
        
        <div>
            <center><h3 style="color: #FFF;">Galeria de imagens</h3></center>
            <div id="galeria" class="owl-carousel">
            </div>
            <br />
            <button type="button" id="arquivos_enviar" class="btn btn-primary" data-toggle="modal" data-target="#modalUpload">Enviar Arquivos</button>
            <button type="button" id="arquivos_meus" class="btn btn-info" data-toggle="modal" data-target="#modalUpload">Ver Meus Arquivos</button>
        </div>
    </div>

<div class="row"></div>
    <h3>Detalhes da Propriedade</h3>
    <div class="row">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#solo" data-toggle="tab">Uso do Solo</a></li>
          <li><a href="#pastagens" data-toggle="tab">Pastagens</a></li>
          <li><a href="#areasIrrigadas" data-toggle="tab">Áreas Irrigadas</a></li>
            <li><a href="#pessoas" data-toggle="tab">Pessoas</a></li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content">
            <div class="tab-pane fade in active" id="solo">
                <div class="container">
                    <div class="table-responsive col-sm-12">
                        <table class="table">
                            <thead>
                                <tr>
                                    <td></td>
                                    <td>Área</td>
                                    <td>Valor Unitário</td>
                                    <td>Valor Total</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Culturas Perenes</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputUsoSoloCulturasPerenesArea" name="usoSoloCulturaPereneHa" type="text" class="form-control">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <span class="input-group-addon">R$</span>
                                            <input id="inputUsoSoloCulturasPerenesUnitario" name="usoSoloCulturaPereneVlUnit" type="text" class="form-control moeda">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <span class="input-group-addon">R$</span>
                                            <input id="inputUsoSoloCulturasPerenesTotal" disabled name="usoSoloCulturaPereneVlTot" type="text" class="form-control moeda">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Culturas Temporárias</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputUsoSoloCulturasTermporarias" name="usoSoloCulturaTemporariaHa" type="text" class="form-control">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <span class="input-group-addon">R$</span>
                                            <input id="inputUsoSoloCulturasTermporariasUnitario" name="usoSoloCulturaTemporariaVlUnit" type="text" class="form-control moeda">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <span class="input-group-addon">R$</span>
                                            <input id="inputUsoSoloCulturasTermporariasTotal" disabled name="usoSoloCulturaTemporariaVlTot" type="text" class="form-control moeda">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Pastagens</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputUsoSoloPastagens" name="usoSoloPastagemHa" type="text" class="form-control moeda">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <span class="input-group-addon">R$</span>
                                            <input id="inputUsoSoloPastagensUnitario" name="usoSoloPastagemVlUnit" type="text" class="form-control moeda">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <span class="input-group-addon">R$</span>
                                            <input id="inputUsoSoloPastagensTotal" disabled name="usoSoloPastagemVlTot" type="text" class="form-control moeda">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Benfeitorias</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputUsoSoloBenfeitoria" name="usoSoloBenfeitoriaHa" type="text" class="form-control">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <span class="input-group-addon">R$</span>
                                            <input id="inputUsoSoloBenfeitoriaUnitario" name="usoSoloBenfeitoriaVlUnit" type="text" class="form-control moeda">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <span class="input-group-addon">R$</span>
                                            <input id="inputUsoSoloBenfeitoriaTotal" disabled name="usoSoloBenfeitoriaVlTot" type="text" class="form-control moeda">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Reserva Legal</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputUsoSoloReservaLegal" name="usoSoloReservaLegalHa" type="text" class="form-control">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <span class="input-group-addon">R$</span>
                                            <input id="inputUsoSoloReservaLegalUnitario" name="usoSoloReservaLegalVlUnit" type="text" class="form-control moeda">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <span class="input-group-addon">R$</span>
                                            <input id="inputUsoSoloReservaLegalTotal" disabled name="usoSoloReservaLegalVlTot" type="text" class="form-control moeda">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Preservação Permanente</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputUsoSoloReservaPermanente" name="usoSoloPreservPermanenteHa" type="text" class="form-control">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <span class="input-group-addon">R$</span>
                                            <input id="inputUsoSoloReservaPermanenteUnitario" name="usoSoloPreservPermanenteVlUnit" type="text" class="form-control moeda">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <span class="input-group-addon">R$</span>
                                            <input id="inputUsoSoloReservaPermanenteTotal" disabled name="usoSoloPreservPermanenteVlTot" type="text" class="form-control moeda">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Outras</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputUsoSoloOutras" name="usoSoloOutrasHa" type="text" class="form-control">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <span class="input-group-addon">R$</span>
                                            <input id="inputUsoSoloOutrasUnitario" name="usoSoloOutrasVlUnit" type="text" class="form-control moeda">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input-group">
                                            <span class="input-group-addon">R$</span>
                                            <input id="inputUsoSoloOutrasTotal" disabled name="usoSoloOutrasVlTot" type="text" class="form-control moeda">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Total</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputUsoSoloTotal" name="usoSoloTotalHa" type="hidden" class="form-control moeda">
                                            <input id="inputUsoSoloTotalB" type="text" disabled class="form-control moeda">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td>
                                        <div class="input-group">
                                            <span class="input-group-addon">R$</span>
                                            <input id="inputUsoSoloValorTotal" name="usoSoloTotalVlTot" type="hidden" class="form-control moeda">
                                            <input id="inputUsoSoloValorTotalB" disabled type="text" class="form-control moeda">
                                        </div>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
            <div class="tab-pane fade" id="pastagens">
                <div class="container">
                    <div class="table-responsive col-sm-12">
                        <table class="table">
                            <thead>
                                <tr>
                                    <td></td>
                                    <td>Área</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Área de Canavial</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputPastagemCanavial" name="pastagemCanavial" type="text" class="form-control">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Área de Capineira</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputPastagemCapineira" name="pastagemCapineira" type="text" class="form-control">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Área para Silagem</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputPastagemSilagem" name="pastagemSilagem" type="text" class="form-control">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Área para Feno</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputPastagemFeno" name="pastagemFeno" type="text" class="form-control">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Área de Pastagem Natural</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputPastagemPastagemNatural" name="pastagemNatural" type="text" class="form-control">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Área de Pastagem Artificial</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputPastagemPastagemArtificial" name="pastagemArtificial" type="text" class="form-control">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Área de Pastagem Rotacionada</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputPastagemPastagemRotacionada" name="pastagemRotacionada" type="text" class="form-control">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Área ILP/ILPF</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputPastagemILPILPF" name="pastagemIlpIlpf" type="text" class="form-control">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="areasIrrigadas">
                <div class="container">
                    <div class="table-responsive col-sm-12">
                        <table class="table">
                            <thead>
                                <tr>
                                    <td></td>
                                    <td>ha</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Aspersão Convencional</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputAreaIrrigadaAspersao" name="areaIrrigadaAspersao" type="text" class="form-control">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Auto-propelido</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputAreaIrrigadaAutoPropelido" name="areaIrrigadaAutoPropelido" type="text" class="form-control">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Pivô-central</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputAreaIrrigadaPivoCentral" name="areaIrrigadaPivoCentral" type="text" class="form-control">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Gotejamento</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputAreaIrrigadaGotejamento" name="areaIrrigadaGotejamento" type="text" class="form-control">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Micro-aspersão</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputAreaIrrigadaMicroAspersao" name="areaIrrigadaMicroAspersao" type="text" class="form-control">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Superfície</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputAreaIrrigadaSuperficie" name="areaIrrigadaSuperficie" type="text" class="form-control">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Outros</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputAreaIrrigadaOutros" name="areaIrrigadaOutros" type="text" class="form-control">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Total</strong></td>
                                    <td>
                                        <div class="input-group">
                                            <input id="inputAreaIrrigadaTotal" name="areaIrrigadaTotal" type="text" class="form-control">
                                            <span class="input-group-addon">ha</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="pessoas">
                <div class="container">
                    <div class="table-responsive col-sm-12">
                        pessoas
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>

<!-- Modal -->
<div class="modal fade" id="modalUpload" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" style="width: 90%; margin-top: 70px !important;">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel">Upload de Arquivos</h4>
      </div>
      <div class="modal-body">
        
  <div class="container">
    <!-- The file upload form used as target for the file upload widget -->
    <form id="fileupload" action="http://getin-estagi3:8080/aterweb/arquivo/subir" method="POST" enctype="multipart/form-data">
        <!-- Redirect browsers with JavaScript disabled to the origin page -->
        <noscript><input type="hidden" name="redirect" value="http://blueimp.github.io/jQuery-File-Upload/"></noscript>
        <!-- The fileupload-buttonbar contains buttons to add/delete files and start/cancel the upload -->
        <div class="row fileupload-buttonbar">
            <div class="col-lg-7">
                <!-- The fileinput-button span is used to style the file input field as button -->
                <span class="btn btn-success fileinput-button">
                    <i class="glyphicon glyphicon-plus"></i>
                    <span>Adicionar Arquivos...</span>
                    <input type="file" name="files[]" multiple>
                </span>
                <button type="submit" class="btn btn-primary start">
                    <i class="glyphicon glyphicon-upload"></i>
                    <span>Iniciar upload</span>
                </button>
                <button type="reset" class="btn btn-warning cancel">
                    <i class="glyphicon glyphicon-ban-circle"></i>
                    <span>Cancelar upload</span>
                </button>
                <!--button type="button" class="btn btn-danger delete">
                    <i class="glyphicon glyphicon-trash"></i>
                    <span>Deletar</span>
                </button-->
                <input type="checkbox" class="toggle">
                <!-- The global file processing state -->
                <span class="fileupload-process"></span>
            </div>
            <!-- The global progress state -->
            <div class="col-lg-5 fileupload-progress fade">
                <!-- The global progress bar -->
                <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar progress-bar-success" style="width:0%;"></div>
                </div>
                <!-- The extended global progress state -->
                <div class="progress-extended">&nbsp;</div>
            </div>
        </div>
        <!-- The table listing the files available for upload/download -->
        <table role="presentation" class="table table-striped"><tbody class="files"></tbody></table>
    </form>
    <br>
      <div id="listagemArquivos">
          <div>
              <div class="col-sm-8">
                  <button id="visualizacao_lista" class="btn"><span class="glyphicon glyphicon-list"></span></button>
                  <button id="visualizacao_grade" class="btn"><span class="glyphicon glyphicon-th-large"></span></button>
              </div>
              <div class="col-sm-4">
                  <button id="btn_arquivos_remover" class="btn btn-danger">Deletar Selecionado(s)</button>
              </div>
              <br /><br />
          </div>
          <div id="meus-arquivos">
          </div>
      </div>
  </div>
<!-- The blueimp Gallery widget -->
<div id="blueimp-gallery" class="blueimp-gallery blueimp-gallery-controls" data-filter=":even">
    <div class="slides"></div>
    <h3 class="title"></h3>
    <a class="prev">‹</a>
    <a class="next">›</a>
    <a class="close">×</a>
    <a class="play-pause"></a>
    <ol class="indicator"></ol>
</div>
          
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
        <!--button type="button" class="btn btn-primary">Save changes</button-->
      </div>
    </div>
  </div>
</div>
    
<div class="modal fade" id="modalGaleria" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" style="width: 90%; margin-top: 70px !important;">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel">Imagem <span id="galeria_imagem_nome"></span></h4>
      </div>
      <div class="modal-body">
          <div id="galeria_bg" style="width: 100%; height: 60%; background-size: contain; background-repeat: no-repeat; background-position:center;"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal">Fechar</button>
        <!--button type="button" class="btn btn-primary">Save changes</button-->
      </div>
    </div>
  </div>
</div>
<button type="button" id="btn_galeria" data-toggle="modal" data-target="#modalGaleria" style="display:none;"></button>
<script type="text/javascript">
var map;
var lat = 0;
var lon = 0;
    
$(document).on("change", "#inputLatitude, #inputLongitude", function() {
    lat = $("#inputLatitude").val();
    lon = $("#inputLongitude").val();
    
    if(lat != '') {
        initialize();
    }
});

function initialize() {
    if($("#inputLongitude").val() == '') {
        lat = '-15.732805';
        lon = '-47.903791';
    } else {
        lat = $("#inputLatitude").val();
        lon = $("#inputLongitude").val();
    }
    
    var posicao = new google.maps.LatLng(lat, lon);
    var mapOptions = {
        zoom: 15,
        center: posicao,
        panControl: true,
        zoomControl: true,
        scaleControl: true,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    map.setCenter(posicao);
    
    var marker = new google.maps.Marker({
        position: posicao,
        title:"Local Informado!",
        draggable: true
    });

    marker.setMap(map);
    
    google.maps.event.addDomListener(marker, "dragend", function() {
    var point = marker.getPosition();
    map.panTo(point);
   
    $("#inputLatitude").val(point.k)
    $("#inputLongitude").val(point.A)
});
}
//google.maps.event.addDomListener(window, 'load', initialize);

$(function(){
    $("#btn_ferramenta_incluir, #btn_ferramenta_editar").click(function(){
        setTimeout(function(){ initialize(); }, 500) //Dar tempo de carregar o form e passar a lat e lon para o gmaps
    });
    //$(".moeda").inputmask("999.999.999,99", { numericInput: true });
    //$(":input").inputmask();

    $(document).on('click', '.link', function(event){
        var $this = $(this);
        var link = 'url(http://getin-estagi3:8080/aterweb/' + $(this).children().attr('src')+')';
        console.log(link)
        var nome = $(this).children().attr('alt');
        $("#galeria_imagem_nome").text(nome)
        $("#galeria_bg").css('background-image', link);
        $('#btn_galeria').click();
    });
})

$("#div_mapa_acao").click(function(){
    mapa = $("#div_mapa");
    
    if($(this).text() == "Expandir Mapa") {
        expandirDivMapa(mapa);
    } else {
        diminuirDivMapa(mapa);
    }
});
function expandirDivMapa(mapa) {
    $(mapa).removeClass("col-sm-4");
    $(mapa).addClass("col-sm-12");
    $(mapa).addClass("borda_div_mapa");
    $(mapa).addClass("div_mapa_full");

    $("#map-canvas").attr("style", "height: 100%");
    
    $("#div_mapa_acao").text("Dimunuir Mapa");
    initialize();
}
    
function diminuirDivMapa(mapa) {
    $(mapa).removeClass("col-sm-12");
    $(mapa).addClass("col-sm-4");
    $(mapa).removeClass("borda_div_mapa");
    $(mapa).removeClass("div_mapa_full");
    
    $("#map-canvas").removeAttr("style", "height: 100%");
    
    $("#div_mapa_acao").text("Expandir Mapa");
    initialize();
}
    
    function calculaUsoSoloArea() {
        var total = 0;
        
        total = transformaMoedaRealParaFloat($("#inputUsoSoloCulturasPerenesArea").val()) + transformaMoedaRealParaFloat($("#inputUsoSoloCulturasTermporarias").val()) + transformaMoedaRealParaFloat($("#inputUsoSoloPastagens").val()) + transformaMoedaRealParaFloat($("#inputUsoSoloBenfeitoria").val()) + transformaMoedaRealParaFloat($("#inputUsoSoloReservaLegal").val()) + transformaMoedaRealParaFloat($("#inputUsoSoloReservaPermanente").val()) + transformaMoedaRealParaFloat($("#inputUsoSoloOutras").val());
        
        $("#inputUsoSoloTotal").val(total);
        $("#inputUsoSoloTotalB").val(total);
    }
    
    function calculaUsoSoloValorTotal() {
        var total = 0;
        
        total = transformaMoedaRealParaFloat($("#inputUsoSoloCulturasPerenesTotal").val()) + transformaMoedaRealParaFloat($("#inputUsoSoloCulturasTermporariasTotal").val()) + transformaMoedaRealParaFloat($("#inputUsoSoloPastagensTotal").val()) + transformaMoedaRealParaFloat($("#inputUsoSoloBenfeitoriaTotal").val()) + transformaMoedaRealParaFloat($("#inputUsoSoloReservaLegalTotal").val()) + transformaMoedaRealParaFloat($("#inputUsoSoloReservaPermanenteTotal").val()) + transformaMoedaRealParaFloat($("#inputUsoSoloOutrasTotal").val());
        
        $("#inputUsoSoloValorTotal").val(total);
        $("#inputUsoSoloValorTotalB").val(total);
    }
    
    $(document).on("keyup", "#inputUsoSoloCulturasPerenesTotal, #inputUsoSoloCulturasTermporariasTotal, #inputUsoSoloPastagensTotal, #inputUsoSoloBenfeitoriaTotal, #inputUsoSoloReservaLegalTotal, #inputUsoSoloReservaPermanenteTotal, #inputUsoSoloOutrasTotal", function(){
        calculaUsoSoloValorTotal();
    })
    
    $(document).on("keyup", "#inputUsoSoloCulturasPerenesArea, #inputUsoSoloCulturasTermporarias, #inputUsoSoloPastagens, #inputUsoSoloBenfeitoria, #inputUsoSoloReservaLegal, #inputUsoSoloReservaPermanente, #inputUsoSoloOutras", function(){
        calculaUsoSoloArea();
    })
    
</script>
 
       <script id="template-upload" type="text/x-tmpl">
{% for (var i=0, file; file=o.files[i]; i++) { %}
    <tr class="template-upload fade">
        <td>
            <span class="preview"></span>
        </td>
        <td>
            <p class="name">{%=file.name%}</p>
            <strong class="error text-danger"></strong>
        </td>
        <td>
            <p class="size">Processando...</p>
            <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="progress-bar progress-bar-success" style="width:0%;"></div></div>
        </td>
        <td>
            {% if (!i && !o.options.autoUpload) { %}
                <button class="btn btn-primary start" disabled>
                    <i class="glyphicon glyphicon-upload"></i>
                    <span>Iniciar</span>
                </button>
            {% } %}
            {% if (!i) { %}
                <button class="btn btn-warning cancel">
                    <i class="glyphicon glyphicon-ban-circle"></i>
                    <span>Cancelar</span>
                </button>
            {% } %}
        </td>
    </tr>
{% } %}
</script>
<!-- The template to display files available for download -->
<script id="template-download" type="text/x-tmpl">
{% for (var i=0, file; file=o.files[i]; i++) { %}
    <tr class="template-download fade">
        <td width='20%'>
            <span class="preview">
                {% if (file.thumbnailUrl) { %}
                    <a href="{%=file.url%}" title="{%=file.name%}" download="{%=file.thumbnailUrl%}" data-gallery><img src="{%=file.thumbnailUrl%}" width="40%"></a>
                {% } %}
            </span>
        </td>
        <td>
            <p class="name">
                {% if (file.url) { %}
                    <a href="{%=file.url%}" title="{%=file.name%}" download="{%=file.thumbnailUrl%}" {%=file.thumbnailUrl?'data-gallery':''%}>{%=file.name%}</a>
                {% } else { %}
                    <span>{%=file.name%}</span>
                {% } %}
            </p>
            {% if (file.error) { %}
                <div><span class="label label-danger">Error</span> {%=file.error%}</div>
            {% } %}
        </td>
        <td>
            <span class="size">{%=o.formatFileSize(file.size)%}</span>
        </td>
        
        <td>
            {% if (file.deleteUrl) { %}
                <!--button class="btn btn-danger delete" data-type="{%=file.deleteType%}" data-url="{%=file.deleteUrl%}"{% if (file.deleteWithCredentials) { %} data-xhr-fields='{"withCredentials":true}'{% } %}>
                    <i class="glyphicon glyphicon-trash"></i>
                    <span>Deletar</span>
                </button-->
                <input type="checkbox" name="delete" value="1" class="toggle">
            {% } else { %}
                <!--button class="btn btn-warning cancel">
                    <i class="glyphicon glyphicon-ban-circle"></i>
                    <span>Cancelar</span>
                </button-->
                <span class="label label-success">Salvo com sucesso!</span>
            {% } %}
        </td>
    </tr>
{% } %}
</script>    
    
</body> 
</html>