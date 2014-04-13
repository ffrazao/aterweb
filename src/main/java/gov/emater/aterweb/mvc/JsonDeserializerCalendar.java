package gov.emater.aterweb.mvc;

import gov.emater.aterweb.comum.UtilitarioData;

import java.io.IOException;
import java.text.ParseException;
import java.util.Calendar;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class JsonDeserializerCalendar extends JsonDeserializer<Calendar> {

	public JsonDeserializerCalendar() {
	}

	@Override
	public Calendar deserialize(JsonParser jp, DeserializationContext ctxt)
			throws IOException, JsonProcessingException {
		Calendar result = null;
		try {
			result = UtilitarioData.getInstance().formataData(jp.getText());
		} catch (ParseException e) {
			new RuntimeException(e);
		}
		return result;
	}
}
