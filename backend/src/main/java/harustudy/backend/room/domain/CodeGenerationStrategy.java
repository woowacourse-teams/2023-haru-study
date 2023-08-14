package harustudy.backend.room.domain;

public class CodeGenerationStrategy implements GenerationStrategy {

    private static final int CODE_LENGTH = 6;

    @Override
    public String generate() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < CODE_LENGTH; i++) {
            sb.append((char) ((Math.random() * 26) + 65));
        }
        return sb.toString();
    }
}
