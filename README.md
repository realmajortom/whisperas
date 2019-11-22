# Whisperas : The Pancreas Whisperer
A mobile portable web app designed to help diabetics track their daily well-being and discover trends over time.

Check it out: https://whisperas.com

## Introduction
This app is special to me, because as a Type 1 diabetic myself I've been wanting to produce a tool that can meaningfully benefit other patients in my community. Like any chronic illness, managing T1 Diabetes is highly involved and often exhausting. Whisperas aims to simplify patients' lives by helping them visualize the relationships between their treatment regimen, physical activity, diet, and anything else they'd like to record.

Whisperas is built from the ground-up to ensure user privacy and security. The tool does not require, request, nor record any personally-identifying information; all communications between the client and server are over a secure TLS connection, passwords are never stored in plain-text, and the database itself is encrypted.

## Technologies
- PWA
- React
- Node.js + Express
- MongoDB
- Google Cloud Platform

## Upcoming Features & Fixes
- As of now, there is no way for users to delete their accounts on their own...hasn't really been a priority. If it is requested I'll gladly put something together!

## Screenshots

### Login & Landing
<kbd>
  <p></p>
  <br>
  &nbsp;
  <img src="https://thomasg.dev/screenshots/whisperas/login.png" width="300px">
  &nbsp;&nbsp;
  <img src="https://thomasg.dev/screenshots/whisperas/home.png" width="300px">
  &nbsp;
  <br>
  <p></p>
</kbd>

### New Entry
<kbd>
  <p></p>
  <br>
  &nbsp;
  <kbd><img src="https://thomasg.dev/screenshots/whisperas/q1.png" width="250px"></kbd>
  &nbsp;
  <kbd><img src="https://thomasg.dev/screenshots/whisperas/q2.png" width="250px"></kbd>
  &nbsp;
  <kbd><img src="https://thomasg.dev/screenshots/whisperas/q3.png" width="250px"></kbd>
  &nbsp;
  <br>
  <p></p>
  &nbsp;
  <kbd><img src="https://thomasg.dev/screenshots/whisperas/q4.png" width="250px"></kbd>
  &nbsp;
  <kbd><img src="https://thomasg.dev/screenshots/whisperas/q6.png" width="250px"></kbd>
  &nbsp;
  <kbd><img src="https://thomasg.dev/screenshots/whisperas/q8.png" width="250px"></kbd>
  &nbsp;
  <br>
  <p></p>
</kbd>

### History
<kbd>
  <p></p>
  <br>
  &nbsp;
  <img src="https://thomasg.dev/screenshots/whisperas/history.png" width="300px">
  &nbsp;
  <img src="https://thomasg.dev/screenshots/whisperas/history_open.png" width="300px">
  &nbsp;
  <br>
  <p></p>
</kbd>

### Trends
<kbd>
  <p></p>
  <br>
  &nbsp;
  <img src="https://thomasg.dev/screenshots/whisperas/trends.png" width="300px">
  &nbsp;
  <br>
  <p></p>
</kbd>

### Preferences & Resources
<kbd>
  <p></p>
  <br>
  &nbsp;
  <img src="https://thomasg.dev/screenshots/whisperas/preferences.png" width="300px">
  &nbsp;
  <img src="https://thomasg.dev/screenshots/whisperas/resources.png" width="300px">
  &nbsp;
  <br>
  <p></p>
</kbd>


## Credits
- The dialogs, checkboxes, trashcan icon, and info icon are from ANTD:  https://ant.design/
- The other in-app icons are sourced from the Material Design Project:  https://material.io/
- The card box-shadow css is from this great gist (Sergej Lotz is a saint for putting this together):  https://gist.github.com/serglo/f9f0be9a66fd6755a0bda85f9c64e85f
- Create React App:  https://create-react-app.dev/
- The app icon is licensed from Adobe Stock
- There are probably 100,000,000,000+ npm dependencies whose authors I simply cannot list here. Feel free to peruse the package-lock.json files if you'd like your brain to melt.
