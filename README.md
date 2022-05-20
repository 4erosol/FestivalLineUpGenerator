# Festival Lineup Generator

## _Generate a festival poster out a user's top artists on Spotify_

Web aplication built using React and SCSS.

Try it in [this website](http://lineupfest.herokuapp.com/).

## Running the app locally

This app runs in Node.js. You can find the instructions on how to install it on its [website](http://www.nodejs.org/download/).

Once you've installed it, clone the repository and install all of it's dependencies running:

> npm install

## Using your own credentials

You'll need to create your app and get your own credentials from the Spotify Developer Dashboard.

To do so, go to [your Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and create your app. Then, you will need to register these redirect URIs in the settings tab on your app:

- [http://localhost:3000](http://localhost:3000) _This one is required for the Grant Flow Authentication process_
- [http://localhost:3000/festival](http://localhost:3000/festival)

Once you have your credentials, create a new .env file and replace the following information:

> REACT_APP_CLIENT_ID=YOUR_CLIENT_ID_GOES_HERE
> REACT_APP_CLIENT_SECRET=YOUR_CLIENT_SECRET_GOES_HERE

In order to run the app, open the folder, and run the following command:

> npm start

A new tab should open in your default browser and you will be able to see the app running.
