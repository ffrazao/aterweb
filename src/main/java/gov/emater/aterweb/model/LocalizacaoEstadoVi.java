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
 * The persistent class for the localizacao_estado_vi database table.
 * 
 */
@Entity
@Table(name = "localizacao_estado_vi", schema = EntidadeBase.PESSOA_SCHEMA)
public class LocalizacaoEstadoVi extends EntidadeBase implements
		_ChavePrimaria<Integer> {

	private static final long serialVersionUID = 1L;

	private String codigo;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "localizacao_id")
	private LocalizacaoPaisVi localizacaoPaisVi;

	@ManyToOne
	@JoinColumn(name = "localizacao_tipo_id")
	private LocalizacaoTipo localizacaoTipo;

	private String nome;

	private String sigla;

	public LocalizacaoEstadoVi() {
	}

	public String getCodigo() {
		return codigo;
	}

	@Override
	public Integer getId() {
		return id;
	}

	public LocalizacaoPaisVi getLocalizacaoPaisVi() {
		return localizacaoPaisVi;
	}

	public LocalizacaoTipo getLocalizacaoTipo() {
		return localizacaoTipo;
	}

	public String getNome() {
		return nome;
	}

	public String getSigla() {
		return sigla;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	@Override
	public void setId(Integer id) {
		this.id = id;
	}

	public void setLocalizacaoPaisVi(LocalizacaoPaisVi localizacaoPaisVi) {
		this.localizacaoPaisVi = localizacaoPaisVi;
	}

	public void setLocalizacaoTipo(LocalizacaoTipo localizacaoTipo) {
		this.localizacaoTipo = localizacaoTipo;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public void setSigla(String sigla) {
		this.sigla = sigla;
	}

}