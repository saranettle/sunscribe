import zmq

def main():
    # Create a ZMQ context object and use it to connect to a socket.
    context = zmq.Context()
    print("Client attempting to connect to server...")
    socket = context.socket(zmq.REQ)
    socket.connect("tcp://localhost:5556")

    # Send an email address to the server.
    request = "sara.nettle@gmail.com"
    print(f"Sending the following email to the server: {request}")
    socket.send_string(request)
    
    # Receive response from the server.
    response = socket.recv()
    print(f"Server replied: {response.decode()}")
    
    context.destroy()

if __name__ == '__main__':
    main()