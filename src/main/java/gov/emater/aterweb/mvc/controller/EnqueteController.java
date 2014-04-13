package gov.emater.aterweb.mvc.controller;

import gov.emater.aterweb.model.EntidadeBase;
import gov.emater.aterweb.mvc.JsonResponse;
import gov.emater.aterweb.mvc.dto.EnqueteCadFiltroDto;
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
 * Gerencia requisições para Enquetes.
 */
@Controller
@RequestMapping(value = "/" + EnqueteController.PAGINA)
public class EnqueteController extends _BaseController implements
		CadastroController<EntidadeBase, EnqueteCadFiltroDto> {

	private static final Logger logger = Logger
			.getLogger(EnqueteController.class);

	public static final String PAGINA = "enquete-cad";

	public static final String TITULO = "Gestão de Enquetes";

	@Autowired
	public EnqueteController(PessoaService service) {
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
	public JsonResponse filtrar(@RequestParam EnqueteCadFiltroDto filtro,
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

	@SuppressWarnings("unchecked")
	@Override
	protected void popupInterno(Integer id, Map<String, Object> map) {
		map.put(VAR_REGISTRO, getService().restore(id));
	}

	@Override
	@RequestMapping(value = "/" + ACAO_PREPARAR, method = RequestMethod.GET)
	@ResponseBody
	public JsonResponse preparar() {
		return super.preparar();
	}

	@Override
	public void prepararInterno(Map<String, Object> variaveis) {
		variaveis.put(VAR_FILTRO, new EnqueteCadFiltroDto());
		variaveis.put(VAR_LISTA, new ArrayList<Object>());
		variaveis.put(VAR_REGISTRO, new Object());
		if (logger.isTraceEnabled()) {
			logger.trace(String.format("[%s] preparando [%s]", getPagina(),
					variaveis));
		}
	}

	@Override
	@RequestMapping(value = "/" + ACAO_RESTAURAR, method = RequestMethod.GET)
	@ResponseBody
	public JsonResponse restaurar(@RequestParam Integer id) {
		return super.restaurar(id);
	}

	@Override
	@SuppressWarnings("unchecked")
	protected EntidadeBase restaurarInterno(Integer id) {
		return (EntidadeBase) (id == null ? new EntidadeBase() : getService()
				.restore(id));
	}

	@Override
	@RequestMapping(value = "/" + ACAO_SALVAR, method = RequestMethod.POST)
	@ResponseBody
	public JsonResponse salvar(@Valid @RequestParam EntidadeBase entity,
			BindingResult bindingResult) {
		return super.salvar(entity, bindingResult);
	}
}