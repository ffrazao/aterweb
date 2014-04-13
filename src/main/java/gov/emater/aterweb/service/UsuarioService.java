package gov.emater.aterweb.service;

import gov.emater.aterweb.model.Usuario;
import gov.emater.aterweb.mvc.dto.MudarSenhaAtualDto;
import gov.emater.aterweb.mvc.dto.UsuarioCadFiltroDto;

import java.util.List;

import org.springframework.security.core.Authentication;

public interface UsuarioService extends CrudService<Usuario, Integer> {

	Authentication autenticaUsuario(Authentication autenticacao);

	List<?> filtrarByDto(UsuarioCadFiltroDto filtro);

	void mudarSenhaAtual(MudarSenhaAtualDto mudarSenhaAtualDto);

	Usuario restoreByLogin(String nomeUsuario);

}
