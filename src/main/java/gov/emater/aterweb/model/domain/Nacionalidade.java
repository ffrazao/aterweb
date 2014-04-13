package gov.emater.aterweb.model.domain;

public enum Nacionalidade {

	BN("Brasileiro Nato"), NA("Brasileiro Naturalizado"), ES("Estrangeiro");

	private String descricao;

	private Nacionalidade(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return this.descricao;
	}

	public String toString() {
		return this.descricao;
	}
}
