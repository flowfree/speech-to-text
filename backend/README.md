Backend
=======

## Requirements

Make sure you have Python 3.8+ installed on your machine.

## Installation

1.  Change your current working directory to the backend code:

    cd backend

1.  Create and activate new virtual env:

    python3 -m venv venv
    . venv/bin/activate

1.  Install the required packages:

    pip install -r requirements.txt

1.  Run the SSL development server

    uvicorn src.main:app \
        --ssl-keyfile "/path/to/localhost-key.pem" \
        --ssl-certfile "/path/to/localhost.pem" \
        --reload
