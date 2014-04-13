package gov.emater.aterweb.model;

import gov.emater.aterweb.dao._ChavePrimaria;
import gov.emater.aterweb.model.domain.SituacaoFundiaria;
import gov.emater.aterweb.mvc.JsonDeserializerCalendar;
import gov.emater.aterweb.mvc.JsonFormatarBigDecimal;
import gov.emater.aterweb.mvc.JsonFormatarFloat;
import gov.emater.aterweb.mvc.JsonSerializerCalendar;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.NumberFormat;
import org.springframework.format.annotation.NumberFormat.Style;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * The persistent class for the propriedade_rural database table.
 * 
 */
@Entity
@Table(name = "propriedade_rural", schema = EntidadeBase.ATER_SCHEMA)
public class PropriedadeRural extends EntidadeBase implements _ChavePrimaria<Integer> {

    private static final long serialVersionUID = 1L;

    @Column(name = "area_irrigada_aspersao")
    private String areaIrrigadaAspersao;

    @Column(name = "area_irrigada_auto_propelido")
    private String areaIrrigadaAutoPropelido;

    @Column(name = "area_irrigada_gotejamento")
    private String areaIrrigadaGotejamento;

    @Column(name = "area_irrigada_micro_aspersao")
    private String areaIrrigadaMicroAspersao;

    @Column(name = "area_irrigada_outros")
    private String areaIrrigadaOutros;

    @Column(name = "area_irrigada_pivo_central")
    private String areaIrrigadaPivoCentral;

    @Column(name = "area_irrigada_superficie")
    private String areaIrrigadaSuperficie;

    @Column(name = "area_irrigada_total")
    private String areaIrrigadaTotal;

    @NumberFormat(style = Style.CURRENCY)
    @JsonDeserialize(using = JsonFormatarBigDecimal.class)
    private BigDecimal benfeitoria;

    @OneToMany(mappedBy = "propriedadeRural")
    private List<Benfeitoria> benfeitorias;

    @Column(name = "cartorio_data_registro")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @JsonSerialize(using = JsonSerializerCalendar.class)
    @JsonDeserialize(using = JsonDeserializerCalendar.class)
    private Calendar cartorioDataRegistro;

    @Column(name = "cartorio_informacao")
    private String cartorioInformacao;

    @Column(name = "fonte_agua_domestica")
    private String fonteAguaDomestica;

    @Column(name = "fonte_agua_domestica_vazao")
    @NumberFormat(style = Style.NUMBER)
    @JsonDeserialize(using = JsonFormatarFloat.class)
    private Float fonteAguaDomesticaVazao;

    @Column(name = "fonte_agua_principal")
    private String fonteAguaPrincipal;

    @Column(name = "fonte_agua_principal_vazao")
    @NumberFormat(style = Style.NUMBER)
    @JsonDeserialize(using = JsonFormatarFloat.class)
    private Float fonteAguaPrincipalVazao;

    @Id
    private Integer id;

    @Column(name = "mao_de_obra_contratada")
    private String maoDeObraContratada;

    @Column(name = "mao_de_obra_familiar")
    private String maoDeObraFamiliar;

    @Column(name = "mao_de_obra_temporaria")
    private String maoDeObraTemporaria;

    @OneToOne(mappedBy = "propriedadeRural", fetch = FetchType.EAGER)
    private MeioContatoEndereco meioContatoEndereco;

    @Column(name = "morad_propried_familias")
    private String moradPropriedFamilias;

    @Column(name = "morad_propried_pessoas")
    private String moradPropriedPessoas;

    private String nome;

    @Column(name = "numero_registro")
    private String numeroRegistro;

    @Lob
    private String observacoes;

    private String outorga;

    @Column(name = "outorga_numero")
    private String outorgaNumero;

    @Column(name = "outorga_validade")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @JsonSerialize(using = JsonSerializerCalendar.class)
    @JsonDeserialize(using = JsonDeserializerCalendar.class)
    private Calendar outorgaValidade;

    @Column(name = "pastagem_artificial")
    private String pastagemArtificial;

    @Column(name = "pastagem_canavial")
    private String pastagemCanavial;

