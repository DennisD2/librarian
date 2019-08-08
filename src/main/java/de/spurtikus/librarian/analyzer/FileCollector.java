package de.spurtikus.librarian.analyzer;

import lombok.Getter;

import java.nio.file.FileVisitResult;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.ArrayList;
import java.util.List;

public class FileCollector extends SimpleFileVisitor<Path> {
    String baseDirectory = "/home/dennis/Downloads/";

    @Getter
    private List<String> files = new ArrayList<>();

    public FileVisitResult visitFile(Path file, BasicFileAttributes attributes) {
        //System.out.println("Visiting file:" + file.getFileName());
        String relativePath = file.toAbsolutePath().toString().replace(baseDirectory, "");

        files.add(relativePath);
        return FileVisitResult.CONTINUE;
    }
}
