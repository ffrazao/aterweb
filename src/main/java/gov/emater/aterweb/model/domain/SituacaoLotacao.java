package gov.emater.aterweb.model.domain;

public enum SituacaoLotacao {
	/*
	 * Situação da lotação:
	 * 
	 * T - Transitória. Saindo de um indo para outra E - Efetiva. Tornando uma
	 * Transitória em efetiva. P - Provisória. Atividades provisórias em outras
	 * unidades da empresa.
	 */

	T("Transitória"), E("Efetiva"), P("Provisória");

	private String descricao;

	private SituacaoLotacao(String descricao) {
		this.descricao = descricao;
	}

	public String toString() {
		return this.descricao;
	}
}