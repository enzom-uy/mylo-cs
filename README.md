# Mylo

<!--toc:start-->
- [Mylo](#mylo)
  - [About the project](#about-the-project)
    - [Explaining the project](#explaining-the-project)
    - [Core features](#core-features)
    - [Featured technologies](#featured-technologies)
  - [Starting the project](#starting-the-project)
  - [Requirements](#requirements)
  - [Running the project locally](#running-the-project-locally)
  - [Env variables](#env-variables)
  - [Roadmap](#roadmap)

## About the project

Web app connected to a Discord Bot to upload and manager all your Counter-Strike 2 utilities.

<!-- Explaining the project -->

### Explaining the project

This project has three main parts:

- This Frontend web app.
- [Discord Bot](https://github.com/enzom-uy/mylonades-bot) built with Typescript and Discordjs.
- MySQL database in [Planetscale](https://planetscale.com).

This is how it's all connected from the perspective of a Server Owner:

1. A user enters the page and tries to sign in.
2. Discord Auth Provider returns the user's info as well as the info of all the servers the user is in and also creates a new User in the MySQl Database.
3. The user owns one or more servers in Discord, so the user can create a new "server" (not a real server, it's just the name of the MySQL Column -- you can see this as a personal space in the database for the Discord Server) in the website using the data of his servers.
4. The user invites the Discord Bot to his server and tries to create a new nade using the `/create` command.
5. The Discord Bot checks in the Database if there's any server with the same Server.id as the Discord Server.
6. If the user created the "server" in the website previously, there will be a server with the same ID, so the Nade can be uploaded.
7. If the user didn't created the "server in the website previously, there won't be a server with the same ID, so the nade can't be uploaded.
8. The new nade won't be published yet, it will exist in the databse as 'PENDING', so a Server Admin or the Owner has to APPROVE it.
9. The user approves the nade. Now everyone who is a member of that server can see the nade.

This is how it's all connected from the perspective of a Server Member:

1. A user enters the page and tries to sign in.
2. Discord Auth Provider returns the user's info as well as the info of all the servers the user is in and also creates a new User in the MySQL Database.
3. The user doesn't own a Discord Server, but he's in a server that exists in our Database.
4. The Frontend API will check in the database for those servers, check if the user is banned from those servers and if not, will automatically add the user to that server as MEMBER.
5. The user can automatically join more servers later with a button in his profile.

### Core features

- FROM THE WEBSITE:
  - Create a "Server" in the Database with the same ID as your Discord Server (required by the Discord Bot to work).
  - Search for all the nades in all the servers you're a member.
  - Search for all the nades in a specific server.
  - Leave a server so you won't see the server's nades.
  - AS SERVER ADMIN/OWNER:
    - Manage the server nades (see all pending nades, approve nades, edit and delete them).
    - Manage the server members (see all members, ban a member from searching your nades or unban a member, give/remove ADMIN role).
    - Delete your server with all the nades.
- FROM A DISCORD SERVER:
  - Upload nades only if you or the server owner created the "server" in the website previously.
    - The Discord Bot is always checking in the shared database if the server he's working on exists.
  - Search for a specific nade or nades that match your query (nade type, author, map, title or description).

<!-- TechStack -->

### Featured technologies

- [Typescript](https://www.typescriptlang.org/)
  - Javascript superset that makes it actually safe (and kinda fun) to use.
- [Nextjs](https://nextjs.org/)
  - Next is the Javascript/React framework that I chose for this project, since it's currently the one that interests me the most and fits my needs.
- [Tailwind](https://tailwindcss.com/)
  - I really love how much Tailwind speeds up my CSS and I consider it the best way to have CSS in the same file as your component.
- [Shadcn/ui](https://ui.shadcn.com/).
  - I chose to use a Component Library like Shadcn/ui because it allowed me to be more focused on my code, instead of styling. It increased my development time, and it's the one that I find more easy to customize if I need to.
  - Shadcn/ui needs [Radix-ui](https://www.radix-ui.com/) to work.
- [Prisma](https://www.prisma.io/) and [MySQL with Planetscale](https://planetscale.com/)
  - I'll always be against writing SQL manually. A person makes mistakes daily but those mistakes should never reach your Database. Prisma is an ORM (Object Relational Mapping) that works as a layer between your Frontend/Backend and your Database. All the SQL operations are Javascript/Typescript methods with great naming. You can basically type what you want and it will be a valid SQL operation.
- [Next-Auth](https://next-auth.js.org/)
  - Authentication has never been easier than with Next-auth.
- Check all the other packages in the `package.json` file.

<!-- Getting Started -->

## Starting the project

<!-- Requirements -->

## Requirements

This project uses either yarn, npm or pnpm as dependency/package manager. You should have npm installed if you already have Node. If you choose to use yarn, run the next command to install it:

<!-- Run Locally -->

## Running the project locally

Clone the project:

```bash
  git clone git@github.com:enzom-uy/new-mylo.git
```

Go to the project directory:

```bash
  cd new-mylo
```

Install dependencies:

```bash
# with yarn:
  yarn
# with npm:
  npm install
# with pnpm:
  pnpm install
```

Start the development server:

```bash
# with yarn:
  yarn dev
# with npm:
  npm dev
# with pnpm:
  pnpm dev
```

## Env variables

You'll need to declare some env variables if you actually want it to work:

- `DATABASE_URL`: Planetscale connection string for Prisma.
- `DISCORD_CLIENT_ID`: Client ID from [discord.com/developer](https://discord.com/developers). Required by Next-Auth.
- `DISCORD_CLIENT_SECRET`: Client Secret from [discord.com/developer](https://discord.com/developers). Required by Next-Auth.
- `NEXTAUTH_SECRET`: Secret string required by Next-Auth.
- `NEXTAUTH_URL`: `https://localhost:3000`.

## Roadmap

- Notifications system.
  - Know when a user joins your server.
  - Know when a user uploads a nade in your server.
  - Know when a user edit a nade in your server.
- Allow server owner to set visibility to Public.
  - Users that are not members can search public servers and see their nades.
- Report system.
  - Report nades and servers.
  - Send all the reports to a Reports-only email.
