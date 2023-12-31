package harustudy.backend.polling.service;

import harustudy.backend.content.domain.Content;
import harustudy.backend.participant.domain.Step;
import harustudy.backend.polling.exception.CannotSeeSubmittersException;

import java.util.Arrays;
import java.util.function.Function;

public enum SubmitterCheckingStrategy {

    PLANNING(Step.PLANNING, Content::isPlanWritten),
    STUDYING(Step.STUDYING, content -> true),
    RETROSPECT(Step.RETROSPECT, Content::isRetrospectWritten);

    private final Step step;
    private final Function<Content, Boolean> strategy;

    SubmitterCheckingStrategy(Step step, Function<Content, Boolean> strategy) {
        this.step = step;
        this.strategy = strategy;
    }

    public static boolean isSubmitted(Step step, Content content) {
        return Arrays.stream(values())
                .filter(each -> each.step.equals(step))
                .map(each -> each.strategy)
                .findFirst()
                .orElseThrow(CannotSeeSubmittersException::new)
                .apply(content);
    }
}
