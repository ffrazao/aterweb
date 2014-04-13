package gov.emater.aterweb.dao.impl;

import gov.emater.aterweb.dao.ArquivoDao;
import gov.emater.aterweb.model.Arquivo;

import org.springframework.stereotype.Repository;

@Repository
public class ArquivoDaoImpl extends _CrudDaoImpl<Arquivo, Integer> implements
		ArquivoDao {

}