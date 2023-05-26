## WatchedIt web

.Net core web api with React front end, inspired by Letterboxd / Imdb.

### Features

#### Users
- Register and login using token based authentication,
- Users can leave reviews / rate films.
- Users can create and share lists of films.
- Users can add films to a 'watched' list and see their and other users watched films.
- Users can add to/update their profile.
- Users can recieve notifications.
- Users can comment on reviews.

#### Films / People

- Search for films and view information about them.
- Search for (Cast & Crew) and view information about them.
- See cast and crew lists for films.
- See a persons cast and/or crew credits.
- View film reviews

#### Lists
- View user generated lists of films e.g. Marvles films list.

#### Admin controls
- Admin user add new films and people.
- Admins create new categories which can be assigned to films.
- Admins can remove content other users can't.

### Technical overview
- .Net core web api.
- Entity framework core.
- React front end.
- Built using VITE.
- Tailwind css.
- Testing with NUnit.
- AWS SDK.
- Post CSS.
- Swagger documentation.
- Installable as PWA,
- Service workers
- Other Js packages see `watchedit-frontend/package.json`.

### How to run locally

#### Requirements

 - [Node / NPM recommended latest long term support](https://nodejs.org/en).
 - [NET 7.0](https://dotnet.microsoft.com/en-us/download)
 - SQL server e.g. [SQL Express] (https://www.microsoft.com/en-us/download/details.aspx?id=101064)

 
 #### Steps
 #### API
 
 1. Clone / extract project
 2. Open project in a terminal
 3. cd into WatchedIt.Api folder which hosts the .NET Web API project
 4. Run `Dotnet restore` to restore any required packages.
 5.  Create the appsettings.json file in the root of this project, populate this following the example appsetting.example.json file.
 6. Generate an 128 bit key using a key generator and store it as an local app secrets store.  `dotnet user-secrets set "Movies:ServiceApiKey" "{Replace With 128 bit key}"`  [Instructions here.](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-7.0&tabs=windows). Failure to do this will lead to an error when a user tries to log in.
 7. If you have not already done it ensure you have the dotnet ef tools installed using `dotnet tool install --global dotnet-ef`
 8. Run `Dotnet ef database update` to run the migrations and create the database where specified in your connection string. You can confirm the database has been created using [SQL server management studio](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16)
 9. If you want example data and an admin user run `Dotnet run seeddata`

#### Frontend
1. cd into watchedit-frontend
2.  Install npm packages using `npm install`
3. Run project locally using `npm run dev`

 
