# Documentation

The following instructions will help you get started and use the application.

## Getting Started

### Create `.env` configuration file

First, create a `.env` file with the content of the `.env.example` file :

```bash
cp .env.example .env
```

Then, complete the following lines in the `.env` file:

```bash
POSTGRES_USER=<username>
POSTGRES_PASSWORD=<password>
POSTGRES_DB=<database>
```

### Install the application

The following command will :

- Install **dependencies**
- Create the **docker**
- Run the **migrations**
- Add **seeds** to the database

```bash
make install
```

### Run the application

```bash
make start
```