    @Column(name = "pastagem_capineira")
    private String pastagemCapineira;

    @Column(name = "pastagem_feno")
    private String pastagemFeno;

    @Column(name = "pastagem_ilp_ilpf")
    private String pastagemIlpIlpf;

    @Column(name = "pastagem_natural")
    private String pastagemNatural;

    @Column(name = "pastagem_rotacionada")
    private String pastagemRotacionada;

    @Column(name = "pastagem_silagem")
    private String pastagemSilagem;

    @OneToMany(mappedBy = "propriedadeRural")
    private List<PropriedadeRuralArquivo> propriedadeRuralArquivoList;

    // bi-directional many-to-one association to PropriedadeRuralLocalizacao
    @OneToMany(mappedBy = "propriedadeRural")
    private List<PropriedadeRuralLocalizacao> propriedadeRuralLocalizacaos;

    @Lob
    @Column(name = "roteiro_acesso")
    private String roteiroAcesso;

    @ManyToOne
    @JoinColumn(name = "sistema_producao_id")
    private SistemaProducao sistemaProducao;

    @Column(name = "situacao_fundiaria")
    @Enumerated(EnumType.STRING)
    private SituacaoFundiaria situacaoFundiaria;

    @Column(name = "uso_solo_benfeitoria_ha")
    @NumberFormat(style = Style.NUMBER)
    @JsonDeserialize(using = JsonFormatarFloat.class)
    private Float usoSoloBenfeitoriaHa;

    @Column(name = "uso_solo_benfeitoria_vl_tot")
    @NumberFormat(style = Style.CURRENCY)
    @JsonDeserialize(using = JsonFormatarBigDecimal.class)
    private BigDecimal usoSoloBenfeitoriaVlTot;

    @Column(name = "uso_solo_benfeitoria_vl_unit")
    @NumberFormat(style = Style.CURRENCY)
    @JsonDeserialize(using = JsonFormatarBigDecimal.class)
    private BigDecimal usoSoloBenfeitoriaVlUnit;

    @Column(name = "uso_solo_cultura_perene_ha")
    @NumberFormat(style = Style.NUMBER)
    @JsonDeserialize(using = JsonFormatarFloat.class)
    private Float usoSoloCulturaPereneHa;

    @Column(name = "uso_solo_cultura_perene_vl_tot")
    @NumberFormat(style = Style.CURRENCY)
    @JsonDeserialize(using = JsonFormatarBigDecimal.class)
    private BigDecimal usoSoloCulturaPereneVlTot;

    @Column(name = "uso_solo_cultura_perene_vl_unit")
    @NumberFormat(style = Style.CURRENCY)
    @JsonDeserialize(using = JsonFormatarBigDecimal.class)
    private BigDecimal usoSoloCulturaPereneVlUnit;

    @Column(name = "uso_solo_cultura_temporaria_ha")
    @NumberFormat(style = Style.NUMBER)
    @JsonDeserialize(using = JsonFormatarFloat.class)
    private Float usoSoloCulturaTemporariaHa;

    @Column(name = "uso_solo_cultura_temporaria_vl_tot")
    @NumberFormat(style = Style.CURRENCY)
    @JsonDeserialize(using = JsonFormatarBigDecimal.class)
    private BigDecimal usoSoloCulturaTemporariaVlTot;

    @Column(name = "uso_solo_cultura_temporaria_vl_unit")
    @NumberFormat(style = Style.CURRENCY)
    @JsonDeserialize(using = JsonFormatarBigDecimal.class)
    private BigDecimal usoSoloCulturaTemporariaVlUnit;

    @Column(name = "uso_solo_outras_ha")
    @NumberFormat(style = Style.NUMBER)
    @JsonDeserialize(using = JsonFormatarFloat.class)
    private Float usoSoloOutrasHa;

    @Column(name = "uso_solo_outras_vl_tot")
    @NumberFormat(style = Style.CURRENCY)
    @JsonDeserialize(using = JsonFormatarBigDecimal.class)
    private BigDecimal usoSoloOutrasVlTot;

    @Column(name = "uso_solo_outras_vl_unit")
    @NumberFormat(style = Style.CURRENCY)
    @JsonDeserialize(using = JsonFormatarBigDecimal.class)
    private BigDecimal usoSoloOutrasVlUnit;

