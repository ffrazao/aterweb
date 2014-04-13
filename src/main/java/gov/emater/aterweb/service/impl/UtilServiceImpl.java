package gov.emater.aterweb.service.impl;

import gov.emater.aterweb.comum.UtilitarioString;
import gov.emater.aterweb.dao.UtilDao;
import gov.emater.aterweb.service.UtilService;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UtilServiceImpl implements UtilService {

	private static final Logger logger = Logger
			.getLogger(UtilServiceImpl.class);

	@Autowired
	private UtilDao dao;

	/**
	 * Método genérico para retorno de entidades de domínio do sistema
	 * 
	 * @param entidade
	 *            nome da entidade a ser chamada
	 * @param nomeChavePrimaria
	 *            nome da chave primária da entidade
	 * @param valorChavePrimaria
	 *            valor da chave primária da entidade
	 * @return a relação das entidades em formato JSon
	 */
	@Override
	@Transactional(readOnly = true)
	public List<?> getDominio(String entidade, String nomeChavePrimaria,
			Integer valorChavePrimaria, String order) {
		if (logger.isDebugEnabled()) {
			logger.debug(String
					.format("Recuperando domínio para Entidade[%s], NomeChavePrimaria[%s], ValorChavePrimária[%d]",
							entidade, nomeChavePrimaria, valorChavePrimaria));
		}

		return dao.getDominio(entidade, nomeChavePrimaria, valorChavePrimaria,
				order);
	}

	/**
	 * Método para execução de queries livres no banco de dados
	 * 
	 * @param sql
	 *            a ser executada
	 * @param params
	 *            parametros da query
	 * @return resultado da query
	 */
	@Override
	@Transactional(readOnly = true)
	public List<?> executaQuery(String sql, List<?> params) {
		if (logger.isDebugEnabled()) {
			logger.debug(String.format("Executando query genérica [%s]", sql));
		}

		// ajustar a lista de parâmetros
		if (params != null) {
			for (Object param : params) {
				if (param instanceof String) {
					String temp = UtilitarioString.getInstance().removeAspas(
							(String) param);
					if (temp.contains("|")) {
						String[] item = temp.split("\\|");
						String tipo = item[0];
						String valor = item[1];
						switch (tipo) {
						case "Long":
							param = Long.parseLong(valor);
							break;
						case "Integer":
							param = Integer.parseInt(valor);
							break;
						}
					}
				}
			}
		}

		return dao.executaQuery(sql, params);
	}

	/**
	 * Método para carregamento de arquivos para o servidor de arquivos
	 * 
	 */
	// @Override
	// @Transactional(readOnly = true)
	// public List<?> carregarArquivo(String sql, List<String> params) {
	// logger.debug(String.format("Executando query genérica [%s]", sql));
	// return dao.executaQuery(sql, params);
	// }
}