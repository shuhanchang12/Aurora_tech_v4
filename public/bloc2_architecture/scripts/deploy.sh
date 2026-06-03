#!/bin/bash
set -e

echo "Starting local deployment of Data Architecture Stack..."
cd ../docker

echo "Building docker images..."
docker-compose build

echo "Spinning up PostgreSQL, pgAdmin, and Grafana..."
docker-compose up -d

echo "Waiting for PostgreSQL to be ready..."
sleep 10
echo "Deployment complete! Stack is running."
echo "Access points:"
echo "- Database : localhost:5432"
echo "- pgAdmin  : localhost:5050"
echo "- Grafana  : localhost:3000"
