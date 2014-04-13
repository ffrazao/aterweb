package gov.emater.aterweb.model.domain;

public enum CnhCategoria {

    A("A"), AB("AB"), B("B"), C("C"), D("D"), E("E");

    private String descricao;

    private CnhCategoria(String descricao) {
	this.descricao = descricao;
    }

    public String toString() {
	return this.descricao;
    }

}