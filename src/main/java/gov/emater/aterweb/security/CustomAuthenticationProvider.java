package gov.emater.aterweb.security;

import gov.emater.aterweb.service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

/**
 * Classe customizada para customizar a autenticação de usuários
 * 
 * @author frazao
 * 
 */
@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

	@Autowired
	private UsuarioService service;

	@Override
	public Authentication authenticate(Authentication autenticacao)
			throws AuthenticationException {

		return service.autenticaUsuario(autenticacao);
	}

	@Override
	public boolean supports(Class<?> arg0) {
		return true;
	}
}