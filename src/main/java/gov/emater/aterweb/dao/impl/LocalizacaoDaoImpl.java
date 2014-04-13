package gov.emater.aterweb.dao.impl;

import gov.emater.aterweb.dao.LocalizacaoDao;
import gov.emater.aterweb.model.Localizacao;

import org.springframework.stereotype.Repository;

@Repository
public class LocalizacaoDaoImpl extends _CrudDaoImpl<Localizacao, Integer>
		implements LocalizacaoDao {

}