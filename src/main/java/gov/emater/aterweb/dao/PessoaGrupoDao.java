package gov.emater.aterweb.dao;

import gov.emater.aterweb.model.PessoaGrupo;
import gov.emater.aterweb.mvc.dto.PessoaGrupoCadFiltroDto;

import java.util.List;

/**
 * Define os métodos exclusivos ao DAO de Grupo Sociais
 * 
 * @author frazao
 * 
 */
public interface PessoaGrupoDao extends _CrudDao<PessoaGrupo, Integer> {
	
	List<PessoaGrupo> restoreByDto(PessoaGrupoCadFiltroDto filtro);

}
