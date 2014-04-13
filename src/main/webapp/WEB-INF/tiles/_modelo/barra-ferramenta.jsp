<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    
<div class="col-md-7"></div>
<div class="btn-group" style="float: right; margin-top: 2px;">
    <button id="btn_ferramenta_executar" type="button" class="btn btn-primary" value="Executar" ng-click="filtrar()">Executar</button>
    <button id="btn_ferramenta_filtrar" type="button" class="btn btn-primary" value="Filtrar">Filtrar</button>
    
    <button type="button" class="btn btn-default" disabled style="border: none;">&nbsp;</button>
    
    <button id="btn_ferramenta_incluir" type="button" class="btn btn-success" value="Incluir">Incluir</button>
    <button id="btn_ferramenta_editar" type="button" class="btn btn-warning" value="Editar">Editar</button>
    <button id="btn_ferramenta_excluir" type="button" class="btn btn-danger" value="Excluir">Excluir</button>
    
    <button type="button" class="btn btn-default" disabled style="border: none;">&nbsp;</button>
    
    <button id="btn_ferramenta_salvar" type="button" class="btn btn-success" value="Salvar" ng-click="salvar()">Salvar</button>
    <button id="btn_ferramenta_cancelar" type="button" class="btn btn-danger" value="Cancelar">Cancelar</button>
    
    <div class="btn-group">
        <button id="btn_ferramenta_acoes" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
          Ações
        <span class="caret"></span>
        </button>
        <ul id="barra_ferramenta_acoes" class="dropdown-menu">
          <li><a id="">Ação 1</a></li>
          <li><a id="">Ação 2</a></li>
        </ul>
    </div>
      
    <button id="btn_ferramenta_exportar" type="button" class="btn btn-default" value="Exportar">Exportar</button>
</div>
<br /><br />