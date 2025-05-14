<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About This Project

The simple task manager is a web app build with Laravel and React. It uses shopify polaris and tailwind css to handle frontend. The running of the project is pretty straightforward.
Requirements: Ensure PHP, Composer, Node.js, npm and MySQL are installed on the machine.

First, install PHP dependencies by (composer install).

The .env example contains most information already. Rename it as .env and it should function just the same. Just generate the new app key with (php artisan key:generate).

Remember to change the database keys to fit your own database. This project was fitted for a database with InnoDB and utf8_unicode_ci encoding.

Run (php artisan migrate) to generate the database tables.

Open a terminal inside the folder 'shopify-frontend'. Run (npm install).

In the laravel project root folder 'task-manager', run ( php artisan serve --host=localhost). This is important! The API is domain sensitive. Simply running php artisan serve will not work! Make sure that the server running on [http://localhost:8000]. It is not the same as 127.0.0.1:8000.

In the react project folder 'shopify-frontend', run (npm start).

Your app should be now running on http://localhost:3000/. You should see the landing page with options to register and login. The rest of the project is straightforward. You make a user, login and be taken to the dashboard page.

In the dashboard page there are two tables for Completed Task and Pending Task. There is a button on top right to create new tasks. The task form has name, description (optional) and status (pending/complete). There are buttons for edit and delete operation on the tables. The logout button is at the right hand side of the topbar.

To do unit testing for task creation, in the project root folder run (php artisan test)
WARNING, RUNNING THIS TEST WILL EMPTY THE DATABASE. DO NOT RUN THIS COMMAND ON YOUR MAIN DATABASE OR YOU WILL LOSE THE DATA!!

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
Created by: Mashrure Tanzim (https://github.com/navintanzim/task-manager)