package gov.emater.aterweb.mvc.controller;

import gov.emater.aterweb.dao._ChavePrimaria;
import gov.emater.aterweb.model.EntidadeBase;
import gov.emater.aterweb.mvc.JsonResponse;
import gov.emater.aterweb.mvc.dto.Dto;
import gov.emater.aterweb.service.CrudService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.validation.BindingResult;

/**
 * Modelo de auxílio aos demais controllers
 * 
 */
public abstract class _BaseController {

    private static final Logger logger = Logger.getLogger(_BaseController.class);

    @SuppressWarnings("rawtypes")
    private CrudService service;

    @SuppressWarnings("rawtypes")
    public _BaseController(CrudService service) {
	this.service = service;
    }

    public String abrir() {
	if (logger.isDebugEnabled()) {
	    logger.debug("Abrindo - " + getTitulo());
	}
	abrirInterno();
	return getPagina() + "/" + getTitulo();
    }

    protected void abrirInterno() {
    }

    public JsonResponse detalhar(Integer id) {
	if (logger.isDebugEnabled()) {
	    logger.debug(String.format("[%s] detalhando o id [%d]", getPagina(), id));
	}
	JsonResponse result = null;
	try {
	    List<?> detalhe = getService().detalhar(id);
	    result = new JsonResponse(true, "Sucesso", detalhe);
	} catch (Exception e) {
	    result = new JsonResponse(false, e.getMessage(), e);
	    e.printStackTrace();
	}
	return result;
    }

    @SuppressWarnings("unchecked")
    public JsonResponse excluir(Integer id) {
	if (logger.isDebugEnabled()) {
	    logger.debug(String.format("[%s] excluindo o id [%d]", getPagina(), id));
	}
	JsonResponse result = null;
	try {
	    getService().deleteById(id);
	    result = new JsonResponse(true, "Sucesso");
	} catch (Exception e) {
	    result = new JsonResponse(false, e.getMessage(), e);
	    e.printStackTrace();
	}
	return result;
    }

    public JsonResponse filtrar(Dto filtro, BindingResult bindingResult) {
	if (logger.isDebugEnabled()) {
	    logger.debug(String.format("[%s] filtrando o dto [%s]", getPagina(), filtro));
	}
	JsonResponse result = null;
	try {
	    List<?> lista = getService().filtrarByDto(filtro);
	    result = new JsonResponse(true, "Sucesso", lista);
	} catch (Exception e) {
	    result = new JsonResponse(false, e.getMessage(), e);
	    e.printStackTrace();
	}
	return result;
    }

    protected abstract String getPagina();

    @SuppressWarnings("rawtypes")
    protected CrudService getService() {
	return this.service;
    }

    protected abstract String getTitulo();

    public String popup(Integer id, Map<String, Object> map) {
	if (logger.isDebugEnabled()) {
	    logger.debug("Abrindo popup " + getTitulo());
	}
	popupInterno(id, map);
	return getPagina() + "-pop/" + getTitulo();
    }

    // map.put(VAR_REGISTRO, getService().restore(id));
    protected abstract void popupInterno(Integer id, Map<String, Object> map);

    public JsonResponse preparar() {
	if (logger.isDebugEnabled()) {
	    logger.debug("Preparando - " + getTitulo());
	}

	JsonResponse result = null;

	Map<String, Object> variaveis = new HashMap<String, Object>();
	prepararInterno(variaveis);

	result = new JsonResponse(true, "Sucesso", variaveis);

	return result;
    }

    // variaveis.put(VAR_FILTRO, new PessoaCadFiltroDto());
    // variaveis.put(VAR_LISTA, new ArrayList<Object>());
    // variaveis.put(VAR_REGISTRO, new Object());
    protected abstract void prepararInterno(Map<String, Object> variaveis);

    public JsonResponse restaurar(Integer id) {
	if (logger.isDebugEnabled()) {
	    logger.debug(String.format("[%s] restaurando o id [%d]", getPagina(), id));
	}
	JsonResponse result = null;
	try {
	    EntidadeBase entidade = restaurarInterno(id);
	    if (entidade != null) {
		result = new JsonResponse(true, "Sucesso", entidade);
	    } else {
		result = new JsonResponse(true, "Nenhum registro encontrado");
	    }
	} catch (Exception e) {
	    result = new JsonResponse(false, e.getMessage(), e);
	    e.printStackTrace();
	}
	return result;
    }

    // Pessoa pessoa = id == null ? new PessoaFisica() :
    // getService().restore(id);
    protected abstract EntidadeBase restaurarInterno(Integer id);

    @SuppressWarnings("unchecked")
    public JsonResponse salvar(EntidadeBase entity, BindingResult bindingResult) {
	if (logger.isDebugEnabled()) {
	    logger.debug(String.format("[%s] salvando a entidade [%s]", getPagina(), entity));
	}
	JsonResponse result = null;
	try {
	    if (bindingResult.hasErrors()) {
		result = new JsonResponse(false, "Erros", bindingResult.getAllErrors());
	    } else {
		result = new JsonResponse(true, "Sucesso", getService().save((_ChavePrimaria<Integer>) entity));
	    }
	} catch (Exception e) {
	    result = new JsonResponse(false, e.getMessage(), e);
	    e.printStackTrace();
	}
	return result;
    }
}