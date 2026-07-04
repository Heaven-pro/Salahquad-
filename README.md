# Salah Quad Marrakech — Application Next.js

Site vitrine premium **+ moteur de réservation** pour une agence de location de quads & buggys à Marrakech.
Stack : **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma · PostgreSQL · Docker**.

---

## ✨ Ce que contient cette application

- **Site public** dynamique (accueil + excursions chargées depuis la base).
- **Moteur de réservation** : widget client + API `/api/bookings` avec **recalcul du prix côté serveur** (le prix envoyé par le navigateur n'est jamais utilisé), enregistrement en base, **e-mails automatiques** (confirmation client + notification admin).
- **Tableau de bord administrateur** protégé (`/admin`) : statistiques, liste des réservations (confirmer / annuler), gestion des excursions.
- **Sécurité** : validation Zod sur toutes les entrées, sessions admin signées (JWT httpOnly + bcrypt), middleware de protection, en-têtes HTTP durcis, honeypot anti-spam.
- **SEO** : métadonnées Open Graph/Twitter, `robots.txt` et `sitemap.xml` générés dynamiquement, données structurées Schema.org.
- **Docker** : `docker compose up` lance PostgreSQL + l'app, applique le schéma et les données d'exemple.

> 💡 La **maquette HTML complète** (livrée en Étape 1, `salah-quad-marrakech.html`) reste la référence visuelle. Cette application Next.js en reprend l'identité (mêmes jetons de couleur/typo dans `tailwind.config.ts`) ; le portage pixel-perfect de toutes les sections (galerie, témoignages, FAQ, multilingue AR/DE/ES, blog) constitue l'Étape 3.

---

## 🚀 Démarrage rapide

### Option A — Tout en Docker (le plus simple)

```bash
cp .env.example .env        # ajustez AUTH_SECRET et le SMTP si besoin
docker compose up --build
```

Le site est sur **http://localhost:3000** et l'admin sur **http://localhost:3000/admin**.

### Option B — Développement local

Prérequis : Node.js 20+, une base PostgreSQL (vous pouvez ne lancer que la base via `docker compose up db`).

```bash
npm install
cp .env.example .env        # renseignez DATABASE_URL
npx prisma db push          # crée les tables
npm run db:seed             # insère excursions, avis, admin
npm run dev                 # http://localhost:3000
```

---

## 🔐 Accès administrateur

Identifiants par défaut (définis dans `.env`, créés par le seed) :

- **Email** : `salahquad@gmail.com`
- **Mot de passe** : `Marrakech2026!`

> ⚠️ Changez impérativement `ADMIN_PASSWORD` et `AUTH_SECRET` avant toute mise en production.

---

## ✉️ E-mails

Renseignez les variables `SMTP_*` dans `.env` (ex. Gmail avec un *mot de passe d'application*).
Sans configuration SMTP, les e-mails sont simplement journalisés dans la console — l'application continue de fonctionner.

---

## 🗂️ Structure du projet

```
prisma/
  schema.prisma        Modèles : Excursion, Booking, Promotion, Review, AdminUser
  seed.ts              Données initiales (8 excursions, avis, admin)
src/
  lib/
    prisma.ts          Client Prisma (singleton)
    pricing.ts         Moteur de calcul de prix (source de vérité serveur)
    validation.ts      Schémas Zod (anti-injection)
    auth.ts            Sessions admin (JWT httpOnly + bcrypt)
    mail.ts            E-mails transactionnels (Nodemailer)
  app/
    page.tsx           Accueil (server component, données dynamiques)
    layout.tsx         Métadonnées SEO globales
    robots.ts          /robots.txt
    sitemap.ts         /sitemap.xml
    api/
      bookings/        POST (créer) · GET (admin) · [id] PATCH (statut)
      excursions/      GET public · POST/PUT/DELETE admin
      admin/login/     POST (connexion) · DELETE (déconnexion)
    admin/
      login/           Page de connexion
      page.tsx         Tableau de bord (stats)
      bookings/        Liste + actions confirmer/annuler
      excursions/      Gestion des activités
  components/
    BookingWidget.tsx  Widget de réservation (client)
    BookingRow.tsx     Ligne de réservation avec actions admin
  middleware.ts        Protection des routes /admin
```

---

## 💶 Logique de prix (`src/lib/pricing.ts`)

- Prix stockés **en centimes** (entiers) pour éviter les erreurs de virgule flottante.
- **Par personne** : `prix × durée × (pilotes + passagers)` ; enfants à **-50 %**.
- **Par véhicule** (buggy) : `prix × durée × nombre de véhicules` (1 par pilote).
- Option dromadaire : **+9 €/personne**. Codes promo en pourcentage.
- Le total est **toujours recalculé sur le serveur** à la réservation.

---

## 🛡️ Sécurité — mesures en place

| Menace | Protection |
|---|---|
| Injection SQL | Requêtes paramétrées via Prisma |
| XSS | Échappement React + en-tête `X-Content-Type-Options` |
| Clickjacking | `X-Frame-Options: SAMEORIGIN` |
| Données malformées | Validation Zod sur chaque endpoint |
| Accès admin | Middleware + session JWT httpOnly signée, mots de passe bcrypt |
| Falsification de prix | Recalcul serveur systématique |
| Spam formulaire | Champ honeypot |

---

## 🧭 Feuille de route (étapes suivantes)

- **Étape 3** : portage pixel-perfect de toutes les sections de la maquette (galerie filtrable, témoignages, FAQ, pages produit `/excursions/[slug]`, blog).
- **Multilingue complet** : FR/EN déjà prêts dans la maquette ; ajout **AR (RTL)**, **DE**, **ES** via `next-intl`.
- **Paiement en ligne** (Stripe) en complément du paiement sur place.
- **Formulaire visuel** de création/édition d'excursions dans l'admin (l'API CRUD est déjà prête).
- **Tests** (Vitest/Playwright) et **CI/CD**.

---

© Salah Quad Marrakech. Contact : WhatsApp 0610818391 · salahquad@gmail.com · Instagram @Salahquadora
