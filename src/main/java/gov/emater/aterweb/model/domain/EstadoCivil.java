package gov.emater.aterweb.model.domain;

public enum EstadoCivil {

	S("Solteiro"), C("Casado"), U("União Estável"), P("Separado"), D(
			"Desquitado"), V("Viúvo");

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
