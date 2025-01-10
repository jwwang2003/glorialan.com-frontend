# glorialan.com | The frontend service

A Dockerized NextJS instance!

## Features

## TODO

- [x] Fix scrolling issue with fullscreen nav menu in mobile view when the body div is larger that the screen itself. (Half fixed, seems only to be a problem on Safari)
- [ ] 

## Feature Requests

- [ ]

## Getting Started

### Without Docker:

```bash
yarn dev

yarn build && yarn start
```

### Using Docker 🐳

#### Development
```
docker compose up -d
```

#### Production
```
docker compose -f "docker-compose.prod.yml" up -d --build
```

Building the Docker image:
```
docker build -f ./docker/nextjs.Dockerfile -t glorialan.com-frontend:latest .
```

Compiling for `linux-x86` (note that `Use containered` must be enabled in settings): 
```
docker build -f ./docker/nextjs.Dockerfile --platform linux/amd64,linux/arm64 -t glorialan.com-frontend:latest .
```

Tag the image for uploading:
```
docker tag glorialan.com-frontend:latest junweiwang03/glorialan.com-frontend
```

Push to Docker Hub:
```
docker push junweiwang03/glorialan.com-frontend
```

(Optionally) Clean up local images:
```
docker rmi junweiwang03/glorialan.com-frontend
```

```
docker rmi junweiwang03/glorialan.com-frontend:latest
```

```
docker rmi glorialan.com-frontend
```

> https://hub.docker.com/repository/docker/junweiwang03/glorialan.com-frontend/general

---

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Vercel CLI

Install the latest version of the Vercel CLI.

`npm i -g vercel@latest`

### Linking

Before connecting to a database hosted on Vercel that is connected to a project, we must first link our local project first.

`vercel link`

### Setting up local vercel environment variables

`vercel env pull .env.development.local`
