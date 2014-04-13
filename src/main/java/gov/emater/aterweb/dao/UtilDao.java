package gov.emater.aterweb.dao;

import java.util.List;

public interface UtilDao extends _Dao {
	/**
	 * M�todo gen�rico para retorno de entidades de dom�nio do sistema
	 * 
	 * @param entidade
	 *            nome da entidade a ser chamada
	 * @param nomeChavePrimaria
	 *            nome da chave prim�ria da entidade
	 * @param valorChavePrimaria
	 *            valor da chave prim�ria da entidade
	 * @return a rela��o das entidades
	 */
	public List<?> getDominio(String entidade, String nomeChavePrimaria,
			Integer valorChavePrimaria, String order);

	/**
	 * M�todo para execu��o de queries livres no banco de dados
	 * 
	 * @param sql
	 *            a ser executada
	 * @param params
	 *            parametros da query
	 * @return resultado da query
	 */
	public List<?> executaQuery(String sql, List<?> params);
}
