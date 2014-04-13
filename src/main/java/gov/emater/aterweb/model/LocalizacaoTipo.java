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
 * The persistent class for the localizacao_tipo database table.
 * 
 */
@Entity
@Table(name = "localizacao_tipo", schema = EntidadeBase.PESSOA_SCHEMA)
public class LocalizacaoTipo extends EntidadeBase implements _ChavePrimaria<Integer> {

    public enum Codigo {
	BACIA_HIDROGRAFICA, CIDADE, COMUNIDADE, ESTADO, MUNICIPIO, PAIS, TERRITORIAL;
    }

    private static final long serialVersionUID = 1L;

    private String codigo;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "localizacao_tipo_id")
    private LocalizacaoTipo localizacaoTipo;

    private String nome;

    public LocalizacaoTipo() {
    }

    public LocalizacaoTipo(Codigo codigo) {
	setCodigo(codigo.name());
    }

    public String getCodigo() {
	return codigo;
    }

    @Override
    public Integer getId() {
	return id;
    }

    public LocalizacaoTipo getLocalizacaoTipo() {
	return localizacaoTipo;
    }

    public String getNome() {
	return nome;
    }

    public void setCodigo(String codigo) {
	this.codigo = codigo;
    }

    @Override
    public void setId(Integer id) {
	this.id = id;
    }

    public void setLocalizacaoTipo(LocalizacaoTipo localizacaoTipo) {
	this.localizacaoTipo = localizacaoTipo;
    }

    public void setNome(String nome) {
	this.nome = nome;
    }

}