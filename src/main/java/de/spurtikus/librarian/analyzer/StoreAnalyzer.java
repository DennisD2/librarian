package de.spurtikus.librarian.analyzer;

import de.spurtikus.librarian.data.model.Document;

import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class StoreAnalyzer {

    public FileCollector collectFiles(String baseDirectory) throws IOException {
        Path path = Paths.get(baseDirectory);
        FileCollector fileVisitor = new FileCollector();
        Files.walkFileTree(path, fileVisitor);
        return fileVisitor;
    }

    private boolean isIgnoredLocation(String location) {
        return location.startsWith("rsync-logs/") || location.startsWith("bin/") || location.startsWith("new/");
    }

    public List<String> filesInFSButNotInDB(ArrayList<Document> docInDB, String baseDirectory, List<String> docInFS) {
        List<String> docInDBStreamed = docInDB.stream().map(d -> d.getLocation()).map(d -> reEscape(d)).collect(Collectors.toList());
        List<String> docInFSStreamed = docInFS.stream().map(d -> d.replace(baseDirectory, "")).map(d -> reEscape(d)).collect(Collectors.toList());

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
        return docInFSStreamed;
    }

    public List<String> filesInDBButNotInFS(ArrayList<Document> docInDB, String baseDirectory, List<String> docInFS) {
        List<String> docInDBStreamed = docInDB.stream().map(d -> d.getLocation()).map(d -> reEscape(d)).collect(Collectors.toList());
        List<String> docInFSStreamed = docInFS.stream().map(d -> d.replace(baseDirectory, "")).map(d -> reEscape(d)).collect(Collectors.toList());

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
        return docInDBStreamed;
    }

    public String reEscape(String location) {
        if (location.contains("%")) {
            return URLDecoder.decode(location);
        }
        return location;
    }

    public Map<String, String> getDoublettes(String baseDirectory) throws IOException {
        FileCollector fileVisitor = collectFiles(baseDirectory);
        List<String> docInFS = fileVisitor.getFiles();

        List<String> docInFSStreamed = docInFS.stream().map(d -> reEscape(d)).collect(Collectors.toList());

        Map<Long, String> fileWithHash = new HashMap<>();
        Map<String, String> doublettes = new HashMap<>();
        //MessageDigest md = MessageDigest.getInstance("MD5");
        docInFSStreamed.forEach(doc -> {
            File f = new File(doc);
            long length = f.length();
            if (fileWithHash.containsKey(length)) {
                doublettes.put(doc.replace(baseDirectory,""),
                        fileWithHash.get(length).replace(baseDirectory,""));
            } else {
                fileWithHash.put(f.length(), doc);
            }
        });
        return doublettes;
    }

	/*private static byte[] checksum(String filepath, MessageDigest md) {
		try (DigestInputStream dis = new DigestInputStream(new FileInputStream(filepath), md)) {
			while (dis.read() != -1);
			md = dis.getMessageDigest();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
		return md.digest();
	}*/
}
