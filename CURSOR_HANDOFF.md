# VENDY — Document de reprise pour Cursor

> **À lire en premier** quand tu reprends ce projet sur une autre machine.
> Mentionne ce fichier avec `@CURSOR_HANDOFF.md` dans le chat Cursor pour reprendre le contexte.

Dernière mise à jour : juillet 2026 — travail effectué sur Mac, reprise prévue sur tour Windows.

---

## 1. Qu'est-ce que ce projet ?

**Vendy** est un **prototype haute fidélité** (maquette codée cliquable), **pas** une application de production.

**Vision produit** : simplifier l'e-commerce pour petites boutiques / créateurs / vendeurs Instagram — comme Vinted a simplifié la revente entre particuliers. Vendy = infrastructure de vente ultra simple + marketplace curatée progressive.

**Ce que c'est :**
- Mobile-first, premium, cliquable
- Données 100 % fictives (mock TypeScript)
- Auth, paiements, logistique **simulés** via React Context
- Conçu pour être montré à des vendeurs, associés, designers ou devs

**Ce que ce n'est PAS :**
- Pas de vraie base de données
- Pas de vraie auth (OAuth simulé visuellement)
- Pas de vrais paiements
- Pas de variables d'environnement requises

Docs produit complémentaires :
- `docs/VENDY_PRODUCT_BRIEF.md` — vision, cible, différenciation
- `docs/VENDY_APP_MAP.md` — parcours utilisateur et écrans MVP
- `docs/VENDY_MOCK_DATA.md` — structure des données fictives
- `docs/VENDY_DESIGN_SYSTEM.md` — **ATTENTION : palette obsolète (coral)** → voir section 5 ci-dessous

Prompts de construction initiale (historique) :
- `00_MASTER_PROMPT_FOR_CURSOR.md` → `07_CREATE_FULL_PROTOTYPE_SINGLE_PROMPT_OPTIONAL.md`

---

## 2. Démarrage sur Windows

```powershell
git clone <URL_DU_REPO> vendy-cursor-pack
cd vendy-cursor-pack\vendy-app
npm install
npm run dev
```

Ouvre **le dossier racine `vendy-cursor-pack`** (ou `vendy-app`) dans Cursor.

