package gov.emater.aterweb.mvc;

import gov.emater.aterweb.comum.UtilitarioData;

import java.io.IOException;
import java.util.Calendar;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class JsonSerializerCalendar extends JsonSerializer<Calendar> {

    @Override
    public void serialize(Calendar date, JsonGenerator gen, SerializerProvider provider) throws IOException, JsonProcessingException {
	if (date != null) {
	    gen.writeString(UtilitarioData.getInstance().formataData(date));
	}
    }
}