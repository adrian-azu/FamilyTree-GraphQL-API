
# Family Tree GraphQL API
Database model
 
![Diagram](/images/family-tree-diagram.PNG?raw=true "Diagram")

## Run Locally

Clone the project

```bash
  git clone https://github.com/adrian-azu/FamilyTree-GraphQL-API.git
```

Go to the project directory

```bash
  cd FamilyTree-GraphQL-API
```

Install dependencies

```bash
  npm install
```
Setup ENV
```bash
  copy .env.example .env
  or
  create a .env file and copy the .env.example content
```

Start the server

```bash
  npm run start
```
## Docker Build

## `Dockerfile`
Create and start containers with docker compose up
The docker compose up command aggregates the output of each container. It builds, (re)creates, starts, and attaches to containers for a service.
### Prerequisities
In order to run this container you'll need docker installed.

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)

### Setup

```bash
docker compose up
```
Attaching to web_1
web_1  | Running Express GraphQL server at http://localhost:3000/graphql

Query example
```
query {
  persons {
    _id
    firstName
    lastName
    gender
    born
    died
  }
}
```
![Demo query](/images/demo.PNG?raw=true "Demo")

Mutation example
```
mutation {
  createPerson(person: {firstName: "Adrian", lastName: "Azucena", gender: Male, born: "August 14, 1998"}) {
    _id
    firstName
    lastName
    gender
    born
    died
  }
}
```

![Demo mutation](/images/mutation.PNG?raw=true "Demo")
## Tech Stack

**Server:** Node, Express, MongoDB, GraphQL, Docker