- App : [http://localhost:3000](http://localhost:3000)
- Page walkthrough interne : [http://localhost:3000/design](http://localhost:3000/design)
- Node recommandé : **20** (voir `.nvmrc` à la racine)

**Important :** lancer `npm` depuis `vendy-app/`, pas depuis la racine du pack.

Scripts Next.js utilisent `--webpack` (contournement warning SWC sur certaines machines Mac ; fonctionne aussi sur Windows).

---

## 3. Structure du dépôt

```
vendy_cursor_pack/              ← racine Git
├── CURSOR_HANDOFF.md           ← CE FICHIER
├── README_CURSOR_START_HERE.md ← guide initial Cursor
├── .gitignore                  ← ignore node_modules, .next, .env*
├── .nvmrc                      ← Node 20
├── docs/                       ← brief produit, app map, mock data
├── 0X_BUILD_*.md               ← prompts par bloc (historique)
└── vendy-app/                  ← APP NEXT.JS (code principal)
    ├── src/
    │   ├── app/                ← routes App Router
    │   ├── components/         ← UI (vendy/, seller/, layout/, ui/)
    │   ├── lib/
    │   │   ├── context/vendy-provider.tsx  ← état global simulé
    │   │   └── mock/data.ts               ← toutes les données fictives
    │   └── types/vendy.ts      ← types TypeScript
    ├── public/
    ├── package.json
    └── package-lock.json       ← garder pour installs reproductibles
```

**Ne jamais versionner :** `vendy-app/node_modules/`, `vendy-app/.next/`

---

## 4. Stack technique

| Couche | Choix |
|--------|-------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript |
| Styles | Tailwind CSS v4 (`globals.css` + `@theme inline`) |
| Animations | Framer Motion (légère) |
| Icônes | Lucide React |
| État | React Context (`VendyProvider`) — pas de Redux/Zustand |
| Données | Mock local `src/lib/mock/data.ts` |
| Fonts | Geist Sans (Next) + **Jeko** (Fontshare, titres brand) |

Pas de shadcn/ui complet — seulement un composant `Button` custom dans `components/ui/`.

---

## 5. Direction artistique ACTUELLE (prioritaire)

> La doc `docs/VENDY_DESIGN_SYSTEM.md` mentionne encore **Vendy Coral #F04465**.
> **Le code utilise désormais le violet comme couleur principale.** Les classes `vendy-coral` pointent vers le violet pour migration douce.

### Palette (source de vérité : `vendy-app/src/app/globals.css`)

| Token | Hex | Usage |
|-------|-----|-------|
| `vendy-purple` | `#6044FF` | CTA, bandeaux, accents principaux |
| `vendy-green` | `#A0FF83` | Actions urgentes vendeur, pills vertes |
| `vendy-pink` | `#ED9AFF` | Doodles, scribbles décoratifs |
| `vendy-black` | `#000000` | Texte, boutons sombres |
| `vendy-soft` | `#F2F4F7` | Cartes grises (sans bordures lourdes) |
| Fond page | `#FFFFFF` | Body / surfaces |

### Typographie

- **`.font-brand`** → Jeko 900 — hero, titres expressifs, chiffres dashboard
- **Geist Sans** → tout le reste (body, UI)

### Principes UI appliqués

- Cartes sur fond gris `#F2F4F7`, coins arrondis (`rounded-vendy-xl` / `2xl`)
- Écrans brand = fond violet plein écran dans `PhoneShell theme="brand"`
- Discover = **bandeau violet uni** (search + chips) puis contenu blanc en dessous
- Pas de header profil/logo sur Discover (retiré volontairement)
- Expressivité : pills flottantes, doodles SVG, brush highlight vert sur mots clés

---

## 6. Architecture applicative

### 6.1 État global — `VendyProvider`

Fichier : `vendy-app/src/lib/context/vendy-provider.tsx`

Simule toute la logique métier :
- Utilisateur courant (`CURRENT_USER` = Lina Martin)
- Rôle (`buyer` | `seller`)
- Intention onboarding (`buy` | `sell`)
- `onboardingComplete` — gate la redirection `/` → `/welcome` ou `/discover`
- Commande exemple avec machine à états (`ORDER_FLOW`)
- Missions, badges, draft boutique, boutiques créées
- **`completeLogin()`** — marque onboarding terminé sans passer par inscription (flux connexion)

Hooks exportés :
- `useVendy()` — contexte complet
- `useActiveShop()` — boutique active avec overrides
- `useAllShops()` — liste boutiques mock + créées

### 6.2 Données mock

Fichier : `vendy-app/src/lib/mock/data.ts`

Contient : `CURRENT_USER`, `SHOPS`, `PRODUCTS`, `SAMPLE_ORDER`, `MISSIONS`, `BADGES`, `SELLER_STATS`, catégories, etc.

Utilisateur demo : **Lina Martin** (`lina@vendy.demo`).

### 6.3 Layout mobile simulé

`PhoneShell` (`components/layout/phone-shell.tsx`) :
- Encadre l'app dans un faux iPhone (430×844px, notch)
- `theme="default"` → fond blanc
- `theme="brand"` → fond violet (écrans onboarding)

Pages `(app)/` incluent `FloatingNav` via `(app)/layout.tsx`.

### 6.4 Routing racine

`/` (`src/app/page.tsx`) :
- Si `!onboardingComplete` → `/welcome`
- Sinon → `/discover`

---

## 7. Flux utilisateur (implémentés)

### 7.1 Inscription (nouveau compte)

```
/welcome          BrandHero violet — CTA "Commencer"
    ↓
/auth             3 étapes (email, profil, confirmation) — simulé
    ↓
/welcome-in       BrandHero — "Ta boutique t'attend."
    ↓
/intention        Choix "Je veux acheter" / "Je veux vendre"
    ↓               → completeOnboarding() + setRole si sell
/discover         Home acheteur
```

### 7.2 Connexion (compte existant)

```
/welcome          Lien "J'ai déjà un compte" → /auth?mode=login
    ↓
/auth?mode=login  Email pré-rempli lina@vendy.demo
    ↓               → completeLogin() puis redirect
/bonjour          Splash "Bonjour, Lina." + barre progression ~2,8s
    ↓
/discover
```

### 7.3 Navigation principale (FloatingNav)

| Tab | Route | Notes |
|-----|-------|-------|
| Accueil | `/discover` | Home curatée |
| Parcourir | `/browse` | Recherche / filtres |
| Vendre | `/sell` ou `/seller/*` | Bouton central violet |
| Messages | `/messages` | Threads simulés |
| Profil | `/profile` | Espace perso + bascule vendeur |

Le tab "Vendre" mène au dashboard vendeur si `sellerMode` activé, sinon au parcours "Devenir vendeur".

### 7.4 Parcours vendeur (existant, partiellement stylé)

```
/sell → /sell/setup → /sell/customize → /sell/ready
/seller/dashboard (via /profile ou /sell)
/seller/products/new → /seller/products/ready
/seller/orders, /seller/shipping, /seller/payouts
/seller/missions, /seller/stats
```

### 7.5 Parcours acheteur

```
/p/[id]           Page produit publique
/s/[slug]         Page boutique publique
/checkout/[id]    Simulation paiement
/orders/*         Suivi, validation, litige
```

---

## 8. Écrans refondus récemment (état Mac → à préserver)

### ✅ Refonte brand complète

| Route | Fichier | Détail |
|-------|---------|--------|
| `/welcome` | `app/welcome/page.tsx` | `BrandHero` — pills, doodles, CTA |
| `/welcome-in` | `app/welcome-in/page.tsx` | Hero post-inscription |
| `/bonjour` | `app/bonjour/page.tsx` | `BrandGreetingSplash` post-login |
| `/auth` | `app/auth/page.tsx` | Dual mode login/signup, banner encouragement |
| `/intention` | `app/intention/page.tsx` | Cartes intention + `ExpressiveTitle` |
| `/discover` | `app/(app)/discover/page.tsx` | Bandeau violet + 3 sections (Pour toi, Articles, Boutiques) |
| Dashboard vendeur | `components/seller/seller-profile-dashboard.tsx` | Simplifié : action verte, stats 3 cols, Top 10, 1 mission, raccourcis |

### Composants brand créés

```
components/vendy/
├── brand-hero.tsx              Hero violet plein écran (welcome, welcome-in)
├── brand-greeting-splash.tsx   Splash "Bonjour, [Prénom]"
├── brush-highlight.tsx         Surlignage vert brush sur texte
├── floating-pill.tsx           Pills décoratives (Mode, Vintage, Création…)
├── brand-doodles.tsx           SVG doodles (fleurs, étoiles, flèches)
├── pink-scribble.tsx           Soulignement rose expressif
├── expressive-title.tsx        Titres section stylés
├── featured-expressive-card.tsx
├── encouragement-banner.tsx    Bandeau messages onboarding (violet)
├── search-bar.tsx              Variante `onPurple` pour discover
└── category-chips.tsx          Variante `onPurple`
```

### Détails dashboard vendeur (intention UX)

Ordre de lecture voulu :
1. **À faire maintenant** — carte verte + badge violet "Commande à expédier !"
2. **Ta boutique** — 3 stats grises (Ventes, Abonnés, Note)
3. **Objectif Top 10** — barre progression violette
4. **Prochaine mission** — une seule `MissionCard` (pas de doublon vert)
5. **Raccourcis** — Mes produits / Mes revenus

---

## 9. Écrans PAS encore alignés sur la nouvelle identité

Ces pages existent et fonctionnent mais gardent l'ancien style (coral/warm) ou n'ont pas été retravaillés :

- `/design` — page walkthrough dev (liens vers tous les écrans)
- `/browse`, `/shops` — cohérence visuelle discover à harmoniser
- Flux vendeur détaillé (`/sell/setup`, customize, etc.)
- Pages commande / checkout / litige
- `docs/VENDY_DESIGN_SYSTEM.md` — doc à mettre à jour (coral → purple)

**Ne pas réintroduire** sur Discover : header avec avatar profil + logo Vendy (retiré volontairement).

**Ne pas remettre** de dégradé sur le bandeau Discover — bandeau **violet uni** validé.

---

## 10. Itérations UI déjà passées (ne pas refaire)

L'utilisateur a itéré plusieurs fois. Voici ce qui a été testé et tranché :

1. Première implémentation brand → jugée trop légère vs références
2. Renforcement typo massive + cartes vertes → discover refait puis **layout discover restauré** (carrousel Pour toi + grille Articles + carrousel Boutiques)
3. Passage cartes grises `#F2F4F7` sans bordures lourdes
4. Hero welcome — correction chevauchements pills/texte (3 zones : décor / texte / CTA)
5. Discover header profil+logo retirés
6. Fond discover — dégradé testé puis remplacé par bandeau violet uni
7. Dashboard vendeur — simplifié pour lisibilité immédiate

---

## 11. Git & transfert

- Repo Git initialisé à la racine `vendy_cursor_pack/`
- Commit initial : `034d235` — "Initial commit — prototype Vendy"
- 99 fichiers versionnés, `node_modules` et `.next` exclus
- Push GitHub : à faire manuellement depuis la machine (gh non installé sur Mac au moment du commit)

Variables d'environnement : **aucune**. Pas de `.env` dans le projet.

---

## 12. Problèmes connus

| Problème | Détail |
|----------|--------|
| SWC Mac | Warning signature binaire → fallback WASM, serveur OK |
| Images Unsplash | Certaines URLs mock 404 en dev |
| Lockfile parent | Warning Next.js si npm lancé hors `vendy-app/` |
| Doc design obsolète | `VENDY_DESIGN_SYSTEM.md` ≠ code actuel |
| État non persisté | Refresh = retour état initial (pas de localStorage) |

---

## 13. Conventions de code à respecter

- **Mobile-first** — tout dans `PhoneShell`
- **Mock only** — pas d'API routes réelles, pas de fetch externe métier
- **Français** — copy UI en français
- **Tokens CSS** — utiliser `vendy-purple`, `vendy-soft`, `font-brand`, etc. depuis `globals.css`
- **Classes legacy** — `vendy-coral` = violet (ne pas réintroduire le coral #F04465)
- **Minimal scope** — petites PRs par écran/bloc, pas "refaire toute l'app"
- **Pas de over-engineering** — pas de nouvelle couche d'état sans raison

---

## 14. Comment continuer avec Cursor (Windows)

### Prompt recommandé pour reprendre

```
@CURSOR_HANDOFF.md @docs/VENDY_PRODUCT_BRIEF.md

Je reprends le prototype Vendy sur Windows. Lis le handoff.
On en est à [décrire la tâche]. Ne touche pas aux flux déjà validés
(welcome, auth, bonjour, discover layout, dashboard vendeur).
Respecte la palette purple/green/soft gray.
```

### Ordre de travail suggéré (si poursuite identité visuelle)

1. Mettre à jour `docs/VENDY_DESIGN_SYSTEM.md` (palette purple)
2. Harmoniser `/browse` et `/shops` avec Discover
3. Retravailler flux vendeur `/sell/*` au style brand
4. Page `/design` — reflet de la nouvelle identité
5. Polish QA (`06_POLISH_AND_QA.md`)

### Pages de test rapide

| URL | Vérifier |
|-----|----------|
| `/welcome` | Hero violet, pills, pas de chevauchement |
| `/auth?mode=login` | → `/bonjour` → `/discover` |
| `/auth` (signup) | 3 steps → `/welcome-in` → `/intention` |
| `/discover` | Bandeau violet, pas de header profil |
| `/profile` (mode vendeur) | Dashboard simplifié vert/violet/gris |

---

## 15. Fichiers clés — référence rapide

| Besoin | Fichier |
|--------|---------|
| Tokens couleurs / fonts | `vendy-app/src/app/globals.css` |
| État app simulé | `vendy-app/src/lib/context/vendy-provider.tsx` |
| Données fictives | `vendy-app/src/lib/mock/data.ts` |
| Types | `vendy-app/src/types/vendy.ts` |
| Hero onboarding | `vendy-app/src/components/vendy/brand-hero.tsx` |
| Splash login | `vendy-app/src/components/vendy/brand-greeting-splash.tsx` |
| Home discover | `vendy-app/src/app/(app)/discover/page.tsx` |
| Dashboard vendeur | `vendy-app/src/components/seller/seller-profile-dashboard.tsx` |
| Nav bottom | `vendy-app/src/components/vendy/floating-nav.tsx` |
| Walkthrough dev | `vendy-app/src/app/design/page.tsx` |

---

## 16. Résumé en une phrase

**Vendy est un prototype Next.js mobile-first de marketplace curatée pour petites boutiques, avec identité visuelle purple/green/Jeko, flux auth simulé (welcome → auth → intention ou bonjour → discover), mock data locale, et un dashboard vendeur simplifié — le reste de l'app existe fonctionnellement mais attend une harmonisation visuelle.**
