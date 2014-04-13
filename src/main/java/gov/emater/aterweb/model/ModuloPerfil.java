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
 * The persistent class for the modulo_perfil database table.
 * 
 */
@Entity
@Table(name = "modulo_perfil", schema = EntidadeBase.SISTEMA_SCHEMA)
public class ModuloPerfil extends EntidadeBase implements _ChavePrimaria<Integer> {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	// bi-directional many-to-one association to Modulo
	@ManyToOne
	@JoinColumn(name = "modulo_id", referencedColumnName = "id")
	private Modulo modulo;

	// bi-directional many-to-one association to Perfil
	@ManyToOne
	@JoinColumn(name = "perfil_id", referencedColumnName = "id")
	private Perfil perfil;

	public ModuloPerfil() {
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ModuloPerfil other = (ModuloPerfil) obj;
		if (modulo == null) {
			if (other.modulo != null)
				return false;
		} else if (!modulo.equals(other.modulo))
			return false;
		if (perfil == null) {
			if (other.perfil != null)
				return false;
		} else if (!perfil.equals(other.perfil))
			return false;
		return true;
	}

	@Override
	public Integer getId() {
		return id;
	}

	public Modulo getModulo() {
		return modulo;
	}

	public Perfil getPerfil() {
		return perfil;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((modulo == null) ? 0 : modulo.hashCode());
		result = prime * result + ((perfil == null) ? 0 : perfil.hashCode());
		return result;
	}

	@Override
	public void setId(Integer id) {
		this.id = id;
	}

	public void setModulo(Modulo modulo) {
		this.modulo = modulo;
	}

	public void setPerfil(Perfil perfil) {
		this.perfil = perfil;
	}

}