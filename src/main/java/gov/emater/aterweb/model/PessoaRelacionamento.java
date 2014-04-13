package gov.emater.aterweb.model;

import gov.emater.aterweb.dao._ChavePrimaria;
import gov.emater.aterweb.model.domain.Confirmacao;
import gov.emater.aterweb.mvc.JsonDeserializerCalendar;
import gov.emater.aterweb.mvc.JsonSerializerCalendar;

import java.util.Calendar;

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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * The persistent class for the pessoa_relacionamento database table.
 * 
 */
@Entity
@Table(name = "pessoa_relacionamento", schema = EntidadeBase.PESSOA_SCHEMA)
public class PessoaRelacionamento extends EntidadeBase implements _ChavePrimaria<Integer> {

    private static final long serialVersionUID = 1L;

    /**
     * campo fake para manter informações do cpf/cnpj do relacionado enquanto o
     * seu registro principal não gerado
     */
    @Column(name = "cpf_cnpj")
    private String cpfCnpj;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @JsonSerialize(using = JsonSerializerCalendar.class)
    @JsonDeserialize(using = JsonDeserializerCalendar.class)
    private Calendar inicio;

    /**
     * campo fake para manter informações do cpf/cnpj do relacionado enquanto o
     * seu registro principal não gerado
     */
    private String nome;

    @ManyToOne
    private Pessoa pessoa;

    @Column(name = "pode_modificar")
    @Enumerated(EnumType.STRING)
    private Confirmacao podeModificar = Confirmacao.N;

    @Enumerated(EnumType.STRING)
    private Confirmacao proprietario = Confirmacao.N;

    @ManyToOne
    @JoinColumn(name = "relacionamento_id")
    private Relacionamento relacionamento;

    @ManyToOne
    @JoinColumn(name = "relacionamento_funcao_id")
    private RelacionamentoFuncao relacionamentoFuncao;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @JsonSerialize(using = JsonSerializerCalendar.class)
    @JsonDeserialize(using = JsonDeserializerCalendar.class)
    private Calendar termino;

    public PessoaRelacionamento() {
    }

    public PessoaRelacionamento(Pessoa pessoa) {
	setPessoa(pessoa);
    }

    public PessoaRelacionamento(Pessoa pessoa, Relacionamento relacionamento) {
	this(pessoa);
	setRelacionamento(relacionamento);
    }

    public PessoaRelacionamento(Pessoa pessoa, Relacionamento relacionamento, RelacionamentoFuncao funcao) {
	this(pessoa);
	setRelacionamento(relacionamento);
	setRelacionamentoFuncao(funcao);
    }

    public PessoaRelacionamento(Relacionamento relacionamento) {
	setRelacionamento(relacionamento);
    }

    public String getCpfCnpj() {
	return cpfCnpj;
    }

    @Override
    public Integer getId() {
	return id;
    }

    public Calendar getInicio() {
	return inicio;
    }

    public String getNome() {
	return nome;
    }

    public Pessoa getPessoa() {
	return pessoa;
    }

    public Confirmacao getPodeModificar() {
	return podeModificar;
    }

    public Confirmacao getProprietario() {
	return proprietario;
    }

    public Relacionamento getRelacionamento() {
	return relacionamento;
    }

    public RelacionamentoFuncao getRelacionamentoFuncao() {
	return relacionamentoFuncao;
    }

    public Calendar getTermino() {
	return termino;
    }

    public void setCpfCnpj(String cpfCnpj) {
	this.cpfCnpj = cpfCnpj;
    }

    @Override
    public void setId(Integer id) {
	this.id = id;
    }

    public void setInicio(Calendar inicio) {
	this.inicio = inicio;
    }

    public void setNome(String nome) {
	this.nome = nome;
    }

    public void setPessoa(Pessoa pessoa) {
	this.pessoa = pessoa;
    }

    public void setPodeModificar(Confirmacao podeModificar) {
	this.podeModificar = podeModificar;
    }

    public void setProprietario(Confirmacao proprietario) {
	this.proprietario = proprietario;
    }

    public void setRelacionamento(Relacionamento relacionamento) {
	this.relacionamento = relacionamento;
    }

    public void setRelacionamentoFuncao(RelacionamentoFuncao relacionamentoFuncao) {
	this.relacionamentoFuncao = relacionamentoFuncao;
    }

    public void setTermino(Calendar termino) {
	this.termino = termino;
    }
}