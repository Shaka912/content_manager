#!/bin/bash

cd /home/ec2-user  # Update the directory path to your application's root directory
sudo rm -r content_manager

git clone https://github.com/Shaka912/content_manager.git

cd /home/ec2-user/content_manager
# Install dependencies
sudo npm install

# Start the application as a background process
sudo npm start > /dev/null 2>&1 &
