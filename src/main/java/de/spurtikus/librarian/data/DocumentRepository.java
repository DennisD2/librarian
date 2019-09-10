package de.spurtikus.librarian.data;

import java.util.List;

import de.spurtikus.librarian.data.model.Document;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;

public interface DocumentRepository extends CrudRepository<Document, Long>, QueryByExampleExecutor<Document> {
    List<Document> findByTitle(String title);
    //Document removeCategory(@Param("id") Long id, @Param("category") String category);
}