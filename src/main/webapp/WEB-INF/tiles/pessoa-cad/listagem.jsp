<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<style>
    .selecionado {
        background-color: #DDD !important;
    }
    table {
        cursor: pointer;
    }
</style>

<div class="col-sm-10">
    <table class="table table-bordered">
        <thead>
            <tr>
                <th width="10"></th>
                <th>Id</th>
                <th>Nome</th>
                <th>CPF / CNPJ</th>
            </tr>
        </thead>

        <tbody id="listagem">
            
        </tbody>

    </table>
</div>

<div class="col-sm-2">
    <div id="pessoa_visualizar" style="background-color:#DDD; text-align: center; padding: 4px; margin-left: -30px; bottom: 0; height: 500px;">
    Selecione uma pessoa!
    </div>
</div>