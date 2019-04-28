package de.spurtikus.mini;

import de.spurtikus.mini.data.CategoryRepository;
import de.spurtikus.mini.data.DocumentRepository;
import de.spurtikus.mini.data.model.Category;
import de.spurtikus.mini.data.model.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@SpringBootApplication
public class Application {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {
        SpringApplication.run(Application.class);
    }

    @Bean
    public CommandLineRunner demo(DocumentRepository documentRepository,
                                  CategoryRepository categoryRepository) {
        return (args) -> {
            List<Document> docs = documentRepository.findByTitle("HP-75C FORTH");
            if (!docs.isEmpty()) {
                System.out.println("DB already populated. Will not add test samples.");
                return;
            }
            System.out.println("DB is empty. Will add test samples.");

            Category cat_hw = new Category("Hardware");
            Category cat_sw = new Category("Software");
            Category cat_hist = new Category("History");

            categoryRepository.save(cat_hw);
            categoryRepository.save(cat_sw);
            categoryRepository.save(cat_hist);

            // save a couple of Documents
            Document doc = new Document("HP-75C FORTH", 1983, "file:///home/dennis/doclib/software/75Forth.pdf");
            Set<Category> cat = new HashSet<>();
            cat.add(cat_sw);
            cat.add(cat_hist);
            doc.setCategories(cat);
            documentRepository.save(doc);

            documentRepository.save(new Document("Introduction to Hibernate (Slides)", 2009, "file:///home/dennis/doclib/software/01-hibernate-Introduction_to_Hibernate.pdf"));
            documentRepository.save(new Document("Java Persistence API (Slides)", 2009, "file:///home/dennis/doclib/software/10-hibernate-JPA.pdf"));
            documentRepository.save(new Document("Apache Maven User Guide", 2010, "file:///home/dennis/doclib/software/apache-maven.pdf"));
            documentRepository.save(new Document("Better Builds With Maven (2.0)", 2008, "file:///home/dennis/doclib/software/Better_Builds_With_Maven.pdf"));
            documentRepository.save(new Document("BU-9 Wireshark Charts & IO Graphs (Slides)", 2009, "file:///home/dennis/doclib/software/bu-9-tompkins-gearbit-wireshark_charts_&_io_graphs-sharkfest09.pdf"));
            documentRepository.save(new Document("Die Debian GNU/Linux-FAQ", 2006, "file:///home/dennis/doclib/software/debian-faq.de.pdf"));
            documentRepository.save(new Document("Debian-Referenz", 2007, "file:///home/dennis/doclib/software/debian-reference.de.pdf"));
            documentRepository.save(new Document("Eclipse's SWT Basic Widgets", 0, "file:///home/dennis/doclib/software/EclipseSWTBasicWidgetsStarthilfe.pdf"));
            documentRepository.save(new Document("GIMP 2.2 Benutzerhandbuch", 2004, "file:///home/dennis/doclib/software/gimp_handbuch_de.pdf"));
            documentRepository.save(new Document("Java Persistence API", 2006, "file:///home/dennis/doclib/software/JPA-Intro.pdf"));
            documentRepository.save(new Document("Pro Git", 2009, "file:///home/dennis/doclib/software/progit.en.pdf"));
            documentRepository.save(new Document("Getting Started with JPA (DZone Refcardz)", 2008, "file:///home/dennis/doclib/software/rc022-JPA_Online.pdf"));
            documentRepository.save(new Document("What's new in JPA 2.0 (DZone Refcardz)", 2010, "file:///home/dennis/doclib/software/rc128-010d-jpa2_0.pdf"));
            documentRepository.save(new Document("Spring MVC (Slides)", 2005, "file:///home/dennis/doclib/software/spring-mvc.pdf"));
            documentRepository.save(new Document("Einführung in Git (Slides)", 0, "file:///home/dennis/doclib/software/talk-git.pdf"));
            documentRepository.save(new Document("UML 2.0 (Slides)", 2004, "file:///home/dennis/doclib/software/umltutorial.pdf"));

            documentRepository.save(new Document("100 Mhz Frequenzgenerator", 2006, "file:///home/dennis/doclib/electronics/100mhz_frequenzgenerator.pdf"));
            documentRepository.save(new Document("Encyclopedia of Networking", 1995, "file:///home/dennis/doclib/electronics/Copy of eBook - Electronics - Encyclopedia of Electronic Circuits _PDF_.pdf"));
            documentRepository.save(new Document("Digitale Elektronik - Bits und Bytes auf der Spur", 2004, "file:///home/dennis/doclib/electronics/digitalelektronik_skript.pdf"));
            documentRepository.save(new Document("Elektronik 3 (Skript, FH Esslingen)", 0, "file:///home/dennis/doclib/electronics/E3_gesamtDoster_skript_etechnik3.pdf"));
            documentRepository.save(new Document("Introduction to Microcontrollers - Complete Guide to PIC", 2006, "file:///home/dennis/doclib/electronics/_ebook - electronics_ Introduction to Microcontrollers - Complete Guide to PIC.pdf"));
            documentRepository.save(new Document("The Electrical Engineering Handbook", 2006, "file:///home/dennis/doclib/electronics/Ebook - Electronics - The Electrical Engineering Handbook.pdf"));
            documentRepository.save(new Document("Fundamentals of Digital Electronics", 2000, "file:///home/dennis/doclib/electronics/ebook - Engineering - Fundamentals of Digital Electronics.pdf"));
            documentRepository.save(new Document("Elektronik FAQ (V7.1)", 2002, "file:///home/dennis/doclib/electronics/efaq.pdf"));
            documentRepository.save(new Document("The Hardware Book Team - Electronics _ PC_s - All Connectors", 2002, "file:///home/dennis/doclib/electronics/Engineering - The Hardware Book Team - Electronics _ PC_s - All Connectors - eBook.pdf"));
            documentRepository.save(new Document("Operationsverstärker", 2010, "file:///home/dennis/doclib/electronics/Federau_Operationsverstaerker.5.Auflage.pdf"));
            documentRepository.save(new Document("TTL Applications Handbook (Fairchild Semiconductors)", 1973, "file:///home/dennis/doclib/electronics/FS_1973_TTLApplicationsHandbook.pdf"));
            documentRepository.save(new Document("HADES Tutorial (v0.92)", 2006, "file:///home/dennis/doclib/electronics/hades_tutorial.pdf"));
            documentRepository.save(new Document("High Speed Amplifier Techniques AN47 (Linear Technologies)", 2006, "file:///home/dennis/doclib/electronics/linear_technology_an47fa_fast_amps.pdf"));
            documentRepository.save(new Document("Complete Digital Design", 2003, "file:///home/dennis/doclib/electronics/McGraw Hill - Complete Digital Design A Comprehensive Guide to Digital Electronics and Computer System Architecture.pdf"));
            documentRepository.save(new Document("Teach yourself Electricity and Electronics", 2002, "file:///home/dennis/doclib/electronics/Mcgraw-Hill - Teach Yourself Electricity And Electronics.pdf"));
            documentRepository.save(new Document("Die Arthmetisch-Logische Einheit ALU 74181", 2003, "file:///home/dennis/doclib/electronics/Modellcomputer.pdf"));
            documentRepository.save(new Document("Linear Applications Volume 2 (National Semiconductors)", 1976, "file:///home/dennis/doclib/electronics/NS_1976_LinearApplications.pdf"));
            documentRepository.save(new Document("Op Amp Circuit Collection (National Semiconductors)", 2002, "file:///home/dennis/doclib/electronics/opamp_circiut_collection_ns_2003SEP19_AMD_AN07.pdf"));
            documentRepository.save(new Document("Op Amps for Everyone (Design Reference)(Texas Instruments)", 2002, "file:///home/dennis/doclib/electronics/op-amps-for-everyone_slod006b.pdf"));
            documentRepository.save(new Document("Rechnertechnik (Skript)", 0, "file:///home/dennis/doclib/electronics/rt_script_rechnertechnik.pdf"));
            documentRepository.save(new Document("Signetics digital linear mos Applications", 1974, "file:///home/dennis/doclib/electronics/SI_1974_Applications.pdf"));
            documentRepository.save(new Document("The Art of Electronics (2nd Ed.)", 1989, "file:///home/dennis/doclib/electronics/the_art_of_electronics_-_horowitz_and_hill.pdf"));
            documentRepository.save(new Document("The TTL Data Book Volume 1 (Texas Instruments)", 1984, "file:///home/dennis/doclib/electronics/TI_1984_TTLDatabook_Volume1.pdf"));
            documentRepository.save(new Document("The TTL Data Book Volume 3 (Texas Instruments)", 1984, "file:///home/dennis/doclib/electronics/TI_1984_TTLDatabook_Volume3.pdf"));
            documentRepository.save(new Document("The TTL Data Book Volume 3 Supplement (Texas Instruments)", 1984, "file:///home/dennis/doclib/electronics/TI_1984_TTLDatabook_Volume3_Supplement.pdf"));
            documentRepository.save(new Document("The TTL Data Book Volume 4 (Texas Instruments)", 1984, "file:///home/dennis/doclib/electronics/TI_1984_TTLDatabook_Volume4.pdf"));


            // fetch all Documents
            log.info("Documents found with findAll():");
            log.info("-------------------------------");
            for (Document Document : documentRepository.findAll()) {
                log.info(Document.toString());
            }
            log.info("");

            // fetch an individual Document by ID
            documentRepository.findById(1L)
                    .ifPresent(Document -> {
                        log.info("Document found with findById(1L):");
                        log.info("--------------------------------");
                        log.info(Document.toString());
                        log.info("");
                    });

            // fetch Documents by last name
            log.info("Document found with findByTitle('Jack'):");
            log.info("--------------------------------------------");
            documentRepository.findByTitle("Jack").forEach(j -> {
                log.info(j.toString());
            });
            // for (Document bauer : documentRepository.findByLastName("Bauer")) {
            // 	log.info(bauer.toString());
            // }
            log.info("");
        };

    }

}