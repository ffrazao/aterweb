package gov.emater.aterweb.dao;

import gov.emater.aterweb.model.PessoaGrupoTipo;
import gov.emater.aterweb.mvc.dto.PessoaGrupoCadFiltroDto;

import java.util.List;

/**
 * Define os m�todos exclusivos ao DAO de Tipo de Grupo Sociais
 * 
 * @author frazao
 * 
 */
public interface PessoaGrupoTipoDao extends _CrudDao<PessoaGrupoTipo, Integer> {

	List<PessoaGrupoTipo> restoreByDto(PessoaGrupoCadFiltroDto filtro);

}
