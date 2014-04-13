package gov.emater.aterweb.model;

import gov.emater.aterweb.dao._ChavePrimaria;
import gov.emater.aterweb.model.domain.UsuarioStatusConta;
import gov.emater.aterweb.mvc.JsonDeserializerCalendar;
import gov.emater.aterweb.mvc.JsonSerializerCalendar;

import java.util.Calendar;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * Classe persistente dos usuarios do sistema.
 * 
 */
@Entity
@Table(schema = EntidadeBase.SISTEMA_SCHEMA)
@PrimaryKeyJoinColumn(name = "id")
public class Usuario extends EntidadeBase implements _ChavePrimaria<Integer> {

    private static final long serialVersionUID = 1L;

    @Column(name = "acesso_expira_em")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @JsonSerialize(using = JsonSerializerCalendar.class)
    @JsonDeserialize(using = JsonDeserializerCalendar.class)
    private Calendar acessoExpiraEm;

    @Id
    @Column(name = "id")
    private Integer id;

    @NotEmpty
    @Column(name = "nome_usuario")
    private String nomeUsuario;

    @MapsId("id")
    @OneToOne(mappedBy = "usuario")
    @JoinColumn(name = "id")
    @NotNull
    private Pessoa pessoa;

    private String senha;

    // bi-directional many-to-one association to UsuarioModulo
    @OneToMany(mappedBy = "usuario", targetEntity = UsuarioModulo.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UsuarioModulo> usuarioModulos;

    // bi-directional many-to-one association to UsuarioPerfil
    @OneToMany(mappedBy = "usuario", targetEntity = UsuarioPerfil.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UsuarioPerfil> usuarioPerfils;

    @Enumerated(EnumType.STRING)
    @Column(name = "Status_conta")
    @NotNull
    private UsuarioStatusConta usuarioStatusConta;

    public Usuario() {
    }

    public Usuario(String nomeUsuario) {
	this();
	setNomeUsuario(nomeUsuario);
    }

    public Usuario(String nomeUsuario, String senha) {
	this(nomeUsuario);
	setSenha(senha);
    }

    @Override
    public boolean equals(Object obj) {
	if (this == obj)
	    return true;
	if (!super.equals(obj))
	    return false;
	if (getClass() != obj.getClass())
	    return false;
	Usuario other = (Usuario) obj;
	if (nomeUsuario == null) {
	    if (other.nomeUsuario != null)
		return false;
	} else if (!nomeUsuario.equals(other.nomeUsuario))
	    return false;
	return true;
    }

    public Calendar getAcessoExpiraEm() {
	return acessoExpiraEm;
    }

    @Override
    public Integer getId() {
	return id;
    }

    public String getNomeUsuario() {
	return nomeUsuario;
    }

    public Pessoa getPessoa() {
	return pessoa;
    }

    public String getSenha() {
	return senha;
    }

    public List<UsuarioModulo> getUsuarioModulos() {
	return usuarioModulos;
    }

    public List<UsuarioPerfil> getUsuarioPerfils() {
	return usuarioPerfils;
    }

    public UsuarioStatusConta getUsuarioStatusConta() {
	return usuarioStatusConta;
    }

    @Override
    public int hashCode() {
	final int prime = 31;
	int result = super.hashCode();
	result = prime * result + ((nomeUsuario == null) ? 0 : nomeUsuario.hashCode());
	return result;
    }

    public void setAcessoExpiraEm(Calendar acessoExpiraEm) {
	this.acessoExpiraEm = acessoExpiraEm;
    }

    @Override
    public void setId(Integer id) {
	this.id = id;
    }

    public void setNomeUsuario(String nomeUsuario) {
	this.nomeUsuario = nomeUsuario;
    }

    public void setPessoa(Pessoa pessoa) {
	this.pessoa = pessoa;
    }

    public void setSenha(String senha) {
	this.senha = senha;
    }

    public void setUsuarioModulos(List<UsuarioModulo> usuarioModulos) {
	this.usuarioModulos = usuarioModulos;
    }

    public void setUsuarioPerfils(List<UsuarioPerfil> usuarioPerfils) {
	this.usuarioPerfils = usuarioPerfils;
    }

    public void setUsuarioStatusConta(UsuarioStatusConta usuarioStatusConta) {
	this.usuarioStatusConta = usuarioStatusConta;
    }

}