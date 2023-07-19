[👉 English 👈](../README.md)

# Mylo

<!--toc:start-->
- [Mylo](#mylo)
  - [Acerca del proyecto](#acerca-del-proyecto)
    - [Demo](#demo)
    - [Explicando el proyecto](#explicando-el-proyecto)
    - [Funcionalidades principales](#funcionalidades-principales)
      - [Página web](#página-web)
      - [Bot de Discord](#bot-de-discord)
    - [Tecnologías principales](#tecnologías-principales)
  - [Ejecutando el proyecto](#ejecutando-el-proyecto)
    - [Ejecutarlo localmente](#ejecutarlo-localmente)
    - [Variables de entorno](#variables-de-entorno)
  - [Contribuir](#contribuir)

## Acerca del proyecto

Mylo/cs es una plataforma para guardar tus granadas útiles de Counter-Strike de forma que puedas encontrarlas rápidamente, ya sea usando la página web o con un simple comando en Discord.

Cuenta con un Bot de Discord que permite crear y buscar las granadas, junto con una página web por la cual se puede administrar las granadas que se suben desde tu servidor, ya sea aprobarlas, editarlas o borrarlas.

### Demo

[Mylo-Full-Demo.webm](https://github.com/enzom-uy/new-mylo/assets/94983952/4079425e-1b1e-49d8-8724-616f0d484e88)

<!-- Explaining the project -->

### Explicando el proyecto

Consta de 3 partes principales:

- Esta página.
- Un [Bot de Discord](https://github.com/enzom-uy/mylonades-bot) hecho con Typescript y Discord.js.
- Una base de datos MySQL en [Planetscale](https://planetscale.com).

### Funcionalidades principales

#### Página web

Desde la página web se puede:

- Conectar tu/s servidor/es de Discord a nuestra base de datos.
- Buscar las granadas que hay en todos los servidores en los que eres miembro.
- Buscar las granadas que hay en un servidor específico.
- Salir de un servidor para no ver sus granadas.
- Administrar las granadas de tu/s servidor/es (ver granadas pendientes, aprobarlas, editarlas o borrarlas).
- Administrar los miembros de tu/s servidor/es (ver todos los miembros, banear un miembro para que no vea tus granadas, desbanearlo y dar o quitar rol de Admin).
- Borrar tu/s servidor/es junto con todas las granadas.

#### Bot de Discord

Desde tu servidor de Discord con el Bot:

- Conectar tu servidor de Discord a nuestra base de datos.
- Crear una nueva granada (el servidor necesita estar conectado a la base de datos).
- Buscar en las granadas en base a lo que escribas (tipo de la granada, autor, mapa, título o descripción).

---

<!-- TechStack -->

### Tecnologías principales

- [Typescript](https://www.typescriptlang.org/):
  - Un supersetr de Javascript para hacerlo seguro (y divertido) de usar.
- [Nextjs](https://nextjs.org/)
  - Framework de React. Es el que más me interesa y cubre mis necesidades.
- [Tailwind](https://tailwindcss.com/)
  - Me gusta como Tailwind acelera el escribir CSS y considero que es la mejor forma de tener los estilos junto con el componente relacionado.
- [Shadcn/ui](https://ui.shadcn.com/).
  - Elegí usar una librería de componentes para acelerar incluso más el CSS y no gastar mucho tiempo estilizando la página.
  - Shadcn/ui necesita [Radix-ui](https://www.radix-ui.com/) para funcionar.
- [Redux](https://redux.js.org/)
  - Siempre quise aprender Redux pero nunca tuve una razón para usarlo por sobre Context API.
- [Prisma](https://www.prisma.io/) and [MySQL with Planetscale](https://planetscale.com/)
  - Siempre estaré en contra de escribir SQL manualmente. Una persona comete errores diariamente, pero esos errores jamás deberían llegar a tu base de datos. Prisma es un ORM (Object Relational Mapping) que funciona como una capa entre tu Frontend/Backend y tu base de datos. Todas las operaciones SQL son métodos de Javascript/Typescript con nombres lógicos. Básicamente puedes escribir lo que necesitas de la base de datos y seguramente sea una operación válida.
- [Next-Auth](https://next-auth.js.org/)
  - La autenticación jamás fue tan fácil como con Next-Auth.
- Puedes ver el resto de los paquetes usados en el archivo `package.json`.

<!-- Getting Started -->

## Ejecutando el proyecto

<!-- Run Locally -->
### Ejecutarlo localmente

Clonar el proyecto:

```bash
  git clone git@github.com:enzom-uy/new-mylo.git
```

Ir al directorio:

```bash
  cd new-mylo
```

Instalar las dependencias:

```bash
# con yarn:
  yarn
# con npm:
  npm install
# con pnpm:
  pnpm install
```

Ejecutar el servidor de desarrollo:

```bash
# con yarn:
  yarn dev
# con npm:
  npm dev
# con pnpm:
  pnpm dev
```

### Variables de entorno

Vas a necesitar declarar algunas variables de entorno para que el proyecto funcione:

- `DATABASE_URL`: url que da Planetscale para conectar Prisma con la base de datos.
- `DISCORD_CLIENT_ID`: Client ID de [discord.com/developer](https://discord.com/developers). Requerido por Next-Auth.
- `DISCORD_CLIENT_SECRET`: Client Secret de [discord.com/developer](https://discord.com/developers). Requerido por Next-Auth.
- `NEXTAUTH_SECRET`: Texto secreto requerido por Next-Auth.
- `NEXTAUTH_URL`: `https://localhost:3000`.

---

## Contribuir

Damos la bienvenida a contribuidores para Mylo como un proyecto open-source. Si deseas contribuir, por favor sigue estas pautas:

1. Haz un fork del repositorio y clónalo localmente.
2. Crea una nueva branch para tu contribución.
3. Realiza tus cambios y haz commits con mensajes descriptivos.
4. Sube tus cambios a tu repositorio.
5. Crea una pull request explicando los cambios realizados y su propósito.
