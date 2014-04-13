package gov.emater.aterweb.model;

import gov.emater.aterweb.dao._ChavePrimaria;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

/**
 * The persistent class for the exploracao database table.
 * 
 */
@Entity
@Table(schema = EntidadeBase.ATER_SCHEMA)
@PrimaryKeyJoinColumn(name = "id")
public class Exploracao extends EntidadeBase implements _ChavePrimaria<Integer> {

	private static final long serialVersionUID = 1L;

	private Float area;

	@Id
	private Integer id;

	@OneToOne(mappedBy = "exploracao")
	private PessoaMeioContato pessoaMeioContato;

	private String regime;

	public Exploracao() {
	}

	public Float getArea() {
		return area;
	}

	public Integer getId() {
		return id;
	}

	public PessoaMeioContato getPessoaMeioContato() {
		return pessoaMeioContato;
	}

	public String getRegime() {
		return regime;
	}

	public void setArea(Float area) {
		this.area = area;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setPessoaMeioContato(PessoaMeioContato pessoaMeioContato) {
		this.pessoaMeioContato = pessoaMeioContato;
	}

	public void setRegime(String regime) {
		this.regime = regime;
	}
}