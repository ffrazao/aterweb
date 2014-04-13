package gov.emater.aterweb.mvc.dto;

import gov.emater.aterweb.model.domain.UsuarioStatusConta;

public class UsuarioCadFiltroDto implements Dto {

	private static final long serialVersionUID = 1L;

	private String nome;

	private String nomeUsuario;

	private UsuarioStatusConta usuarioStatusConta;

	public String getNome() {
		return nome;
	}

	public String getNomeUsuario() {
		return nomeUsuario;
	}

	public UsuarioStatusConta getUsuarioStatus() {
		return usuarioStatusConta;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public void setNomeUsuario(String nomeUsuario) {
		this.nomeUsuario = nomeUsuario;
	}

	public void setUsuarioStatusConta(UsuarioStatusConta usuarioStatusConta) {
		this.usuarioStatusConta = usuarioStatusConta;
	}
}