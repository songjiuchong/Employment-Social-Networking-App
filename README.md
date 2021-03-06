# Employment-Social-Networking-App


This branch is created from master branch for the purpose of deploying the project to heroku cloud server(using mLab cloud mongoDB), so the configs set here are only for matching the requirements of deployment.


tech-stack for developing Employment-Social-Networking-App(check package.json for details):


Front-end:
React16, redux, react-redux, react-router4, socket.io-client, antd-mobile, axios, react-addons-css-transition-group, rc-queue-anim(antd motion)...


Back-end:
node + express4, socket.io, mongoose...


Database:
mongodb3.4


Developing tool:
create-react-app, webpack, webpack-dev-server, eslint, jest, babel...


Performance optimization:
reselect, immutable...


SSR:
react-dom/server(renderToNodeStream,hydrate), css-modules-require-hook, asset-require-hook...


For locally run of the project:
npm run server   (for start port:9093 server, this is the server run by server/server.js)
npm start   (for start port:3000 server, this is a webpack-dev-server)
npm build   (webpack-dev-server will help build static bundle files for prod env)

you can visit: localhost:3000 (to run project in dev env, in this case, port:9093 server is only for holding APIs and websocket communications)
you can visit: localhost:9093 (to run project in dev env, in this case, port:3000 is no need anymore as port:9093 is now holding everything)


Using mLab and heroku as prod env settings.

you can visit at: 
https://songjiuchongesna.herokuapp.com/login



The purpose of using Employment-Social-Networking-App:

Users of this App can sign in as a Boss or a Genius. You can simply consider 'Boss' as a recruiter or empolyer of a certain company who want to hire someone meets the requirements via this App, and of cause the type of 'Genius' makes you the applicant or candidate who are looking for a job and ready to share your resume with all the 'Bosses' for any potential openings.
User who is a 'Boss' can only chat with other 'Genius' users, and will be able to read profiles of all the registered 'Genius' and vice versa.
And the most sophisticated part of this App is 'real time chat', apart from all the necessary Live chat functionalities, it even has additional functions like: calculate the number of unread/read messages, remove selected chat sessions from msg list, save unsent message as draft...

![](./README_img/1.png)

![](./README_img/2.png)

![](./README_img/3.png)

![](./README_img/4.png)

![](./README_img/5.png)

![](./README_img/6.png)

![](./README_img/7.png)

![](./README_img/8.png)

![](./README_img/9.png)

![](./README_img/10.png)

![](./README_img/11.png)

![](./README_img/12.png)

![](./README_img/13.png)

![](./README_img/14.png)

![](./README_img/15.png)

![](./README_img/16.png)



UX updated in online branch !!!



![](./README_img/17.png)

![](./README_img/18.png)

![](./README_img/19.png)

![](./README_img/20.png)

![](./README_img/21.png)

![](./README_img/22.png)

![](./README_img/23.png)

![](./README_img/24.png)



