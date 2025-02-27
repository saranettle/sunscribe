

# Microservice A - Journal Entry Timer

## Overview

This microservice tracks the time spent writing a journal entry. The client can sends a request to the service to start
the timer when journaling is initiated, then sends another request to the service when journaling is completed to stop
the timer. The service then calculates the total elapsed time spent journaling and returns it to the client.

## Communication Contract

To receive data from the microservice, the client must first establish a ZeroMQ request socket at "tcp://localhost:5555"

Python example:

    context = zmq.Context()
    print("Client attempting to connect to server...")
    socket = context.socket(zmq.REQ)
    socket.connect("tcp://localhost:5555")

Once the connection is established, the client can send the following commands to the service in string format:
* Start the timer: "START" 
* End the timer: "STOP"
* Terminate the connection: "Q"

Example to start the timer:

    socket.send_string("START")
    response = socket.recv()
    print("Server Response:", response.decode())

## Receiving data from the micro service

The service will respond to requests with the following responses:
* Start request "START": "Timer started." 
* Stop request "STOP": "X.X"
* Quit request "Q": No response, connection will terminate.
* Unknown request: "Unknown request"

Example to receive data from the service:
   
    socket.send_string("START")
    response = socket.recv()
    print("Server Response:", response.decode())

## Sequence diagram
![Sequence Diagram](https://github.com/user-attachments/assets/4e2d1092-b818-44fa-8ecf-ad8025b6f946)


