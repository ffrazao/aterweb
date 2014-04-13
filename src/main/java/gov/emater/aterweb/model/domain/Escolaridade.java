package gov.emater.aterweb.model.domain;

public enum Escolaridade {
	AI("N�o sabe ler / escrever (Analfabeto)"), AC(
			"Sabe ler / escrever (Alfabetizado)"), FI("Fundamental Incompleto"), FC(
			"Fundamental Completo"), MI("M�dio Incompleto"), MC(
			"M�dio Completo"), SI("Superior Incompleto"), SC(
			"Superior Completo"), ES("Especializa��o/ Resid�ncia"), ME(
			"Mestrado"), DO("Doutorado"), PD("P�s-Doutorado");

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
