package gov.emater.aterweb.model;

import gov.emater.aterweb.dao._ChavePrimaria;
import gov.emater.aterweb.mvc.JsonDeserializerCalendar;
import gov.emater.aterweb.mvc.JsonSerializerCalendar;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * The persistent class for the publico_alvo database table.
 * 
 */
@Entity
@Table(name = "publico_alvo", schema = EntidadeBase.ATER_SCHEMA)
@PrimaryKeyJoinColumn(name = "id")
public class PublicoAlvo extends EntidadeBase implements _ChavePrimaria<Integer> {

    private static final long serialVersionUID = 1L;

    @Column(name = "benef_soc_aposentadoria_pensao")
    private String benefSocAposentadoriaPensao;

    @Column(name = "benef_soc_ctps_assinada")
    private String benefSocCtpsAssinada;

    @Column(name = "benef_soc_necessid_espec")
    private String benefSocNecessidEspec;

    @Column(name = "benef_soc_prog_sociais")
    private String benefSocProgSociais;

    @Column(name = "carteira_produtor_emissao")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @JsonSerialize(using = JsonSerializerCalendar.class)
    @JsonDeserialize(using = JsonDeserializerCalendar.class)
    private Calendar carteiraProdutorEmissao;

    @Column(name = "carteira_produtor_expiracao")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @JsonSerialize(using = JsonSerializerCalendar.class)
    @JsonDeserialize(using = JsonDeserializerCalendar.class)
    private Calendar carteiraProdutorExpiracao;

    @Column(name = "carteira_produtor_numero")
    private String carteiraProdutorNumero;

    private String categoria;

    @Column(name = "compra_instituc_paa_conab")
    private String compraInstitucPaaConab;

    @Column(name = "compra_instituc_paa_estoque")
    private String compraInstitucPaaEstoque;

    @Column(name = "compra_instituc_paa_termo_adesao")
    private String compraInstitucPaaTermoAdesao;

    @Column(name = "compra_instituc_papa")
    private String compraInstitucPapa;

    @Column(name = "compra_instituc_pnae")
    private String compraInstitucPnae;

    @Column(name = "dap_numero")
    private String dapNumero;

    @Column(name = "dap_observacao")
    private String dapObservacao;

    @Column(name = "dap_situacao")
    private String dapSituacao;

    @Column(name = "forca_trab_eventual")
    private int forcaTrabEventual;

    @Column(name = "forca_trab_permanente")
    private int forcaTrabPermanente;

