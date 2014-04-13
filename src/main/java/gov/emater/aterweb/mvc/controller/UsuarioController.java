package gov.emater.aterweb.mvc.controller;

import gov.emater.aterweb.model.Usuario;
import gov.emater.aterweb.mvc.JsonResponse;
import gov.emater.aterweb.mvc.dto.MudarSenhaAtualDto;
import gov.emater.aterweb.mvc.dto.UsuarioCadFiltroDto;
import gov.emater.aterweb.service.UsuarioService;

import java.util.ArrayList;
import java.util.Map;

import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Gerencia requisições para o Cadastro de Usuario e Acesso ao Sistema.
 */
@Controller
public class UsuarioController extends _BaseController implements
		CadastroController<Usuario, UsuarioCadFiltroDto> {

	private static final Logger logger = Logger
			.getLogger(UsuarioController.class);

	public static final String PAGINA = "usuario-cad";

	public static final String TITULO = "Cadastro de Usuários";

	@Autowired
	public UsuarioController(UsuarioService service) {
		super(service);
	}

	@Override
	@RequestMapping(value = "/" + PAGINA, method = RequestMethod.GET)
	public String abrir() {
		return super.abrir();
	}

	@RequestMapping(value = "/acessoNegado", method = RequestMethod.GET)
	public String acessoNegado(ModelMap model) {
		logger.debug("Acesso negado!");
		model.addAttribute("error", "true");
		return "acesso-negado";
	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String efetuarLogin() {
		logger.info("Efetuar novo login");
		return "login";
	}

	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public String efetuarLogout() {
		logger.info("Efetuar LOGOUT");
		return "/";
	}

	@Override
	@RequestMapping(value = "/" + PAGINA + "/" + ACAO_EXCLUIR, method = RequestMethod.GET)
	@ResponseBody
	public JsonResponse excluir(@RequestParam Integer id) {
		return super.excluir(id);
	}

	@Override
	@RequestMapping(value = "/" + PAGINA + "/" + ACAO_FILTRAR, method = RequestMethod.GET)
	@ResponseBody
	public JsonResponse filtrar(UsuarioCadFiltroDto filtro,
			BindingResult bindingResult) {
		return super.filtrar(filtro, bindingResult);
	}

	@Override
	protected String getPagina() {
		return PAGINA;
	}

	@Override
	protected String getTitulo() {
		return TITULO;
	}

	@RequestMapping(value = "/mudarSenhaAtual", method = RequestMethod.POST, consumes = { "application/json" })
	@ResponseBody
	public JsonResponse mudarSenhaAtual(
			@RequestBody MudarSenhaAtualDto mudarSenhaAtualDto,
			BindingResult bindingResult) {

		JsonResponse result = null;
		try {
			((UsuarioService) getService()).mudarSenhaAtual(mudarSenhaAtualDto);
			result = new JsonResponse(true, "Sucesso", null);
		} catch (Exception e) {
			result = new JsonResponse(false, e.getMessage(), e);
			e.printStackTrace();
		}
		return result;
	}

	@Override
	@RequestMapping(value = "/" + PAGINA + "/popup")
	public String popup(@RequestParam Integer id, Map<String, Object> map) {
		return super.popup(id, map);
	}

	@SuppressWarnings("unchecked")
	@Override
	protected void popupInterno(Integer id, Map<String, Object> map) {
		map.put(VAR_REGISTRO, getService().restore(id));
	}

	@Override
	@RequestMapping(value = "/" + PAGINA + "/" + ACAO_PREPARAR, method = RequestMethod.GET)
	@ResponseBody
	public JsonResponse preparar() {
		return super.preparar();
	}

	@Override
	protected void prepararInterno(Map<String, Object> variaveis) {
		variaveis.put(VAR_FILTRO, new UsuarioCadFiltroDto());
		variaveis.put(VAR_LISTA, new ArrayList<Object>());
		variaveis.put(VAR_REGISTRO, new Object());
		if (logger.isTraceEnabled()) {
			logger.trace(String.format("[%s] preparando [%s]", getPagina(),
					variaveis));
		}
	}

	@Override
	@RequestMapping(value = "/" + PAGINA + "/" + ACAO_RESTAURAR, method = RequestMethod.GET)
	@ResponseBody
	public JsonResponse restaurar(@RequestParam Integer id) {
		return super.restaurar(id);
	}

	@SuppressWarnings("unchecked")
	@Override
	protected Usuario restaurarInterno(Integer id) {
		return (Usuario) (id == null ? new Usuario() : getService().restore(id));
	}

	@Override
	@RequestMapping(value = "/" + PAGINA + "/" + ACAO_SALVAR, method = RequestMethod.POST)
	@ResponseBody
	public JsonResponse salvar(@Valid Usuario entity,
			BindingResult bindingResult) {
		// criticar os campos recebidos
		if ((entity.getUsuarioModulos() == null || entity.getUsuarioModulos()
				.size() == 0)
				&& (entity.getUsuarioPerfils() != null || entity
						.getUsuarioPerfils().size() == 0)) {
			bindingResult.addError(new ObjectError("usuarioModulos",
					"Nenhum módulo ou perfil informado"));
		}
		return super.salvar(entity, bindingResult);
	}

}