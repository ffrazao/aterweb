package gov.emater.aterweb.comum;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.util.Locale;

// Singleton utilitario para numeros
public class UtilitarioNumero {

    private static UtilitarioNumero instance;

    public static UtilitarioNumero getInstance() {
	if (instance == null) {
	    instance = new UtilitarioNumero();
	}
	return instance;
    }

    private final NumberFormat BIG_DECIMAL_FORMATO;

    private final NumberFormat BIG_DECIMAL_FORMATO_MOEDA;

    private final NumberFormat BIG_DECIMAL_FORMATO_PORCENTUAL;

    private final NumberFormat NUMBER_FORMATO;

    private final NumberFormat NUMBER_FORMATO_MOEDA;

    private final NumberFormat NUMBER_FORMATO_PORCENTUAL;

    private UtilitarioNumero() {
	NUMBER_FORMATO = NumberFormat.getNumberInstance(Locale.getDefault());
	NUMBER_FORMATO_MOEDA = NumberFormat.getCurrencyInstance(Locale.getDefault());
	NUMBER_FORMATO_PORCENTUAL = NumberFormat.getPercentInstance(Locale.getDefault());
	BIG_DECIMAL_FORMATO = NumberFormat.getNumberInstance(Locale.getDefault());
	if (BIG_DECIMAL_FORMATO instanceof DecimalFormat) {
	    ((DecimalFormat) BIG_DECIMAL_FORMATO).setParseBigDecimal(true);
	}
	BIG_DECIMAL_FORMATO_MOEDA = NumberFormat.getCurrencyInstance(Locale.getDefault());
	if (BIG_DECIMAL_FORMATO_MOEDA instanceof DecimalFormat) {
	    ((DecimalFormat) BIG_DECIMAL_FORMATO_MOEDA).setParseBigDecimal(true);
	}
	BIG_DECIMAL_FORMATO_PORCENTUAL = NumberFormat.getPercentInstance(Locale.getDefault());
	if (BIG_DECIMAL_FORMATO_PORCENTUAL instanceof DecimalFormat) {
	    ((DecimalFormat) BIG_DECIMAL_FORMATO_PORCENTUAL).setParseBigDecimal(true);
	}
    }

    public BigDecimal stringToBigDecimal(String numero) {
	BigDecimal result = null;
	if (numero == null || numero.trim().length() == 0) {
	    return result;
	}
	Number valor = null;
	try {
	    valor = BIG_DECIMAL_FORMATO.parse(numero);
	} catch (ParseException e) {
	    try {
		valor = BIG_DECIMAL_FORMATO_MOEDA.parse(numero);
	    } catch (ParseException e1) {
		try {
		    valor = BIG_DECIMAL_FORMATO_PORCENTUAL.parse(numero);
		} catch (ParseException e2) {
		    throw new RuntimeException(String.format("Erro ao converter o string [%s] em bigdecimal", numero), e);
		}
	    }
	}
	if (valor instanceof BigDecimal)
	    result = (BigDecimal) valor;
	else {
	    result = new BigDecimal(valor.doubleValue());
	}
	return result;
    }

    public Double stringToDouble(String numero) {
	Number n = stringToNumber(numero);
	if (n instanceof Double) {
	    return (Double) n;
	} else {
	    return new Double(n.doubleValue());
	}
    }

    public Float stringToFloat(String numero) {
	Number n = stringToNumber(numero);
	if (n instanceof Float) {
	    return (Float) n;
	} else {
	    return new Float(n.floatValue());
	}
    }

    public Number stringToNumber(String numero) {
	Number result = null;
	if (numero == null || numero.trim().length() == 0) {
	    return result;
	}
	try {
	    result = NUMBER_FORMATO.parse(numero);
	} catch (ParseException e) {
	    try {
		result = NUMBER_FORMATO_MOEDA.parse(numero);
	    } catch (ParseException e1) {
		try {
		    result = NUMBER_FORMATO_PORCENTUAL.parse(numero);
		} catch (ParseException e2) {
		    throw new RuntimeException(String.format("Erro ao converter o string [%s] em number", numero), e);
		}
	    }
	}
	return result;
    }
}