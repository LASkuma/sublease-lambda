git stash save -q --keep-index

yarn lint
RESULT=$?

git stash pop -q

[ $RESULT -ne 0 ] && exit 1
exit 0