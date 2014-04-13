package gov.emater.aterweb.model.domain;

public enum RegimeCasamento {
	
	P("Comunh�o Parcial de Bens"), U("Comunh�o Universal de Bens"), S(
			"Separa��o Total de Bens"), A("Participa��o Final nos Aquestos");
	
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
