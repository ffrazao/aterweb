package gov.emater.aterweb.mvc.dto;

public class MudarSenhaAtualDto implements Dto {

	private static final long serialVersionUID = 1L;

	private String nomeUsuario;

	private String novaSenha;

	private String repetirNovaSenha;

	private String senha;

	public MudarSenhaAtualDto() {
	}

	public String getNomeUsuario() {
		return nomeUsuario;
	}

	public String getNovaSenha() {
		return novaSenha;
	}

	public String getRepetirNovaSenha() {
		return repetirNovaSenha;
	}

	public String getSenha() {
		return senha;
	}

	public void setNomeUsuario(String nomeUsuario) {
		this.nomeUsuario = nomeUsuario;
	}

	public void setNovaSenha(String novaSenha) {
		this.novaSenha = novaSenha;
	}

	public void setRepetirNovaSenha(String repetirNovaSenha) {
		this.repetirNovaSenha = repetirNovaSenha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}
}