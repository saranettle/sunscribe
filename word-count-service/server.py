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



if __name__ == '__main__':
    main()