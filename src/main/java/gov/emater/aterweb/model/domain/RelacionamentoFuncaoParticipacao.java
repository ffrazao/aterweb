package gov.emater.aterweb.model.domain;

public enum RelacionamentoFuncaoParticipacao {

	A("Ativo"), N("Neutro"), P("Passivo");

	private String descricao;

	private RelacionamentoFuncaoParticipacao(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return this.descricao;
	}

	@Override
	public String toString() {
		return getDescricao();
	}

}
