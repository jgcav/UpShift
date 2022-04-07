
# [UpShift](https://expo.dev/@mrchrish/UpShift)

[UpShift](https://expo.dev/@mrchrish/UpShift) is a social media app designed to be used by motorcyclists, created as a group for our final project on the Northcoders bootcamp. The app allows for users to find other riders within their local area and plan trips. Features of the app include:
  - Login/ Sign up Authentication
  - Upload photos
  - Create Routes
  - Save Routes
  - View Routes
  - Search for riders
  - Filter rider Search
  - View Rider Profiles
  - Send connection requests
  - Approve/Deny connection requests
  - Send/Recieve realtime messages

Users can sign up or login to the app using Firebase Authentication when opening it. Upon logging in, the user is presented with their own profile. Using the profile navigation bar, routes can be created using the route creation screen. You can also view previously created routes from the profile screen. By navigating the rider finder, a list of users in the selected region is displayed to the user in a random order. The user can further filter the list by gender and age range. If other users accept, the user can then connect in real time using socket IO with Firebase Firestore for message history.      [Socket Server](https://github.com/MrChris-H/upshift-server)
## Run Locally
### Requirements

node - v16.13.2

### Cloning & Set-up

**Please note that the app requires a Google Maps API Key for the Route Planner feature to be fully functional. As our API Key is gitignored, below I have provided some screenshots of the working Route Planner feature.**

![IMG_6779](https://user-images.githubusercontent.com/96108416/162227381-f0a499f4-ee47-4829-9f82-8327f18c11e3.PNG)
![IMG_6780](https://user-images.githubusercontent.com/96108416/162227440-280ce9ce-8ee9-40df-be64-2c6db22bc38c.PNG)
![IMG_6781](https://user-images.githubusercontent.com/96108416/162227465-11bad77e-74a7-45fb-99a5-082fac2c3427.PNG)
![IMG_6782](https://user-images.githubusercontent.com/96108416/162227582-f3197761-85ea-45b0-8dd1-f900be189111.PNG)


#### Clone the project

```bash
  git clone https://github.com/MrChris-H/UpShift.git
```

#### Go to the project directory

```bash
  cd UpShift
```

#### Install dependencies

```bash
  npm install
```

### Starting

#### Start React App

```bash
  npm run start
```


## Tech Stack

**App:** Node, React Native, Socket IO, Express, Google Maps API, Firebase, Expo

