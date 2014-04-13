package gov.emater.aterweb.model;

import gov.emater.aterweb.model.domain.CamOrgao;
import gov.emater.aterweb.model.domain.CnhCategoria;
import gov.emater.aterweb.model.domain.Escolaridade;
import gov.emater.aterweb.model.domain.EstadoCivil;
import gov.emater.aterweb.model.domain.Nacionalidade;
import gov.emater.aterweb.model.domain.PessoaTipo;
import gov.emater.aterweb.model.domain.RegimeCasamento;
import gov.emater.aterweb.model.domain.Sexo;
import gov.emater.aterweb.mvc.JsonDeserializerCalendar;
import gov.emater.aterweb.mvc.JsonSerializerCalendar;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * The persistent class for the pessoa_fisica database table.
 * 
 */
@Entity
@Table(name = "pessoa_fisica", schema = EntidadeBase.PESSOA_SCHEMA)
@DiscriminatorValue("PF")
@PrimaryKeyJoinColumn(name = "id")
public class PessoaFisica extends Pessoa {

    private static final long serialVersionUID = 1L;

    @Column(name = "cam_numero")
    private String camNumero;

    @Column(name = "cam_orgao")
    @Enumerated(EnumType.STRING)
    private CamOrgao camOrgao;

    @Column(name = "cam_serie")
    private String camSerie;

    @Column(name = "cam_unidade_militar")
    private String camUnidadeMilitar;

    @Column(name = "certidao_casamento_cartorio")
    private String certidaoCasamentoCartorio;

    @Column(name = "certidao_casamento_folha")
    private String certidaoCasamentoFolha;

    @Column(name = "certidao_casamento_livro")
    private String certidaoCasamentoLivro;

    @Column(name = "certidao_casamento_regime")
    @Enumerated(EnumType.STRING)
    private RegimeCasamento certidaoCasamentoRegime;

    @Column(name = "cnh_categoria")
    @Enumerated(EnumType.STRING)
    private CnhCategoria cnhCategoria;

    @Column(name = "cnh_numero")
    private String cnhNumero;

    @Column(name = "cnh_primeira_habilitacao")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @JsonSerialize(using = JsonSerializerCalendar.class)
    @JsonDeserialize(using = JsonDeserializerCalendar.class)
    private Calendar cnhPrimeiraHabilitacao;

    @Column(name = "cnh_validade")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @JsonSerialize(using = JsonSerializerCalendar.class)
    @JsonDeserialize(using = JsonDeserializerCalendar.class)
    private Calendar cnhValidade;

    private String cpf;

    @Column(name = "ctps_numero")
    private String ctpsNumero;

    @Column(name = "ctps_serie")
    private String ctpsSerie;

    @Column(name = "dap_registro")
    private String dapRegistro;

    @Enumerated(EnumType.STRING)
    private Escolaridade escolaridade;

    @Column(name = "estado_civil")
    @Enumerated(EnumType.STRING)
    private EstadoCivil estadoCivil;

    @Enumerated(EnumType.STRING)
    private Nacionalidade nacionalidade;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @JsonSerialize(using = JsonSerializerCalendar.class)
    @JsonDeserialize(using = JsonDeserializerCalendar.class)
    private Calendar nascimento;

    @ManyToOne
    @JoinColumn(name = "nascimento_localizacao_id")
    private Localizacao nascimentoLocalizacao;

    @Column(name = "nis_numero")
    private String nisNumero;

    @ManyToOne
    private Profissao profissao;

    @Column(name = "rg_data_emissao")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @JsonSerialize(using = JsonSerializerCalendar.class)
    @JsonDeserialize(using = JsonDeserializerCalendar.class)
    private Calendar rgDataEmissao;

    @ManyToOne
    @JoinColumn(name = "rg_localizacao_id")
    private Localizacao rgLocalizacao;

    @Column(name = "rg_numero")
    private String rgNumero;

    @Column(name = "rg_orgao_emissor")
    private String rgOrgaoEmissor;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Sexo sexo;

    @Column(name = "titulo_numero")
    private String tituloNumero;

    @Column(name = "titulo_secao")
    private String tituloSecao;

    @Column(name = "titulo_zona")
    private String tituloZona;

    public PessoaFisica() {
	setPessoaTipo(PessoaTipo.PF);
    }

    public String getCamNumero() {
	return camNumero;
    }

    public CamOrgao getCamOrgao() {
	return camOrgao;
    }

    public String getCamSerie() {
	return camSerie;
    }

    public String getCamUnidadeMilitar() {
	return camUnidadeMilitar;
    }

    public String getCertidaoCasamentoCartorio() {
	return certidaoCasamentoCartorio;
    }

    public String getCertidaoCasamentoFolha() {
	return certidaoCasamentoFolha;
    }

    public String getCertidaoCasamentoLivro() {
	return certidaoCasamentoLivro;
    }

    public RegimeCasamento getCertidaoCasamentoRegime() {
	return certidaoCasamentoRegime;
    }

    public CnhCategoria getCnhCategoria() {
	return cnhCategoria;
    }

    public String getCnhNumero() {
	return cnhNumero;
    }

    public Calendar getCnhPrimeiraHabilitacao() {
	return cnhPrimeiraHabilitacao;
    }

