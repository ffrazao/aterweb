package gov.emater.aterweb.mvc.dto;

import gov.emater.aterweb.model.Pessoa;
import gov.emater.aterweb.model.PessoaGrupoTipo;
import gov.emater.aterweb.model.domain.PessoaSituacao;

public class PessoaGrupoCadFiltroDto implements Dto {

	private static final long serialVersionUID = 1L;

	private Pessoa gestorGrupoEmpresa;

	private boolean gestorGrupoEmpresaCheck;

	private Pessoa gestorGrupoTecnico;

	private boolean gestorGrupoTecnicoCheck;

	private boolean gestorGrupoTodosCheck;

	private Pessoa gestorGrupoUnidadeOrganizacional;

	private boolean gestorGrupoUnidadeOrganizacionalCheck;

	private String nome;

	private PessoaGrupoTipo pessoaGrupoTipo;

	private PessoaSituacao situacaoGrupo;

	public PessoaGrupoCadFiltroDto() {

	}

	public PessoaGrupoCadFiltroDto(String nome) {
		setNome(nome);
	}

	public Pessoa getGestorGrupoEmpresa() {
		return gestorGrupoEmpresa;
	}

	public Pessoa getGestorGrupoTecnico() {
		return gestorGrupoTecnico;
	}

	public Pessoa getGestorGrupoUnidadeOrganizacional() {
		return gestorGrupoUnidadeOrganizacional;
	}

	public String getNome() {
		return nome;
	}

	public PessoaGrupoTipo getPessoaGrupoTipo() {
		return pessoaGrupoTipo;
	}

	public PessoaSituacao getSituacaoGrupo() {
		return situacaoGrupo;
	}

	public boolean isGestorGrupoEmpresaCheck() {
		return gestorGrupoEmpresaCheck;
	}

	public boolean isGestorGrupoTecnicoCheck() {
		return gestorGrupoTecnicoCheck;
	}

	public boolean isGestorGrupoTodosCheck() {
		return gestorGrupoTodosCheck;
	}

	public boolean isGestorGrupoUnidadeOrganizacionalCheck() {
		return gestorGrupoUnidadeOrganizacionalCheck;
	}

	public void setGestorGrupoEmpresa(Pessoa gestorGrupoEmpresa) {
		this.gestorGrupoEmpresa = gestorGrupoEmpresa;
	}

	public void setGestorGrupoEmpresaCheck(boolean gestorGrupoEmpresaCheck) {
		this.gestorGrupoEmpresaCheck = gestorGrupoEmpresaCheck;
	}

	public void setGestorGrupoTecnico(Pessoa gestorGrupoTecnico) {
		this.gestorGrupoTecnico = gestorGrupoTecnico;
	}

	public void setGestorGrupoTecnicoCheck(boolean gestorGrupoTecnicoCheck) {
		this.gestorGrupoTecnicoCheck = gestorGrupoTecnicoCheck;
	}

	public void setGestorGrupoTodosCheck(boolean gestorGrupoTodosCheck) {
		this.gestorGrupoTodosCheck = gestorGrupoTodosCheck;
	}

	public void setGestorGrupoUnidadeOrganizacional(
			Pessoa gestorGrupoUnidadeOrganizacional) {
		this.gestorGrupoUnidadeOrganizacional = gestorGrupoUnidadeOrganizacional;
	}

	public void setGestorGrupoUnidadeOrganizacionalCheck(
			boolean gestorGrupoUnidadeOrganizacionalCheck) {
		this.gestorGrupoUnidadeOrganizacionalCheck = gestorGrupoUnidadeOrganizacionalCheck;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public void setPessoaGrupoTipo(PessoaGrupoTipo pessoaGrupoTipo) {
		this.pessoaGrupoTipo = pessoaGrupoTipo;
	}

	public void setSituacaoGrupo(PessoaSituacao situacaoGrupo) {
		this.situacaoGrupo = situacaoGrupo;
	}

}