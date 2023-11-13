FROM ubuntu:latest

# Set the working directory to /tmp
WORKDIR /tmp

# Download the KASM release tarball
RUN curl -O -s https://kasm-static-content.s3.amazonaws.com/kasm_release_1.14.0.3a7abb.tar.gz

# Extract the tarball
RUN tar -xf kasm_release_1.14.0.3a7abb.tar.gz

# Install KASM
CMD sudo bash kasm_release/install.sh
