package gov.emater.aterweb.model;

import gov.emater.aterweb.dao._ChavePrimaria;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * The persistent class for the relacionamento_funcao database view.
 * 
 */
@Entity
@Table(name = "relacionamento_configuracao_vi", schema = EntidadeBase.PESSOA_SCHEMA)
public class RelacionamentoConfiguracaoVi extends EntidadeBase implements
		_ChavePrimaria<Integer> {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "relacionado_funcao_id")
	private RelacionamentoFuncao relacionadoFuncao;

	@Column(name = "relacionado_nome")
	private String relacionadoNome;

	@Column(name = "relacionado_nome_se_feminino")
	private String relacionadoNomeSeFeminino;

	@Column(name = "relacionado_nome_se_masculino")
	private String relacionadoNomeSeMasculino;

	@ManyToOne
	@JoinColumn(name = "relacionador_funcao_id")
	private RelacionamentoFuncao relacionadorFuncao;

	@Column(name = "relacionador_nome")
	private String relacionadorNome;

	@Column(name = "relacionador_nome_se_feminino")
	private String relacionadorNomeSeFeminino;

	@Column(name = "relacionador_nome_se_masculino")
	private String relacionadorNomeSeMasculino;

	@ManyToOne
	@JoinColumn(name = "relacionamento_tipo_id")
	private RelacionamentoTipo relacionamentoTipo;

	@Override
	public Integer getId() {
		return id;
	}

	public RelacionamentoFuncao getRelacionadoFuncao() {
		return relacionadoFuncao;
	}

	public String getRelacionadoNome() {
		return relacionadoNome;
	}

	public String getRelacionadoNomeSeFeminino() {
		return relacionadoNomeSeFeminino;
	}

	public String getRelacionadoNomeSeMasculino() {
		return relacionadoNomeSeMasculino;
	}

	public RelacionamentoFuncao getRelacionadorFuncao() {
		return relacionadorFuncao;
	}

	public String getRelacionadorNome() {
		return relacionadorNome;
	}

	public String getRelacionadorNomeSeFeminino() {
		return relacionadorNomeSeFeminino;
	}

	public String getRelacionadorNomeSeMasculino() {
		return relacionadorNomeSeMasculino;
	}

	public RelacionamentoTipo getRelacionamentoTipo() {
		return relacionamentoTipo;
	}

	@Override
	public void setId(Integer id) {
		this.id = id;
	}

	public void setRelacionadoFuncao(RelacionamentoFuncao relacionadoFuncao) {
		this.relacionadoFuncao = relacionadoFuncao;
	}

	public void setRelacionadoNome(String relacionadoNome) {
		this.relacionadoNome = relacionadoNome;
	}

	public void setRelacionadoNomeSeFeminino(String relacionadoNomeSeFeminino) {
		this.relacionadoNomeSeFeminino = relacionadoNomeSeFeminino;
	}

	public void setRelacionadoNomeSeMasculino(String relacionadoNomeSeMasculino) {
		this.relacionadoNomeSeMasculino = relacionadoNomeSeMasculino;
	}

	public void setRelacionadorFuncao(RelacionamentoFuncao relacionadorFuncao) {
		this.relacionadorFuncao = relacionadorFuncao;
	}

	public void setRelacionadorNome(String relacionadorNome) {
		this.relacionadorNome = relacionadorNome;
	}

	public void setRelacionadorNomeSeFeminino(String relacionadorNomeSeFeminino) {
		this.relacionadorNomeSeFeminino = relacionadorNomeSeFeminino;
	}

	public void setRelacionadorNomeSeMasculino(
			String relacionadorNomeSeMasculino) {
		this.relacionadorNomeSeMasculino = relacionadorNomeSeMasculino;
	}

	public void setRelacionamentoTipo(RelacionamentoTipo relacionamentoTipo) {
		this.relacionamentoTipo = relacionamentoTipo;
	}

}