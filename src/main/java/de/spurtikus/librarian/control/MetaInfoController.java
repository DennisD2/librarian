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
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.ArrayList;
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

    @RequestMapping(value="/meta/baseURI")
    @ResponseBody
    public String getBaseURI() {
        return documentBaseURI;
    }

    @RequestMapping(value="/meta/doublettes", produces={"application/json"})
    @ResponseBody
    public String getDoublettes() throws IOException {
        Map<String, String> doublettes = storeAnalyzer.getDoublettes(baseDirectory);
        doublettes.forEach((doc1,doc2) -> {
            System.out.println("Doublette candidate: " + doc1.replace(baseDirectory,"")
                    + "(compared with: " + doc2.replace(baseDirectory,"") + ")");
        });
        return new JSONObject(doublettes).toJSONString();
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
}