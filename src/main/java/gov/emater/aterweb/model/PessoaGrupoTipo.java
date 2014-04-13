package gov.emater.aterweb.model;

import gov.emater.aterweb.dao._ChavePrimaria;
import gov.emater.aterweb.model.domain.Confirmacao;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonTypeInfo;

@Entity
@Table(name = "pessoa_grupo_tipo", schema = EntidadeBase.PESSOA_SCHEMA)
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS)
public class PessoaGrupoTipo extends EntidadeBase implements _ChavePrimaria<Integer> {

    public enum Codigo {
	FAIXA_ETARIA, GENERO, ORGANOGRAMA, PERSONALIZADO
    }

    private static final long serialVersionUID = 1L;

    private String codigo;

    @Column(name = "gerado_pelo_sistema")
    @Enumerated(EnumType.STRING)
    private Confirmacao geradoPeloSistema;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String nome;

    @OneToMany(mappedBy = "pessoaGrupoTipo")
    private List<PessoaGrupo> pessoaGrupo;

    @Column(name = "sql_elementos")
    @Lob
    private String sqlElementos;

    public PessoaGrupoTipo() {

    }

    public PessoaGrupoTipo(Codigo codigo) {
	setCodigo(codigo.name());
    }

    @Override
    public boolean equals(Object obj) {
	if (this == obj)
	    return true;
	if (!super.equals(obj))
	    return false;
	if (getClass() != obj.getClass())
	    return false;
	PessoaGrupoTipo other = (PessoaGrupoTipo) obj;
	if (geradoPeloSistema != other.geradoPeloSistema)
	    return false;
	if (id == null) {
	    if (other.id != null)
		return false;
	} else if (!id.equals(other.id))
	    return false;
	if (nome == null) {
	    if (other.nome != null)
		return false;
	} else if (!nome.equals(other.nome))
	    return false;
	if (pessoaGrupo == null) {
	    if (other.pessoaGrupo != null)
		return false;
	} else if (!pessoaGrupo.equals(other.pessoaGrupo))
	    return false;
	if (sqlElementos == null) {
	    if (other.sqlElementos != null)
		return false;
	} else if (!sqlElementos.equals(other.sqlElementos))
	    return false;
	return true;
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

    public List<PessoaGrupo> getPessoaGrupo() {
	return pessoaGrupo;
    }

    public String getSqlElementos() {
	return sqlElementos;
    }

    @Override
    public int hashCode() {
	final int prime = 31;
	int result = super.hashCode();
	result = prime * result + ((geradoPeloSistema == null) ? 0 : geradoPeloSistema.hashCode());
	result = prime * result + ((id == null) ? 0 : id.hashCode());
	result = prime * result + ((nome == null) ? 0 : nome.hashCode());
	result = prime * result + ((pessoaGrupo == null) ? 0 : pessoaGrupo.hashCode());
	result = prime * result + ((sqlElementos == null) ? 0 : sqlElementos.hashCode());
	return result;
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

    public void setPessoaGrupo(List<PessoaGrupo> pessoaGrupo) {
	this.pessoaGrupo = pessoaGrupo;
    }

    public void setSqlElementos(String sqlElementos) {
	this.sqlElementos = sqlElementos;
    }

}
