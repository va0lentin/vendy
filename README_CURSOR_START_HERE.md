# VENDY — Cursor Prototype Pack

Objectif : créer une maquette codée haute fidélité de Vendy, complète visuellement, mais sans construire l'application finale.

Cette maquette doit être :
- mobile-first ;
- premium ;
- claire ;
- réaliste ;
- cliquable ;
- basée sur des données fictives ;
- assez complète en surface pour être montrée à des vendeurs, un associé, un designer ou un développeur.

Important : ne pas intégrer de vrais paiements, vraie logistique, vraie auth ou vraie base de données au début.
Tout doit être simulé proprement.

## Ordre recommandé dans Cursor

1. Créer le projet Next.js.
2. Ajouter les documents dans `/docs`.
3. Donner à Cursor le contenu de `00_MASTER_PROMPT_FOR_CURSOR.md`.
4. Demander à Cursor de proposer le plan, sans coder.
5. Valider le plan.
6. Lancer `01_BUILD_DESIGN_SYSTEM.md`.
7. Lancer `02_BUILD_ONBOARDING_FLOW.md`.
8. Lancer `03_BUILD_SELLER_FLOW.md`.
9. Lancer `04_BUILD_BUYER_FLOW.md`.
10. Lancer `05_BUILD_DISCOVERY_AND_PROFILE.md`.
11. Lancer `06_POLISH_AND_QA.md`.

## Stack recommandée

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide icons
- Framer Motion léger
- Mock data local en TypeScript ou JSON
- Mobile-first responsive

## Règle principale

Ne jamais demander à Cursor : “Construis toute l’app Vendy”.
Toujours lui demander de construire un bloc précis, avec validation entre chaque étape.
