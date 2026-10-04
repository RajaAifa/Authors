# Authors

A Next.js CRUD application for managing a list of authors and handling contact form submissions, using JSON files as a lightweight data store and Yup/react-hook-form for validation.

## Overview

The app has two main features:

- **Authors management**: a full CRUD interface (add, edit, delete, list) for authors, backed by a JSON file (`data/authors.json`) through API routes.
- **Contact form**: a validated contact form (name, email, message) that submits to an API route and stores messages in `data/contactMessages.json`. Messages can be viewed and deleted from a dedicated Messages page.

Validation is handled with `react-hook-form` and `yup` on the client, with matching validation in the API routes on the server.

## Technologies Used

- **Framework:** Next.js 15 (Pages Router), React 19
- **Forms & Validation:** react-hook-form, Yup (`@hookform/resolvers`)
- **Data Storage:** Flat JSON files (Node.js `fs` module), no external database
- **Styling:** CSS Modules

## Prerequisites

- Node.js 18+

## Run Locally

Clone the project:

    git clone https://github.com/RajaAifa/Authors.git

Go to the project directory:

    cd Authors

Install dependencies:

    npm install

Start the development server:

    npm run dev

The app runs at http://localhost:3000.

## How to Use

1. Go to `/authors` to view, add, edit, or delete authors.
2. Go to `/contact` to submit a contact message (name, email, message), validated on the client and the server.
3. Go to `/messages` to view all submitted contact messages and delete them.

## Project Structure

    Authors/
    ├── pages/
    │   ├── api/
    │   │   ├── authors.js        # CRUD endpoints for authors (GET/POST/PUT/DELETE)
    │   │   ├── contact.js        # Handles contact form submissions
    │   │   └── messages.js       # List/delete contact messages
    │   ├── authors.js            # Authors management page
    │   ├── contact.js            # Contact form page
    │   ├── messages.js           # Submitted messages page
    │   └── index.js
    ├── Components/
    │   ├── Header.js
    │   └── Form.js
    ├── data/
    │   ├── authors.json          # Authors data store
    │   └── contactMessages.json  # Contact messages data store
    └── styles/
