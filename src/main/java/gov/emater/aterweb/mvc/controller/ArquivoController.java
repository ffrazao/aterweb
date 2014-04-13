package gov.emater.aterweb.mvc.controller;

import gov.emater.aterweb.service.ArquivoService;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@RequestMapping(value = "/" + ArquivoController.PAGINA)
@Controller
public class ArquivoController {

	private static final Logger logger = Logger
			.getLogger(ArquivoController.class);

	public static final String PAGINA = "arquivo";

	public static final String TITULO = "Gestão de Arquivos";

	@Autowired
	private ArquivoService service;

	public ArquivoController() {
		if (logger.isInfoEnabled()) {
			logger.info("Iniciando ArquivoController...");
		}
	}

	@RequestMapping(value = "/descer", method = RequestMethod.GET)
	public void descer(HttpServletRequest request,
			HttpServletResponse response, @RequestParam String arq) {
		service.descer(request, response, arq);
	}

	@RequestMapping(value = "/subir", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> subir(MultipartHttpServletRequest request) {
		return service.subir(request);
	}
}