# Instructions

Your task is to create a frontend application using React and TypeScript that presents a user's financial portfolio in a visually engaging way. Application contains two parts - public login page (simple local storage credentials is enough) and secure part with dashboard containing components below.

## Features

The main features you need to implement are:

1. Portfolio Balance Donut Chart: The chart should show the user's balance broken down by asset class or by specific asset. The user should be able to switch between these two views.
2. Positions Table: same data as previous chart but in the table format
3. Historical Chart: This chart should display the performance or total value of the portfolio over time.

You will be provided with the following RESTful API endpoints:

1. GET /assets: Fetches a list of all financial instruments the user may own, including cryptocurrency, stocks, and cash.
2. GET /prices?assets=GBP,BTC,APPL&asOf=2023-01-01: Fetches the latest price for one or multiple assets. You can provide the asOf parameter to get the price at a specific date, or omit it to get the current price. You can also provide a range by using the from and to parameters. All prices provided in USD.
3. GET /portfolios?asOf=2023-01-01: Fetches a list of user positions. You can provide the asOf parameter to get the portfolio at a specific date, or omit it to get the current portfolio.
   You can create your own simple endpoint / API contact with mock data according to the descriptions provided – see the last pages as well! The provided contract provides an overall idea how it might be structured and might contain some missing parts. The application should update the charts whenever the user changes the asset or asset class in the Donut Chart, or when the time period for the Historical Chart changes.

## Requirements

1. Use React for the UI and TypeScript for static typing.
2. Use a popular charting library such as Chart.js, D3.js, or Recharts to visualise the data.
3. Tailwind theme to support white labelling
4. Application should have error handling for API calls.
5. The application should be responsive and have a user-friendly interface.
6. Write clean, modular, and reusable code.

## Deliverables

A GitHub repository containing your application, including all code, tests, and a README file containing instructions on how to install and run your application.
Evaluation Criteria:

Your task will be evaluated based on:

Functionality: Does the application perform the tasks as required?

1. Code Quality: Is the code clean, organised, and professional?
2. UI/UX: Is the application easy to use, aesthetically pleasing, and responsive?
3. Error Handling: Does the application handle potential errors gracefully?
4. Documenta
