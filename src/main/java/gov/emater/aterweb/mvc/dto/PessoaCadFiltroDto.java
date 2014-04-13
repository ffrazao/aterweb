package gov.emater.aterweb.mvc.dto;

import gov.emater.aterweb.model.domain.PessoaTipo;

public class PessoaCadFiltroDto implements Dto {

    private static final long serialVersionUID = 1L;

    private String cpfCnpj;

    private String nome;

    private PessoaTipo tipoPessoa;

    public String getCpfCnpj() {
	return cpfCnpj;
    }

    public String getNome() {
	return nome;
    }

    public PessoaTipo getTipoPessoa() {
	return tipoPessoa;
    }

    public void setCpfCnpj(String cpfCnpj) {
	this.cpfCnpj = cpfCnpj;
    }

    public void setNome(String nome) {
	this.nome = nome;
    }

    public void setTipoPessoa(PessoaTipo tipoPessoa) {
	this.tipoPessoa = tipoPessoa;
    }
}
