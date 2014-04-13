package gov.emater.aterweb.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

/**
 * The persistent class for the meio_contato_email database table.
 * 
 */
@Entity
@Table(name = "meio_contato_email", schema = EntidadeBase.PESSOA_SCHEMA)
@DiscriminatorValue("EMA")
@PrimaryKeyJoinColumn(name = "id")
public class MeioContatoEmail extends MeioContato {

	private static final long serialVersionUID = 1L;

	private String email;

	public MeioContatoEmail() {
	}

	public MeioContatoEmail(String email) {
		setEmail(email);
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}