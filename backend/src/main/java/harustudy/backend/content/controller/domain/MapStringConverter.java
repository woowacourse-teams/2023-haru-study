package harustudy.backend.content.controller.domain;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Converter
public class MapStringConverter implements AttributeConverter<Map<String, String>, String> {

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Map<String, String> data) {
        String value = "";
        try {
            value = mapper.writeValueAsString(data);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return value;
    }

    @Override
    public Map<String, String> convertToEntityAttribute(String data) {
        Map<String, String> mapValue = new HashMap<>();
        TypeReference<HashMap<String, String>> typeRef = new TypeReference<>() {
        };
        try {
            mapValue = mapper.readValue(data, typeRef);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return mapValue;
    }
}
