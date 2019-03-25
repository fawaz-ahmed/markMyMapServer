## Installation

Run the following commands from root

```
yarn install
cp sample.env .env // optional
```
Configure port in `.env` file if needed, otherwise it shall run at port `8000` by default.

## Design considerations

I have utilized `realm` for database mangement. Using this for portability and get the apis running quickly. Although it does not supports geolocation coordinate types, but that won't be necessary for our application and `type: double` will do just fine. Http handling is being performed using `express`. Refer to code for more details.

## Run

To run a server instance type the following cmd from root:

```
yarn start
```