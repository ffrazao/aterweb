package gov.emater.aterweb.model;

import gov.emater.aterweb.dao._ChavePrimaria;
import gov.emater.aterweb.model.domain.Confirmacao;
import gov.emater.aterweb.model.domain.PessoaSituacao;
import gov.emater.aterweb.model.domain.PessoaTipo;

import java.util.Calendar;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonTypeInfo;

/**
 * The persistent class for the pessoa database table.
 * 
 */
@Entity
@Table(schema = EntidadeBase.PESSOA_SCHEMA)
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "pessoa_tipo", discriminatorType = DiscriminatorType.STRING)
// para identificar classes dentro de contextos polimórficos
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS)
public class Pessoa extends EntidadeBase implements _ChavePrimaria<Integer> {

    private static final long serialVersionUID = 1L;

    @Column(name = "apelido_sigla")
    private String apelidoSigla;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotBlank
    private String nome;

    @Lob
    private String observacoes;

    @OneToMany(mappedBy = "pessoa")
    private List<PessoaArquivo> pessoaArquivoList;

    @OneToMany(mappedBy = "pessoa", fetch = FetchType.LAZY)
    private List<PessoaMeioContato> pessoaMeioContatos;

    @OneToMany(mappedBy = "pessoa", fetch = FetchType.LAZY)
    private List<PessoaRelacionamento> pessoaRelacionamentos;

    @Column(name = "pessoa_tipo")
    @Enumerated(EnumType.STRING)
    private PessoaTipo pessoaTipo;

    @OneToOne
    @PrimaryKeyJoinColumn
    private PublicoAlvo publicoAlvo;

    @Column(name = "publico_alvo")
    @Enumerated(EnumType.STRING)
    private Confirmacao publicoAlvoConfirmacao;

    @Enumerated(EnumType.STRING)
    private PessoaSituacao situacao;

    @Column(name = "situacao_data")
    @Temporal(TemporalType.TIMESTAMP)
    private Calendar situacaoData;

    @OneToOne(cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private Usuario usuario;

    public Pessoa() {
    }

    public String getApelidoSigla() {
	return apelidoSigla;
    }

    @Override
    public Integer getId() {
	return id;
    }

    public String getNome() {
	return nome;
    }

    public String getObservacoes() {
	return observacoes;
    }

    public List<PessoaArquivo> getPessoaArquivoList() {
	return pessoaArquivoList;
    }

    public List<PessoaMeioContato> getPessoaMeioContatos() {
	return pessoaMeioContatos;
    }

    public List<PessoaRelacionamento> getPessoaRelacionamentos() {
	return pessoaRelacionamentos;
    }

    public PessoaTipo getPessoaTipo() {
	return pessoaTipo;
    }

    public PublicoAlvo getPublicoAlvo() {
	return publicoAlvo;
    }

    public Confirmacao getPublicoAlvoConfirmacao() {
	return publicoAlvoConfirmacao;
    }

    public PessoaSituacao getSituacao() {
	return situacao;
    }

    public Calendar getSituacaoData() {
	return situacaoData;
    }

    public Usuario getUsuario() {
	return usuario;
    }

    public void setApelidoSigla(String apelidoSigla) {
	this.apelidoSigla = apelidoSigla;
    }

    @Override
    public void setId(Integer id) {
	this.id = id;
    }

    public void setNome(String nome) {
	this.nome = nome;
    }

    public void setObservacoes(String observacoes) {
	this.observacoes = observacoes;
    }

    public void setPessoaArquivoList(List<PessoaArquivo> pessoaArquivoList) {
	this.pessoaArquivoList = pessoaArquivoList;
    }

    public void setPessoaMeioContatos(List<PessoaMeioContato> pessoaMeioContatos) {
	this.pessoaMeioContatos = pessoaMeioContatos;
    }

    public void setPessoaRelacionamentos(List<PessoaRelacionamento> pessoaRelacionamentos) {
	this.pessoaRelacionamentos = pessoaRelacionamentos;
    }

    public void setPessoaTipo(PessoaTipo pessoaTipo) {
	this.pessoaTipo = pessoaTipo;
    }

    public void setPublicoAlvo(PublicoAlvo publicoAlvo) {
	this.publicoAlvo = publicoAlvo;
    }

    public void setPublicoAlvoConfirmacao(Confirmacao publicoAlvoConfirmacao) {
	this.publicoAlvoConfirmacao = publicoAlvoConfirmacao;
    }

    public void setSituacao(PessoaSituacao situacao) {
	this.situacao = situacao;
    }

    public void setSituacaoData(Calendar situacaoData) {
	this.situacaoData = situacaoData;
    }

    public void setUsuario(Usuario usuario) {
	this.usuario = usuario;
    }

}