package de.spurtikus.mini;

import de.spurtikus.mini.data.model.Category;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "category", path = "category")
@CrossOrigin
public interface CategoryRestRepository extends PagingAndSortingRepository<Category, Long> {
}