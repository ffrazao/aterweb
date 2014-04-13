package gov.emater.aterweb.mvc;

import gov.emater.aterweb.comum.UtilitarioNumero;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class JsonFormatarFloat extends JsonDeserializer<Float> {

    public JsonFormatarFloat() {
    }

    @Override
    public Float deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
	Float result = UtilitarioNumero.getInstance().stringToFloat(jp.getText());
	return result;
    }
}