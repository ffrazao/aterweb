package gov.emater.aterweb.comum;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class UtilitarioData {

    private static final DateFormat DATE_FORMAT = DateFormat.getDateInstance(DateFormat.MEDIUM);

    private static final SimpleDateFormat DATE_TIME_FORMAT = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

    private static UtilitarioData instance;

    public static UtilitarioData getInstance() {
	if (instance == null) {
	    instance = new UtilitarioData();
	}
	return instance;
    }

    public static void main(String[] args) throws ParseException {
	Calendar data = UtilitarioData.getInstance().formataData("01/04/2014");
	System.out.println(UtilitarioData.getInstance().formataData(data));

	Calendar dataHora = UtilitarioData.getInstance().formataDataHora("01/04/2014 23:09:22");
	System.out.println(UtilitarioData.getInstance().formataDataHora(dataHora));
    }

    private UtilitarioData() {
    }

    public synchronized String formataData(Calendar date) {
	return DATE_FORMAT.format(date.getTime());
    }

    public synchronized Calendar formataData(String date) throws ParseException {
	Calendar calendar = Calendar.getInstance();
	calendar.setTime(DATE_FORMAT.parse(date));
	return calendar;
    }

    public synchronized String formataDataHora(Calendar date) {
	return DATE_TIME_FORMAT.format(date.getTime());
    }

    public synchronized Calendar formataDataHora(String date) throws ParseException {
	Calendar calendar = Calendar.getInstance();
	calendar.setTime(DATE_TIME_FORMAT.parse(date));
	return calendar;
    }
}
