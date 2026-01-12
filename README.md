Easy Notes
A professional, containerized full-stack application for managing notes with Gemini AI-powered semantic search. Find your thoughts by meaning, not just keywords.


Quick Start

Clone & Navigate:

git clone https://github.com/adityasoni04/easy-notes.git

cd easy-notes


Launch with Docker:

docker-compose up --build

Frontend: http://localhost:3000

Backend: http://localhost:5000


Tech Stack

Frontend: Next.js 15 (App Router), Tailwind CSS, Shadcn UI.

Backend: Node.js, Express, Prisma ORM.

Database: MongoDB (Vector Search enabled).

AI: Google Gemini (text-embedding-004).

Security: JWT authentication via HTTP-only Cookies.


Auth Flow: Login/Register automatically sets a secure cookie; the frontend Axios instance is pre-configured to include these credentials.


Future Improvements

Rich Text Editor: Implement Tiptap or Quill to support Markdown, bold text, and lists within notes.

Organizational Hierarchy: Add support for Nested Folders and custom Tags for better note classification.

Real-time Collaboration: Integrate WebSockets (Socket.io) to allow multiple users to edit the same note simultaneously.
