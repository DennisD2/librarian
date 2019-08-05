package de.spurtikus.librarian;

import de.spurtikus.librarian.data.model.Category;
import org.springframework.data.repository.PagingAndSortingRepository;

//@RepositoryRestResource(exported = false)
//@CrossOrigin
public interface CategoryRestRepository extends PagingAndSortingRepository<Category, Long> {
}