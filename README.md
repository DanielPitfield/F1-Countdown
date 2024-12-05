# F1 Dashboard

Website for everything F1 including a countdown to the next Grand Prix weekend session and statistics for the current drivers, teams and more!

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)

![F1 Dashboard](https://raw.githubusercontent.com/DanielPitfield/danielpitfield.github.io/main/public/Images/Projects/f1Dashboard.png)

## Usage / Instructions

### Home

The main landing page shows information regarding the upcoming F1 Grand Prix weekend. The upcoming session of this weekend is highlighted with a countdown until when the session starts (sessions that have already been completed are greyed out).

### Navbar

- **Schedule** (the order of events for the current/upcoming season)
- **Drivers** (every driver currently on the grid showing background information, the teams they have driven for and performance statistics)
- **Teams** (every team currently on the grid showing background information, their drivers and performance statistics)
- **Circuits** (every circuit that is being raced at for the current/upcoming season)
- **Seasons** (the season's schedule and final or ongoing standings)
- **Grand Prixs** (profile pages for Grand Prix weekend events showing a podium of the race outcome, timing information and session results)
- **Statistics** (race wins, driver world championships and constructor world championships)

**Throughout the website, navigational links (outside of the navbar) are highlighted in blue.**

## Known Issues

- Very slow navigation between pages (waiting on data fetching)
- API rate limits (only 4 requests per second or 200 requests per minute), when the limit is exceeded, informational content may not be shown
- The maximum number of results returned by a query is 1000 and so large responses must be split over different requests
- No caching of fetched responses (even the navigation bar is populated with fetched data)

## Acknowledgments

[Ergast F1 API](http://ergast.com/mrd/)
