import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT || 5000);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const requiredFields = (body, fields) => fields.every((field) => String(body[field] || '').trim());

async function createPool() {
  if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
    return null;
  }

  return mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5
  });
}

const poolPromise = createPool();

app.get('/api/health', (_request, response) => {
  response.json({ ok: true, service: 'incisal-pdl-api' });
});

app.post('/api/subscribe', async (request, response) => {
  const email = String(request.body.email || '').trim().toLowerCase();

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return response.status(400).json({ message: 'Veuillez saisir une adresse e-mail valide.' });
  }

  try {
    const pool = await poolPromise;

    if (pool) {
      await pool.execute('INSERT INTO follow (email, pc_name) VALUES (?, ?)', [email, request.hostname || 'web']);
    }

    return response.json({ message: 'Merci, votre inscription a bien été enregistrée.' });
  } catch (error) {
    console.error('Erreur inscription newsletter:', error);
    return response.status(500).json({ message: "L'inscription est momentanément indisponible." });
  }
});

app.post('/api/contact', async (request, response) => {
  if (!requiredFields(request.body, ['nom', 'email', 'telephone', 'message'])) {
    return response.status(400).json({ message: 'Veuillez compléter tous les champs du formulaire.' });
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.MAIL_TO) {
    return response.status(503).json({ message: 'La messagerie doit être configurée dans le fichier .env.' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE || 'true') === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO,
      replyTo: request.body.email,
      subject: 'Nouveau message depuis Incisal P.D.L',
      html: `
        <h2>Nouveau message client</h2>
        <p><strong>Nom :</strong> ${request.body.nom}</p>
        <p><strong>E-mail :</strong> ${request.body.email}</p>
        <p><strong>Téléphone :</strong> ${request.body.telephone}</p>
        <p><strong>Message :</strong><br>${String(request.body.message).replace(/\n/g, '<br>')}</p>
      `
    });

    return response.json({ message: 'Votre message a bien été envoyé.' });
  } catch (error) {
    console.error('Erreur envoi contact:', error);
    return response.status(500).json({ message: "Le message n'a pas pu être envoyé pour le moment." });
  }
});

app.use(express.static(path.join(projectRoot, 'dist')));
app.use((_request, response) => {
  response.sendFile(path.join(projectRoot, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`API Incisal P.D.L prête sur http://localhost:${port}`);
});