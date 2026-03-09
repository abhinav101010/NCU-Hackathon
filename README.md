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
│  ├─ logo.png
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
   │  │  │  ├─ 1772706105838-photo-1511578314322-379afb476865.avif
   │  │  │  ├─ 1772723922366-photo-1551836022-d5d88e9218df.avif
   │  │  │  ├─ 1772723935760-photo-1567427018141-0584cfcbf1b8.avif
   │  │  │  ├─ 1772724002076-photo-1552664730-d307ca884978.avif
   │  │  │  └─ 1772724010206-photo-1523580846011-d3a5bc25702b.avif
   │  │  ├─ sponsors
   │  │  │  ├─ 1772636318638-photo-1511578314322-379afb476865.jpeg
   │  │  │  ├─ 1772687195820-photo-1511578314322-379afb476865.jpeg
   │  │  │  ├─ 1772785872239-Google_2015_logo.svg
   │  │  │  ├─ 1772785889717-Microsoft_logo.svg
   │  │  │  ├─ 1772785926454-Amazon_logo.svg
   │  │  │  ├─ 1772785940433-OpenAI_Logo.svg
   │  │  │  ├─ 1772785958933-Nvidia_logo.svg
   │  │  │  └─ 1772785981768-download.jpeg
   │  │  └─ themes
   │  │     ├─ 1772812174433-1772705773342-photo-1677442136019-21780ecad995.avif
   │  │     ├─ 1772812179471-1772705804632-photo-1584982751601-97dcc096659c.avif
   │  │     ├─ 1772812189934-1772705824270-photo-1563986768609-322da13575f3.avif
   │  │     ├─ 1772812197264-1772705857121-photo-1500937386664-56d1dfef3854.avif
   │  │     ├─ 1772812204683-1772705937468-photo-1521737604893-d14cc237f11d.avif
   │  │     └─ 1772812210732-1772705919737-photo-1503676260728-1c00da094a0b.avif
   │  └─ utils
   │     └─ sendMail.js
   ├─ setupTests.js
   ├─ theme.js
   └─ utils
      ├─ Gemini_Generated_Image_xaf7qkxaf7qkxaf7.png
      ├─ ScrollToTop.js
      ├─ common.js
      ├─ logo.png
      └─ logo2.svg

```