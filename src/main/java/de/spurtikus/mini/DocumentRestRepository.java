package de.spurtikus.mini;

import de.spurtikus.mini.data.model.Document;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
//@CrossOrigin
public interface DocumentRestRepository extends CrudRepository<Document, Long> {
    // Additional method here
    //List<Document> findByTitle(@Param("title") String title);
    //Document removeCategory(@Param("id") Long id, @Param("category") String category);
}