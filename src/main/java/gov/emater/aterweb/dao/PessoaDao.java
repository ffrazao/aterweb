package gov.emater.aterweb.dao;

import gov.emater.aterweb.model.Pessoa;
import gov.emater.aterweb.mvc.dto.PessoaCadFiltroDto;

import java.util.List;
import java.util.Map;

/**
 * Define os métodos exclusivos ao DAO de Pessoa
 * 
 * @author frazao
 * 
 */
public interface PessoaDao extends _CrudDao<Pessoa, Integer> {

	List<Map<String,Object>> restoreByDto(PessoaCadFiltroDto filtro);

}
