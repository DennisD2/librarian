package de.spurtikus.mini;

import java.util.List;

import de.spurtikus.mini.data.model.Document;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource()
@CrossOrigin(origins = "", allowedHeaders = "*")
public interface DocumentRestRepository extends PagingAndSortingRepository<Document, Long> {
    // Additional method her
    List<Document> findByTitle(@Param("title") String title);

}