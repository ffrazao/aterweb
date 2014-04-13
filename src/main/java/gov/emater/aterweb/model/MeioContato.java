package gov.emater.aterweb.model;

import gov.emater.aterweb.dao._ChavePrimaria;
import gov.emater.aterweb.model.domain.MeioContatoTipo;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonTypeInfo;

/**
 * The persistent class for the meio_contato database table.
 * 
 */
@Entity
@Table(name = "meio_contato", schema = EntidadeBase.PESSOA_SCHEMA)
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "meio_contato_tipo", discriminatorType = DiscriminatorType.STRING)
// para identificar classes dentro de contextos polimórficos
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS)
public class MeioContato extends EntidadeBase implements
		_ChavePrimaria<Integer> {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Column(name = "meio_contato_tipo")
	@Enumerated(EnumType.STRING)
	private MeioContatoTipo meioContatoTipo;

	public MeioContato() {
	}

	@Override
	public Integer getId() {
		return id;
	}

	public MeioContatoTipo getMeioContatoTipo() {
		return meioContatoTipo;
	}

	@Override
	public void setId(Integer id) {
		this.id = id;
	}

	public void setMeioContatoTipo(MeioContatoTipo meioContatoTipo) {
		this.meioContatoTipo = meioContatoTipo;
	}

}