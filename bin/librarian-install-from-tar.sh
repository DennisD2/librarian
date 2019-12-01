#!/bin/bash
# It is assumed that librarian was already stopped

librarian_home=$HOME/librarian
librarian_db_home=$HOME/librarian

cd $librarian_db_home
mv test2.mv.db test2.mv.db-save
cp test2.mv.db-save test2.mv.db-save-$$
echo "DB saved to test2.mv.db-save-$$"

cd $librarian_home
tar xvf librarian.tar
cp test2.mv.db-save test2.mv.db
echo "Librarian installed, old database will be used."

