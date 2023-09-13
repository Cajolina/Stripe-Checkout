Checkout Session
Betaltjänst med integration emot Stripe

Uppgiftsbeskrivning:

En webbshop byggd med Node/Express på backend och React/Typescript på frontend.
Det går att lägga en order och genomföra en betalning med integration med Stripe. Man kan registrera sig och logga in och användaren skapas som kund i Stripe samt att användarnamn/email och krypterat lösenord sparas i en JSON-fil på servern. Inloggningen hanteras med hjälp av cookies. Alla produkter hanteras och skapas genom Stripe. När en order är genomförd och godkänd genom en validering så ska ordern sparas i en JSON-fil på servern.
Du kan använda en rabattkod i checkouten som har skapats i Stripe.
Rabattkod: FALL10

Krav som uppfyllts:

Krav för G:

1. Uppgiften lämnas in i tid.
2. Produkter ska listas på en sida.
3. Produkter som visas och köps skall hämtas ifrån Stripe.
4. Det ska gå att lägga till produkter i en kundvagn.
5. Baserad på kundvagnen skall det gå att lägga en order genom Stripe.
6. Man skall kunna registrera sig som en användare i webbshoppen. Detta skall resultera i att en ”Customer” skapas i Stripe och användaren sparar i en JSON-fil. (samtliga lösenord skall sparas hashade).
7. Man skall kunna logga in som kund. Den inloggade kunden (som även är sparad i Stripe) skall användas vid placering av order.
8. Man skall inte kunna placera en order om man inte är inloggad.

Krav för VG:

1. Alla punkter för godkänt är uppfyllda
2. Det skall gå att ange en rabattkod för att få rabatt på sitt köp (Detta görs genom Stripe)
3. Man skall som inloggad kunna se sina lagda ordrar.
4. Samtliga placerade ordrar skall sparas till en lista i en JSON-fil.
5. Ordern får inte under några omständigheter läggas utan genomförd betalning! (dvs. Spara aldrig ett orderobjekt såvida ni inte fått bekräftelse tillbaka ifrån stripe att betalningen gått igenom)

BYGGA & STARTA PROJEKTET:

1. I terminalen skriv 'cd server'.
2. Därefter skriver du 'npm install'.
3. Sen skriver du 'npm run dev' för att köra servern.
4. Öppna ännu en terminal i VSCode. Skriv 'cd client'.
5. Därefter skriver man 'npm install'.
6. Sen skriver man 'npm run dev' och när klienten körs kan du öppna upp webbläsaren från terminalen.

Github repo: https://github.com/Cajolina/Stripe-Checkout
