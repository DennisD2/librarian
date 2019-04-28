package de.spurtikus.mini.data;

import java.util.List;

import de.spurtikus.mini.data.model.Document;
import org.springframework.data.repository.CrudRepository;

public interface DocumentRepository extends CrudRepository<Document, Long> {
    List<Document> findByTitle(String title);
}