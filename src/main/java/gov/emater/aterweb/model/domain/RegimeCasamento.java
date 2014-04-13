package gov.emater.aterweb.model.domain;

public enum RegimeCasamento {
	
	P("Comunhão Parcial de Bens"), U("Comunhão Universal de Bens"), S(
			"Separação Total de Bens"), A("Participação Final nos Aquestos");
	
	private String descricao;

	private RegimeCasamento(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return this.descricao;
	}

	public String toString() {
		return this.descricao;
	}

}