    @Column(name = "uso_solo_pastagem_ha")
    @NumberFormat(style = Style.NUMBER)
    @JsonDeserialize(using = JsonFormatarFloat.class)
    private Float usoSoloPastagemHa;

    @Column(name = "uso_solo_pastagem_vl_tot")
    @NumberFormat(style = Style.CURRENCY)
    @JsonDeserialize(using = JsonFormatarBigDecimal.class)
    private BigDecimal usoSoloPastagemVlTot;

    @Column(name = "uso_solo_pastagem_vl_unit")
    @NumberFormat(style = Style.CURRENCY)
    @JsonDeserialize(using = JsonFormatarBigDecimal.class)
    private BigDecimal usoSoloPastagemVlUnit;

    @Column(name = "uso_solo_preserv_permanente_ha")
    @NumberFormat(style = Style.NUMBER)
    @JsonDeserialize(using = JsonFormatarFloat.class)
    private Float usoSoloPreservPermanenteHa;

    @Column(name = "uso_solo_preserv_permanente_vl_tot")
    @NumberFormat(style = Style.CURRENCY)
    @JsonDeserialize(using = JsonFormatarBigDecimal.class)
    private BigDecimal usoSoloPreservPermanenteVlTot;

    @Column(name = "uso_solo_preserv_permanente_vl_unit")
    @NumberFormat(style = Style.CURRENCY)
    @JsonDeserialize(using = JsonFormatarBigDecimal.class)
    private BigDecimal usoSoloPreservPermanenteVlUnit;

    @Column(name = "uso_solo_reserva_legal_ha")
    @NumberFormat(style = Style.NUMBER)
    @JsonDeserialize(using = JsonFormatarFloat.class)
    private Float usoSoloReservaLegalHa;

    @Column(name = "uso_solo_reserva_legal_vl_tot")
    @NumberFormat(style = Style.CURRENCY)
    @JsonDeserialize(using = JsonFormatarBigDecimal.class)
    private BigDecimal usoSoloReservaLegalVlTot;

    @Column(name = "uso_solo_reserva_legal_vl_unit")
    @NumberFormat(style = Style.CURRENCY)
    @JsonDeserialize(using = JsonFormatarBigDecimal.class)
    private BigDecimal usoSoloReservaLegalVlUnit;

    @Column(name = "uso_solo_total_ha")
    @NumberFormat(style = Style.NUMBER)
    @JsonDeserialize(using = JsonFormatarFloat.class)
    private Float usoSoloTotalHa;

    @Column(name = "uso_solo_total_vl_tot")
    @NumberFormat(style = Style.CURRENCY)
    @JsonDeserialize(using = JsonFormatarBigDecimal.class)
    private BigDecimal usoSoloTotalVlTot;

    @Column(name = "uso_solo_total_vl_unit")
    @NumberFormat(style = Style.CURRENCY)
    @JsonDeserialize(using = JsonFormatarBigDecimal.class)
    private BigDecimal usoSoloTotalVlUnit;

    public PropriedadeRural() {
    }

    public String getAreaIrrigadaAspersao() {
	return areaIrrigadaAspersao;
    }

    public String getAreaIrrigadaAutoPropelido() {
	return areaIrrigadaAutoPropelido;
    }

    public String getAreaIrrigadaGotejamento() {
	return areaIrrigadaGotejamento;
    }

    public String getAreaIrrigadaMicroAspersao() {
	return areaIrrigadaMicroAspersao;
    }

    public String getAreaIrrigadaOutros() {
	return areaIrrigadaOutros;
    }

    public String getAreaIrrigadaPivoCentral() {
	return areaIrrigadaPivoCentral;
    }

    public String getAreaIrrigadaSuperficie() {
	return areaIrrigadaSuperficie;
    }

    public String getAreaIrrigadaTotal() {
	return areaIrrigadaTotal;
    }

    public BigDecimal getBenfeitoria() {
	return benfeitoria;
    }

    public List<Benfeitoria> getBenfeitorias() {
	return benfeitorias;
    }

    public Calendar getCartorioDataRegistro() {
	return cartorioDataRegistro;
    }

