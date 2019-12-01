#!/bin/bash
source_dir=/home/dennis/doclib
target=pi@raspberrypi:/srv/www/doclib

diffFileName=rsync-`date +"%y-%m-%d-%T"`.txt
diffFileName=`echo $diffFileName|sed -e "s/:/-/g"`

echo "Sync from $source_dir to doclib web server (i.e. $target)"
echo "You have to enter 2 x credentials for rsync"

cd $source_dir
chmod g+r,o+r -R *

# create listing of changes and save if to a file
echo "1. creating list of changes"
rsync -avz --dry-run * $target >rsync-logs/${diffFileName}

# do sync
echo "2. sync files"
rsync -avz * $target

echo "A list-of-changes file was created in $diffFileName"
