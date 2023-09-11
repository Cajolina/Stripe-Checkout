Krav för G:

1. Uppgiften lämnas in i tid.
   2.Produkter ska listas på en sida.
   3.Produkter som visas och köps skall hämtas ifrån Stripe.
   4.Det ska gå att lägga till produkter i en kundvagn.
   5.Baserad på kundvagnen skall det gå att lägga en order genom Stripe.
   6.Man skall kunna registrera sig som en användare i webbshoppen. Detta skall resultera i att en ”Customer” skapas i Stripe och användaren sparar i en JSON-fil. (samtliga lösenord skall sparas hashade).
   7.Man skall kunna logga in som kund. Den inloggade kunden (som även är sparad i Stripe) skall användas vid placering av order.
   8.Man skall inte kunna placera en order om man inte är inloggad.

Krav för VG:
1.Alla punkter för godkänt är uppfyllda
2.Det skall gå att ange en rabattkod för att få rabatt på sitt köp (Detta görs genom Stripe)
3.Man skall som inloggad kunna se sina lagda ordrar.
4.Samtliga placerade ordrar skall sparas till en lista i en JSON-fil.
5.Ordern får inte under några omständigheter läggas utan genomförd betalning! (dvs. Spara aldrig ett orderobjekt såvida ni inte fått bekräftelse tillbaka ifrån stripe att betalningen gått igenom)
