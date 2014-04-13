package gov.emater.aterweb.model.domain;

public enum PessoaSituacao {
	A("Ativo"), U("Inativo por falta de Uso"), F("Inativo por Falecimento"), O(
			"Inativo por Outro Motivo");

	private String descricao;

	private PessoaSituacao(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return this.descricao;
	}

	public String toString() {
		return this.descricao;
	}
}
