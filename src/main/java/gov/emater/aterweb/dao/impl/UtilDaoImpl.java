package gov.emater.aterweb.dao.impl;

import gov.emater.aterweb.comum.UtilitarioString;
import gov.emater.aterweb.dao.UtilDao;

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UtilDaoImpl implements UtilDao {

	private static final Logger logger = Logger.getLogger(UtilDaoImpl.class);

	@Autowired
	private SessionFactory session;

	/**
	 * M�todo gen�rico para retorno de entidades de dom�nio do sistema
	 * 
	 * @param entidade
	 *            nome da entidade a ser chamada
	 * @param nomeChavePrimaria
	 *            nome da chave prim�ria da entidade
	 * @param valorChavePrimaria
	 *            valor da chave prim�ria da entidade
	 * @param order
	 *            defini��o da ordem dos dados
	 * @return a rela��o das entidades em formato JSon
	 */
	@Override
	public List<?> getDominio(String entidade, String nomeChavePrimaria,
			Integer valorChavePrimaria, String order) {
		if (logger.isTraceEnabled()) {
			logger.trace(String
					.format("Recuperando dom�nio para Entidade[%s], NomeChavePrimaria[%s], ValorChavePrim�ria[%d]",
							entidade, nomeChavePrimaria, valorChavePrimaria));
		}

		StringBuilder sql = new StringBuilder();
		sql.append("from ").append(entidade).append(" this\n");
		if (nomeChavePrimaria != null && nomeChavePrimaria.trim().length() > 0) {
			sql.append("where ").append(nomeChavePrimaria).append(" = ?1")
					.append("\n");
		}
		if (order != null && order.trim().length() > 0) {
			sql.append("order by ").append(order).append("\n");
		}

		Query query = session.getCurrentSession().createQuery(sql.toString());

		if (nomeChavePrimaria != null && nomeChavePrimaria.trim().length() > 0) {
			query.setParameter("1", valorChavePrimaria);
		}

		List<?> result = query.list();

		return result;
	}

	/**
	 * M�todo para execu��o de queries livres no banco de dados
	 * 
	 * @param sql
	 *            a ser executada
	 * @param params
	 *            parametros da query
	 * @return resultado da query
	 */
	@Override
	public List<?> executaQuery(String sql, List<?> params) {
		if (logger.isTraceEnabled()) {
			logger.trace(String.format("Executando query gen�rica [%s]", sql));
		}

		sql = UtilitarioString.getInstance().removeAspas(sql);

		Query query = session.getCurrentSession().createQuery(sql);

		if (params != null) {
			int pos = 0;
			for (Object param : params) {
				query.setParameter(pos++, param);
			}
		}

		List<?> result = query.list();

		return result;
	}

}