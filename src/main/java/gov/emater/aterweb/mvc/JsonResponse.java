package gov.emater.aterweb.mvc;

import java.util.Map;
import java.util.TreeMap;

public class JsonResponse {

    public static final String GENERICO = "*";
    private Boolean executou;
    private Map<String, String> mensagens = new TreeMap<String, String>();
    private Object resultado = null;

    public JsonResponse(Boolean executou) {
	this(executou, (String) null, (Object) null);
    }

    public JsonResponse(Boolean executou, String mensagem) {
	this(executou, mensagem, (Object) null);
	addMensagem(GENERICO, mensagem);
    }

    public JsonResponse(Boolean executou, String mensagem, Object resultado) {
	super();
	this.executou = executou;
	this.resultado = resultado;
    }

    public Map<String, String> addMensagem(String campo, String mensagem) {
	if (mensagem != null) {
	    this.mensagens.put(campo, mensagem);
	}
	return this.mensagens;
    }

    public Map<String, String> clearMensagem() {
	this.mensagens.clear();
	return this.mensagens;
    }

    public Boolean getExecutou() {
	return executou;
    }

    public String getMensagem(String campo) {
	return mensagens.get(campo);
    }

    public Map<String, String> getMensagens() {
	return mensagens;
    }

    public Object getResultado() {
	return resultado;
    }

    public void setResultado(Object resultado) {
	this.resultado = resultado;
    }
}