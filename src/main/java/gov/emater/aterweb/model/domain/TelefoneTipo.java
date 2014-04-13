package gov.emater.aterweb.model.domain;

public enum TelefoneTipo {
	CE("Celular"), FI("Telefone Fixo"), TF("Telefone Fixo e Fax"), FA("Fax");

	private String descricao;

	private TelefoneTipo(String descricao) {
		this.descricao = descricao;
	}

	public String toString() {
		return this.descricao;
	}
}