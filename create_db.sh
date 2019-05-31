#!/bin/bash

DB_NAME="photofeed"
DB_USER="photofeed"
DB_PASS="s3cr3t"

set -x

psql -d postgres -c "create database ${DB_NAME};"
psql -d postgres -c "create user ${DB_USER} with encrypted password '${DB_PASS}'"
psql -d postgres -c "grant all privileges on database ${DB_NAME} to ${DB_USER}"