    public String getCartorioInformacao() {
	return cartorioInformacao;
    }

    public String getFonteAguaDomestica() {
	return fonteAguaDomestica;
    }

    public Float getFonteAguaDomesticaVazao() {
	return fonteAguaDomesticaVazao;
    }

    public String getFonteAguaPrincipal() {
	return fonteAguaPrincipal;
    }

    public Float getFonteAguaPrincipalVazao() {
	return fonteAguaPrincipalVazao;
    }

    @Override
    public Integer getId() {
	return id;
    }

    public String getMaoDeObraContratada() {
	return maoDeObraContratada;
    }

    public String getMaoDeObraFamiliar() {
	return maoDeObraFamiliar;
    }

    public String getMaoDeObraTemporaria() {
	return maoDeObraTemporaria;
    }

    public MeioContatoEndereco getMeioContatoEndereco() {
	return meioContatoEndereco;
    }

    public String getMoradPropriedFamilias() {
	return moradPropriedFamilias;
    }

    public String getMoradPropriedPessoas() {
	return moradPropriedPessoas;
    }

    public String getNome() {
	return nome;
    }

    public String getNumeroRegistro() {
	return numeroRegistro;
    }

    public String getObservacoes() {
	return observacoes;
    }

    public String getOutorga() {
	return outorga;
    }

    public String getOutorgaNumero() {
	return outorgaNumero;
    }

    public Calendar getOutorgaValidade() {
	return outorgaValidade;
    }

    public String getPastagemArtificial() {
	return pastagemArtificial;
    }

    public String getPastagemCanavial() {
	return pastagemCanavial;
    }

    public String getPastagemCapineira() {
	return pastagemCapineira;
    }

    public String getPastagemFeno() {
	return pastagemFeno;
    }

    public String getPastagemIlpIlpf() {
	return pastagemIlpIlpf;
    }

    public String getPastagemNatural() {
	return pastagemNatural;
    }

    public String getPastagemRotacionada() {
	return pastagemRotacionada;
    }

    public String getPastagemSilagem() {
	return pastagemSilagem;
    }

    public List<PropriedadeRuralArquivo> getPropriedadeRuralArquivoList() {
	return propriedadeRuralArquivoList;
    }

    public List<PropriedadeRuralLocalizacao> getPropriedadeRuralLocalizacaos() {
	return propriedadeRuralLocalizacaos;
    }

    public String getRoteiroAcesso() {
	return roteiroAcesso;
    }

    public SistemaProducao getSistemaProducao() {
	return sistemaProducao;
    }

    public SituacaoFundiaria getSituacaoFundiaria() {
	return situacaoFundiaria;
    }

    public Float getUsoSoloBenfeitoriaHa() {
	return usoSoloBenfeitoriaHa;
    }

    public BigDecimal getUsoSoloBenfeitoriaVlTot() {
	return usoSoloBenfeitoriaVlTot;
    }

    public BigDecimal getUsoSoloBenfeitoriaVlUnit() {
	return usoSoloBenfeitoriaVlUnit;
    }

    public Float getUsoSoloCulturaPereneHa() {
	return usoSoloCulturaPereneHa;
    }

    public BigDecimal getUsoSoloCulturaPereneVlTot() {
	return usoSoloCulturaPereneVlTot;
    }

    public BigDecimal getUsoSoloCulturaPereneVlUnit() {
	return usoSoloCulturaPereneVlUnit;
    }

    public Float getUsoSoloCulturaTemporariaHa() {
	return usoSoloCulturaTemporariaHa;
    }

    public BigDecimal getUsoSoloCulturaTemporariaVlTot() {
	return usoSoloCulturaTemporariaVlTot;
    }

    public BigDecimal getUsoSoloCulturaTemporariaVlUnit() {
	return usoSoloCulturaTemporariaVlUnit;
    }

    public Float getUsoSoloOutrasHa() {
	return usoSoloOutrasHa;
    }

    public BigDecimal getUsoSoloOutrasVlTot() {
	return usoSoloOutrasVlTot;
    }

    public BigDecimal getUsoSoloOutrasVlUnit() {
	return usoSoloOutrasVlUnit;
    }

