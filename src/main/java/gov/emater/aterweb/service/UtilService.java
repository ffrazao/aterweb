package gov.emater.aterweb.service;

import java.util.List;

public interface UtilService extends Service {

	/**
	 * Método genérico para retorno de entidades de domínio do sistema
	 * 
	 * @param entidade
	 *            nome da entidade a ser chamada
	 * @param nomeChavePrimaria
	 *            nome da chave primária da entidade
	 * @param valorChavePrimaria
	 *            valor da chave primária da entidade
	 * @param order
	 *            string para definir a ordem dos dados
	 * @return a relação das entidades
	 */
	List<?> getDominio(String ent, String npk, Integer vpk, String order);

	List<?> executaQuery(String sql, List<?> params);
}
