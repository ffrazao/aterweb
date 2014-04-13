package gov.emater.aterweb.model;

import gov.emater.aterweb.dao._ChavePrimaria;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * The persistent class for the benfeitoria database table.
 * 
 */
@Entity
@Table(name = "sistema_producao", schema = EntidadeBase.ATER_SCHEMA)
public class SistemaProducao extends EntidadeBase implements _ChavePrimaria<Integer> {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String nome;

    @Override
    public Integer getId() {
	return id;
    }

    public String getNome() {
	return nome;
    }

    @Override
    public void setId(Integer id) {
	this.id = id;
    }

    public void setNome(String nome) {
	this.nome = nome;
    }

}