#!/bin/bash
#
# Produce a Docker image
#

# be verbose and fail fast
set -x -e

CONTEXT_DIR="."
REPOSITORY="photofeed"
TAG="latest"
IMAGE_NAME="${REPOSITORY}:${TAG}"
GIT_COMMIT="$(git rev-parse --short HEAD)"
DOCKER_ID_USER=zjor

# Build Docker image
echo -e "\n == Building docker image ${IMAGE_NAME} =="
docker build \
    --build-arg GIT_COMMIT="${GIT_COMMIT}" \
    --build-arg CLOUDINARY_API_SECRET="${CLOUDINARY_API_SECRET}" \
    -t "${IMAGE_NAME}" "${CONTEXT_DIR}"
docker tag ${IMAGE_NAME} ${DOCKER_ID_USER}/${IMAGE_NAME}
