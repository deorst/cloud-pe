## React Challenge task for [appliedlabs.io](https://appliedlabs.io)

Clone the project, install dependencies:

`npm install` or `yarn add`

To run the project: `npm start` or `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Requirements:
* Redux Storage **DONE**
* React Routing **DONE**
* Intrino API integration **DONE**
* Clean React Component architecture **DONE**
* Use of styled components 
* Use of props and default props **DONE**
* Use Create React App ( all unused code removed ) **DONE**
* Debounce pattern
* ESLint **DONE**

### My Comments

During my work on that project I faced a few problems I'd like to tell about.

**Redundant fetching**  

On Landing Page I make first fetch request to pull the list of 10 companies, to get their names (like "Apple Inc") and tickers ("AAPL"). After I got the list of companies, I iterate over that list and make fetch request to get security prices for each particular company. Eventually I perform 11 fetch requests to Intrinio API, to get data for 10 securities. It's highly inefficient in my opinion, and will cause problems once the list of companies started to grow up. However I could not come up with a better solution. It would be ideal to pull that data in one fetch request from API, but it seems like Intrinio API does not provide that feature.

**Number of Companies to display.**  

I should display 30 companies on the "Companies" page as per instruction, but it seems like Intrinio API provides us with just 29 of them. When I request to get all companies, I get a list of 29, even if I explicitly set parameter "per_page=30", I get same result.

**Default Props.**  

I don't think that Default Props should be used anywhere in that application (I think PropTypes checking is enough here), but to meet your criteria I used them in CompaniesComp.

**Securities request period.**  

There is a paramater "start_date" in /securities portion of Intrinio API. It's used to get the data after that date, up to today. For most of securities is enough to request the data for the last couple of days, except for Walt Disney Co. It seems like the data for that company is obsolete, and we have to request the data for the last 20 days, to get the values. The drawback is that we have to request the data for the last 20 days for all of the securities, which is substantial amount of data. The parameter SECURITIES_PERIOD in CONFIG.js may be changed to 2, to avoid downloading extra data. For most securities it will be fine, except aforementioned Walt Disney Co - Open/Close/High values will be "Not Defined", and there will be an error in the console saying that.