    public Float getUsoSoloPastagemHa() {
	return usoSoloPastagemHa;
    }

    public BigDecimal getUsoSoloPastagemVlTot() {
	return usoSoloPastagemVlTot;
    }

    public BigDecimal getUsoSoloPastagemVlUnit() {
	return usoSoloPastagemVlUnit;
    }

    public Float getUsoSoloPreservPermanenteHa() {
	return usoSoloPreservPermanenteHa;
    }

    public BigDecimal getUsoSoloPreservPermanenteVlTot() {
	return usoSoloPreservPermanenteVlTot;
    }

    public BigDecimal getUsoSoloPreservPermanenteVlUnit() {
	return usoSoloPreservPermanenteVlUnit;
    }

    public Float getUsoSoloReservaLegalHa() {
	return usoSoloReservaLegalHa;
    }

    public BigDecimal getUsoSoloReservaLegalVlTot() {
	return usoSoloReservaLegalVlTot;
    }

    public BigDecimal getUsoSoloReservaLegalVlUnit() {
	return usoSoloReservaLegalVlUnit;
    }

    public Float getUsoSoloTotalHa() {
	return usoSoloTotalHa;
    }

    public BigDecimal getUsoSoloTotalVlTot() {
	return usoSoloTotalVlTot;
    }

    public BigDecimal getUsoSoloTotalVlUnit() {
	return usoSoloTotalVlUnit;
    }

    public void setAreaIrrigadaAspersao(String areaIrrigadaAspersao) {
	this.areaIrrigadaAspersao = areaIrrigadaAspersao;
    }

    public void setAreaIrrigadaAutoPropelido(String areaIrrigadaAutoPropelido) {
	this.areaIrrigadaAutoPropelido = areaIrrigadaAutoPropelido;
    }

    public void setAreaIrrigadaGotejamento(String areaIrrigadaGotejamento) {
	this.areaIrrigadaGotejamento = areaIrrigadaGotejamento;
    }

    public void setAreaIrrigadaMicroAspersao(String areaIrrigadaMicroAspersao) {
	this.areaIrrigadaMicroAspersao = areaIrrigadaMicroAspersao;
    }

    public void setAreaIrrigadaOutros(String areaIrrigadaOutros) {
	this.areaIrrigadaOutros = areaIrrigadaOutros;
    }

    public void setAreaIrrigadaPivoCentral(String areaIrrigadaPivoCentral) {
	this.areaIrrigadaPivoCentral = areaIrrigadaPivoCentral;
    }

    public void setAreaIrrigadaSuperficie(String areaIrrigadaSuperficie) {
	this.areaIrrigadaSuperficie = areaIrrigadaSuperficie;
    }

    public void setAreaIrrigadaTotal(String areaIrrigadaTotal) {
	this.areaIrrigadaTotal = areaIrrigadaTotal;
    }

    public void setBenfeitoria(BigDecimal benfeitoria) {
	this.benfeitoria = benfeitoria;
    }

    public void setBenfeitorias(List<Benfeitoria> benfeitorias) {
	this.benfeitorias = benfeitorias;
    }

    public void setCartorioDataRegistro(Calendar cartorioDataRegistro) {
	this.cartorioDataRegistro = cartorioDataRegistro;
    }

    public void setCartorioInformacao(String cartorioInformacao) {
	this.cartorioInformacao = cartorioInformacao;
    }

    public void setFonteAguaDomestica(String fonteAguaDomestica) {
	this.fonteAguaDomestica = fonteAguaDomestica;
    }

    public void setFonteAguaDomesticaVazao(Float fonteAguaDomesticaVazao) {
	this.fonteAguaDomesticaVazao = fonteAguaDomesticaVazao;
    }

    public void setFonteAguaPrincipal(String fonteAguaPrincipal) {
	this.fonteAguaPrincipal = fonteAguaPrincipal;
    }

    public void setFonteAguaPrincipalVazao(Float fonteAguaPrincipalVazao) {
	this.fonteAguaPrincipalVazao = fonteAguaPrincipalVazao;
    }

    @Override
    public void setId(Integer id) {
	this.id = id;
    }