    public Calendar getCnhValidade() {
	return cnhValidade;
    }

    public String getCpf() {
	return cpf;
    }

    public String getCtpsNumero() {
	return ctpsNumero;
    }

    public String getCtpsSerie() {
	return ctpsSerie;
    }

    public String getDapRegistro() {
	return dapRegistro;
    }

    public Escolaridade getEscolaridade() {
	return escolaridade;
    }

    public EstadoCivil getEstadoCivil() {
	return estadoCivil;
    }

    public Nacionalidade getNacionalidade() {
	return nacionalidade;
    }

    public Calendar getNascimento() {
	return nascimento;
    }

    public Localizacao getNascimentoLocalizacao() {
	return nascimentoLocalizacao;
    }

    public String getNisNumero() {
	return nisNumero;
    }

    public Profissao getProfissao() {
	return profissao;
    }

    public Calendar getRgDataEmissao() {
	return rgDataEmissao;
    }

    public Localizacao getRgLocalizacao() {
	return rgLocalizacao;
    }

    public String getRgNumero() {
	return rgNumero;
    }

    public String getRgOrgaoEmissor() {
	return rgOrgaoEmissor;
    }

    public Sexo getSexo() {
	return sexo;
    }

    public String getTituloNumero() {
	return tituloNumero;
    }

    public String getTituloSecao() {
	return tituloSecao;
    }

    public String getTituloZona() {
	return tituloZona;
    }

    public void setCamNumero(String camNumero) {
	this.camNumero = camNumero;
    }

    public void setCamOrgao(CamOrgao camOrgao) {
	this.camOrgao = camOrgao;
    }

    public void setCamSerie(String camSerie) {
	this.camSerie = camSerie;
    }

    public void setCamUnidadeMilitar(String camUnidadeMilitar) {
	this.camUnidadeMilitar = camUnidadeMilitar;
    }

    public void setCertidaoCasamentoCartorio(String certidaoCasamentoCartorio) {
	this.certidaoCasamentoCartorio = certidaoCasamentoCartorio;
    }

    public void setCertidaoCasamentoFolha(String certidaoCasamentoFolha) {
	this.certidaoCasamentoFolha = certidaoCasamentoFolha;
    }

    public void setCertidaoCasamentoLivro(String certidaoCasamentoLivro) {
	this.certidaoCasamentoLivro = certidaoCasamentoLivro;
    }

    public void setCertidaoCasamentoRegime(RegimeCasamento certidaoCasamentoRegime) {
	this.certidaoCasamentoRegime = certidaoCasamentoRegime;
    }

    public void setCnhCategoria(CnhCategoria cnhCategoria) {
	this.cnhCategoria = cnhCategoria;
    }

    public void setCnhNumero(String cnhNumero) {
	this.cnhNumero = cnhNumero;
    }

    public void setCnhPrimeiraHabilitacao(Calendar cnhPrimeiraHabilitacao) {
	this.cnhPrimeiraHabilitacao = cnhPrimeiraHabilitacao;
    }

    public void setCnhValidade(Calendar cnhValidade) {
	this.cnhValidade = cnhValidade;
    }

    public void setCpf(String cpf) {
	this.cpf = cpf;
    }

    public void setCtpsNumero(String ctpsNumero) {
	this.ctpsNumero = ctpsNumero;
    }

    public void setCtpsSerie(String ctpsSerie) {
	this.ctpsSerie = ctpsSerie;
    }

    public void setDapRegistro(String dapRegistro) {
	this.dapRegistro = dapRegistro;
    }

    public void setEscolaridade(Escolaridade escolaridade) {
	this.escolaridade = escolaridade;
    }

    public void setEstadoCivil(EstadoCivil estadoCivil) {
	this.estadoCivil = estadoCivil;
    }

    public void setNacionalidade(Nacionalidade nacionalidade) {
	this.nacionalidade = nacionalidade;
    }

    public void setNascimento(Calendar nascimento) {
	this.nascimento = nascimento;
    }

    public void setNascimentoLocalizacao(Localizacao nascimentoLocalizacao) {
	this.nascimentoLocalizacao = nascimentoLocalizacao;
    }

    public void setNisNumero(String nisNumero) {
	this.nisNumero = nisNumero;
    }

    public void setProfissao(Profissao profissao) {
	this.profissao = profissao;
    }

    public void setRgDataEmissao(Calendar rgDataEmissao) {
	this.rgDataEmissao = rgDataEmissao;
    }

    public void setRgLocalizacao(Localizacao rgLocalizacao) {
	this.rgLocalizacao = rgLocalizacao;
    }

    public void setRgNumero(String rgNumero) {
	this.rgNumero = rgNumero;
    }

    public void setRgOrgaoEmissor(String rgOrgaoEmissor) {
	this.rgOrgaoEmissor = rgOrgaoEmissor;
    }

    public void setSexo(Sexo sexo) {
	this.sexo = sexo;
    }

    public void setTituloNumero(String tituloNumero) {
	this.tituloNumero = tituloNumero;
    }

    public void setTituloSecao(String tituloSecao) {
	this.tituloSecao = tituloSecao;
    }

    public void setTituloZona(String tituloZona) {
	this.tituloZona = tituloZona;
    }

}