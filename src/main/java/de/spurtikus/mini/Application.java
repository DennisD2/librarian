package de.spurtikus.mini;

import de.spurtikus.mini.data.DocumentRepository;
import de.spurtikus.mini.data.model.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class Application {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {
        SpringApplication.run(Application.class);
    }

    @Bean
    public CommandLineRunner demo(DocumentRepository repository) {
        return (args) -> {
            List<Document> docs = repository.findByTitle("HP-75C FORTH");
            if (!docs.isEmpty()) {
                System.out.println("DB already populated. Will not add test samples.");
                return;
            }
            System.out.println("DB is empty. Will add test samples.");

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

            repository.save(new Document("100 Mhz Frequenzgenerator", 2006, "file:///home/dennis/doclib/electronics/100mhz_frequenzgenerator.pdf"));
            repository.save(new Document("Encyclopedia of Networking", 1995, "file:///home/dennis/doclib/electronics/Copy of eBook - Electronics - Encyclopedia of Electronic Circuits _PDF_.pdf"));
            repository.save(new Document("Digitale Elektronik - Bits und Bytes auf der Spur", 2004, "file:///home/dennis/doclib/electronics/digitalelektronik_skript.pdf"));
            repository.save(new Document("Elektronik 3 (Skript, FH Esslingen)", 0, "file:///home/dennis/doclib/electronics/E3_gesamtDoster_skript_etechnik3.pdf"));
            repository.save(new Document("Introduction to Microcontrollers - Complete Guide to PIC", 2006, "file:///home/dennis/doclib/electronics/_ebook - electronics_ Introduction to Microcontrollers - Complete Guide to PIC.pdf"));
            repository.save(new Document("The Electrical Engineering Handbook", 2006, "file:///home/dennis/doclib/electronics/Ebook - Electronics - The Electrical Engineering Handbook.pdf"));
            repository.save(new Document("Fundamentals of Digital Electronics", 2000, "file:///home/dennis/doclib/electronics/ebook - Engineering - Fundamentals of Digital Electronics.pdf"));
            repository.save(new Document("Elektronik FAQ (V7.1)", 2002, "file:///home/dennis/doclib/electronics/efaq.pdf"));
            repository.save(new Document("The Hardware Book Team - Electronics _ PC_s - All Connectors", 2002, "file:///home/dennis/doclib/electronics/Engineering - The Hardware Book Team - Electronics _ PC_s - All Connectors - eBook.pdf"));
            repository.save(new Document("Operationsverstärker", 2010, "file:///home/dennis/doclib/electronics/Federau_Operationsverstaerker.5.Auflage.pdf"));
            repository.save(new Document("TTL Applications Handbook (Fairchild Semiconductors)", 1973, "file:///home/dennis/doclib/electronics/FS_1973_TTLApplicationsHandbook.pdf"));
            repository.save(new Document("HADES Tutorial (v0.92)", 2006, "file:///home/dennis/doclib/electronics/hades_tutorial.pdf"));
            repository.save(new Document("High Speed Amplifier Techniques AN47 (Linear Technologies)", 2006, "file:///home/dennis/doclib/electronics/linear_technology_an47fa_fast_amps.pdf"));
            repository.save(new Document("Complete Digital Design", 2003, "file:///home/dennis/doclib/electronics/McGraw Hill - Complete Digital Design A Comprehensive Guide to Digital Electronics and Computer System Architecture.pdf"));
            repository.save(new Document("Teach yourself Electricity and Electronics", 2002, "file:///home/dennis/doclib/electronics/Mcgraw-Hill - Teach Yourself Electricity And Electronics.pdf"));
            repository.save(new Document("Die Arthmetisch-Logische Einheit ALU 74181", 2003, "file:///home/dennis/doclib/electronics/Modellcomputer.pdf"));
            repository.save(new Document("Linear Applications Volume 2 (National Semiconductors)", 1976, "file:///home/dennis/doclib/electronics/NS_1976_LinearApplications.pdf"));
            repository.save(new Document("Op Amp Circuit Collection (National Semiconductors)", 2002, "file:///home/dennis/doclib/electronics/opamp_circiut_collection_ns_2003SEP19_AMD_AN07.pdf"));
            repository.save(new Document("Op Amps for Everyone (Design Reference)(Texas Instruments)", 2002, "file:///home/dennis/doclib/electronics/op-amps-for-everyone_slod006b.pdf"));
            repository.save(new Document("Rechnertechnik (Skript)", 0, "file:///home/dennis/doclib/electronics/rt_script_rechnertechnik.pdf"));
            repository.save(new Document("Signetics digital linear mos Applications", 1974, "file:///home/dennis/doclib/electronics/SI_1974_Applications.pdf"));
            repository.save(new Document("The Art of Electronics (2nd Ed.)", 1989, "file:///home/dennis/doclib/electronics/the_art_of_electronics_-_horowitz_and_hill.pdf"));
            repository.save(new Document("The TTL Data Book Volume 1 (Texas Instruments)", 1984, "file:///home/dennis/doclib/electronics/TI_1984_TTLDatabook_Volume1.pdf"));
            repository.save(new Document("The TTL Data Book Volume 3 (Texas Instruments)", 1984, "file:///home/dennis/doclib/electronics/TI_1984_TTLDatabook_Volume3.pdf"));
            repository.save(new Document("The TTL Data Book Volume 3 Supplement (Texas Instruments)", 1984, "file:///home/dennis/doclib/electronics/TI_1984_TTLDatabook_Volume3_Supplement.pdf"));
            repository.save(new Document("The TTL Data Book Volume 4 (Texas Instruments)", 1984, "file:///home/dennis/doclib/electronics/TI_1984_TTLDatabook_Volume4.pdf"));


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