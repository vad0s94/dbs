#!/usr/bin/env bash

cd tracker
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install nodejs build-essential xvfb libgtk2.0-0 libxss1 libgconf-2-4 libnss3-dev -y 
sudo npm install webtorrent-hybrid
sudo npm install mongodb --save


sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org

#TODO bindIp set 0.0.0.0 in /etc/mongod.conf

sudo service mongod start


iptables -A INPUT -p tcp --dport 27017 -j ACCEPT


sudo echo "192.168.33.100 tracker.dbs.local" >> /etc/hosts


