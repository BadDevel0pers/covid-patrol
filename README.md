## About
#### International COVID Sensitive Travel Map

About the application
In these difficult times many countries have travel advisories about other countries, foreigners, possibilities for the flights to other countries, etc. These rules mainly apply exclusively to citizens of the country and often do not take into account residents of other countries planning to leave or enter the country.

Our goal is to provide a summary for travel advisories from many authorities, normalize them, create a comparable scoring and present this informations to the user in the simpleast user interface clear for each user. Nevermind from what country a user is from and which citizenship this user has.

Our application will help you get a more comprehensive impression for the better trip planning.

This is the first version of visualisation of the destinations available during the pandemia period for the travelers. It shows the world map with the ability to search by origin and destination countries and provides all the necessary information to each one who would like to travel at the nearest time.

[Demo application](https://covid-patrol-omega.vercel.app)

## How it works

This application has really simple and user friendly interface. On the main application screen user can see covid restrictions map for travelers from all over the world. User has usual abilities to work with a map: the map can be zoomed by click on the plus/minus buttons and drag the map by pressing mouse button and moving cursor.

####Special features of the application map.
User can hover on country and see tooltip with the country name, if user clicks on the country region, he/she will see detailed information in the popover: country name with flag, country adviser index. It shows user current situation with the covid in the country and helps to find out how safe is travelling to this country with the latest detailed information about covid restrictions.

User can select the country he/she is goin to travel from in the first input box. In this case application will show the world map with entry restrictions from the selected country.

Also user can search the country that he/she is going to visit in the second input box. As soon as a country region is selected the map will be zoomed and centered to this country, also a popover will appear to show all the restrictions and travel advisory information, advisory rating for this country, country name and flag. Some of the countries descriptions have a link to government covid-19 page to check current government rules and situation with covid-19.

Our plan for the feature version of the application is to increase count of sources to provide the most recent and comprehensive information to the user. And the most important thing that we would like to implement is the repatriation flight schedule and onboarding rules.

## Tech stack used
  - [React](https://facebook.github.io/react/) possibly the best JS framework
  - [Next](https://nextjs.org/) possibly the best static generation framework
  - [FQL](https://docs.fauna.com/fauna/current/api/fql/) native API for querying FaunaDB
  - [FaunaDB](https://fauna.com/) global serverless database that rethinks the client-server relationship
  - [Vercel](https://vercel.com/) CI deployment
  - [Material-UI](https://material-ui.com/) React components for faster and easier web development.
  - [React Simple Maps](https://www.react-simple-maps.io/) beautiful SVG maps in react with d3-geo and topojson using a declarative api
  - [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) - progressive web application


## How to use
#### Install npm modules before first app running

```bash
npm install
# or
yarn
```

For connect to fauna db create .env file with necessary parameters, see .env-example

#### Run the local development server:
```
bash
npm run dev
# or
yarn dev
```
#### Run the local production server:
```
bash
npm run build
npm run start
# or
yarn build
yarn
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deploy on Vercel

The easiest way to deploy app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Made with ♥ by Roman Kholiavko ([@kholiavko-roman](https://github.com/kholiavko-roman)) and Aleksei Chyrva ([@freewayspb](https://github.com/freewayspb))
