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
 * The persistent class for the usuario_modulo database table.
 * 
 */
@Entity
@Table(name = "usuario_modulo", schema = EntidadeBase.SISTEMA_SCHEMA)
public class UsuarioModulo extends EntidadeBase implements _ChavePrimaria<Integer> {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	// bi-directional many-to-one association to Modulo
	@ManyToOne
	@JoinColumn(name = "modulo_id", referencedColumnName="id")
	private Modulo modulo;

	// bi-directional many-to-one association to Usuario
	@ManyToOne
	@JoinColumn(name = "usuario_id", referencedColumnName="id")
	private Usuario usuario;

	public UsuarioModulo() {
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		UsuarioModulo other = (UsuarioModulo) obj;
		if (usuario == null) {
			if (other.usuario != null)
				return false;
		} else if (!usuario.equals(other.usuario))
			return false;
		if (modulo == null) {
			if (other.modulo != null)
				return false;
		} else if (!modulo.equals(other.modulo))
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

	public Usuario getUsuario() {
		return usuario;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((usuario == null) ? 0 : usuario.hashCode());
		result = prime * result + ((modulo == null) ? 0 : modulo.hashCode());
		return result;
	}

	@Override
	public void setId(Integer id) {
		this.id = id;
	}

	public void setModulo(Modulo modulo) {
		this.modulo = modulo;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

}