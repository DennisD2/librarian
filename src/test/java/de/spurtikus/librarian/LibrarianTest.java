package de.spurtikus.librarian;

import de.spurtikus.librarian.data.DocumentRepository;
import de.spurtikus.librarian.data.model.Document;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
		String baseDirectory = "/home/dennis/doclib/";

		FileCollector fileVisitor = collectFiles(baseDirectory);
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
		String baseDirectory = "/home/dennis/doclib/";
		FileCollector fileVisitor = collectFiles(baseDirectory);
		List<String> docInFS = fileVisitor.getFiles();

		System.out.println("Size DB: " + docInDB.size());
		System.out.println("Size FS: " + docInFS.size());

		// Files in FS but not in DB
		filesInFSButNotInDB(docInDB, baseDirectory, docInFS);

		// Files in DB but not in FS
		filesInDBButNotInFS(docInDB, baseDirectory, docInFS);

	}

	private boolean isIgnoredLocation(String location) {
		return location.startsWith("rsync-logs/") || location.startsWith("bin/") || location.startsWith("new/");
	}

	private void filesInFSButNotInDB(ArrayList<Document> docInDB, String baseDirectory, List<String> docInFS) {
		List<String> docInDBStreamed = docInDB.stream().map(d -> d.getLocation()).map(d -> reEscape(d)).collect(Collectors.toList());
		List<String> docInFSStreamed = docInFS.stream().map(d -> d.replace(baseDirectory, "")).map(d -> reEscape(d)).collect(Collectors.toList());
		System.out.println("Size Streamed: " + docInDBStreamed.size());

		List<String> docToRemoveFromFSList = new ArrayList<>();
		docInDBStreamed.forEach(location -> {
			//String newLocation = reEscape(location);
			//System.out.println("Check: " + location );
			if (docInFSStreamed.contains(location)) {
				docToRemoveFromFSList.add(location);
				//System.out.println("REMOVED: " + location);
			}
		});
		docInFSStreamed.forEach(location -> {
			if (isIgnoredLocation(location)) {
				docToRemoveFromFSList.add(location);
			}
		});
		docToRemoveFromFSList.forEach(doc -> docInFSStreamed.remove(doc));
		// now docInFSStreamed contains all docs that are not in DB!
		System.out.println("-----------------\nFS Orphans: Number of objects 'in FS but not in DB': " + docInFSStreamed.size());
		docInFSStreamed.forEach(doc -> System.out.println("In FS but not in DB: " + doc));
	}

	private void filesInDBButNotInFS(ArrayList<Document> docInDB, String baseDirectory, List<String> docInFS) {
		List<String> docInDBStreamed = docInDB.stream().map(d -> d.getLocation()).map(d -> reEscape(d)).collect(Collectors.toList());
		List<String> docInFSStreamed = docInFS.stream().map(d -> d.replace(baseDirectory, "")).map(d -> reEscape(d)).collect(Collectors.toList());
		System.out.println("Size Streamed: " + docInDBStreamed.size());

		List<String> docToRemoveFromDBList = new ArrayList<>();
		docInFSStreamed.forEach(location -> {
			//System.out.println("Check: " + location );
			//String newLocation = reEscape(location);
			if (docInDBStreamed.contains(location)) {
				docToRemoveFromDBList.add(location);
				//System.out.println("REMOVED: " + newLocation);
			}
		});

		docToRemoveFromDBList.forEach(doc -> docInDBStreamed.remove(doc));
		// now docInDBStreamed contains all docs that are not in FS!
		System.out.println("-----------------\nDB Orphans: Number of objects 'in DB but not in FS': " + docInDBStreamed.size());
		docInDBStreamed.forEach(doc -> System.out.println("In DB but not in FS: " + doc));
	}

	private String reEscape(String location) {
		if (location.contains("%")) {
			return URLDecoder.decode(location);
		}
		return location;
	}

}
