package gov.emater.aterweb.service;

import gov.emater.aterweb.dao._ChavePrimaria;
import gov.emater.aterweb.mvc.dto.Dto;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface CrudService<E extends _ChavePrimaria<CP>, CP extends Serializable> extends Service {

	public E create(E e);

	public void delete(E e);

	public void deleteById(CP id);

	public E restore(CP id);

	public List<E> restoreAll();

	public List<?> restoreByParams(Map<String, Object> params);

	public E update(E e);

	public E save(E e);

	public List<?> detalhar(Integer id);

	public List<?> filtrarByDto(Dto filtro);

}