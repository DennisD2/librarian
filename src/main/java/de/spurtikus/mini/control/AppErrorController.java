package de.spurtikus.mini.control;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AppErrorController implements ErrorController {
    @Override
    @RequestMapping(value="/error", produces={"text/html"})
    @ResponseBody
    public String getErrorPath() {
        return "<h3>No Mapping Found!<h3><a href=\"/\">Back to starting page</a>";
    }
}