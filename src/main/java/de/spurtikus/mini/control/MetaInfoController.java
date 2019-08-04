package de.spurtikus.mini.control;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MetaInfoController {
    // TODO: read value from application.properties
    String documentBaseURI = "http://raspberrypi/doclib/";

    @RequestMapping(value="/baseURI", produces={"text/html"})
    @ResponseBody
    public String getBaseURI() {
        return documentBaseURI;
    }
}