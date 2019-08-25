package de.spurtikus.librarian.control;

import de.spurtikus.librarian.analyzer.FileCollector;
import de.spurtikus.librarian.analyzer.StoreAnalyzer;
import de.spurtikus.librarian.data.DocumentRepository;
import de.spurtikus.librarian.data.model.Document;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.JSONStyle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@Controller
public class MetaInfoController {
    @Value("${librarian.document.base.uri}")
    String documentBaseURI;

    @Value("${librarian.base.directory}")
    private String baseDirectory;

    @Autowired
    DocumentRepository documentRepository;

    StoreAnalyzer storeAnalyzer = new StoreAnalyzer();

    private class Doublette {
        public String path1;
        public String path2;
        public Doublette(String p1, String p2) {
            path1=p1;
            path2=p2;
        }
    }

    @RequestMapping(value="/meta/baseURI")
    @ResponseBody
    public String getBaseURI() {
        return documentBaseURI;
    }

    @RequestMapping(value="/meta/doublettes", produces={"application/json"})
    @ResponseBody
    public String getDoublettes() throws IOException {
        Map<String, String> doublettes = storeAnalyzer.getDoublettes(baseDirectory);
        List<Doublette> doubs = new ArrayList<>();
        for (String key: doublettes.keySet()) {
            Doublette d = new Doublette(key, doublettes.get(key));
            doubs.add(d);
        }
        return JSONArray.toJSONString(doubs, JSONStyle.NO_COMPRESS);
    }

    @RequestMapping(value="/meta/fsorphans", produces={"application/json"})
    @ResponseBody
    public String getFSOrphans() throws IOException {
        // get all files in DB
        Iterable<Document> docs = documentRepository.findAll();
        ArrayList<Document> docInDB = new ArrayList<>();
        docs.forEach(doc -> docInDB.add(doc));

        // get all files in filesystem
        FileCollector fileVisitor = storeAnalyzer.collectFiles(baseDirectory);
        List<String> docInFS = fileVisitor.getFiles();

        // Files in FS but not in DB
        List<String> fsOrphans = storeAnalyzer.filesInFSButNotInDB(docInDB, baseDirectory, docInFS);

        return JSONArray.toJSONString(fsOrphans, JSONStyle.NO_COMPRESS);
    }

    @RequestMapping(value="/meta/dborphans", produces={"application/json"})
    @ResponseBody
    public String getDBOrphans() throws IOException {
        // get all files in DB
        Iterable<Document> docs = documentRepository.findAll();
        ArrayList<Document> docInDB = new ArrayList<>();
        docs.forEach(doc -> docInDB.add(doc));

        // get all files in filesystem
        FileCollector fileVisitor = storeAnalyzer.collectFiles(baseDirectory);
        List<String> docInFS = fileVisitor.getFiles();

        // Files in DB but not in FS
        List<String> dbOrphans = storeAnalyzer.filesInDBButNotInFS(docInDB, baseDirectory, docInFS);

        return JSONArray.toJSONString(dbOrphans, JSONStyle.NO_COMPRESS);
    }

    @RequestMapping(value="/meta/removeFile/{encpath}", produces={"application/json"})
    @ResponseBody
    public String removeFile( @PathVariable String encpath) throws IOException {
        byte[] decoded = Base64.getDecoder().decode(encpath);
        Path p = Paths.get(baseDirectory + new String(decoded));
        System.out.println("TBI Delete: " + p.toAbsolutePath());
        Files.delete(p);
        return "OK";
    }
}