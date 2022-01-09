#!/bin/bash
set -e
set -x
echo "RUNNING MIGRATIONS";
npm run typeorm:migration:run
echo "RUNNING SEEDING"
npm run typeorm:seeding

echo "START SERVER";
npm run start:dev