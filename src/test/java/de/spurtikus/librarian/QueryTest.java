package de.spurtikus.librarian;

import de.spurtikus.librarian.data.DocumentRepository;
import de.spurtikus.librarian.data.model.Document;
import org.assertj.core.util.Lists;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.util.List;

import static org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.contains;

@RunWith(SpringRunner.class)
@SpringBootTest
public class QueryTest {
    @Autowired
    DocumentRepository documentRepository;

    @Test
    public void testFindAll() {
        Iterable<Document> docsIterable = documentRepository.findAll();
        List<Document> docs = Lists.newArrayList(docsIterable);
        Assertions.assertNotNull(docs);
        Assertions.assertEquals( 43, docs.size());
        int i=0;
        for (Document d: docs) {
            System.out.println(d.getTitle() + ", " + d.getAuthors());
            i++;
        }
    }

    @Test
    public void testFindByTitle() {
        List<Document> docs = documentRepository.findByTitle("HP-75C FORTH");
        Assertions.assertNotNull(docs);
        Assertions.assertEquals( 1, docs.size());
    }

    @Test
    public void testFindByExample_Title() throws IOException {
        Document document = new Document();
        document.setTitle("HP-75");

        ExampleMatcher matcher = ExampleMatcher.matching()
                .withMatcher("title", contains().ignoreCase());

        Example<Document> documentExample = Example.of(document, matcher);

        Iterable<Document> docs = documentRepository.findAll(documentExample);

        Assertions.assertNotNull(docs);
        int i=0;
        for (Document d: docs) {
            System.out.println(d.getTitle());
            i++;
        }
        Assertions.assertEquals( 1, i);
    }

    @Test
    public void testFindByExample_Authors() throws IOException {
        Document document = new Document();
        document.setAuthors("tektronix");

        ExampleMatcher matcher = ExampleMatcher.matching()
                .withMatcher("authors", contains().ignoreCase());

        Example<Document> documentExample = Example.of(document, matcher);

        Iterable<Document> docs = documentRepository.findAll(documentExample);

        Assertions.assertNotNull(docs);
        int i=0;
        for (Document d: docs) {
            System.out.println(d.getTitle());
            i++;
        }
        Assertions.assertEquals( 9, i);
    }

/*    @Test
    public void testFindByExample_Category() throws IOException {
        Document document = new Document();
        ArrayList<Category> cats = new ArrayList<>();
        cats.add( new Category("History"));
        document.setCategories(cats);

        ExampleMatcher matcher = ExampleMatcher.matching()
                .withMatcher("categories", contains()).withIgnorePaths("id");;

        Example<Document> documentExample = Example.of(document, matcher);

        Iterable<Document> docs = documentRepository.findAll(documentExample);

        Assertions.assertNotNull(docs);
        int i=0;
        for (Document d: docs) {
            System.out.println(d.getTitle());
            i++;
        }
        Assertions.assertEquals( 9, i);
    }*/
}


