# API do Gestão de Chamados

## Table of Contents
1. [Introduction](#introduction)
2. [API Usage](#api-usage)
    - [Base URL](#base-url)
    - [Authentication](#authentication)
    - [Error Handling](#error-handling)
3. [Entity Framework Migration](#entity-framework-migration)
    - [Prerequisites](#prerequisites)
    - [Creating a Migration](#creating-a-migration)
    - [Applying a Migration](#applying-a-migration)
    - [Reverting a Migration](#reverting-a-migration)
    - [Seeding the Database](#seeding-the-database)

## Introduction

This document provides instructions on how to use the API and manage database migrations using Entity Framework in this project.

## API Usage

Click in run on VisualStudio to start using API and its endpoints

### Authentication

To authenticate with the API, include an `Authorization` header with your request. The value should be in the format `Bearer {token}`.

Example:
```
Authorization: Bearer your_access_token
```

### Error Handling

The API uses standard HTTP status codes to indicate the success or failure of an API request. Common status codes include:
- `200 OK`: The request was successful.
- `201 Created`: The resource was successfully created.
- `400 Bad Request`: The request was invalid or cannot be served.
- `401 Unauthorized`: Authentication failed or user does not have permissions for the requested operation.
- `404 Not Found`: The requested resource could not be found.
- `500 Internal Server Error`: An error occurred on the server.

## Entity Framework Migration

### Prerequisites

Ensure you have the following installed:
- .NET SDK
- Entity Framework Core Tools

### Creating a Migration

1. Open the command line or terminal.
2. Navigate to the project directory.
3. Run the following command to create a new migration:

```bash
dotnet ef migrations add MigrationName
```

Replace `MigrationName` with a descriptive name for the migration.

### Applying a Migration

To apply the migration to the database, run the following command:

```bash
dotnet ef database update
```

This command updates the database to the latest migration.

### Reverting a Migration

If you need to revert the last applied migration, run the following command:

```bash
dotnet ef database update PreviousMigrationName
```

Replace `PreviousMigrationName` with the name of the migration you want to revert to.

