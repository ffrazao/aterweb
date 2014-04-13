package gov.emater.aterweb.service.impl;

import gov.emater.aterweb.dao._ChavePrimaria;
import gov.emater.aterweb.dao._CrudDao;
import gov.emater.aterweb.mvc.dto.Dto;
import gov.emater.aterweb.service.CrudService;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public abstract class CrudServiceImpl<E extends _ChavePrimaria<CP>, CP extends Serializable, D extends _CrudDao<E, CP>> implements CrudService<E, CP> {

    protected static final String LISTA_ALTERADO = "alterado";

    protected static final String LISTA_INSERIDO = "novo";

    protected static final String LISTA_REMOVIDO = "removido";

    private D dao;

    public CrudServiceImpl(D dao) {
	this.dao = dao;
    }

    @Override
    @Transactional
    public E create(E t) {
	return getDao().create(t);
    }

    @Override
    @Transactional
    public void delete(E t) {
	getDao().delete(t);
    }

    @Override
    @Transactional
    public void deleteById(CP id) {
	getDao().delete(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<?> detalhar(Integer id) {
	throw new java.lang.AbstractMethodError("O método List<?> detalhar(Integer id) deve ser implementado");
    }

    @Override
    @Transactional(readOnly = true)
    public List<?> filtrarByDto(Dto filtro) {
	throw new java.lang.AbstractMethodError("O método List<?> filtrarByDto(Dto filtro) deve ser implementado");
    }

    public D getDao() {
	return dao;
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @Transactional
    protected Map<String, List> getModificacoes(List novos, List existentes) {

	Map<String, List> result = new HashMap<String, List>();
	List<_ChavePrimaria<Integer>> novo = new ArrayList<_ChavePrimaria<Integer>>();
	List<_ChavePrimaria<Integer>> alterado = new ArrayList<_ChavePrimaria<Integer>>();
	List<_ChavePrimaria<Integer>> removido = new ArrayList<_ChavePrimaria<Integer>>();

	// identificar novos e alterados
	if (novos != null) {
	    for (Object obj : novos) {
		_ChavePrimaria<Integer> linha = (_ChavePrimaria<Integer>) obj;
		if (linha.getId() == null) {
		    novo.add(linha);
		} else {
		    alterado.add(linha);
		}
	    }
	}
	// identificar exclusões
	if (existentes != null) {
	    for (Object objectExistente : existentes) {
		_ChavePrimaria<Integer> linhaExistente = (_ChavePrimaria<Integer>) objectExistente;
		boolean existe = false;
		for (Object objectNovo : novos) {
		    _ChavePrimaria<Integer> linhaNovo = (_ChavePrimaria<Integer>) objectNovo;
		    if (linhaNovo.getId() != null && linhaNovo.getId().equals(linhaExistente.getId())) {
			existe = true;
			break;
		    }
		}
		if (!existe) {
		    removido.add(linhaExistente);
		}
	    }
	}

	result.put(LISTA_INSERIDO, novo);
	result.put(LISTA_ALTERADO, alterado);
	result.put(LISTA_REMOVIDO, removido);

	return result;
    }

    protected boolean isEmpty(String str) {
	if ((!isNull(str)) && str.trim().length() <= 0)
	    return true;
	else
	    return false;
    }

    protected boolean isNull(Object obj) {
	if (obj == null) {
	    return true;
	} else {
	    return false;
	}
    }

    @Override
    @Transactional(readOnly = true)
    public E restore(CP id) {
	return getDao().restore(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<E> restoreAll() {
	return getDao().restore();
    }

    @Override
    @Transactional(readOnly = true)
    public List<?> restoreByParams(Map<String, Object> params) {
	return getDao().restore(params);
    }

    @Override
    @Transactional
    public E save(E t) {
	return getDao().save(t);
    }

    @Override
    @Transactional
    public E update(E t) {
	return getDao().update(t);
    }
}