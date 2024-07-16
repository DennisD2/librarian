package de.spurtikus.librarian;

import de.spurtikus.librarian.data.CategoryRepository;
import de.spurtikus.librarian.data.DocumentRepository;
import de.spurtikus.librarian.data.model.Document;
import de.spurtikus.librarian.exchange.Exporter;
import org.assertj.core.util.Lists;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest
public class ExporterTest {
    @Autowired
    DocumentRepository documentRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Test
    public void testExportJavascriptArray() {
        Exporter testee = new Exporter();

        StringBuffer result = testee.exportAsJavascriptArray(documentRepository,"documents");

        System.out.println("------- export result -------");
        System.out.println(result);
        System.out.println("------- ------------- -------");
    }
}
