# Base image: Ruby with necessary dependencies for Jekyll
FROM ruby:3.2

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    nodejs \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /usr/src/app

# Copy Gemfile and lockfile so the image installs the exact locked versions
COPY Gemfile Gemfile.lock ./

# Install the Bundler version recorded in Gemfile.lock, then install gems
RUN gem install bundler -v 4.0.12
RUN bundle install

# Command to serve the Jekyll site
CMD ["jekyll", "serve", "-H", "0.0.0.0", "-w"]
