package gov.emater.aterweb.service;

import gov.emater.aterweb.model.PessoaGrupo;
import gov.emater.aterweb.model.PessoaGrupoTipo;

import java.util.List;

public interface PessoaGrupoService extends CrudService<PessoaGrupo, Integer> {

	List<?> detalhar(Integer id);

	List<PessoaGrupoTipo> restorePessoaGrupoTipo(PessoaGrupoTipo pessoaGrupoTipo);

}
