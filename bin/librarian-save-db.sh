#!/bin/bash
librarian_home=$HOME/librarian
target=dennis@dennis-pc:/home/dennis/00_BACKUPS

# Stop librarian; this assumes only ONE java proc is running
killall java

datePostfix=`date +"%y-%m-%d-%T"`
datePostfix=`echo $datePostfix|sed -e "s/:/-/g"`

echo "Sync from $librarian_home to $target"
echo "You have to enter 1 x credentials for rsync "

cd $librarian_home
cp test2.mv.db test2.mv.db-${datePostfix}
scp test2.mv.db-${datePostfix} $target
