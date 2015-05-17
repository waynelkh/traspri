# traspri
### Author : gyzheng, wnlee, chihhsin, yawchen
Real-time translation tool

### Installation Guide (Docker)

Build the docker image from scratch:

1. `git clone https://github.com/waynelkh/traspri.git`
2. `cd traspri/ && git checkout docker`
3. `docker build -t traspri .`
4. `docker run -d -p 8080:8080 traspri`

Pull the docker image from Docker Hub:

1. `docker run -d -p 8080:8080 starbops/traspri`

Open your browser and enter to `http://<server_ip>:8080`, happy traspring!

### Setup webRTC for video comunacation
### User web speech API to translate the voice to text
### Use translate API to translate text from source language to target language
### Use webRTC send the text to other side
### Use web speech API to say the text

Example:
 - Acess the website
 - Click live demo to connect webRTC server and get the hash id
 - Get the user hash id in url
 - Send the url to target user
 - Target user acess the url and join connect the hash id user
 - default language and translate language

Flow chart:  
 - #########First USER JOIN#########
 - First user connect to website
 - Generate the room name "x" for this session
 - First user using "x" to join the room
 - First user tell Secoind the room name "x"
 - #########SECOND USER JOIN#########
 - Second user connect website with hash tag(which is the room name "x")
 - Second user then using the room name "x" to join the room
 - Start the video conference
 
 
