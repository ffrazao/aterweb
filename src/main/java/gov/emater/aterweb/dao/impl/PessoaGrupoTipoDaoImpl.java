package gov.emater.aterweb.dao.impl;

import gov.emater.aterweb.dao.PessoaGrupoTipoDao;
import gov.emater.aterweb.model.PessoaGrupo;
import gov.emater.aterweb.model.PessoaGrupoTipo;
import gov.emater.aterweb.mvc.dto.PessoaGrupoCadFiltroDto;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.Subqueries;
import org.springframework.stereotype.Repository;

@Repository
public class PessoaGrupoTipoDaoImpl extends _CrudDaoImpl<PessoaGrupoTipo, Integer>
		implements PessoaGrupoTipoDao {

	@SuppressWarnings("unchecked")
	@Override
	public List<PessoaGrupoTipo> restoreByDto(PessoaGrupoCadFiltroDto filtro) {

		Criteria criteria = null;

		// subquery dos grupos filtrados
		DetachedCriteria grupoFiltrado = null;
		// subquery dos grupos vazios
		DetachedCriteria grupoVazio = null;

		criteria = getSession().getCurrentSession().createCriteria(getTipo(),
				"this");
		criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);

		// filtrar pelos parametros informados
		if (filtro.getPessoaGrupoTipo() != null
				&& filtro.getPessoaGrupoTipo().getId() != null) {
			criteria.add(Restrictions.eq("id", filtro.getPessoaGrupoTipo()
					.getId()));
		}
		if ((filtro.getNome() != null && filtro.getNome().trim().length() > 0)
				|| (filtro.getSituacaoGrupo() != null)) {
			grupoFiltrado = DetachedCriteria.forClass(PessoaGrupo.class);
			grupoFiltrado.setProjection(Projections.projectionList().add(
					Projections.property("pessoaGrupoTipo.id")));
			grupoVazio = DetachedCriteria.forClass(PessoaGrupo.class);
			grupoVazio.setProjection(Projections.projectionList().add(
					Projections.property("pessoaGrupoTipo.id")));
		}
		if (filtro.getNome() != null && filtro.getNome().trim().length() > 0) {
			grupoFiltrado.add(Restrictions.like("nome", filtro.getNome(),
					MatchMode.ANYWHERE));
		}
		if (filtro.getSituacaoGrupo() != null) {
			grupoFiltrado.add(Restrictions.eq("situacao",
					filtro.getSituacaoGrupo()));
		}
		if ((filtro.getNome() != null && filtro.getNome().trim().length() > 0)
				|| (filtro.getSituacaoGrupo() != null)) {
			criteria.add(Restrictions.disjunction(
					Subqueries.propertyIn("id", grupoFiltrado),
					Subqueries.propertyNotIn("id", grupoVazio)));
		}
		criteria.addOrder(Order.asc("nome"));

		return (List<PessoaGrupoTipo>) criteria.list();
	}
}