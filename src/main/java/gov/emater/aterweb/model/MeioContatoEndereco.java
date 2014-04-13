package gov.emater.aterweb.model;

import gov.emater.aterweb.model.domain.Confirmacao;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

/**
 * The persistent class for the meio_contato_endereco database table.
 * 
 */
@Entity
@Table(name = "meio_contato_endereco", schema = EntidadeBase.PESSOA_SCHEMA)
@DiscriminatorValue("END")
@PrimaryKeyJoinColumn(name = "id")
public class MeioContatoEndereco extends MeioContato {

	private static final long serialVersionUID = 1L;

	private String cep;

	@NotBlank
	private String descricao;

	private Float latitude;

	@NotNull
	@ManyToOne(fetch = FetchType.EAGER)
	private Localizacao localizacao;

	private Float longitude;

	@OneToOne(fetch = FetchType.LAZY)
	@PrimaryKeyJoinColumn(name = "id")
	private PropriedadeRural propriedadeRural;

	@Column(name = "propriedade_rural_confirmacao")
	@Enumerated(EnumType.STRING)
	private Confirmacao propriedadeRuralConfirmacao;

	public MeioContatoEndereco() {
	}

	public MeioContatoEndereco(Float latitude, Float longitude) {
		setLatitude(latitude);
		setLongitude(longitude);
	}

	public MeioContatoEndereco(String descricao, Localizacao localizacao) {
		setDescricao(descricao);
		setLocalizacao(localizacao);
	}

	public String getCep() {
		return cep;
	}

	public String getDescricao() {
		return descricao;
	}

	public Float getLatitude() {
		return latitude;
	}

	public Localizacao getLocalizacao() {
		return localizacao;
	}

	public Float getLongitude() {
		return longitude;
	}

	public PropriedadeRural getPropriedadeRural() {
		return propriedadeRural;
	}

	public Confirmacao getPropriedadeRuralConfirmacao() {
		return propriedadeRuralConfirmacao;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public void setLatitude(Float latitude) {
		this.latitude = latitude;
	}

	public void setLocalizacao(Localizacao localizacao) {
		this.localizacao = localizacao;
	}

	public void setLongitude(Float longitude) {
		this.longitude = longitude;
	}

	public void setPropriedadeRural(PropriedadeRural propriedadeRural) {
		this.propriedadeRural = propriedadeRural;
	}

	public void setPropriedadeRuralConfirmacao(
			Confirmacao propriedadeRuralConfirmacao) {
		this.propriedadeRuralConfirmacao = propriedadeRuralConfirmacao;
	}

}