    public void setMaoDeObraContratada(String maoDeObraContratada) {
	this.maoDeObraContratada = maoDeObraContratada;
    }

    public void setMaoDeObraFamiliar(String maoDeObraFamiliar) {
	this.maoDeObraFamiliar = maoDeObraFamiliar;
    }

    public void setMaoDeObraTemporaria(String maoDeObraTemporaria) {
	this.maoDeObraTemporaria = maoDeObraTemporaria;
    }

    public void setMeioContatoEndereco(MeioContatoEndereco meioContatoEndereco) {
	this.meioContatoEndereco = meioContatoEndereco;
    }

    public void setMoradPropriedFamilias(String moradPropriedFamilias) {
	this.moradPropriedFamilias = moradPropriedFamilias;
    }

    public void setMoradPropriedPessoas(String moradPropriedPessoas) {
	this.moradPropriedPessoas = moradPropriedPessoas;
    }

    public void setNome(String nome) {
	this.nome = nome;
    }

    public void setNumeroRegistro(String numeroRegistro) {
	this.numeroRegistro = numeroRegistro;
    }

    public void setObservacoes(String observacoes) {
	this.observacoes = observacoes;
    }

    public void setOutorga(String outorga) {
	this.outorga = outorga;
    }

    public void setOutorgaNumero(String outorgaNumero) {
	this.outorgaNumero = outorgaNumero;
    }

    public void setOutorgaValidade(Calendar outorgaValidade) {
	this.outorgaValidade = outorgaValidade;
    }

    public void setPastagemArtificial(String pastagemArtificial) {
	this.pastagemArtificial = pastagemArtificial;
    }

    public void setPastagemCanavial(String pastagemCanavial) {
	this.pastagemCanavial = pastagemCanavial;
    }

    public void setPastagemCapineira(String pastagemCapineira) {
	this.pastagemCapineira = pastagemCapineira;
    }

    public void setPastagemFeno(String pastagemFeno) {
	this.pastagemFeno = pastagemFeno;
    }

    public void setPastagemIlpIlpf(String pastagemIlpIlpf) {
	this.pastagemIlpIlpf = pastagemIlpIlpf;
    }

    public void setPastagemNatural(String pastagemNatural) {
	this.pastagemNatural = pastagemNatural;
    }

    public void setPastagemRotacionada(String pastagemRotacionada) {
	this.pastagemRotacionada = pastagemRotacionada;
    }

    public void setPastagemSilagem(String pastagemSilagem) {
	this.pastagemSilagem = pastagemSilagem;
    }

    public void setPropriedadeRuralArquivoList(List<PropriedadeRuralArquivo> propriedadeRuralArquivoList) {
	this.propriedadeRuralArquivoList = propriedadeRuralArquivoList;
    }

    public void setPropriedadeRuralLocalizacaos(List<PropriedadeRuralLocalizacao> propriedadeRuralLocalizacaos) {
	this.propriedadeRuralLocalizacaos = propriedadeRuralLocalizacaos;
    }

    public void setRoteiroAcesso(String roteiroAcesso) {
	this.roteiroAcesso = roteiroAcesso;
    }

    public void setSistemaProducao(SistemaProducao sistemaProducao) {
	this.sistemaProducao = sistemaProducao;
    }

    public void setSituacaoFundiaria(SituacaoFundiaria situacaoFundiaria) {
	this.situacaoFundiaria = situacaoFundiaria;
    }

    public void setUsoSoloBenfeitoriaHa(Float usoSoloBenfeitoriaHa) {
	this.usoSoloBenfeitoriaHa = usoSoloBenfeitoriaHa;
    }

    public void setUsoSoloBenfeitoriaVlTot(BigDecimal usoSoloBenfeitoriaVlTot) {
	this.usoSoloBenfeitoriaVlTot = usoSoloBenfeitoriaVlTot;
    }

    public void setUsoSoloBenfeitoriaVlUnit(BigDecimal usoSoloBenfeitoriaVlUnit) {
	this.usoSoloBenfeitoriaVlUnit = usoSoloBenfeitoriaVlUnit;
    }

    public void setUsoSoloCulturaPereneHa(Float usoSoloCulturaPereneHa) {
	this.usoSoloCulturaPereneHa = usoSoloCulturaPereneHa;
    }

