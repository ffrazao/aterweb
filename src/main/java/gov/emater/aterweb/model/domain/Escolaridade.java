package gov.emater.aterweb.model.domain;

public enum Escolaridade {
	AI("Não sabe ler / escrever (Analfabeto)"), AC(
			"Sabe ler / escrever (Alfabetizado)"), FI("Fundamental Incompleto"), FC(
			"Fundamental Completo"), MI("Médio Incompleto"), MC(
			"Médio Completo"), SI("Superior Incompleto"), SC(
			"Superior Completo"), ES("Especialização/ Residência"), ME(
			"Mestrado"), DO("Doutorado"), PD("Pós-Doutorado");

	private String descricao;

	private Escolaridade(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return this.descricao;
	}

	public String toString() {
		return this.descricao;
	}

}
