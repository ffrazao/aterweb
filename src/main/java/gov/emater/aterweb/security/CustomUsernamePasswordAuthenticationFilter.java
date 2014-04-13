package gov.emater.aterweb.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Classe customizada para captar o atribuito administrador da tela de login.
 * Exemplo retirado no exemplo a seguir
 * 
 * @author frazao
 * @see <a href=
 *      "http://mrather.blogspot.com.br/2010/02/extending-usernamepasswordauthenticatio.html"
 *      >Exemplo</a>
 */
public class CustomUsernamePasswordAuthenticationFilter extends
		UsernamePasswordAuthenticationFilter {
	private final static String administradorParameter = "administrador";

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request,
			HttpServletResponse response) throws AuthenticationException {

		String username = obtainUsername(request);
		String password = obtainPassword(request);
		String administrador = obtainAdministrador(request);

		if (username == null) {
			username = "";
		}

		if (password == null) {
			password = "";
		}

		if (administrador == null) {
			administrador = "false";
		}

		username = username.trim();

		UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(
				username, password);

		authRequest.setDetails(new CustomWebAuthenticationDetails(request,
				Boolean.parseBoolean(administrador)));

		return this.getAuthenticationManager().authenticate(authRequest);
	}

	protected String obtainAdministrador(HttpServletRequest request) {
		return request.getParameter(administradorParameter);
	}
}
