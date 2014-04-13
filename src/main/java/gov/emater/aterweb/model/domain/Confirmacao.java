package gov.emater.aterweb.model.domain;

public enum Confirmacao {
	N("Não"), S("Sim");

	private String descricao;

	private Confirmacao(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return this.descricao;
	}

	public String toString() {
		return getDescricao();
	}
}