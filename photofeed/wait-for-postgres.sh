#!/bin/sh
# wait-for-postgres.sh
# see https://docs.docker.com/compose/startup-order/

set -e

host="$1"
shift
cmd="$@"

until PGPASSWORD=${DB_PASS} psql -h "$host" -U "${DB_USER}" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd