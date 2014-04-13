package gov.emater.aterweb.model.domain;

public enum SituacaoFundiaria {
	E("Escritura Definitiva"), C("Concessão de Uso"), P("Posse");

	private String descricao;

	private SituacaoFundiaria(String descricao) {
		this.descricao = descricao;
	}

	public String toString() {
		return getDescricao();
	}

	public String getDescricao() {
		return this.descricao;
	}
}
