import zmq
import time


def main():
    # Create a ZMQ context object and use it to connect to a socket.
    context = zmq.Context()
    print("Client attempting to connect to server...")
    socket = context.socket(zmq.REQ)
    socket.connect("tcp://localhost:5555")

    # Send a request to the server.
    request = "START"
    print(f"Sending the following request to the server: {request}")
    socket.send_string(request)

    # Receive response from the server.
    response = socket.recv()
    print(f"Server replied: {response.decode()}")

    time.sleep(10.52)
    # Send a request to the server.
    request = "STOP"
    print(f"Sending the following request to the server: {request}")
    socket.send_string(request)
    
    # Receive response from the server.
    response = socket.recv()
    print(f"Server replied: {response.decode()}")
    
    socket.send_string("Q")

if __name__ == '__main__':
    main()