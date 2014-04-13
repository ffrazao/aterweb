package gov.emater.aterweb.security;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.web.authentication.WebAuthenticationDetails;

public class CustomWebAuthenticationDetails extends WebAuthenticationDetails {

	private static final long serialVersionUID = 1L;

	private boolean acessoComoAdministradorDoSistema;

	public CustomWebAuthenticationDetails(HttpServletRequest request,
			boolean administrador) {
		super(request);
		setAcessoComoAdministradorDoSistema(administrador);
	}

	public boolean getAcessoComoAdministradorDoSistema() {
		return acessoComoAdministradorDoSistema;
	}

	public void setAcessoComoAdministradorDoSistema(boolean administrador) {
		this.acessoComoAdministradorDoSistema = administrador;
	}

}