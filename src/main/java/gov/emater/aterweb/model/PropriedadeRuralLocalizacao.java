package gov.emater.aterweb.model;

import gov.emater.aterweb.dao._ChavePrimaria;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * The persistent class for the propriedade_rural_localizacao database table.
 * 
 */
@Entity
@Table(name = "propriedade_rural_localizacao", schema = EntidadeBase.ATER_SCHEMA)
public class PropriedadeRuralLocalizacao extends EntidadeBase implements
		_ChavePrimaria<Integer> {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "localizacao_id")
	private Localizacao localizacao;

	@ManyToOne
	@JoinColumn(name = "propriedade_rural_id")
	private PropriedadeRural propriedadeRural;

	public PropriedadeRuralLocalizacao() {
	}

	public PropriedadeRuralLocalizacao(PropriedadeRural propriedadeRural,
			Localizacao localizacao) {
		setPropriedadeRural(propriedadeRural);
		setLocalizacao(localizacao);
	}

	@Override
	public Integer getId() {
		return id;
	}

	public Localizacao getLocalizacao() {
		return localizacao;
	}

	public PropriedadeRural getPropriedadeRural() {
		return propriedadeRural;
	}

	@Override
	public void setId(Integer id) {
		this.id = id;
	}

	public void setLocalizacao(Localizacao localizacao) {
		this.localizacao = localizacao;
	}

	public void setPropriedadeRural(PropriedadeRural propriedadeRural) {
		this.propriedadeRural = propriedadeRural;
	}

}