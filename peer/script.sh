#!/usr/bin/env bash

cd tracker
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install nodejs build-essential xvfb libgtk2.0-0 libxss1 libgconf-2-4 libnss3-dev -y 
sudo npm install webtorrent-hybrid
sudo npm install mongodb --save

sudo echo "192.168.33.100 tracker.dbs.local" >> /etc/hosts

