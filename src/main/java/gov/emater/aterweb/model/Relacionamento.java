package gov.emater.aterweb.model;

import gov.emater.aterweb.dao._ChavePrimaria;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * The persistent class for the relacionamento database table.
 * 
 */
@Entity
@Table(schema = EntidadeBase.PESSOA_SCHEMA)
public class Relacionamento extends EntidadeBase implements _ChavePrimaria<Integer> {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @OneToMany(mappedBy = "relacionamento")
    private List<PessoaRelacionamento> pessoaRelacionamentoList;

    @ManyToOne
    @JoinColumn(name = "relacionamento_tipo_id")
    private RelacionamentoTipo relacionamentoTipo;

    public Relacionamento() {
    }

    public Relacionamento(RelacionamentoTipo relacionamentoTipo) {
	setRelacionamentoTipo(relacionamentoTipo);
    }

    @Override
    public Integer getId() {
	return id;
    }

    public List<PessoaRelacionamento> getPessoaRelacionamentoList() {
	return pessoaRelacionamentoList;
    }

    public RelacionamentoTipo getRelacionamentoTipo() {
	return relacionamentoTipo;
    }

    @Override
    public void setId(Integer id) {
	this.id = id;
    }

    public void setPessoaRelacionamentoList(List<PessoaRelacionamento> pessoaRelacionamentoList) {
	this.pessoaRelacionamentoList = pessoaRelacionamentoList;
    }

    public void setRelacionamentoTipo(RelacionamentoTipo relacionamentoTipo) {
	this.relacionamentoTipo = relacionamentoTipo;
    }

}