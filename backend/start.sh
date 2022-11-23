# !/bin/sh

echo "Generating google-credentials.json from host environment variable"

echo $GOOGLE_CREDENTIALS > google-credentials.json

exec "$@"

eval "gunicorn api.wsgi:application --bind 0.0.0.0:$PORT"


# This script takes the value stored in the GOOGLE_CREDENTIALS environment 
# variable and echoes it into a new .json file in the Docker container's 
# filesystem, creating a fresh copy each time we build the container.

# The exec "$@" line replaces the parent process with the current child process.
# This is important in Docker containers for signals to be proxied correctly, 
# otherwise we might end up with data loss or orphan processes. 

# https://yeti.co/blog/Authorizing-Google-Cloud-Platform/