# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

```
hackathon
├─ .env
├─ README.md
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  └─ robots.txt
└─ src
   ├─ App.js
   ├─ components
   │  ├─ Countdown.js
   │  ├─ EventCard.js
   │  ├─ Footer.js
   │  ├─ Navbar.js
   │  ├─ NetworkBackground.js
   │  ├─ ProtectedAdminRoute.js
   │  ├─ ProtectedTeamRoute.js
   │  ├─ RegistrationForm.js
   │  ├─ SectionHeading.js
   │  ├─ Sponsors.js
   │  └─ ThemeCard.js
   ├─ data-static
   │  ├─ events.js
   │  ├─ rules.js
   │  ├─ sponsors.js
   │  └─ themes.js
   ├─ index.js
   ├─ pages
   │  ├─ AboutPage.js
   │  ├─ ContactUsPage.js
   │  ├─ EventPage.js
   │  ├─ FAQ.js
   │  ├─ HackathonUI_Reference.js
   │  ├─ HomePage.js
   │  ├─ RegisterPage.js
   │  ├─ RulePage.js
   │  ├─ SponsorsPage.js
   │  ├─ ThemePage.js
   │  └─ matrix
   │     ├─ AdminPage.js
   │     ├─ Dashboard.js
   │     ├─ LoginPage.js
   │     └─ TeamLoginPage.js
   ├─ reportWebVitals.js
   ├─ server
   │  ├─ .env
   │  ├─ createAdmin.js
   │  ├─ middleware
   │  │  ├─ authTeam.js
   │  │  └─ upload.js
   │  ├─ models
   │  │  ├─ Admin.js
   │  │  ├─ Event.js
   │  │  ├─ Registration.js
   │  │  ├─ Rule.js
   │  │  ├─ Sponsor.js
   │  │  └─ Theme.js
   │  ├─ package-lock.json
   │  ├─ package.json
   │  ├─ routes
   │  │  ├─ adminRoutes.js
   │  │  ├─ auth.js
   │  │  ├─ eventsRoutes.js
   │  │  ├─ registrationRoutes.js
   │  │  ├─ rulesRoutes.js
   │  │  ├─ sponsorsRoutes.js
   │  │  └─ themesRoutes.js
   │  ├─ seed.js
   │  ├─ server.js
   │  ├─ testMail.js
   │  ├─ uploads
   │  │  ├─ events
   │  │  │  ├─ 1772636189762-photo-1511578314322-379afb476865.jpeg
   │  │  │  └─ 1772687185071-photo-1511578314322-379afb476865.jpeg
   │  │  ├─ sponsors
   │  │  │  ├─ 1772636318638-photo-1511578314322-379afb476865.jpeg
   │  │  │  └─ 1772687195820-photo-1511578314322-379afb476865.jpeg
   │  │  └─ themes
   │  │     ├─ 1772635217950-photo-1511578314322-379afb476865.jpeg
   │  │     └─ 1772687162760-photo-1511578314322-379afb476865.jpeg
   │  └─ utils
   │     └─ sendMail.js
   ├─ setupTests.js
   ├─ theme.js
   └─ utils
      └─ api.js

```