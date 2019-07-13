package de.spurtikus.mini.data;

import java.util.List;

import de.spurtikus.mini.data.model.Document;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface DocumentRepository extends CrudRepository<Document, Long> {
    List<Document> findByTitle(String title);
    //Document removeCategory(@Param("id") Long id, @Param("category") String category);
}