package de.spurtikus.mini.data;

import de.spurtikus.mini.data.model.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category, Long> {
}