    public void setUsoSoloCulturaPereneVlTot(BigDecimal usoSoloCulturaPereneVlTot) {
	this.usoSoloCulturaPereneVlTot = usoSoloCulturaPereneVlTot;
    }

    public void setUsoSoloCulturaPereneVlUnit(BigDecimal usoSoloCulturaPereneVlUnit) {
	this.usoSoloCulturaPereneVlUnit = usoSoloCulturaPereneVlUnit;
    }

    public void setUsoSoloCulturaTemporariaHa(Float usoSoloCulturaTemporariaHa) {
	this.usoSoloCulturaTemporariaHa = usoSoloCulturaTemporariaHa;
    }

    public void setUsoSoloCulturaTemporariaVlTot(BigDecimal usoSoloCulturaTemporariaVlTot) {
	this.usoSoloCulturaTemporariaVlTot = usoSoloCulturaTemporariaVlTot;
    }

    public void setUsoSoloCulturaTemporariaVlUnit(BigDecimal usoSoloCulturaTemporariaVlUnit) {
	this.usoSoloCulturaTemporariaVlUnit = usoSoloCulturaTemporariaVlUnit;
    }

    public void setUsoSoloOutrasHa(Float usoSoloOutrasHa) {
	this.usoSoloOutrasHa = usoSoloOutrasHa;
    }

    public void setUsoSoloOutrasVlTot(BigDecimal usoSoloOutrasVlTot) {
	this.usoSoloOutrasVlTot = usoSoloOutrasVlTot;
    }

    public void setUsoSoloOutrasVlUnit(BigDecimal usoSoloOutrasVlUnit) {
	this.usoSoloOutrasVlUnit = usoSoloOutrasVlUnit;
    }

    public void setUsoSoloPastagemHa(Float usoSoloPastagemHa) {
	this.usoSoloPastagemHa = usoSoloPastagemHa;
    }

    public void setUsoSoloPastagemVlTot(BigDecimal usoSoloPastagemVlTot) {
	this.usoSoloPastagemVlTot = usoSoloPastagemVlTot;
    }

    public void setUsoSoloPastagemVlUnit(BigDecimal usoSoloPastagemVlUnit) {
	this.usoSoloPastagemVlUnit = usoSoloPastagemVlUnit;
    }

    public void setUsoSoloPreservPermanenteHa(Float usoSoloPreservPermanenteHa) {
	this.usoSoloPreservPermanenteHa = usoSoloPreservPermanenteHa;
    }

    public void setUsoSoloPreservPermanenteVlTot(BigDecimal usoSoloPreservPermanenteVlTot) {
	this.usoSoloPreservPermanenteVlTot = usoSoloPreservPermanenteVlTot;
    }

    public void setUsoSoloPreservPermanenteVlUnit(BigDecimal usoSoloPreservPermanenteVlUnit) {
	this.usoSoloPreservPermanenteVlUnit = usoSoloPreservPermanenteVlUnit;
    }

    public void setUsoSoloReservaLegalHa(Float usoSoloReservaLegalHa) {
	this.usoSoloReservaLegalHa = usoSoloReservaLegalHa;
    }

    public void setUsoSoloReservaLegalVlTot(BigDecimal usoSoloReservaLegalVlTot) {
	this.usoSoloReservaLegalVlTot = usoSoloReservaLegalVlTot;
    }

    public void setUsoSoloReservaLegalVlUnit(BigDecimal usoSoloReservaLegalVlUnit) {
	this.usoSoloReservaLegalVlUnit = usoSoloReservaLegalVlUnit;
    }

    public void setUsoSoloTotalHa(Float usoSoloTotalHa) {
	this.usoSoloTotalHa = usoSoloTotalHa;
    }

    public void setUsoSoloTotalVlTot(BigDecimal usoSoloTotalVlTot) {
	this.usoSoloTotalVlTot = usoSoloTotalVlTot;
    }

    public void setUsoSoloTotalVlUnit(BigDecimal usoSoloTotalVlUnit) {
	this.usoSoloTotalVlUnit = usoSoloTotalVlUnit;
    }

}