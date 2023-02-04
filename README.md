# MVCTechsWattpad
A CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well.

Heroku [link](https://enigmatic-sands-43427.herokuapp.com/).

## Installation

Download copy of app from [GitHub](https://github.com/nigelarue/MVCTechsWattpad.git).
```bash
git clone 
```
## Usage
* To start the application, please follow the below instructions:

* Open the terminal in the app directory and enter: 
    ```md
    npm i
    ```
* Start MySQL server and source the app database by entering: 
    ```md
    mysql -u root -p
    ```
* Once MySQL starts, source your database with the following commands in MySQL:
    ```md
    source db/schema.sql
    ```        
* Those entries should return that the database changed and whether the queries and rows are returning.
* Exit MySQL by entering:
    ```md
    exit
    ```
* Start the application via the script provided in the package.json file:
    * Into the command line, enter:
    ```md
    node server.js
    ```
    *This should start the server and let you know where the app is listening in the command line.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)    