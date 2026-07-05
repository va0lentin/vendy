# VENDY — App Map & User Flows

## 1. Principe de compte

Vendy utilise un compte universel.

Un utilisateur peut :
- acheter ;
- vendre ;
- acheter et vendre avec le même profil ;
- devenir vendeur plus tard ;
- gérer une ou plusieurs boutiques à terme.

Pendant l’onboarding, l’utilisateur choisit son intention de départ :
- “I want to buy”
- “I want to sell”

Ce choix sert uniquement à personnaliser le premier parcours.
Il ne doit pas enfermer l’utilisateur dans un rôle définitif.

## 2. Structure logique

Account
- User profile
- Buyer space
- Seller space
- Shops
- Products
- Orders
- Payouts
- Settings

## 3. Navigation acheteur

Tabs :
- Discover
- Shops
- Orders
- Sell
- Profile

Si l’utilisateur clique sur “Sell” :
- s’il n’a pas encore activé le mode vendeur, il arrive sur l’écran “Become a seller” ;
- s’il est déjà vendeur, il arrive sur le Seller Dashboard.

## 4. Navigation vendeur

Tabs :
- Dashboard
- Products
- Orders
- Share
- Shop

Le vendeur peut toujours revenir à l’espace acheteur.

## 5. Parcours onboarding

1. Welcome
2. Sign up / Log in
3. Intention choice : Buy or Sell
4. Universal account created
5. If buyer : Discover Home
6. If seller : Create Shop
7. Seller can complete shop setup progressively

## 6. Parcours vendeur principal

1. Create shop
2. Customize shop
3. Seller dashboard
4. Add product
5. Product link ready
6. Share link
7. Receive order
8. Payment secured
9. Shipping label / QR code
10. Drop off package
11. Order tracking
12. Buyer validates
13. Money released
14. Payout available

## 7. Parcours acheteur principal

1. Opens Vendy product link
2. Product page
3. Shop page
4. Secure checkout
5. Delivery option / relay point simulation
6. Payment simulation
7. Order confirmed
8. Tracking screen
9. Buyer validates
10. Option to report problem
11. Discover similar shops

## 8. Parcours découverte

La découverte ne doit pas être le cœur du MVP au début.
Elle doit être progressive, curatée et orientée boutiques.

Screens :
- Discover Home
- Selected shops
- Rising shops
- New drops
- Shop page
- Product page

## 9. Screens MVP à créer

Core screens :
1. Landing / Welcome
2. Sign up / Login
3. Intention Choice
4. Buyer Discover Home
5. Become Seller
6. Create Shop
7. Customize Shop
8. Shop Progress
9. Seller Dashboard
10. Add Product
11. Product Link Ready
12. Public Product Page
13. Public Shop Page
14. Checkout Simulation
15. Order Confirmed
16. Seller Order Received
17. Shipping Label / QR Code
18. Buyer Tracking
19. Buyer Validation
20. Seller Payout Status
21. Discovery After Purchase
22. Profile
23. Settings

Optional preview screens :
24. Seller Missions
25. Badge Unlocked
26. Seller Ranking
27. Dispute Simulation
28. Empty states
