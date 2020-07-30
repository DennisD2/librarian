# Spring Boot application with REST backend and Angular frontend in a single jar file. Spring Data is used for DB access. 
This application comes as a single jar package.
It contains a REST service and an Angular frontend to it.
The REST service is implemented using Spring Boot REST.
The Data layer is implemented with Spring Data (JPA Repositories).

# Dependencies
The dependencies include some modules removed from JDK 9 onwards. 
I assume the application runs on JDK 1.8, 9 10, and 11.

Tested with JDK 1.8. 

# Call example

## REST service call

### Documents
```
http://localhost:8080/documents
http://localhost:8080/documents/1
```

### Categories
```
http://localhost:8080/categories
http://localhost:8080/categories/1
```


### Web index page
```
http://localhost:8080/index.html or just http://localhost:8080/ 
```

This requires a Maven run to make sure that the frontend is build and copied
from ```frontend/dist/frontend``` to ```target/classes/resources```.

# How to compile and package
```
mvn clean install -DskipTests
```

# How to run
```
java -jar target/librarian-1.0.0-SNAPSHOT.jar
```

# Running with systemd

Copy ```bin/librarian.service``` to ```/etc/systemd/system/```.

Test service start with:
```
sudo systemctl start librarian.service
```
Check service startup log:
```
sudo systemctl status librarian.service
```
Enable service to be started during system boot:
```
sudo systemctl enable librarian.service
```

# Deploy app to server using Ansible
See ```playbook``` directory.

The playbook 
* deploys the librarian jar file,
* syncronizes documents, 
* backups DB and 
* restart librarian app

## Adapt playbook
Add user+password for ssh in ```group_vars/all.yml```.
Set correct hostname in ```hosts```.

Execute playbook:
```bash
ansible-playbook -i hosts site.yml
```
