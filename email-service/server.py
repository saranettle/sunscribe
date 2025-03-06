import os
from dotenv import load_dotenv
import zmq
import smtplib

def main():

    load_dotenv()

    # create the zmq socket and bind to a port
    context = zmq.Context()
    socket = context.socket(zmq.REP)
    socket.bind("tcp://127.0.0.1:5556")
    print("Waiting for messages from the client.")

    # establish the email sender and message
    sender_email = os.getenv("SENDER_EMAIL")
    email_password = os.getenv("EMAIL_PASSWORD")


    # Listen for a request from client.
    while True:
        message = socket.recv()
        message = message.decode()

        # Determine approriate action for request
        if len(message) > 0:
            print(f"Received email address from the client: {message}")
            match message:
                case 'Q' | "q":
                    # tell the service to stop running
                    break
                
                case _:
                    # assume the message being received is an email 
                    # (in the future, we can validate the message)
                    pass
                    
    
    context.destroy()


if __name__ == '__main__':
    main()