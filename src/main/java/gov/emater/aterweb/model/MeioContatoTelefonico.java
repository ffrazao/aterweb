package gov.emater.aterweb.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

/**
 * The persistent class for the meio_contato_telefonico database table.
 * 
 */
@Entity
@Table(name = "meio_contato_telefonico", schema = EntidadeBase.PESSOA_SCHEMA)
@DiscriminatorValue("TEL")
@PrimaryKeyJoinColumn(name = "id")
public class MeioContatoTelefonico extends MeioContato {

	private static final long serialVersionUID = 1L;

	private String numero;

	public MeioContatoTelefonico() {
	}

	public MeioContatoTelefonico(String numero) {
		setNumero(numero);
	}

	public String getNumero() {
		return this.numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}
}