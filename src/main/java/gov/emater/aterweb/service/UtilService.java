package gov.emater.aterweb.service;

import java.util.List;

public interface UtilService extends Service {

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
	 *            string para definir a ordem dos dados
	 * @return a rela��o das entidades
	 */
	List<?> getDominio(String ent, String npk, Integer vpk, String order);

	List<?> executaQuery(String sql, List<?> params);
}
