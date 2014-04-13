package gov.emater.aterweb.service.impl;

import static gov.emater.aterweb.comum.Criptografia.md5;
import gov.emater.aterweb.comum.UtilitarioData;
import gov.emater.aterweb.dao.ModuloDao;
import gov.emater.aterweb.dao.PerfilDao;
import gov.emater.aterweb.dao.UsuarioDao;
import gov.emater.aterweb.dao.UsuarioModuloDao;
import gov.emater.aterweb.dao.UsuarioPerfilDao;
import gov.emater.aterweb.dao.impl._CrudDaoImpl;
import gov.emater.aterweb.model.ModuloPerfil;
import gov.emater.aterweb.model.Usuario;
import gov.emater.aterweb.model.UsuarioModulo;
import gov.emater.aterweb.model.UsuarioPerfil;
import gov.emater.aterweb.model.domain.PessoaSituacao;
import gov.emater.aterweb.model.domain.UsuarioStatusConta;
import gov.emater.aterweb.mvc.dto.MudarSenhaAtualDto;
import gov.emater.aterweb.mvc.dto.UsuarioCadFiltroDto;
import gov.emater.aterweb.security.CustomWebAuthenticationDetails;
import gov.emater.aterweb.service.ServiceException;
import gov.emater.aterweb.service.UsuarioService;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioServiceImpl extends
		CrudServiceImpl<Usuario, Integer, UsuarioDao> implements UsuarioService {

	private static final Logger logger = Logger
			.getLogger(UsuarioServiceImpl.class);

	@Autowired
	private ModuloDao moduloDao;

	@Autowired
	private PerfilDao perfilDao;

	@Autowired
	private UsuarioModuloDao usuarioModuloDao;

	@Autowired
	private UsuarioPerfilDao usuarioPerfilDao;

	@Autowired
	public UsuarioServiceImpl(UsuarioDao dao) {
		super(dao);
	}

	@SuppressWarnings("unchecked")
	@Override
	@Transactional(readOnly = true)
	public Authentication autenticaUsuario(Authentication autenticacao) {
		// extração dos parâmetros
		String nomeUsuario = (String) autenticacao.getPrincipal();
		String senha = (String) autenticacao.getCredentials();
		CustomWebAuthenticationDetails detalhes = (CustomWebAuthenticationDetails) autenticacao
				.getDetails();
		String enderecoRemoto = detalhes.getRemoteAddress();
		String identificacaoSessao = detalhes.getSessionId();
		boolean acessarComoAdministradorDoSistema = detalhes
				.getAcessoComoAdministradorDoSistema();

		if (logger.isInfoEnabled()) {
			logger.info(String.format(
					"Autenticando o usuário [%s] endereco remoto [%s] sessao[%s]",
					nomeUsuario, enderecoRemoto, identificacaoSessao));
		}

		// criticar os parametros informados
		if (nomeUsuario == null || nomeUsuario.trim().length() == 0) {
			throw new BadCredentialsException("Nome do usuário não informado!");
		}
		if (senha == null || senha.trim().length() == 0) {
			throw new BadCredentialsException("Senha do usuário não informada!");
		}

		// recuperar o usuario
		Usuario usuario = null;

		// buscar no banco de dados um registro com o usuario informado
		Map<String, Object> params = new HashMap<String, Object>();
		params.put(String.format("sel|id"), "");
		params.put(String.format("wheeq|nomeUsuario"), nomeUsuario);
		List<?> pesquisa = getDao().restore(params);
		if (pesquisa != null && pesquisa.size() == 1) {
			Map<String, Object> registro = ((List<Map<String, Object>>) pesquisa)
					.get(0);
			usuario = restore((Integer) registro.get("id"));
		}

		// verificar se encontrou o usuário
		if (usuario == null) {
			throw new BadCredentialsException(String.format(
					"Usuário [%s] não cadastrado.", nomeUsuario));
		}

		// verificar situacao do cadastro de pessoas
		if (!usuario.getPessoa().getSituacao().equals(PessoaSituacao.A)) {
			throw new BadCredentialsException(String.format(
					"O cadastro de pessoas do usuário [%s] está [%s]",
					nomeUsuario, usuario.getPessoa().getSituacao()
							.getDescricao()));
		}

		// verificar se a data de validade da senha já expirou
		if (usuario.getAcessoExpiraEm() != null
				&& usuario.getAcessoExpiraEm().before(Calendar.getInstance())) {
			throw new BadCredentialsException(
					String.format(
							"Seu acesso ao sistema expirou em [%s]. Entre em contato com a GETIN",
							UtilitarioData.getInstance().formataData(
									usuario.getAcessoExpiraEm())));
		}

		// verificar se é para renovar a senha
		if (usuario.getUsuarioStatusConta().equals(UsuarioStatusConta.R)) {
			throw new BadCredentialsException("Renove a sua senha");
		}

		// verificar status do usuario
		if (!usuario.getUsuarioStatusConta().equals(UsuarioStatusConta.A)) {
			throw new BadCredentialsException(String.format(
					"O usuário [%s] está [%s]", nomeUsuario, usuario
							.getUsuarioStatusConta().getDescricao()));
		}

		try {
			senha = md5(String.format("%s%s", usuario.getId(), senha));
		} catch (Exception e) {
			throw new BadCredentialsException("Erro ao criptografar a senha.",
					e);
		}

		// comparar a senha do usuario
		if (!usuario.getSenha().equalsIgnoreCase(senha)) {
			throw new BadCredentialsException("Senha incorreta.");
		}

		// recuperar perfis de acesso ao sistema do usuario
		Set<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();

		// flag para verificar se o usuário tem o perfil de administrador do
		// sistema
		boolean temPerfilAdministrador = false;

		// recuperar perfis oriundos dos modulos vinculados ao usuario
		if (usuario.getUsuarioModulos() != null
				&& usuario.getUsuarioModulos().size() > 0) {
			for (UsuarioModulo modulos : usuario.getUsuarioModulos()) {
				if (modulos.getModulo() != null
						&& modulos.getModulo().getModuloPerfils() != null
						&& modulos.getModulo().getModuloPerfils().size() > 0) {
					for (ModuloPerfil moduloPerfil : modulos.getModulo()
							.getModuloPerfils()) {
						if (moduloPerfil.getPerfil() != null
								&& moduloPerfil.getPerfil().getNome() != null) {
							if ("ADMIN".equalsIgnoreCase(moduloPerfil
									.getPerfil().getNome())) {
								temPerfilAdministrador = true;
								if (!acessarComoAdministradorDoSistema) {
									continue;
								}
							}

							if (logger.isDebugEnabled()) {
								logger.debug(String
										.format("Adicionando o Perfil[%s] vinculado ao Módulo[%s] ao Usuário[%s]",
												moduloPerfil.getPerfil()
														.getNome(),
												moduloPerfil.getModulo()
														.getNome(), usuario
														.getNomeUsuario()));
							}
							authorities.add(new SimpleGrantedAuthority(String
									.format("ROLE_%s", moduloPerfil.getPerfil()
											.getNome().toUpperCase())));
						}
					}
				}
			}
		}

		// recuperar perfis vinculados ao usuario
		if (usuario.getUsuarioPerfils() != null
				&& usuario.getUsuarioPerfils().size() > 0) {
			for (UsuarioPerfil usuarioPerfil : usuario.getUsuarioPerfils()) {
				if (usuarioPerfil.getPerfil() != null
						&& usuarioPerfil.getPerfil().getNome() != null) {
					if ("ADMIN".equalsIgnoreCase(usuarioPerfil.getPerfil()
							.getNome())) {
						temPerfilAdministrador = true;
						if (!acessarComoAdministradorDoSistema) {
							continue;
						}
					}
					if (logger.isDebugEnabled()) {
						logger.debug(String
								.format("Adicionando o Perfil[%s] vinculado ao Usuário[%s]",
										usuarioPerfil.getPerfil().getNome(),
										usuario.getNomeUsuario()));
					}
					authorities.add(new SimpleGrantedAuthority(String.format(
							"ROLE_%s", usuarioPerfil.getPerfil().getNome()
									.toUpperCase())));
				}
			}
		}

		// verificar se pediu acesso como administrador e não tem o perfil de
		// administrador
		if (acessarComoAdministradorDoSistema && !temPerfilAdministrador) {
			throw new BadCredentialsException(
					"O usuário não é ADMINISTRADOR do sistema");
		}

		// retornar o acesso ao sistema
		return new UsernamePasswordAuthenticationToken(nomeUsuario, senha,
				authorities);
	}

	private void fetch(Usuario usuario) {
		if (usuario != null) {
			usuario.getPessoa().getId();
			if (usuario.getUsuarioModulos() != null)
				usuario.getUsuarioModulos().size();
			if (usuario.getUsuarioPerfils() != null)
				usuario.getUsuarioPerfils().size();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	@Transactional(readOnly = true)
	public List<?> filtrarByDto(UsuarioCadFiltroDto filtro) {

		// Converter o DTO em parâmetros
		Map<String, Object> params = new HashMap<String, Object>();
		// params.put("sel|entPrinc", "");
		String comando = "ord";
		if (filtro.getNome() != null && filtro.getNome().trim().length() > 0) {
			comando = "wheordlike";
		}
		params.put(comando + "|pessoa.nome", filtro.getNome());

		comando = "";
		if (filtro.getNomeUsuario() != null
				&& filtro.getNomeUsuario().trim().length() > 0) {
			comando = "whelike";
		}
		params.put(comando + "|nomeUsuario", filtro.getNomeUsuario());
		// params.put("ali|pessoa on pessoa.usuario.id = id", "");

		List<?> result = (List<?>) restoreByParams(params);

		for (Map<String, Usuario> usuario : (List<Map<String, Usuario>>) result) {
			fetch(usuario.get("0"));
		}

		return result;
	}

	@Override
	@Transactional
	public void mudarSenhaAtual(MudarSenhaAtualDto dto) {
		// recuperar o usuario
		try {
			if (isNull(dto) || isEmpty(dto.getNomeUsuario())
					|| isEmpty(dto.getSenha()) || isEmpty(dto.getNovaSenha())
					|| isEmpty(dto.getRepetirNovaSenha())
					|| !dto.getNovaSenha().equals(dto.getRepetirNovaSenha())) {
				throw new ServiceException("Dados inconsistentes");
			}

			Usuario usuario = restoreByLogin(dto.getNomeUsuario());

			usuario.setUsuarioStatusConta(UsuarioStatusConta.A);
			usuario.setSenha(md5(String.format("%s%s", usuario.getId(),
					dto.getNovaSenha())));

			getDao().save(usuario);

		} catch (Exception e) {
			throw new BadCredentialsException(e.getMessage());
		}
	}

	@Override
	@Transactional(readOnly = true)
	public Usuario restore(Integer id) {
		Usuario result = super.restore(id);

		// restaurar dados subjacentes
		fetch(result);

		return result;
	}

	@Override
	@Transactional
	public Usuario restoreByLogin(String nomeUsuario) {
		List<Usuario> usuarios = getDao().restore(new Usuario(nomeUsuario));
		if (usuarios == null || usuarios.size() <= 0) {
			throw new ServiceException(String.format(
					"Usuário [%s] não cadastrado.", nomeUsuario));
		}
		if (usuarios.size() != 1) {
			throw new ServiceException(String.format(
					"Mais de um registro cadastrado com o mesmo login [%s].",
					nomeUsuario));
		}

		return usuarios.get(0);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	@Transactional(readOnly = true)
	public List<?> restoreByParams(Map<String, Object> params) {
		return ((_CrudDaoImpl) getDao()).restoreByQuery(params);
	}

	@Override
	@Transactional
	public Usuario save(Usuario usuario) {

		// criticar os dados
		if (usuario == null || usuario.getId() == null) {
			throw new ServiceException(
					"Informações inconsistentes usuario ou o seu id é nulo");
		}
		if ((usuario.getUsuarioModulos() == null || usuario.getUsuarioModulos()
				.size() == 0)
				&& (usuario.getUsuarioPerfils() != null || usuario
						.getUsuarioPerfils().size() == 0)) {
			throw new ServiceException("Nenhum módulo ou perfil informado");
		}

		// recuperar alguns dados
		Usuario restaurado = getDao().restore(usuario.getId());
		usuario.setSenha(restaurado.getSenha()); // recuperar a senha do usuário
		usuario.setPessoa(restaurado.getPessoa());

		// preparar a gravação dos módulos
		if (usuario.getUsuarioModulos() != null
				&& usuario.getUsuarioModulos().size() > 0) {
			// marcar para limpar
			List<UsuarioModulo> usuarioModulos = new ArrayList<UsuarioModulo>();
			for (UsuarioModulo modulo : usuario.getUsuarioModulos()) {
				if (modulo.getModulo() == null
						|| modulo.getModulo().getId() == null) {
					usuarioModulos.add(modulo);
				} else {
					modulo.setModulo(moduloDao.restore(modulo.getModulo()
							.getId()));
					modulo.setUsuario(usuario);
				}
			}
			// remover o lixo
			usuario.getUsuarioModulos().removeAll(usuarioModulos);
		}

		// preparar a gravação dos perfis
		if (usuario.getUsuarioPerfils() != null
				&& usuario.getUsuarioPerfils().size() > 0) {
			// marcar para limpar
			List<UsuarioPerfil> usuarioPerfils = new ArrayList<UsuarioPerfil>();
			for (UsuarioPerfil perfil : usuario.getUsuarioPerfils()) {
				if (perfil.getPerfil() == null
						|| perfil.getPerfil().getId() == null) {
					usuarioPerfils.add(perfil);
				} else {
					perfil.setPerfil(perfilDao.restore(perfil.getPerfil()
							.getId()));
					perfil.setUsuario(usuario);
				}
			}
			// remover o lixo
			usuario.getUsuarioPerfils().removeAll(usuarioPerfils);
		}

		// chamar o método para salvar o usuario
		usuario = super.save(usuario);

		return usuario;
	}

}