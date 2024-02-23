## WatchedIt web

.Net core web api with React (Typescript) front end, inspired by Letterboxd / Imdb.

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
- Typescript
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

1.  Clone / extract project
2.  Open project in a terminal
3.  cd into WatchedIt.Api folder which hosts the .NET Web API project
4.  Run `Dotnet restore` to restore any required packages.
5.  Create your own `appsettings.Development.json` file in the root of this api project, populate this following the `appsettings.json` file replacing the string in curly brackets. Here you can decide whether to use local storage for images or disk store the steps for each are laid out below, for ease of use in testing I recommend on disk file storage.

a. Disk based file storage.

    1. Set `Images:UseS3` to false,
    2. Set `DiskRootUrl` to the base url of the api which can be found in the `launchSettings.json` file under `profiles:http:applicationUrl` e.g. `http://localhost:{port}` .

b. S3 based file storage.

    1. Set `Images:UseS3` to true,
    2. Ensure you have the AWS cli installed and are logged in.
    3. Create a bucket with public read access that can added to by the account logged into the AWS cli.
    4. Add the bucket details in the `AWS` section.

6.  Generate an 128 bit key using a key generator and store it as an local app secrets store. `dotnet user-secrets set "AppSettings:AuthSecret" "{Replace With 128 bit key}"` [Instructions here.](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-7.0&tabs=windows). Failure to do this will lead to an error when a user tries to log in.
7.  If you have not already done it ensure you have the dotnet ef tools installed using `dotnet tool install --global dotnet-ef`
8.  Run `Dotnet ef database update` to run the migrations and create the database where specified in your connection string. You can confirm the database has been created using [SQL server management studio](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16)
9.  If you want example data and an admin user run `Dotnet run seeddata`

#### Frontend

1. cd into watchedit-frontend
2. Install npm packages using `npm install`
3. In the `.env` file set the `VITE_API_BASE_URL` to the base URL of your api which can be found in the `launchSettings.json` file under `profiles:http:applicationUrl` e.g. `http://localhost:{port}`.
4. Run project locally using `npm run dev`
