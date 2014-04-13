package gov.emater.aterweb.model.domain;

public enum PessoaGrupoNivelGestao {

	E("Empresa"), T("T�cnico"), U("Unidade Organizacional");

	private String descricao;

	private PessoaGrupoNivelGestao(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return this.descricao;
	}
}
