package gov.emater.aterweb.dao.impl;

import gov.emater.aterweb.dao.UsuarioDao;
import gov.emater.aterweb.model.Usuario;

import org.springframework.stereotype.Repository;

@Repository
public class UsuarioDaoImpl extends _CrudDaoImpl<Usuario, Integer> implements UsuarioDao {

}