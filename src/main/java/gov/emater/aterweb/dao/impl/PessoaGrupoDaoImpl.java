package gov.emater.aterweb.dao.impl;

import gov.emater.aterweb.dao.PessoaGrupoDao;
import gov.emater.aterweb.model.PessoaGrupo;
import gov.emater.aterweb.model.PessoaGrupoTipo;
import gov.emater.aterweb.mvc.dto.PessoaGrupoCadFiltroDto;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

@Repository
public class PessoaGrupoDaoImpl extends _CrudDaoImpl<PessoaGrupo, Integer> implements PessoaGrupoDao {

    @SuppressWarnings("unchecked")
    @Override
    public List<PessoaGrupo> restoreByDto(PessoaGrupoCadFiltroDto filtro) {
	Criteria criteria = getSession().getCurrentSession().createCriteria(getTipo(), "this");
	criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);

	criteria.createCriteria("pessoaGrupoTipo", "pessoaGrupoTipo");
	criteria.add(Restrictions.eq("pessoaGrupoTipo.codigo", PessoaGrupoTipo.Codigo.PERSONALIZADO.name()));

	if (filtro.getPessoaGrupoTipo() != null && filtro.getPessoaGrupoTipo().getId() != null) {
	    criteria.add(Restrictions.eq("pessoaGrupoTipo.id", filtro.getPessoaGrupoTipo().getId()));
	}
	if (filtro.getNome() != null && filtro.getNome().trim().length() > 0) {
	    criteria.add(Restrictions.like("nome", filtro.getNome(), MatchMode.ANYWHERE));
	}
	if (filtro.getSituacaoGrupo() != null) {
	    criteria.add(Restrictions.eq("situacao", filtro.getSituacaoGrupo()));
	}
	criteria.addOrder(Order.asc("pessoaGrupo"));
	criteria.addOrder(Order.asc("nome"));

	return (List<PessoaGrupo>) criteria.list();
    }
}