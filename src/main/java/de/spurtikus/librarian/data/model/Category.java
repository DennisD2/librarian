package de.spurtikus.librarian.data.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class Category implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="ID")
    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private String category;

    @Getter
    @Setter
    @ManyToMany
    private List<Document> books = new ArrayList<>();

    public Category(String category) {
        super();
        this.category = category;
    }
}
