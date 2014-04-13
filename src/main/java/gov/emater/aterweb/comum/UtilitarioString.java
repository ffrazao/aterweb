package gov.emater.aterweb.comum;

// Singleton utilitario para Strings
public class UtilitarioString {

	private UtilitarioString() {
	}

	private static UtilitarioString instance;

	public static UtilitarioString getInstance() {
		if (instance == null) {
			instance = new UtilitarioString();
		}
		return instance;
	}

	public synchronized String removeAspas(String valor) {
		// remover as aspas da string
		if (valor.startsWith("\"")) {
			valor = valor.substring(1);
		}
		if (valor.endsWith("\"")) {
			valor = valor.substring(0, valor.length() - 1);
		}
		return valor;
	}

}
