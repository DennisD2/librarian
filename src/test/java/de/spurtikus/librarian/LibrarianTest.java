package de.spurtikus.librarian;

import de.spurtikus.librarian.data.DocumentRepository;
import de.spurtikus.librarian.data.model.Document;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest

public class LibrarianTest {

	String baseDirectory = "/home/dennis/doclib/";

	@Autowired
	DocumentRepository documentRepository;

	StoreAnalyzer storeAnalyzer = new StoreAnalyzer();

	@Test
	public void testDirRead() throws IOException {
		FileCollector fileVisitor = storeAnalyzer.collectFiles(baseDirectory);
		for (String file : fileVisitor.getFiles()) {
			file = file.replace(baseDirectory, "");
			System.out.println("FILE: " + file);
		}
	}

	@Test
	public void testDBRead() throws IOException {
		Iterable<Document> docs = documentRepository.findAll();
		assertNotNull(docs);
		for (Document doc : docs) {
			System.out.println("DB: " + doc.getLocation());
		}
	}

	@Test
	public void testDiff() throws IOException {
		// get all files in DB
		Iterable<Document> docs = documentRepository.findAll();
		ArrayList<Document> docInDB = new ArrayList<>();
		docs.forEach(doc -> docInDB.add(doc));

		// get all files in filesystem
		FileCollector fileVisitor = storeAnalyzer.collectFiles(baseDirectory);
		List<String> docInFS = fileVisitor.getFiles();

		System.out.println("Size DB: " + docInDB.size());
		System.out.println("Size FS: " + docInFS.size());

		// Files in FS but not in DB
		List<String> fsOrphans = storeAnalyzer.filesInFSButNotInDB(docInDB, baseDirectory, docInFS);
		System.out.println("-----------------\nFS Orphans: Number of objects 'in FS but not in DB': " + fsOrphans.size());
		fsOrphans.forEach(doc -> System.out.println("In FS but not in DB: " + doc));

		// Files in DB but not in FS
		List<String> dbOrphans = storeAnalyzer.filesInDBButNotInFS(docInDB, baseDirectory, docInFS);
		System.out.println("-----------------\nDB Orphans: Number of objects 'in DB but not in FS': " + dbOrphans.size());
		dbOrphans.forEach(doc -> System.out.println("In DB but not in FS: " + doc));
	}

	@Test
	public void testDoublettes() throws IOException, NoSuchAlgorithmException {
		Map<String, String> doublettes = storeAnalyzer.getDoublettes(baseDirectory);
		doublettes.forEach((doc1,doc2) -> {
			System.out.println("Doublette candidate: " + doc1.replace(baseDirectory,"")
				+ "(compared with: " + doc2.replace(baseDirectory,"") + ")");
		});
	}

}