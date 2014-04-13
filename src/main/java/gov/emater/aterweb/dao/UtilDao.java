package gov.emater.aterweb.dao;

import java.util.List;

public interface UtilDao extends _Dao {
	/**
	 * Método genérico para retorno de entidades de domínio do sistema
	 * 
	 * @param entidade
	 *            nome da entidade a ser chamada
	 * @param nomeChavePrimaria
	 *            nome da chave primária da entidade
	 * @param valorChavePrimaria
	 *            valor da chave primária da entidade
	 * @return a relação das entidades
	 */
	public List<?> getDominio(String entidade, String nomeChavePrimaria,
			Integer valorChavePrimaria, String order);

	/**
	 * Método para execução de queries livres no banco de dados
	 * 
	 * @param sql
	 *            a ser executada
	 * @param params
	 *            parametros da query
	 * @return resultado da query
	 */
	public List<?> executaQuery(String sql, List<?> params);
}
