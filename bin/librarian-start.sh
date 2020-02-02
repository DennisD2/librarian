#!/bin/bash
librarian_home=/home/pi/librarian

cd $librarian_home

# Start for standalone
#/usr/bin/java -Dspring.config.location=$librarian_home/librarian-config.properties -jar $librarian_home/librarian-1.0.0-SNAPSHOT.jar > $librarian_home/librarian.log 2>&1 &

# Start for systemd
/usr/bin/java -Dspring.config.location=$librarian_home/librarian-config.properties -jar $librarian_home/librarian-1.0.0-SNAPSHOT.jar > $librarian_home/librarian.log

echo "Librarian started"