    @Id
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "organizacao_tipo_id")
    private OrganizacaoTipo organizacaoTipo;

    @Column(name = "patrimonio_benfeitorias")
    private BigDecimal patrimonioBenfeitorias;

    @Column(name = "patrimonio_dividas")
    private BigDecimal patrimonioDividas;

    @Column(name = "patrimonio_maquina_equip")
    private BigDecimal patrimonioMaquinaEquip;

    @Column(name = "patrimonio_outros")
    private BigDecimal patrimonioOutros;

    @Column(name = "patrimonio_semovente")
    private BigDecimal patrimonioSemovente;

    @Column(name = "patrimonio_terras")
    private BigDecimal patrimonioTerras;

    @OneToOne(mappedBy = "publicoAlvo")
    private Pessoa pessoa;

    @Column(name = "projeto_espec_atepa")
    private String projetoEspecAtepa;

    @Column(name = "projeto_espec_bsm")
    private String projetoEspecBsm;

    @Column(name = "projeto_espec_incra")
    private String projetoEspecIncra;

    @Column(name = "projeto_espec_sustentabilidade")
    private String projetoEspecSustentabilidade;

    @ManyToMany(targetEntity = PublicoAlvoSetor.class, cascade = CascadeType.ALL)
    private List<PublicoAlvoSetor> publicoAlvoSetors;

    @Column(name = "renda_bruta_anual_assalariado")
    private BigDecimal rendaBrutaAnualAssalariado;

    @Column(name = "renda_bruta_anual_outras")
    private BigDecimal rendaBrutaAnualOutras;

    @Column(name = "renda_bruta_anual_propriedade")
    private BigDecimal rendaBrutaAnualPropriedade;

    @Column(name = "salario_mensal")
    private BigDecimal salarioMensal;

    private String segmento;

    private int tradicao;

    public PublicoAlvo() {
    }

    public String getBenefSocAposentadoriaPensao() {
	return benefSocAposentadoriaPensao;
    }

    public String getBenefSocCtpsAssinada() {
	return benefSocCtpsAssinada;
    }

    public String getBenefSocNecessidEspec() {
	return benefSocNecessidEspec;
    }

    public String getBenefSocProgSociais() {
	return benefSocProgSociais;
    }

    public Calendar getCarteiraProdutorEmissao() {
	return carteiraProdutorEmissao;
    }

    public Calendar getCarteiraProdutorExpiracao() {
	return carteiraProdutorExpiracao;
    }

    public String getCarteiraProdutorNumero() {
	return carteiraProdutorNumero;
    }

    public String getCategoria() {
	return categoria;
    }

    public String getCompraInstitucPaaConab() {
	return compraInstitucPaaConab;
    }

    public String getCompraInstitucPaaEstoque() {
	return compraInstitucPaaEstoque;
    }

    public String getCompraInstitucPaaTermoAdesao() {
	return compraInstitucPaaTermoAdesao;
    }

    public String getCompraInstitucPapa() {
	return compraInstitucPapa;
    }

    public String getCompraInstitucPnae() {
	return compraInstitucPnae;
    }

    public String getDapNumero() {
	return dapNumero;
    }

    public String getDapObservacao() {
	return dapObservacao;
    }

    public String getDapSituacao() {
	return dapSituacao;
    }

    public int getForcaTrabEventual() {
	return forcaTrabEventual;
    }

    public int getForcaTrabPermanente() {
	return forcaTrabPermanente;
    }

    @Override
    public Integer getId() {
	return id;
    }

    public OrganizacaoTipo getOrganizacaoTipo() {
	return organizacaoTipo;
    }

    public BigDecimal getPatrimonioBenfeitorias() {
	return patrimonioBenfeitorias;
    }

    public BigDecimal getPatrimonioDividas() {
	return patrimonioDividas;
    }

    public BigDecimal getPatrimonioMaquinaEquip() {
	return patrimonioMaquinaEquip;
    }

    public BigDecimal getPatrimonioOutros() {
	return patrimonioOutros;
    }

    public BigDecimal getPatrimonioSemovente() {
	return patrimonioSemovente;
    }

    public BigDecimal getPatrimonioTerras() {
	return patrimonioTerras;
    }

    public Pessoa getPessoa() {
	return pessoa;
    }

    public String getProjetoEspecAtepa() {
	return projetoEspecAtepa;
    }

    public String getProjetoEspecBsm() {
	return projetoEspecBsm;
    }

    public String getProjetoEspecIncra() {
	return projetoEspecIncra;
    }

    public String getProjetoEspecSustentabilidade() {
	return projetoEspecSustentabilidade;
    }

    public List<PublicoAlvoSetor> getPublicoAlvoSetors() {
	return publicoAlvoSetors;
    }

    public BigDecimal getRendaBrutaAnualAssalariado() {
	return rendaBrutaAnualAssalariado;
    }

    public BigDecimal getRendaBrutaAnualOutras() {
	return rendaBrutaAnualOutras;
    }

    public BigDecimal getRendaBrutaAnualPropriedade() {
	return rendaBrutaAnualPropriedade;
    }

    public BigDecimal getSalarioMensal() {
	return salarioMensal;
    }

    public String getSegmento() {
	return segmento;
    }

    public int getTradicao() {
	return tradicao;
    }

    public void setBenefSocAposentadoriaPensao(String benefSocAposentadoriaPensao) {
	this.benefSocAposentadoriaPensao = benefSocAposentadoriaPensao;
    }

    public void setBenefSocCtpsAssinada(String benefSocCtpsAssinada) {
	this.benefSocCtpsAssinada = benefSocCtpsAssinada;
    }

    public void setBenefSocNecessidEspec(String benefSocNecessidEspec) {
	this.benefSocNecessidEspec = benefSocNecessidEspec;
    }

    public void setBenefSocProgSociais(String benefSocProgSociais) {
	this.benefSocProgSociais = benefSocProgSociais;
    }

    public void setCarteiraProdutorEmissao(Calendar carteiraProdutorEmissao) {
	this.carteiraProdutorEmissao = carteiraProdutorEmissao;
    }

    public void setCarteiraProdutorExpiracao(Calendar carteiraProdutorExpiracao) {
	this.carteiraProdutorExpiracao = carteiraProdutorExpiracao;
    }

    public void setCarteiraProdutorNumero(String carteiraProdutorNumero) {
	this.carteiraProdutorNumero = carteiraProdutorNumero;
    }

    public void setCategoria(String categoria) {
	this.categoria = categoria;
    }

    public void setCompraInstitucPaaConab(String compraInstitucPaaConab) {
	this.compraInstitucPaaConab = compraInstitucPaaConab;
    }

    public void setCompraInstitucPaaEstoque(String compraInstitucPaaEstoque) {
	this.compraInstitucPaaEstoque = compraInstitucPaaEstoque;
    }

    public void setCompraInstitucPaaTermoAdesao(String compraInstitucPaaTermoAdesao) {
	this.compraInstitucPaaTermoAdesao = compraInstitucPaaTermoAdesao;
    }

    public void setCompraInstitucPapa(String compraInstitucPapa) {
	this.compraInstitucPapa = compraInstitucPapa;
    }

    public void setCompraInstitucPnae(String compraInstitucPnae) {
	this.compraInstitucPnae = compraInstitucPnae;
    }

    public void setDapNumero(String dapNumero) {
	this.dapNumero = dapNumero;
    }

    public void setDapObservacao(String dapObservacao) {
	this.dapObservacao = dapObservacao;
    }

    public void setDapSituacao(String dapSituacao) {
	this.dapSituacao = dapSituacao;
    }

    public void setForcaTrabEventual(int forcaTrabEventual) {
	this.forcaTrabEventual = forcaTrabEventual;
    }

    public void setForcaTrabPermanente(int forcaTrabPermanente) {
	this.forcaTrabPermanente = forcaTrabPermanente;
    }

    @Override
    public void setId(Integer id) {
	this.id = id;
    }

    public void setOrganizacaoTipo(OrganizacaoTipo organizacaoTipo) {
	this.organizacaoTipo = organizacaoTipo;
    }

    public void setPatrimonioBenfeitorias(BigDecimal patrimonioBenfeitorias) {
	this.patrimonioBenfeitorias = patrimonioBenfeitorias;
    }

    public void setPatrimonioDividas(BigDecimal patrimonioDividas) {
	this.patrimonioDividas = patrimonioDividas;
    }

    public void setPatrimonioMaquinaEquip(BigDecimal patrimonioMaquinaEquip) {
	this.patrimonioMaquinaEquip = patrimonioMaquinaEquip;
    }

    public void setPatrimonioOutros(BigDecimal patrimonioOutros) {
	this.patrimonioOutros = patrimonioOutros;
    }

    public void setPatrimonioSemovente(BigDecimal patrimonioSemovente) {
	this.patrimonioSemovente = patrimonioSemovente;
    }

    public void setPatrimonioTerras(BigDecimal patrimonioTerras) {
	this.patrimonioTerras = patrimonioTerras;
    }

    public void setPessoa(Pessoa pessoa) {
	this.pessoa = pessoa;
    }

    public void setProjetoEspecAtepa(String projetoEspecAtepa) {
	this.projetoEspecAtepa = projetoEspecAtepa;
    }

    public void setProjetoEspecBsm(String projetoEspecBsm) {
	this.projetoEspecBsm = projetoEspecBsm;
    }

    public void setProjetoEspecIncra(String projetoEspecIncra) {
	this.projetoEspecIncra = projetoEspecIncra;
    }

    public void setProjetoEspecSustentabilidade(String projetoEspecSustentabilidade) {
	this.projetoEspecSustentabilidade = projetoEspecSustentabilidade;
    }

    public void setPublicoAlvoSetors(List<PublicoAlvoSetor> publicoAlvoSetors) {
	this.publicoAlvoSetors = publicoAlvoSetors;
    }

    public void setRendaBrutaAnualAssalariado(BigDecimal rendaBrutaAnualAssalariado) {
	this.rendaBrutaAnualAssalariado = rendaBrutaAnualAssalariado;
    }

    public void setRendaBrutaAnualOutras(BigDecimal rendaBrutaAnualOutras) {
	this.rendaBrutaAnualOutras = rendaBrutaAnualOutras;
    }

    public void setRendaBrutaAnualPropriedade(BigDecimal rendaBrutaAnualPropriedade) {
	this.rendaBrutaAnualPropriedade = rendaBrutaAnualPropriedade;
    }

    public void setSalarioMensal(BigDecimal salarioMensal) {
	this.salarioMensal = salarioMensal;
    }

    public void setSegmento(String segmento) {
	this.segmento = segmento;
    }

    public void setTradicao(int tradicao) {
	this.tradicao = tradicao;
    }

}