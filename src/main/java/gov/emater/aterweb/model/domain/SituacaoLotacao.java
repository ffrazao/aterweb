package gov.emater.aterweb.model.domain;

public enum SituacaoLotacao {
	/*
	 * Situa��o da lota��o:
	 * 
	 * T - Transit�ria. Saindo de um indo para outra E - Efetiva. Tornando uma
	 * Transit�ria em efetiva. P - Provis�ria. Atividades provis�rias em outras
	 * unidades da empresa.
	 */

	T("Transit�ria"), E("Efetiva"), P("Provis�ria");

	private String descricao;

	private SituacaoLotacao(String descricao) {
		this.descricao = descricao;
	}

	public String toString() {
		return this.descricao;
	}
}