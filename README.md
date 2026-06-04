# Godstojie Web

A consultation-first construction lead conversion engine built with React, Tailwind CSS, Node.js, Express, and MongoDB.

## Structure

- `client/` - React frontend
  - `src/components/` - UI components split by layout, projects, and forms
  - `src/pages/` - page-level views
  - `src/hooks/` - custom lead capture hook
- `server/` - Node/Express backend
  - `models/` - Mongoose schemas for projects and leads
  - `controllers/` - consultation request handler
  - `routes/` - API routes

## Getting Started

1. Copy `.env.example` to `.env` and fill in Mongo and email details.
2. Install dependencies:
   - `cd godstojie-web/server && npm install`
   - `cd ../client && npm install`
3. Start services:
   - `npm run dev` in `server`
   - `npm run dev` in `client`

## Key feature

- `client/src/components/forms/ConsultationModal.jsx` — professional consultation request modal
- `server/models/Lead.js` — lead capture schema
- `server/controllers/leadController.js` — saves lead and sends email alert
