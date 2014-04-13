package gov.emater.aterweb.dao.impl;

import gov.emater.aterweb.dao._Ativavel;
import gov.emater.aterweb.dao._ChavePrimaria;
import gov.emater.aterweb.dao._CrudDao;
import gov.emater.aterweb.dao._Escondivel;
import gov.emater.aterweb.dao._Herdavel;
import gov.emater.aterweb.dao._Padronizavel;
import gov.emater.aterweb.model.EntidadeBase;
import gov.emater.aterweb.model.Localizacao;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityNotFoundException;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Example;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.sql.JoinType;
import org.hibernate.transform.AliasToEntityMapResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * Implementa a interface Dao definindo seu comportamento básico
 * 
 * @author frazao
 * 
 * @param <E>
 *            Tipo de entidade que será a referência de manipulação de dados do
 *            Dao
 */
@Repository
public class _CrudDaoImpl<E extends _ChavePrimaria<CP>, CP extends Serializable>
		implements _CrudDao<E, CP> {

	private boolean isAtivavel;

	private boolean isEscondivel;

	private boolean isHerdavel;

	private boolean isPadronizavel;

	@Autowired
	private SessionFactory session;

	private Class<_ChavePrimaria<CP>> tipo;

	@SuppressWarnings("unchecked")
	_CrudDaoImpl() {

		if (getClass().getName().equals(
				"gov.emater.aterweb.dao.impl._CrudDaoImpl")) {
			// TypeVariable<?>[] x = getClass().getTypeParameters();
			tipo = null;
		} else {

			Type[] tipos = ((ParameterizedType) getClass()
					.getGenericSuperclass()).getActualTypeArguments();

			if (tipos[0] instanceof ParameterizedType) {
				ParameterizedType tipoParametrizado = (ParameterizedType) tipos[0];
				tipo = (Class<_ChavePrimaria<CP>>) tipoParametrizado
						.getRawType();
			} else {
				tipo = (Class<_ChavePrimaria<CP>>) tipos[0];
			}
		}

		checkGenericClass();
	}

	_CrudDaoImpl(Class<_ChavePrimaria<CP>> tipo) {
		this.tipo = tipo;
		checkGenericClass();
	}

	private void checkGenericClass() {
		if (tipo != null) {
			for (@SuppressWarnings("rawtypes")
			Class i : tipo.getInterfaces()) {
				if (i == _Padronizavel.class) {
					isPadronizavel = true;
				} else if (i == _Ativavel.class) {
					isAtivavel = true;
				} else if (i == _Escondivel.class) {
					isEscondivel = true;
				} else if (i == _Herdavel.class) {
					isHerdavel = true;
				}
			}
		}
	}

	private void checkIfDefault(E entidade) {
		if (((_Padronizavel) entidade).isPadrao()) {
			throw new UnsupportedOperationException(
					"Não é possível excluir a entidade padrão " + tipo + "#"
							+ entidade.getId());
		}
	}

	/**
	 * Cria uma nova entidade no banco de dados
	 * 
	 * @param e
	 *            entidade a ser criada no banco de dados
	 * @return a entidade criada no banco de dados
	 */
	@Override
	public E create(E e) {
		getSession().getCurrentSession().save(e); // persist(e);
		return e;
	}

	/**
	 * Remove a entidade do controle do Módulo de Persistência (Hibernate)
	 * 
	 * @param o
	 *            objeto a ser removido do controle do Módulo de Persistência
	 */
	@Override
	public void deatach(E entidade) {
		if (entidade != null) {
			getSession().getCurrentSession().evict(entidade);
		}
	}

	@Override
	public void delete() {
		delete(restore(), false);
	}

	private void delete(final List<E> objects, boolean checkIdDefault)
			throws UnsupportedOperationException {
		for (E object : objects) {
			delete(object, checkIdDefault);
		}
	}

	/**
	 * Pesquisa pela chave primária para depois apagar o registro da entidade no
	 * banco de dados
	 * 
	 * @param id
	 *            chave primária do objeto a ser removido do banco de dados
	 * 
	 * @see delete(E e)
	 */
	@Override
	public void delete(CP id) throws UnsupportedOperationException {
		delete(restore(id));
	}

	@Override
	public void delete(@SuppressWarnings("unchecked") CP... ids)
			throws UnsupportedOperationException {
		delete(restore(ids), true);
	}

	@Override
	public void delete(E e) throws UnsupportedOperationException {
		delete(e, true);
	}

	@Override
	public void delete(@SuppressWarnings("unchecked") E... e)
			throws UnsupportedOperationException {
		delete(Arrays.asList(e), true);
	}

	/**
	 * Apaga o registro da entidade no banco de dados
	 * 
	 * @param o
	 *            objeto a ser removido do Banco de Dados
	 */
	private void delete(E e, boolean verificaPadronizavel)
			throws UnsupportedOperationException {
		if (verificaPadronizavel && isPadronizavel) {
			checkIfDefault(e);
		}
		if (isEscondivel) {
			((_Escondivel) e).setEscondido(true);
			update(e);
		} else {
			getSession().getCurrentSession().delete(e);
		}
	}

	/**
	 * Provocar o fetch fazendo a leitura de coleções inicialmente marcadas com
	 * o atributo Lazy
	 * 
	 * @param collection
	 *            Entidades a serem lidas
	 * @return total de registros lidos
	 */
	public int fetchCount(List<?> collection) {
		int result = 0;
		for (@SuppressWarnings("unused")
		Object ob : collection) {
			result++;
		}
		return result;
	}

	/**
	 * Retrieve objects using criteria. It is equivalent to
	 * <code>criteria.list(entityManager)</code>.
	 * 
	 * @param criteria
	 *            criteria which will be executed
	 * @return list of founded objects
	 * @see javax.persistence.Query#getResultList()
	 */
	private List<?> findByCriteria(Criteria criteria) {
		return criteria.list();
	}

	@Override
	public void flushAndClear() {
		getSession().getCurrentSession().flush();
		getSession().getCurrentSession().clear();
	}

	/**
	 * Mantém o objeto de sessão do Módulo de Persistência (Hibernate)
	 * 
	 * @return a sessão do Módulo de Persistência (Hibernate)
	 */
	public SessionFactory getSession() {
		if (session.isClosed()) {
			session.openSession();
		}
		return session;
	}

	protected Class<_ChavePrimaria<CP>> getTipo() {
		return tipo;
	}

	private void interpretaParametros(Criteria criteria,
			ProjectionList projections, String acao, String campo, Object valor) {
		// sel = select
		// whe = where
		// ord = order by

		// verificar se quer selecionar
		if (acao.contains("sel")) {
			projections.add(Projections.property(campo), campo);
		}
		// verificar se quer filtrar
		if (acao.contains("whe")) {
			if (acao.contains("eq")) {
				criteria.add(Restrictions.eq(campo, valor));
			} else if (acao.contains("like")) {
				criteria.add(Restrictions.like(campo,
						String.format(_CrudDao.LIKE_MASK, valor)));
			} else if (acao.contains("ge")) {
				criteria.add(Restrictions.ge(campo, valor));
			} else if (acao.contains("le")) {
				criteria.add(Restrictions.le(campo, valor));
			} else if (acao.contains("gt")) {
				criteria.add(Restrictions.gt(campo, valor));
			} else if (acao.contains("lt")) {
				criteria.add(Restrictions.lt(campo, valor));
			}
		}
		// verificar se quer ordenar
		if (acao.contains("ord")) {
			criteria.addOrder(Order.asc(campo));
		}
		if (acao.contains("ali")) {
			criteria.createAlias(campo, (String) valor,
					JoinType.LEFT_OUTER_JOIN);
		}
	}

	private void interpretaParametrosByQuery(StringBuffer select,
			StringBuffer from, StringBuffer where, StringBuffer order,
			String acao, String campo, Object valor) {
		// sel = select
		// whe = where
		// ord = order by

		// verificar se quer selecionar
		if (acao.contains("sel")) {
			if (select.length() == 0) {
				select.append("select ");
			} else {
				select.append("     , ");
			}
			select.append("this.").append(campo).append(" as ").append(campo);
		}
		// verificar se quer filtrar
		if (acao.contains("whe")) {
			if (where.length() == 0) {
				where.append("where ");
			} else {
				where.append("  and ");
			}
			if (acao.contains("eq")) {
				where.append("this.").append(campo).append(" = :")
						.append(campo.replaceAll("\\.", "\\_"));
			} else if (acao.contains("like")) {
				where.append("this.").append(campo).append(" like :")
						.append(campo.replaceAll("\\.", "\\_"));
			} else if (acao.contains("ge")) {
				where.append("this.").append(campo).append(" >= :")
						.append(campo.replaceAll("\\.", "\\_"));
			} else if (acao.contains("le")) {
				where.append("this.").append(campo).append(" <= :")
						.append(campo.replaceAll("\\.", "\\_"));
			} else if (acao.contains("gt")) {
				where.append("this.").append(campo).append(" < :")
						.append(campo.replaceAll("\\.", "\\_"));
			} else if (acao.contains("lt")) {
				where.append("this.").append(campo).append(" > :")
						.append(campo.replaceAll("\\.", "\\_"));
			}
		}
		// verificar se quer ordenar
		if (acao.contains("ord")) {
			if (order.length() == 0) {
				order.append("order by ");
			} else {
				order.append("       , ");
			}
			order.append("this.").append(campo);
		}
		if (acao.contains("ali")) {
			from.append(" join fetch ").append(campo);
		}
		// criteria.add(Restrictions.like(campo,
		// String.format(Dao.LIKE_MASK, valor)));
	}

	@Override
	public boolean isAtivavel() {
		return isAtivavel;
	}

	@Override
	public boolean isEscondivel() {
		return isEscondivel;
	}

	@Override
	public boolean isHerdavel() {
		return isHerdavel;
	}

	@Override
	public boolean isPadronizavel() {
		return isPadronizavel;
	}

	@Override
	public void refresh(E objeto) {
		getSession().getCurrentSession().refresh(objeto);
	}

	/**
	 * Restaura todas as entidades do banco de dado baseada no tipo definido no
	 * Dao
	 */
	@Override
	@SuppressWarnings("unchecked")
	public List<E> restore() {
		return (List<E>) findByCriteria(getSession().getCurrentSession()
				.createCriteria(tipo)
				.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY));
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<E> restore(_Herdavel<E> pai) {
		return (List<E>) findByCriteria(getSession()
				.getCurrentSession()
				.createCriteria(tipo)
				.add(pai == null ? Restrictions.isNull(_Herdavel.P_PAI)
						: Restrictions.eq(_Herdavel.P_PAI, pai)));
	}

	/**
	 * Restaura uma entidade baseada na chave primária do registro no banco de
	 * dados
	 * 
	 * @param id
	 *            chave primária do registro a ser pesquisado
	 * 
	 * @return se existir algum registro com a chave primária informada
	 *         retornará o registro, caso dispara exceção
	 */
	@Override
	public E restore(CP id) throws EntityNotFoundException {
		E entidade = restoreSilencioso(id);
		if (entidade == null) {
			throw new EntityNotFoundException("entidade " + tipo + "#" + id
					+ " nao encontrada");
		}
		return entidade;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<E> restore(CP... ids) {
		return (List<E>) findByCriteria(getSession().getCurrentSession()
				.createCriteria(tipo)
				.add(Restrictions.in(_ChavePrimaria.P_ID, ids)));
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<E> restore(E exemplo) {
		Criteria criteria = getSession().getCurrentSession().createCriteria(
				tipo);

		Example example = Example.create(exemplo).ignoreCase();
		criteria.add(example);

		Field[] fields = exemplo.getClass().getDeclaredFields();

		for (Field field : fields) {

			if (field.getName().equals(_ChavePrimaria.P_ID)) {
				continue;
			} else if (field.getName().equals(_Ativavel.P_IS_ATIVO)) {
				continue;
			} else if (field.getName().equals(_Padronizavel.P_IS_PADRAO)) {
				continue;
			} else if (field.getName().equals(_Escondivel.P_IS_ESCONDIDO)) {
				continue;
			}
			if (!EntidadeBase.class.isAssignableFrom(field.getType())) {
				if (field.getType().equals(Localizacao.class)) {
					System.out.println("dd");
				}
				continue;
			}
			// if (!field.isAnnotationPresent(Column.class)
			// && !field.isAnnotationPresent(Basic.class)) {
			// continue;
			// }

			Object value = null;

			try {
				field.setAccessible(true);
				try {
					if (field.get(null) != null) {
						continue;
					}
				} catch (Exception e) {
				}
				value = field.get(exemplo);
			} catch (IllegalArgumentException e) {
				continue;
			} catch (IllegalAccessException e) {
				continue;
			}

			if (value == null) {
				continue;
			}

			criteria.add(Restrictions.eq(field.getName(), value));
		}

		// if (exemplo instanceof _Herdavel) {
		// if (((_Herdavel<E>) exemplo).getPai() == null) {
		// criteria.add(Restrictions.isNull(_Herdavel.P_PAI));
		// } else {
		// criteria.add(Restrictions.eq(_Herdavel.P_PAI,
		// ((_Herdavel<E>) exemplo).getPai()));
		// }
		// }

		return (List<E>) findByCriteria(criteria);
	}

	/**
	 * Restara um conjunto de dados do banco de dados baseado em uma lista de
	 * parâmetros
	 * 
	 * @param params
	 *            o mapa de parâmetros de pesquisa
	 * @return um conjunto de dados que possuem as características informadas em
	 *         params
	 */
	@Override
	public List<?> restore(Map<String, Object> params) {
		Criteria criteria = getSession().getCurrentSession().createCriteria(
				tipo, "this");

		// verificar se huveram parametros informados
		if (params != null) {
			ProjectionList projections = Projections.projectionList();
			for (Map.Entry<String, Object> param : params.entrySet()) {
				String[] linha = param.getKey().split("\\|");
				String acao = linha[0];
				String campo = linha[1];
				interpretaParametros(criteria, projections, acao, campo,
						param.getValue());
			}
			if (projections.getLength() > 0) {
				criteria.setProjection(projections);
			} else {
				criteria.setProjection(Projections.property("this"));
			}
			criteria.setResultTransformer(AliasToEntityMapResultTransformer.INSTANCE);
		}

		criteria.setMaxResults(10);

		criteria.setReadOnly(true);

		List<?> result = criteria.list();

		return result;
	}

	/**
	 * Restara um conjunto de dados do banco de dados baseado em uma lista de
	 * parâmetros
	 * 
	 * @param params
	 *            o mapa de parâmetros de pesquisa
	 * @return um conjunto de dados que possuem as características informadas em
	 *         params
	 */
	// @Override
	public List<?> restoreByQuery(Map<String, Object> params) {
		StringBuffer select = new StringBuffer();
		StringBuffer from = new StringBuffer();
		StringBuffer where = new StringBuffer();
		StringBuffer order = new StringBuffer();

		// informar o from
		from.append("from ").append(tipo.getName()).append(" this");

		// os parâmetros foram informados
		if (params != null) {
			// avaliar cada parâmetro
			for (Map.Entry<String, Object> param : params.entrySet()) {
				String[] linha = param.getKey().split("\\|");
				String acao = linha[0];
				String campo = linha[1];
				interpretaParametrosByQuery(select, from, where, order, acao,
						campo, param.getValue());
			}
		}

		if (select.length() == 0) {
			select.append("select this");
		}

		String sql = String.format("%s %s %s %s ", select, from, where, order);

		Query q = getSession()
				.getCurrentSession()
				.createQuery(sql)
				.setResultTransformer(
						AliasToEntityMapResultTransformer.INSTANCE)
				.setMaxResults(10).setReadOnly(true);

		// alimentar os parâmetros da query
		if (params != null) {
			// avaliar cada parâmetro
			for (Map.Entry<String, Object> param : params.entrySet()) {
				String[] linha = param.getKey().split("\\|");
				String acao = linha[0];
				String campo = linha[1];
				if (acao.contains("whe")) {
					if (acao.contains("like")) {
						q.setParameter(campo.replaceAll("\\.", "\\_"), String
								.format(_CrudDao.LIKE_MASK,
										(String) param.getValue()));
					} else {
						q.setParameter(campo.replaceAll("\\.", "\\_"),
								param.getValue());
					}
				}
			}
		}

		List<?> result = q.list();

		return result;
	}

	/**
	 * Restaura uma entidade baseada na chave primária do registro no banco de
	 * dados
	 * 
	 * @param id
	 *            chave primária do registro a ser pesquisado
	 * 
	 * @return se existir algum registro com a chave primária informada
	 *         retornará o registro, caso contrário null
	 */
	@Override
	@SuppressWarnings("unchecked")
	public E restoreSilencioso(CP id) {
		return (E) getSession().getCurrentSession().get(tipo, id);
	}

	/**
	 * Método facilitador que cria uma entidade caso não seja possível
	 * identificar a sua chave primária (chave primária = a nulo) ou atualiza
	 * uma entidade caso sua chave primária tenha sido identificada
	 * 
	 * @param e
	 *            entidade a ser salva no banco de dados
	 * 
	 * @return a entidade salva no banco de dados
	 * @see E create(E e) e E update(E e)
	 */
	@Override
	public E save(E e) {
		if (!(e instanceof _ChavePrimaria)) {
			throw new ClassCastException(String.format(
					"A classe %s não implementa a interface ChavePrimaria", e
							.getClass().getName()));
		}
		if (((_ChavePrimaria<CP>) e).getId() == null) {
			return create(e);
		} else {
			return update(e);
		}
	}

	/**
	 * Salva todas as alterações feitas em um conjunto de objetos
	 * 
	 * @param objetos
	 *            objetos persistidos
	 */
	@Override
	public void save(@SuppressWarnings("unchecked") final E... objects) {
		for (E object : objects) {
			save(object);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public void setComoPadrao(_Padronizavel objeto) {
		if (objeto.getExemplo() != null) {
			List<E> objects = restore((E) objeto.getExemplo());
			for (E o : objects) {
				if (objeto != o) {
					((_Padronizavel) o).setPadrao(false);
					update(o);
				}
			}
		}
		objeto.setPadrao(true);
		save((E) objeto);
	}

	/**
	 * Atualiza uma nova entidade no banco de dados
	 * 
	 * @param e
	 *            entidade a ser atualizada no banco de dados
	 * @return a entidade atualizada no banco de dados
	 */
	@SuppressWarnings("unchecked")
	@Override
	public E update(E e) {
		e = (E) getSession().getCurrentSession().merge(e); // update(e);
		return e;
	}
}