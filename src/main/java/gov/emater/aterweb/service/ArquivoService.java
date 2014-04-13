package gov.emater.aterweb.service;

import gov.emater.aterweb.model.Arquivo;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public interface ArquivoService extends CrudService<Arquivo, Integer> {

	void descer(HttpServletRequest request, HttpServletResponse response,
			@PathVariable String value);

	Map<String, Object> subir(MultipartHttpServletRequest request);

}
