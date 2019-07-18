package de.spurtikus.mini.data.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Document implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="ID")
    private Long id;

    // Document title
    private String title;

    // Document year of publishing
    private int publishedYear;

    // Local storage location; relative path to some base directory
    private String location;

    // Authors
    private String authors;

    // List of Categories
    @ManyToMany
    @JoinTable(
            joinColumns=@JoinColumn(name="DOCUMENT_ID", referencedColumnName="ID"),
            inverseJoinColumns=@JoinColumn(name="CATEGORY_ID", referencedColumnName="ID"))
    private List<Category> categories = new ArrayList<>();

    public Document() {
        super();
    }

    public Document(String title, int publishedYear, String location) {
        this.title = title;
        this.publishedYear = publishedYear;
        this.location = location;
    }
    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getPublishedYear() {
        return publishedYear;
    }

    public void setPublishedYear(int publishedYear) {
        this.publishedYear = publishedYear;
    }

    public String getAuthors() {
        return authors;
    }

    public void setAuthors(String authors) {
        this.authors = authors;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result;
        return result;
    }

    @Override
    public boolean equals(final Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        final Document d = (Document) obj;
        return title.equals(d.title) && publishedYear==d.publishedYear;
    }

    @Override
    public String toString() {
        final StringBuilder builder = new StringBuilder();
        builder.append("Document [id=").append(id).append("][title=").append(title).append("]").append("[published=").append(publishedYear).append("]");
        return builder.toString();
    }

}
