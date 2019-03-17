package de.spurtikus.mini;

import de.spurtikus.mini.data.DocumentRepository;
import de.spurtikus.mini.data.model.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {
        SpringApplication.run(Application.class);
    }

    @Bean
    public CommandLineRunner demo(DocumentRepository repository) {
        return (args) -> {
            // save a couple of Documents
            repository.save(new Document("HP-75C FORTH", 1983, "file:///home/dennis/doclib/software/75Forth.pdf"));
            repository.save(new Document("Introduction to Hibernate (Slides)", 2009, "file:///home/dennis/doclib/software/01-hibernate-Introduction_to_Hibernate.pdf"));
            repository.save(new Document("Java Persistence API (Slides)", 2009, "file:///home/dennis/doclib/software/10-hibernate-JPA.pdf"));
            repository.save(new Document("Apache Maven User Guide", 2010, "file:///home/dennis/doclib/software/apache-maven.pdf"));
            repository.save(new Document("Better Builds With Maven (2.0)", 2008, "file:///home/dennis/doclib/software/Better_Builds_With_Maven.pdf"));
            repository.save(new Document("BU-9 Wireshark Charts & IO Graphs (Slides)", 2009, "file:///home/dennis/doclib/software/bu-9-tompkins-gearbit-wireshark_charts_&_io_graphs-sharkfest09.pdf"));
            repository.save(new Document("Die Debian GNU/Linux-FAQ", 2006, "file:///home/dennis/doclib/software/debian-faq.de.pdf"));
            repository.save(new Document("Debian-Referenz", 2007, "file:///home/dennis/doclib/software/debian-reference.de.pdf"));
            repository.save(new Document("Eclipse's SWT Basic Widgets", 0, "file:///home/dennis/doclib/software/EclipseSWTBasicWidgetsStarthilfe.pdf"));
            repository.save(new Document("GIMP 2.2 Benutzerhandbuch", 2004, "file:///home/dennis/doclib/software/gimp_handbuch_de.pdf"));
            repository.save(new Document("Java Persistence API", 2006, "file:///home/dennis/doclib/software/JPA-Intro.pdf"));
            repository.save(new Document("Pro Git", 2009, "file:///home/dennis/doclib/software/progit.en.pdf"));
            repository.save(new Document("Getting Started with JPA (DZone Refcardz)", 2008, "file:///home/dennis/doclib/software/rc022-JPA_Online.pdf"));
            repository.save(new Document("What's new in JPA 2.0 (DZone Refcardz)", 2010, "file:///home/dennis/doclib/software/rc128-010d-jpa2_0.pdf"));
            repository.save(new Document("Spring MVC (Slides)", 2005, "file:///home/dennis/doclib/software/spring-mvc.pdf"));
            repository.save(new Document("Einführung in Git (Slides)", 0, "file:///home/dennis/doclib/software/talk-git.pdf"));
            repository.save(new Document("UML 2.0 (Slides)", 2004, "file:///home/dennis/doclib/software/umltutorial.pdf"));


            // fetch all Documents
            log.info("Documents found with findAll():");
            log.info("-------------------------------");
            for (Document Document : repository.findAll()) {
                log.info(Document.toString());
            }
            log.info("");

            // fetch an individual Document by ID
            repository.findById(1L)
                    .ifPresent(Document -> {
                        log.info("Document found with findById(1L):");
                        log.info("--------------------------------");
                        log.info(Document.toString());
                        log.info("");
                    });

            // fetch Documents by last name
            log.info("Document found with findByTitle('Jack'):");
            log.info("--------------------------------------------");
            repository.findByTitle("Jack").forEach(j -> {
                log.info(j.toString());
            });
            // for (Document bauer : repository.findByLastName("Bauer")) {
            // 	log.info(bauer.toString());
            // }
            log.info("");
        };

    }

}