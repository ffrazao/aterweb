package gov.emater.aterweb.model.domain;

public enum MeioContatoTipo {

	END("Endereço"), TEL("Telefônico"), EMA("Email");

	private String descricao;

	private MeioContatoTipo(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return this.descricao;
	}

	public String toString() {
		return this.descricao;
	}
	
}
