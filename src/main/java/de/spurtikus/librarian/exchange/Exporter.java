package de.spurtikus.librarian.exchange;

import de.spurtikus.librarian.data.DocumentRepository;
import de.spurtikus.librarian.data.model.Category;
import de.spurtikus.librarian.data.model.Document;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Service
public class Exporter {
    DocumentRepository documentRepository;

    public StringBuffer exportAsJavascriptArray(DocumentRepository documentRepository, String varName) {
        Iterable<Document> docsIterable = documentRepository.findAll();
        Stream<Document> dStream = StreamSupport.stream(docsIterable.spliterator(), false);

        StringBuffer sb = new StringBuffer();

        sb.append("const ");
        sb.append(varName);
        sb.append(" = [\n");


        sb.append("   \n");
        dStream.forEach(d -> sb.append(appendDocument(d)));

        return sb;
    }

    private StringBuffer appendDocument(Document d) {
        StringBuffer sb = new StringBuffer();
        sb.append("{\n");

        sb.append("      id: \"");
        sb.append(d.getId() + "\",\n");
        sb.append("      title: \"");
        sb.append(d.getTitle() + "\",\n");
        sb.append("      authors: \"");
        sb.append(d.getAuthors() + "\",\n");
        sb.append("      published: \"");
        sb.append(d.getPublishedYear() + "\",\n");
        sb.append("      timestamp: \"");
        sb.append(d.getTimestamp() + "\",\n");
        sb.append("      location: \"");
        sb.append(d.getLocation() + "\",\n");


        // categories
        sb.append("      categories: \"");
        List<Category> cats = d.getCategories();
        List<String> cList = d.getCategories().stream().map(c -> c.getCategory()).collect(Collectors.toList());
        //List<String> cList = new ArrayList<>();
        //d.getCategories().stream().map(c -> c.getCategory()).forEach(c -> sb.append(c));
        sb.append(cList + "\",\n");

        sb.append("},\n");
        return sb;
    }
}
