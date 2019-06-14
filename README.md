# vuejs_nodejs_mongodb
Full stack project using vuejs + nodejs + MongoDB

# How to use it

Simply clone the repository on your machine, then install the npm packages in the "ui" and "backend" folder.

1 . For the UI:
```sh
cd ui
npm install
```

2. For the Backend:

```sh
cd ui
npm install
```

NOTE: you need to have your mongo instance running on the standard port 27017.
In case you don't have mongoDb installed, look down below in the section "How to install MongoDb"


Once the packages are installed then just open 2 terminals (one for the backend and one for the ui):
a. In the first terminal let's run the backend:
```sh
cd backend
npm start
```

b. In the second terminal let's run the ui:
```sh
cd ui
npm run serve
```

Now if you navigate in your browser to the link http://localhost:8080 you will see the home page working.

# How to run test

Navigate to the backend folder and simply run:
```sh
npm run test
```

Make sure to have your mongo instance running. If it is not you will have a time out error.

# How to install Nodejs
```sh
curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install build-essential
```

# How to install npm

```sh
apt install npm
```

# How to install mongoDb
```sh
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo mkdir -p /data/db
sudo systemctl start mongod
```
