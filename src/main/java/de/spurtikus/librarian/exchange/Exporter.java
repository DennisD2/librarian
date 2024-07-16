package de.spurtikus.librarian.exchange;

import de.spurtikus.librarian.data.DocumentRepository;
import de.spurtikus.librarian.data.model.Document;
import org.springframework.stereotype.Service;

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
        dStream.forEach(d -> sb.append(appendDocument(d)));
        sb.append("]\n");

        return sb;
    }

    private StringBuffer appendDocument(Document d) {
        StringBuffer sb = new StringBuffer();
        sb.append("   {\n");

        sb.append("      id: \"");
        sb.append(d.getId() + "\",\n");
        sb.append("      title: \"");
        sb.append(niceNull(d.getTitle()) + "\",\n");
        sb.append("      authors: \"");
        sb.append(niceNull(d.getAuthors()) + "\",\n");
        sb.append("      published: \"");
        sb.append(d.getPublishedYear() + "\",\n");
        sb.append("      timestamp: \"");
        sb.append(niceNull(d.getTimestamp()) + "\",\n");
        sb.append("      location: \"");
        sb.append(niceNull(d.getLocation()) + "\",\n");

        sb.append("      categories: \"");
        List<String> cList = d.getCategories().stream().map(c -> c.getCategory()).collect(Collectors.toList());
        sb.append(cList + "\"\n");

        sb.append("   },\n");
        return sb;
    }

    private String niceNull(String s) {
        return (s == null) ? "" : s;
    }
}
