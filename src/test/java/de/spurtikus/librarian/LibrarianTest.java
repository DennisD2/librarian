package de.spurtikus.librarian;

import de.spurtikus.librarian.data.DocumentRepository;
import de.spurtikus.librarian.data.model.Document;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest

public class LibrarianTest {

	@Autowired
	DocumentRepository documentRepository;

	//String basePath = "/home/dennis/";

	private FileCollector collectFiles(String baseDirectory) throws IOException {
		Path path = Paths.get(baseDirectory);
		FileCollector fileVisitor = new FileCollector();
		Files.walkFileTree(path, fileVisitor);
		return fileVisitor;
	}

	@Test
	public void testDirRead() throws IOException {
		String baseDirectory = "/home/dennis/Downloads/";

		FileCollector fileVisitor = collectFiles(baseDirectory);
		for (String file : fileVisitor.getFiles()) {
			file = file.replace(baseDirectory,"");
			System.out.println("FILE: " + file);
		}

	}

	@Test
	public void testDBRead() throws IOException {
		Iterable<Document> docs = documentRepository.findAll();
		assertNotNull(docs);
		for (Document doc: docs) {
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
		String baseDirectory = "/home/dennis/Downloads";
		FileCollector fileVisitor = collectFiles(baseDirectory);
		List<String> docInFS = fileVisitor.getFiles();

		// Files in DB but not in FS
		docs.forEach(doc -> {
			if (docInFS.contains(doc.getLocation())) {
				docInDB.remove(doc.getLocation());
				System.out.println("REMOVED: " + doc.getLocation());
			}
		});
		// now docInDB contains all docs that are not in FS!

		// We have to "refill" docInDB here!!!

		// Files in FS but not in DB
		docInFS.forEach(doc -> {
			// TODO: contains() is wrong implemented here
			if (docInDB.contains(doc)) {
				docInFS.remove(doc);
				System.out.println("REMOVED2: " + doc);
			}
		});
		// now docInFS contains all docs that are not in DB!

	}

}
