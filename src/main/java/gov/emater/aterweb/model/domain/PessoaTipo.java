package gov.emater.aterweb.model.domain;

public enum PessoaTipo {
	PF("PF", "Pessoa Física"), PJ("PJ", "Pessoa Jurídica"), GS("GS",
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