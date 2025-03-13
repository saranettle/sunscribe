import zmq
from pymongo import MongoClient

def main():

    client = MongoClient("your_mongodb_connection_string")
    db = client.your_database_name
    entries_collection = db.entries
    
    context = zmq.Context()
    socket = context.socket(zmq.REP)
    socket.bind("tcp://127.0.0.1:5558")
    print("Waiting for messages to initiated word count service.")

    while True:
        message = socket.recv()
        message = message.decode()

        if len(message) > 0:
            print("Received message from the client: " + message)

            word_count = len(message.split())  # Count words
            socket.send_string(str(word_count))
            print("Sending the following prompt to the user: " + str(word_count))



if __name__ == '__main__':
    main()