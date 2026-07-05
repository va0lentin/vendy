# 00 — MASTER PROMPT FOR CURSOR

Paste this first in Cursor.

---

You are building a high-fidelity coded prototype for Vendy.

Do not build a production app yet.
Do not integrate real Stripe, real shipping APIs, real authentication or a real database.
Use mock data and simulated flows.

Vendy is a mobile-first app that simplifies e-commerce like Vinted simplified peer-to-peer selling, but for small shops, creators, Instagram sellers and independent brands.

Core promise:
A seller creates a shop, publishes products, shares a link, receives a secure order, gets a shipping label or QR code, ships the package, and gets paid after buyer validation.

The prototype must feel complete on the surface:
- realistic onboarding
- universal account system
- buyer/seller mode
- shop creation
- shop personalization
- seller dashboard
- product publishing
- shareable product link
- buyer product page
- secure checkout simulation
- order tracking
- shipping label / QR code simulation
- buyer validation
- seller payout status
- curated discovery of shops
- profile/settings
- seller missions and progression preview

Important account logic:
Vendy uses one universal user account.
A user can buy and sell with the same profile.
During onboarding, the user chooses their first intention:
“I want to buy” or “I want to sell”.
This choice only personalizes the first experience.
Buyers can activate seller mode later.
Sellers can also buy from other shops with the same account.

UI direction:
Premium, warm, modern, simple, Airbnb-like clarity.
Mostly neutral interface with one main brand color.
No generic marketplace.
No crowded product grid.
No AliExpress feeling.
No Etsy-style chaotic bazaar.
No childish gamification.

Color system:
- Vendy Coral: #F04465
- Coral Soft: #FFF0F3
- Background Warm: #FFFCFA
- Surface White: #FFFFFF
- Soft Gray: #F7F7F7
- Border Gray: #DDDDDD
- Text Primary: #1F1F1F
- Text Secondary: #717171
- Text Muted: #A3A3A3

Use functional colors rarely:
- green for trust / validation
- red for disputes / errors
- orange for warnings
- purple only for seller missions or progression

Read these project documents first:
- /docs/VENDY_PRODUCT_BRIEF.md
- /docs/VENDY_APP_MAP.md
- /docs/VENDY_DESIGN_SYSTEM.md
- /docs/VENDY_MOCK_DATA.md

First task:
Do not code screens yet.
Create a clear project plan with:
1. folder structure
2. route structure
3. component list
4. mock data model
5. design system components
6. screen list
7. implementation order
8. quality checklist

Wait for validation before coding.
