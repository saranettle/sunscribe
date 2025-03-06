import zmq
import random

from writing_prompts import prompts

def main():

    # establish zeromq socket
    context = zmq.Context()
    socket = context.socket(zmq.REP)
    socket.bind("tcp://127.0.0.1:5557")
    print("Waiting for messages to initiate random writing prompt service.")

    # waiting for a message from a client
    while True:
        message = socket.recv()
        message = message.decode()

        if len(message) > 0:
            print("Received message from the client: " + message)

            if message == "start":
                random_num = random.randint(1, 90)
                writing_prompt = prompts[random_num]
                socket.send_string(writing_prompt)
                print("Sending the following prompt to the user: " + writing_prompt)

            else:
                print("Did not recognize message")
                socket.send_string("Error in generating a random prompt.")

    context.destroy()

if __name__ == '__main__':
    main()