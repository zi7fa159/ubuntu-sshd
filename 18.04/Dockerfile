FROM ubuntu:latest

# Install dependencies
RUN apt-get update && \
    apt-get install -y curl tar gzip

# Download KASM release files
RUN cd /tmp && \
    curl -O https://kasm-static-content.s3.amazonaws.com/kasm_release_1.13.1.421524.tar.gz && \
    curl -O https://kasm-static-content.s3.amazonaws.com/kasm_release_service_images_amd64_1.13.1.421524.tar.gz && \
    curl -O https://kasm-static-content.s3.amazonaws.com/kasm_release_workspace_images_amd64_1.13.1.421524.tar.gz

# Extract KASM release files
RUN tar -xf kasm_release_1.13.1.421524.tar.gz

# Deploy KASM
CMD sudo bash kasm_release/install.sh --offline-workspaces /tmp/kasm_release_workspace_images_amd64_1.13.1.421524.tar.gz --offline-service /tmp/kasm_release_service_images_amd64_1.13.1.421524.tar.gz
