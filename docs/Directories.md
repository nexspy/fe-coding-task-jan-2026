# Directories / File management

I have tried best to manage files according to their intention and function as proper as possible.

## app

The **app** directory contains all the pages, layouts and apis.

Pages like homepage, dashboards and also not found page are here.

Dashboard uses a separate layout so that it can use Sidebar component along with its main content.

## components

Components directory contains all the common and feature specific components.

Also, the context provider and custom hooks for Authentication, Protected Routes and React Query context providers.

React Query is used to cache and manage data from api requests. It also does automatic refetching after intervals set.

## config

Values usuable in the project is stored here. For example, the colors to be used within a component are stored here.

## docker

To run docker, we need DockerFile and docker compose yml file in the root.

Check the README.md file in root to see how we can run the project using docker.

## docs

Contains all the documentaion files (MD files)

## hooks

Comtains the custom hooks.

Mainly the hooks to fetch data from server, some uses React Query to handle loading, data, error data.

## services

This directory contains the main service class files.

Purpose of a service class is to encapsulate business logic and data operations for platform related features like Assets and Portfolios.

This gives use reusuable methods, error handling and data fetching.

## styles

Common and feature related styling css files are stored here.

These classes are imported in globals.css or in specific component file.

## types

The main entities of the platform such as Asset, Position, Price, Portfolio, User, Company all live in this directory.

## utils

Short and useful functions live here.

Some of the utility functions feature wise are :

-   Dates formatting
-   UUID creation
-   Password creation
