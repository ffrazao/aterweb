package gov.emater.aterweb.model.domain;

public enum UsuarioStatusConta {
	
	A("Ativo"), I("Inativo"), B("Bloqueado"), R("Renovar Senha");

	private String descricao;

	private UsuarioStatusConta(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return this.descricao;
	}

	public String toString() {
		return this.descricao;
	}

}