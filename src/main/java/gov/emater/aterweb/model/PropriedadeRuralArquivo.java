package gov.emater.aterweb.model;

import gov.emater.aterweb.dao._ChavePrimaria;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "propriedade_rural_arquivo", schema = EntidadeBase.ATER_SCHEMA)
public class PropriedadeRuralArquivo extends EntidadeBase implements
		_ChavePrimaria<Integer> {

	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name = "arquivo_id")
	private Arquivo arquivo;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "propriedade_rural_id")
	private PropriedadeRural propriedadeRural;

	public Arquivo getArquivo() {
		return arquivo;
	}

	@Override
	public Integer getId() {
		return id;
	}

	public PropriedadeRural getPropriedadeRural() {
		return propriedadeRural;
	}

	public void setArquivo(Arquivo arquivo) {
		this.arquivo = arquivo;
	}

	@Override
	public void setId(Integer id) {
		this.id = id;
	}

	public void setPropriedadeRural(PropriedadeRural propriedadeRural) {
		this.propriedadeRural = propriedadeRural;
	}

}
