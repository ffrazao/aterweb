package gov.emater.aterweb.model;

import gov.emater.aterweb.dao._ChavePrimaria;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * The persistent class for the benfeitoria database table.
 * 
 */
@Entity
@Table(schema = EntidadeBase.ATER_SCHEMA)
public class Benfeitoria extends EntidadeBase implements _ChavePrimaria<Integer> {

	private static final long serialVersionUID = 1L;

	private String caracteristica;

	private String especificacao;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "propriedade_rural_id")
	private PropriedadeRural propriedadeRural;

	private float quantidade;

	private String unidade;

	@Column(name = "valor_total")
	private BigDecimal valorTotal;

	@Column(name = "valor_unitario")
	private BigDecimal valorUnitario;

	public Benfeitoria() {
	}

	public String getCaracteristica() {
		return caracteristica;
	}

	public String getEspecificacao() {
		return especificacao;
	}

	@Override
	public Integer getId() {
		return id;
	}

	public PropriedadeRural getPropriedadeRural() {
		return propriedadeRural;
	}

	public float getQuantidade() {
		return quantidade;
	}

	public String getUnidade() {
		return unidade;
	}

	public BigDecimal getValorTotal() {
		return valorTotal;
	}

	public BigDecimal getValorUnitario() {
		return valorUnitario;
	}

	public void setCaracteristica(String caracteristica) {
		this.caracteristica = caracteristica;
	}

	public void setEspecificacao(String especificacao) {
		this.especificacao = especificacao;
	}

	@Override
	public void setId(Integer id) {
		this.id = id;
	}

	public void setPropriedadeRural(PropriedadeRural propriedadeRural) {
		this.propriedadeRural = propriedadeRural;
	}

	public void setQuantidade(float quantidade) {
		this.quantidade = quantidade;
	}

	public void setUnidade(String unidade) {
		this.unidade = unidade;
	}

	public void setValorTotal(BigDecimal valorTotal) {
		this.valorTotal = valorTotal;
	}

	public void setValorUnitario(BigDecimal valorUnitario) {
		this.valorUnitario = valorUnitario;
	}

}