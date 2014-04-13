package gov.emater.aterweb.model.domain;

public enum PessoaTipo {
	PF("PF", "Pessoa F�sica"), PJ("PJ", "Pessoa Jur�dica"), GS("GS",
			"Grupo Social");

	private String sigla;
	private String descricao;

	public String getSigla() {
		return this.sigla;
	}

	public String getDescricao() {
		return this.descricao;
	}

	private PessoaTipo(String sigla, String descricao) {
		this.sigla = sigla;
		this.descricao = descricao;
	}
}