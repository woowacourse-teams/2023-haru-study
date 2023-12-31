package harustudy.backend.common.exception;

import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ErrorCodeView {

    @GetMapping("/api/v2/error-code")
    public String errorCodeView(Model model) {
        List<ExceptionSituation> exceptionSituations = ExceptionMapper.getExceptionSituations();
        model.addAttribute("exceptionSituations", exceptionSituations);
        return "error-code";
    }
}
