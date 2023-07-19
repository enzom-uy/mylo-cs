# Mylo

<!--toc:start-->
- [Mylo](#mylo)
  - [About](#about)
    - [Demo](#demo)
    - [Explaining the project](#explaining-the-project)
    - [Core features](#core-features)
      - [Website](#website)
      - [Discord Bot](#discord-bot)
    - [Featured technologies](#featured-technologies)
  - [Starting the project](#starting-the-project)
    - [Running the project locally](#running-the-project-locally)
    - [Env variables](#env-variables)
  - [Roadmap](#roadmap)

## About

Mylo/cs is a platform to store your useful Counter-Strike grenades so that you can find them quickly, either through the website or with a simple command in Discord.

It features a Discord Bot that allows you to create and search for grenades, along with a website where you can manage the grenades uploaded from your server, including approving, editing, or deleting them.

### Demo

[Mylo-Full-Demo.webm](https://github.com/enzom-uy/new-mylo/assets/94983952/4079425e-1b1e-49d8-8724-616f0d484e88)

<!-- Explaining the project -->

### Explaining the project

This project has three main parts:

- This Frontend web app.
- [Discord Bot](https://github.com/enzom-uy/mylonades-bot) built with Typescript and Discordjs.
- MySQL database in [Planetscale](https://planetscale.com).

### Core features

#### Website

From the website you can:

- Connect your Discord Server with our Database.
- Search for all the nades in all the servers you're a member.
- Search for all the nades in a specific server.
- Leave a server so you won't see the server's nades.
- Manage the server nades (see all pending nades, approve nades, edit and delete them).
- Manage the server members (see all members, ban a member from searching your nades or unban a member, give/remove ADMIN role).
- Delete your server with all the nades.

#### Discord Bot

From a Discord Server using our bot:

- Connect your Discord Server with our Database.
- Upload nades only if you or the server owner created the "server" in the website previously.
- Search for a specific nade or nades that match your query (nade type, author, map, title or description).

---

<!-- TechStack -->

### Featured technologies

- [Typescript](https://www.typescriptlang.org/):
  - Javascript superset that makes it actually safe (and kinda fun) to use.
- [Nextjs](https://nextjs.org/)
  - Next is the Javascript/React framework that I chose for this project, since it's currently the one that interests me the most and fits my needs.
- [Tailwind](https://tailwindcss.com/)
  - I really love how much Tailwind speeds up my CSS and I consider it the best way to have CSS in the same file as your component.
- [Shadcn/ui](https://ui.shadcn.com/).
  - I chose to use a Component Library like Shadcn/ui because it allowed me to be more focused on my code, instead of styling. It increased my development time, and it's the one that I find more easy to customize if I need to.
  - Shadcn/ui needs [Radix-ui](https://www.radix-ui.com/) to work.
- [Redux](https://redux.js.org/)
  - I've always wanted to learn Redux but never had a reason to use it over Context API.
- [Prisma](https://www.prisma.io/) and [MySQL with Planetscale](https://planetscale.com/)
  - I'll always be against writing SQL manually. A person makes mistakes daily but those mistakes should never reach your Database. Prisma is an ORM (Object Relational Mapping) that works as a layer between your Frontend/Backend and your Database. All the SQL operations are Javascript/Typescript methods with great naming. You can basically type what you want and it will be a valid SQL operation.
- [Next-Auth](https://next-auth.js.org/)
  - Authentication has never been easier than with Next-auth.
- Check all the other packages in the `package.json` file.

<!-- Getting Started -->

## Starting the project

<!-- Run Locally -->
### Running the project locally

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

### Env variables

You'll need to declare some env variables if you actually want it to work:

- `DATABASE_URL`: Planetscale connection string for Prisma.
- `DISCORD_CLIENT_ID`: Client ID from [discord.com/developer](https://discord.com/developers). Required by Next-Auth.
- `DISCORD_CLIENT_SECRET`: Client Secret from [discord.com/developer](https://discord.com/developers). Required by Next-Auth.
- `NEXTAUTH_SECRET`: Secret string required by Next-Auth.
- `NEXTAUTH_URL`: `https://localhost:3000`.

---

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
