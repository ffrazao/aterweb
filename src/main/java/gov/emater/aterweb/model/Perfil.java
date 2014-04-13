package gov.emater.aterweb.model;

import gov.emater.aterweb.dao._ChavePrimaria;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * The persistent class for the perfil database table.
 * 
 */
@Entity
@Table(schema = EntidadeBase.SISTEMA_SCHEMA)
public class Perfil extends EntidadeBase implements _ChavePrimaria<Integer> {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	// bi-directional many-to-one association to ModuloPerfil
	@OneToMany(mappedBy = "perfil")
	private List<ModuloPerfil> moduloPerfils;

	private String nome;

	public Perfil() {
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		Perfil other = (Perfil) obj;
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
		return true;
	}

	@Override
	public Integer getId() {
		return id;
	}

	public List<ModuloPerfil> getModuloPerfils() {
		return moduloPerfils;
	}

	public String getNome() {
		return nome;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((nome == null) ? 0 : nome.hashCode());
		return result;
	}

	@Override
	public void setId(Integer id) {
		this.id = id;
	}

	public void setModuloPerfils(List<ModuloPerfil> moduloPerfils) {
		this.moduloPerfils = moduloPerfils;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

}