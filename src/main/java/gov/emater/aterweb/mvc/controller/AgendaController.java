package gov.emater.aterweb.mvc.controller;

import gov.emater.aterweb.model.EntidadeBase;
import gov.emater.aterweb.mvc.JsonResponse;
import gov.emater.aterweb.mvc.dto.AgendaCadFiltroDto;
import gov.emater.aterweb.service.PessoaService;

import java.util.ArrayList;
import java.util.Map;

import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Gerencia requisições para a agenda.
 */
@Controller
@RequestMapping(value = "/" + AgendaController.PAGINA)
public class AgendaController extends _BaseController implements
		CadastroController<EntidadeBase, AgendaCadFiltroDto> {

	private static final Logger logger = Logger
			.getLogger(AgendaController.class);

	public static final String PAGINA = "agenda";

	public static final String TITULO = "Agenda de Atividades";

	@Autowired
	public AgendaController(PessoaService service) {
		super(service);
	}

	@Override
	@RequestMapping(method = RequestMethod.GET)
	public String abrir() {
		return super.abrir();
	}

	@Override
	@RequestMapping(value = "/" + ACAO_EXCLUIR, method = RequestMethod.GET)
	@ResponseBody
	public JsonResponse excluir(@RequestParam Integer id) {
		return super.excluir(id);
	}

	@Override
	@RequestMapping(value = "/" + ACAO_FILTRAR, method = RequestMethod.GET)
	@ResponseBody
	public JsonResponse filtrar(@RequestParam AgendaCadFiltroDto filtro,
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

	@Override
	protected void popupInterno(Integer id, Map<String, Object> map) {
	}

	@Override
	@RequestMapping(value = "/" + ACAO_PREPARAR, method = RequestMethod.GET)
	@ResponseBody
	public JsonResponse preparar() {
		return super.preparar();
	}

	@Override
	protected void prepararInterno(Map<String, Object> variaveis) {
		variaveis.put(VAR_FILTRO, new AgendaCadFiltroDto());
		variaveis.put(VAR_LISTA, new ArrayList<Object>());
		variaveis.put(VAR_REGISTRO, new Object());
		if (logger.isTraceEnabled()) {
			logger.trace(String.format("preparando apresentação [%s]", variaveis));
		}
	}

	@Override
	@RequestMapping(value = "/" + ACAO_RESTAURAR, method = RequestMethod.GET)
	@ResponseBody
	public JsonResponse restaurar(@RequestParam Integer id) {
		return super.restaurar(id);
	}

	@SuppressWarnings("unchecked")
	@Override
	protected EntidadeBase restaurarInterno(Integer id) {
		EntidadeBase entidade = (EntidadeBase) (id == null ? new EntidadeBase()
				: getService().restore(id));
		return entidade;
	}

	@Override
	@RequestMapping(value = "/" + ACAO_SALVAR, method = RequestMethod.POST)
	@ResponseBody
	public JsonResponse salvar(@Valid @RequestParam EntidadeBase entity,
			BindingResult bindingResult) {
		return super.salvar(entity, bindingResult);
	}
}