# Name:  Matthew Baker
# OSU Email:  bakerma2@oregonstate.edu
# Course: CS361 - Software Engineering 1
# Assignment:  Course Project
# Description:  Microservice A for Sara's Project - Calculates the time spent writing a journal entry.

import time
import zmq

def main():
    #Initialize timing variables
    start_time = None
    total_time = None

    # Create a ZMQ context object and use it to bind a socket.
    context = zmq.Context()
    socket = context.socket(zmq.REP)
    socket.bind("tcp://127.0.0.1:5555")
    print("Waiting for messages.")

    # Listen for a request from client.
    while True:
        message = socket.recv()
        message = message.decode()

        # Determine approriate action for request
        if len(message) > 0:
            print(f"Received request from the client: {message}")
            match message:
                case 'Q' | "q":
                    break
                case "START" | "start":
                    start_time = time.time()
                    response = "Timer started."
                    socket.send_string(response)
                    print(f"Sending response to the client: {response}")
                case "STOP" | "stop":
                    total_time = time.time() - start_time
                    response = f"{total_time: .1f}"
                    socket.send_string(response)
                    print(f"Sending response to the client: {response} seconds")
                case _:
                    response = "Unknown request"
                    socket.send_string(response)
                    print(f"Sending response to the client: {response}")
    context.destroy()


if __name__ == '__main__':
    main()