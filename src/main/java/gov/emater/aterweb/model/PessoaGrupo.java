package gov.emater.aterweb.model;

import gov.emater.aterweb.model.domain.PessoaGrupoNivelGestao;
import gov.emater.aterweb.model.domain.PessoaTipo;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

/**
 * Classe persistente da tabela pessoa_grupo
 * 
 * @author frazao
 * 
 */
@Entity
@Table(name = "pessoa_grupo", schema = EntidadeBase.PESSOA_SCHEMA)
@DiscriminatorValue("GS")
@PrimaryKeyJoinColumn(name = "id")
public class PessoaGrupo extends Pessoa {

	private static final long serialVersionUID = 1L;

	@Column(name = "nivel_gestao")
	@Enumerated(EnumType.STRING)
	private PessoaGrupoNivelGestao nivelGestao;

	@ManyToOne
	@JoinColumn(name = "pessoa_grupo_id")
	private PessoaGrupo pessoaGrupo;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "pessoa_grupo_tipo_id")
	private PessoaGrupoTipo pessoaGrupoTipo;

	public PessoaGrupo() {
		setPessoaTipo(PessoaTipo.GS);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		PessoaGrupo other = (PessoaGrupo) obj;
		if (pessoaGrupo == null) {
			if (other.pessoaGrupo != null)
				return false;
		} else if (!pessoaGrupo.equals(other.pessoaGrupo))
			return false;
		if (pessoaGrupoTipo == null) {
			if (other.pessoaGrupoTipo != null)
				return false;
		} else if (!pessoaGrupoTipo.equals(other.pessoaGrupoTipo))
			return false;
		return true;
	}

	public PessoaGrupoNivelGestao getNivelGestao() {
		return nivelGestao;
	}

	public PessoaGrupo getPessoaGrupo() {
		return pessoaGrupo;
	}

	public PessoaGrupoTipo getPessoaGrupoTipo() {
		return pessoaGrupoTipo;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result
				+ ((pessoaGrupo == null) ? 0 : pessoaGrupo.hashCode());
		result = prime * result
				+ ((pessoaGrupoTipo == null) ? 0 : pessoaGrupoTipo.hashCode());
		return result;
	}

	public void setNivelGestao(PessoaGrupoNivelGestao nivelGestao) {
		this.nivelGestao = nivelGestao;
	}

	public void setPessoaGrupo(PessoaGrupo pessoaGrupo) {
		this.pessoaGrupo = pessoaGrupo;
	}

	public void setPessoaGrupoTipo(PessoaGrupoTipo pessoaGrupoTipo) {
		this.pessoaGrupoTipo = pessoaGrupoTipo;
	}

}