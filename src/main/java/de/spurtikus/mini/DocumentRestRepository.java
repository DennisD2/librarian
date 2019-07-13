package de.spurtikus.mini;

import de.spurtikus.mini.data.model.Document;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
//@CrossOrigin
public interface DocumentRestRepository extends PagingAndSortingRepository<Document, Long> {
    // Additional method here
    //List<Document> findByTitle(@Param("title") String title);
    //Document removeCategory(@Param("id") Long id, @Param("category") String category);
}