package gov.emater.aterweb.model.domain;

public enum EstadoCivil {

	S("Solteiro"), C("Casado"), U("Uni�o Est�vel"), P("Separado"), D(
			"Desquitado"), V("Vi�vo");

	private String descricao;

	private EstadoCivil(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return this.descricao;
	}

	public String toString() {
		return this.descricao;
	}
}
