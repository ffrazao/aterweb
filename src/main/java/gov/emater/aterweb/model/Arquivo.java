package gov.emater.aterweb.model;

import gov.emater.aterweb.dao._ChavePrimaria;

import java.util.Calendar;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "arquivo", schema = EntidadeBase.PESSOA_SCHEMA)
public class Arquivo extends EntidadeBase implements _ChavePrimaria<Integer> {

    private static final long serialVersionUID = 1L;

    @Column(name = "data_upload")
    @Temporal(TemporalType.TIMESTAMP)
    private Calendar dataUpload;

    private String descricao;

    private String extensao;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String md5;

    private String nome;

    @OneToMany(mappedBy = "arquivo")
    private List<PessoaArquivo> pessoaArquivoList;

    private Integer tamanho;

    private String tipo;

    public Calendar getDataUpload() {
	return dataUpload;
    }

    public String getDescricao() {
	return descricao;
    }

    public String getExtensao() {
	return extensao;
    }

    public Integer getId() {
	return id;
    }

    public String getMd5() {
	return md5;
    }

    public String getNome() {
	return nome;
    }

    public List<PessoaArquivo> getPessoaArquivoList() {
	return pessoaArquivoList;
    }

    public Integer getTamanho() {
	return tamanho;
    }

    public String getTipo() {
	return tipo;
    }

    public void setDataUpload(Calendar dataUpload) {
	this.dataUpload = dataUpload;
    }

    public void setDescricao(String descricao) {
	this.descricao = descricao;
    }

    public void setExtensao(String extensao) {
	this.extensao = extensao;
    }

    public void setId(Integer id) {
	this.id = id;
    }

    public void setMd5(String md5) {
	this.md5 = md5;
    }

    public void setNome(String nome) {
	this.nome = nome;
    }

    public void setPessoaArquivoList(List<PessoaArquivo> pessoaArquivoList) {
	this.pessoaArquivoList = pessoaArquivoList;
    }

    public void setTamanho(Integer tamanho) {
	this.tamanho = tamanho;
    }

    public void setTipo(String tipo) {
	this.tipo = tipo;
    }

}