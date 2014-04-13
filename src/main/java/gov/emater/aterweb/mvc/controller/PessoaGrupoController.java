package gov.emater.aterweb.mvc.controller;

import gov.emater.aterweb.model.EntidadeBase;
import gov.emater.aterweb.model.PessoaGrupo;
import gov.emater.aterweb.mvc.JsonResponse;
import gov.emater.aterweb.mvc.dto.PessoaGrupoCadFiltroDto;
import gov.emater.aterweb.service.PessoaGrupoService;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Gerencia requisições para Grupos Sociais.
 */
@Controller
@RequestMapping(value = "/" + PessoaGrupoController.PAGINA)
public class PessoaGrupoController extends _BaseController implements CadastroController<PessoaGrupo, PessoaGrupoCadFiltroDto> {

    private static final Logger logger = Logger.getLogger(PessoaGrupoController.class);

    public static final String PAGINA = "pessoa-grupo-cad";

    public static final String TITULO = "Gestão de Grupos Sociais";

    @Autowired
    public PessoaGrupoController(PessoaGrupoService service) {
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

    @SuppressWarnings("unchecked")
    @Override
    @RequestMapping(value = "/" + ACAO_FILTRAR, method = RequestMethod.GET)
    @ResponseBody
    public JsonResponse filtrar(PessoaGrupoCadFiltroDto filtro, BindingResult bindingResult) {
	JsonResponse response = super.filtrar(filtro, bindingResult);
	Set<PessoaGrupo> pessoaGrupoSet = new HashSet<>();
	pessoaGrupoSet.addAll((List<PessoaGrupo>) response.getResultado());
	response.setResultado(pessoaGrupoSet);
	return response;
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
	variaveis.put(VAR_FILTRO, new PessoaGrupoCadFiltroDto());
	variaveis.put(VAR_LISTA, new ArrayList<Object>());
	variaveis.put(VAR_REGISTRO, new PessoaGrupo());
	variaveis.put("PessoaGrupoTipoList", ((PessoaGrupoService) getService()).restorePessoaGrupoTipo(null));
	if (logger.isTraceEnabled()) {
	    logger.trace(String.format("[%s] preparando [%s]", getPagina(), variaveis));
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
	return (PessoaGrupo) (id == null ? new PessoaGrupo() : getService().restore(id));
    }

    @Override
    @RequestMapping(value = "/" + ACAO_SALVAR, method = RequestMethod.POST)
    @ResponseBody
    public JsonResponse salvar(@Valid @RequestBody PessoaGrupo entity, BindingResult bindingResult) {
	return super.salvar(entity, bindingResult);
    }

}