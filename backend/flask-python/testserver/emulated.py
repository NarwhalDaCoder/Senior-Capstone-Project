# echo-server.py

import socket
import json
import os
import time

#Define limits
CHANNELS = 72
MIXES = 24

#Define IP connection
HOST = "127.0.0.1"  # Standard loopback interface address (localhost)
PORT = 5002  # Port to listen on (non-privileged ports are > 1023)

'''This functions takes a token list, and checks if tokens are in the correct format'''
def validateTokens(tokens):
    #define valid paths
    validPrefix = ['get', 'set']
    validInfix = ['MIXER:Current/InCh/Label/Name',
                  'MIXER:Current/InCh/ToMix/Level',
                   'MIXER:Current/InCh/ToMix/Pan',
                   'MIXER:Current/InCh/ToMix/On']
    
    #Check if tokens are invalid compared to expected values
    isValidPrefix = tokens[0] in validPrefix
    isValidInfix = tokens[1] in validInfix
    isValidChannel = int(tokens[2]) < CHANNELS 
    isValidMixes = int(tokens[3]) < MIXES
    isValidLength = len(tokens) == 4
    if not(isValidPrefix and isValidInfix and isValidChannel and isValidMixes and isValidLength):
        return []
    
    #get index of infix
    index = -1
    for i in range(len(validInfix)):
        if tokens[1] in validInfix[i]:
            index = i
            break
    #return list containing command, infix index, Mix and channel
    return [0,i,tokens[2],tokens[3]]
'''This function takes a loaded json file in python format, and find the entry required,
baased on the command given'''
def getData(data,command):
    labels = ["Name","Level","Pan",'On']
    #Get value from json based on command
    configData = data['mixes'][0][command[2]][command[3]][labels[command[1]]]


    return str(configData)
'''This function takes a command given by a connect client,
and return the entry from a json file, to replicate a Yamaha CL5'''
def echoServer():
    __location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))
    f = open(os.path.join(__location__,"dummy.json"))
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((HOST, PORT))
        s.listen()
        conn, addr = s.accept()
        with conn:
            print(f"Connected by {addr}")
            CL5 = json.load(f)
            while True:
                data = conn.recv(1024).decode()
                print(data)
                if len(data.split()) > 0 and data.split()[0] == 'get':
                    try:
                        command = validateTokens(data.split())
                        print(command)
                        if command == []:
                            break
                        response  = 'OK ' + data + ' ' + getData(CL5,command)
                    except Exception as e:
                        print(e)
                        response = "FAILED TO PROCESS"
                    finally:
                        time.sleep(.1)
                        conn.sendall(response.encode())
                elif len(data.split()) > 0 and data.split()[0] == 'set':
                    # No need to validate tokens for set commands
                    # The commands cannot change, they are hardcoded
                    response = 'OK ' + data + ' LOADED'
                    conn.sendall(response.encode())
                else:
                    break



