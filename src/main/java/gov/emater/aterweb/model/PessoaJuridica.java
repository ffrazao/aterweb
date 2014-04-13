package gov.emater.aterweb.model;

import gov.emater.aterweb.model.domain.PessoaTipo;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

/**
 * The persistent class for the pessoa_juridica database table.
 * 
 */
@Entity
@Table(name = "pessoa_juridica", schema = EntidadeBase.PESSOA_SCHEMA)
@DiscriminatorValue("PJ")
@PrimaryKeyJoinColumn(name = "id")
public class PessoaJuridica extends Pessoa {

	private static final long serialVersionUID = 1L;

	private String cnpj;

	@Column(name = "inscricao_estadual")
	private String inscricaoEstadual;

	public PessoaJuridica() {
		setPessoaTipo(PessoaTipo.PJ);
	}

	public String getCnpj() {
		return cnpj;
	}

	public String getInscricaoEstadual() {
		return inscricaoEstadual;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public void setInscricaoEstadual(String inscricaoEstadual) {
		this.inscricaoEstadual = inscricaoEstadual;
	}

}