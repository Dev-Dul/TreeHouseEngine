# TreeHouseEngine
This is my implementation of The Odin Project's Messaging App Projec

## Details

This project is part of the Odin Project's Curriculum. It is part of the final full stack projects for the NodeJS curriculum. The aim of the project is to build a Jamstack based Messaging app that decouples the frontend and backend into seperate parts, with the backend being an Express REST API. This project is the Backend API which implements authentication using passport.js(local), as well as uses other tools including Cors(to enable cross-origin access),  Express, Express-Validator, Postgres, and bcrypt among others. Areas of practice include sessions, authentication, routing, API response, validation, postgres set-up and manipulation techniques, prisma ORM usage, e.t.c.

## Features
   Features of TreeHouseEngine include:

   * Routing - The TreeHouseEngine Provides Access to numerous endpoints.

   * Clear API Responses: The API provides clear non-ambiguous responses to users whether in cases  of success or failure.

   * Data persistence: The app uses postgres to store and retrieve data.

   * ORM based: The app uses Prisma ORM to interface with and manipulate the postgres db instead of using raw SQL.

   * User Accounts - The API features endpoints for creating user accounts.

   * Fetching Users - The API provides endpoint for fetching all users in the db.

   * Groups - The API provides routes for joining, leaving, and viewing, groups as well as sending messages in them.

   * Friends - The API provides routes for adding, and viewing, friends as well as sending messages to them.

   * User Profiles - The API provides routes for viewing as well as editing user profiles.

## Top Level Routes

   * /api/v1/

   * /api/v1/profiles

   * /api/v1/friends

   * /api/v1/groups


   
 
  
   