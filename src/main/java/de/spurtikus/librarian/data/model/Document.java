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
public class Document implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="ID")
    @Getter
    @Setter
    private Long id;

    // Document title
    @Getter
    @Setter
    private String title;

    // Document year of publishing
    @Getter
    @Setter
    private int publishedYear;

    // Local storage location; relative path to some base directory
    @Getter
    @Setter
    private String location;

    // Authors
    @Getter
    @Setter
    private String authors;

    // Timestamp
    @Getter
    @Setter
    private String timestamp;

    // List of Categories
    @Getter
    @Setter
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            joinColumns=@JoinColumn(name="DOCUMENT_ID", referencedColumnName="ID"),
            inverseJoinColumns=@JoinColumn(name="CATEGORY_ID", referencedColumnName="ID"))
    private List<Category> categories = new ArrayList<>();

    public Document(String title, int publishedYear, String location) {
        this.title = title;
        this.publishedYear = publishedYear;
        this.location = location;
    }
}
