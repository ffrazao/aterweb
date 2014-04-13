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
 * The persistent class for the localizacao_agrupamento database table.
 * 
 */
@Entity
@Table(name = "localizacao_agrupamento", schema = EntidadeBase.PESSOA_SCHEMA)
public class LocalizacaoAgrupamento extends EntidadeBase  implements _ChavePrimaria<Integer> {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@ManyToOne
	private Localizacao localizacao;

	@ManyToOne
	@JoinColumn(name = "localizacao_grupo_id")
	private LocalizacaoGrupo localizacaoGrupo;

	public LocalizacaoAgrupamento() {
	}

	@Override
	public Integer getId() {
		return id;
	}

	public Localizacao getLocalizacao() {
		return localizacao;
	}

	public LocalizacaoGrupo getLocalizacaoGrupo() {
		return localizacaoGrupo;
	}

	@Override
	public void setId(Integer id) {
		this.id = id;
	}

	public void setLocalizacao(Localizacao localizacao) {
		this.localizacao = localizacao;
	}

	public void setLocalizacaoGrupo(LocalizacaoGrupo localizacaoGrupo) {
		this.localizacaoGrupo = localizacaoGrupo;
	}


}