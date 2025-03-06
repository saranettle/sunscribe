import zmq


def main():
    # Create a ZMQ context object and use it to connect to a socket.
    context = zmq.Context()
    print("Client attempting to connect to writing prompt server...")
    socket = context.socket(zmq.REQ)
    socket.connect("tcp://localhost:5557")

    user_input = input("Type 'start' to continue. Type 'q' to quit.\n")
    while user_input != 'q':
        socket.send_string(user_input)

        response = socket.recv()

        print("Here is the server response:")
        print(response.decode())

        user_input = input("Type 'start' to continue. Type 'q' to quit.\n")

    socket.send_string('q')
    context.destroy()

if __name__ == '__main__':
    main()