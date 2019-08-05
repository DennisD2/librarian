package de.spurtikus.librarian.data;

import de.spurtikus.librarian.data.model.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category, Long> {
}
