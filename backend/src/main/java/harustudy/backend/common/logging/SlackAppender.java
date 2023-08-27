package harustudy.backend.common.logging;

import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.AppenderBase;
import java.io.FileReader;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import org.springframework.util.ResourceUtils;
import org.springframework.web.client.RestTemplate;

public class SlackAppender extends AppenderBase<ILoggingEvent> {

    public static final String PROPERTIES_PATH =
            "src\\main\\resources\\submodule\\application.properties";

    private static final String MESSAGE_FORMAT = """
            로그 메세지 본문
            ```%s %s %s [%s] - %s ```
            """;

    private static String slackWebhookUrl;
    private static String grafanaUrl;

    static {
        Properties properties = new Properties();
        try {
            FileReader fileReader = new FileReader(ResourceUtils.getFile(PROPERTIES_PATH));
            properties.load(fileReader);
            slackWebhookUrl = properties.getProperty("slack-webhook-url");
            grafanaUrl = properties.getProperty("grafana-url");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void append(ILoggingEvent eventObject) {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> slackAlertBody = createSlackAlertBody(
                eventObject); //ILoggingEvent 객체에 담겨있는 로깅 데이터를 메세지로 만들어서
        restTemplate.postForEntity(slackWebhookUrl, slackAlertBody,
                String.class); //Slack에 알림 메세지를 전송한다
    }

    private Map<String, Object> createSlackAlertBody(ILoggingEvent eventObject) {
        String message = createMessage(eventObject);
        return Map.of(
                "blocks", List.of(
                        Map.of(
                                "type", "header",
                                "text", Map.of(
                                        "type", "plain_text",
                                        "text",
                                        ":rotating_light: 예상하지 못한 에러가 발생했습니다. 그라파나에서 로그를 확인해주세요!"
                                )
                        ),
                        Map.of(
                                "type", "section",
                                "text", Map.of(
                                        "type", "mrkdwn",
                                        "text", message
                                )
                        ),
                        Map.of(
                                "type", "section",
                                "text", Map.of(
                                        "type", "mrkdwn",
                                        "text",
                                        String.format("<%s|그라파나 바로가기>", grafanaUrl)
                                )
                        )
                )
        );
    }

    private String createMessage(ILoggingEvent eventObject) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        return String.format(MESSAGE_FORMAT,
                simpleDateFormat.format(eventObject.getTimeStamp()),
                eventObject.getLevel(),
                eventObject.getThreadName(),
                eventObject.getLoggerName(),
                eventObject.getFormattedMessage());
    }
}
