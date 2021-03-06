# Green Website Extension

This is a Chrome extension bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The
extension analyzes the sustainability of the website that is opened in the current tab. For the analysis multiple
parameters play action, e.g. the selected hosting provider or the page weight. This extension is part of my master's thesis, which I did together with the Düsseldorf University of Applied Sciences [Hochschule Düsseldorf](https://hs-duesseldorf.de/).

This is what the extension looks like:

![Screens](public/screens.png)

If you want to learn more visit [greenwebsite.info/extension](https://greenwebsite.info/extension).

The general "Create React App" scripts are available, but for running the extension you'll only need `npm run build`.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right
into your project so you have full control over them. All of the commands except `eject` will still work, but they will
point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

### Learn how to run the extension in your browser

First run `npm run build`. Then go to the Chrome extensions [tab](chrome://extensions/) in your Chrome browser and turn on "Developer mode". Select "Load
unpacked" and selet your build folder. That's all!