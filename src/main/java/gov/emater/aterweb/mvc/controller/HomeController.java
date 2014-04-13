package gov.emater.aterweb.mvc.controller;

import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {

	private static final Logger logger = Logger.getLogger(HomeController.class);

	public static final String PAGINA = "home";

	public static final String TITULO = "Página Principal";

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String preparar(Map<String, Object> map) {
		logger.debug("Abrindo - " + TITULO);

		return PAGINA + "/" + TITULO;
	}
}