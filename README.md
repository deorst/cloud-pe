## React Challenge task for [appliedlabs.io](https://appliedlabs.io)

Clone the project, move to project dir `cd cloud-pe`, install dependencies:

`npm install` or `yarn`

To run the project: `npm start` or `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Requirements:
* Redux Storage **DONE**
* React Routing **DONE**
* Intrino API integration **DONE**
* Clean React Component architecture **DONE**
* Use of styled components **DONE**
* Use of props and default props **DONE**
* Use Create React App ( all unused code removed ) **DONE**
* Debounce pattern **DONE**
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

**CORS error.**

You may see an error about `No 'Access-Control-Allow-Origin' header is present on the requested resource`. Just refresh the page - it's an Intrinio server error, sometimes their settings about CORS request probably switches off maybe :)

**Things I'd work on further.**

Here is a list of things I think should be done for real app, but as they weren't required by the task - I did not accomplish them. 

1. UX. Much work should be done to optimize an app for real users - feedback on bad input, error notifications etc.

2. Intrinio API provides us with a very limited amount of data. For example in case of securities - I'm able to get a list of just 29 companies. It does not let to test for huge amount of data, though several precautions may be made to optimise an app, it's hard to tell whether it will work fine under high load. We can only guess.

2. Pass info about just one company to CompanyComp, not all "companies" object. While it's fine for small app, passing huge object here and there when it's unnecessary will bring a whole bunch of problems.

**Final notes.**

I hope you enjoy checking out my app. Please provide me with any feedback you can, regardless of your decision on employment. Also, please let me know once your recruitment process is over - I'll make this repo public to demonstrate my code to future employers. Cheers!
