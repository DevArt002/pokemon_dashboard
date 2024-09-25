### About

An application to explore different Pokémon species and view detailed information for each Pokémon.

### Preview

https://www.loom.com/share/8f4147544261496e9ac546cc765a967a

### Prerequistes

This project was developed using VSCode on macOS.

#### Backend

- [ASP.NET Core 8.0 Runtime](https://download.visualstudio.microsoft.com/download/pr/a7080974-fac8-446c-ba20-313f6f323fbe/f907c126c9bcd394939a7cdf86b85f4b/aspnetcore-runtime-8.0.8-osx-arm64.tar.gz)
- [.NET 8.0 SDK](https://download.visualstudio.microsoft.com/download/pr/1764cd94-29ac-46b2-b308-77d02b47486d/8397cdc3d842a60f062f1a08199a4974/dotnet-sdk-8.0.401-osx-arm64.pkg)
- [.NET 8.0 Runtime](https://download.visualstudio.microsoft.com/download/pr/454e6d99-5836-4c51-947e-b75220eebd09/fcbaecbeaa1f95a8ac80aae62e8718b0/dotnet-runtime-8.0.8-osx-arm64.pkg)

#### Frontend

- [NPM v10](https://www.npmjs.com/package/npm/v/10.8.2)
- [Node v20](https://nodejs.org/download/release/v20.17.0/)

### Development

Please run the following commands in the root folder.

Install dependencies:

```
npm run setup
```

Running both the client and server:

```
npm run start
```

Running Swagger:

```
npm run start:server-watch
```

### Tech stack

#### Backend

- [x] ASP.NET Core 8.0

#### Frontend

- [x] JS/TS
- [x] React.js
- [x] Vite
- [x] Tailwind CSS
- [x] Eslint
- [x] Axios
- [x] React Router/Context API/Hooks

### Implemented features

- [x] Table view with pagination and sorting functionality.
- [x] Summary panel.
- [x] Filter Panel.
- [x] Detail page for the selected Pokémon.
- [x] APIs to support the frontend.

### Known issues and possible solutions

- [ ] Pagination with filtered data does not align with the actual page count.
- [ ] Sorting by `Generation` is not functioning correctly, as it only performs a string comparison.
- [ ] The UI is not fully polished.
- [ ] No Test-driven-development implemented.
      etc.
