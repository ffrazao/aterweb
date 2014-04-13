package gov.emater.aterweb.model.domain;

public enum CamOrgao {
	M("Marinha"), E("Exército"), A("Aeronáutica"), D("Ministério da Defesa");

	private String descricao;

	private CamOrgao(String descricao) {
		this.descricao = descricao;
	}

	public String toString() {
		return this.descricao;
	}
}