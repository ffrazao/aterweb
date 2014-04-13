package gov.emater.aterweb.model;

import gov.emater.aterweb.dao._ChavePrimaria;
import gov.emater.aterweb.model.domain.Confirmacao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * The persistent class for the relacionamento_tipo database table.
 * 
 */
@Entity
@Table(name = "relacionamento_tipo", schema = EntidadeBase.PESSOA_SCHEMA)
public class RelacionamentoTipo extends EntidadeBase implements _ChavePrimaria<Integer> {

    public enum Codigo {
	ACADEMICO, FAMILIAR, GESTAO_GRUPO_SOCIAL, PROFISSIONAL
    }

    private static final long serialVersionUID = 1L;

    private String codigo;

    @Column(name = "gerado_pelo_sistema")
    @Enumerated(EnumType.STRING)
    private Confirmacao geradoPeloSistema = Confirmacao.N;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String nome;

    @ManyToOne
    @JoinColumn(name = "relacionamento_tipo_id")
    private RelacionamentoTipo relacionamentoTipo;

    @Enumerated(EnumType.STRING)
    private Confirmacao temporario = Confirmacao.N;

    public RelacionamentoTipo() {
    }

    public RelacionamentoTipo(Codigo codigo) {
	setCodigo(codigo.name());
    }

    public String getCodigo() {
	return codigo;
    }

    public Confirmacao getGeradoPeloSistema() {
	return geradoPeloSistema;
    }

    @Override
    public Integer getId() {
	return id;
    }

    public String getNome() {
	return nome;
    }

    public RelacionamentoTipo getRelacionamentoTipo() {
	return relacionamentoTipo;
    }

    public Confirmacao getTemporario() {
	return temporario;
    }

    public void setCodigo(String codigo) {
	this.codigo = codigo;
    }

    public void setGeradoPeloSistema(Confirmacao geradoPeloSistema) {
	this.geradoPeloSistema = geradoPeloSistema;
    }

    @Override
    public void setId(Integer id) {
	this.id = id;
    }

    public void setNome(String nome) {
	this.nome = nome;
    }

    public void setRelacionamentoTipo(RelacionamentoTipo relacionamentoTipo) {
	this.relacionamentoTipo = relacionamentoTipo;
    }

    public void setTemporario(Confirmacao temporario) {
	this.temporario = temporario;
    }

}