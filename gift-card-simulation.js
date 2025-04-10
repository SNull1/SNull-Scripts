// Fonction pour générer un type de carte aléatoire (Visa ou Mastercard)
function getRandomCardType() {
  return Math.random() < 0.5 ? "Visa" : "Mastercard";
}

// Fonction pour générer des chiffres aléatoires
function generateDigits(length) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
}

// Fonction pour ajouter des tirets entre chaque groupe de 4 chiffres
function formatCardNumber(cardNumber) {
  return cardNumber.replace(/(\d{4})(?=\d)/g, '$1-'); // Insère un tiret après chaque groupe de 4 chiffres
}

// Fonction pour générer un montant aléatoire avec les nouvelles probabilités
function getRandomAmount() {
  let rand = Math.random();
  
  // 0.10% de chance pour 50.00$
  if (rand < 0.00001) return "50.00$";  
  // 0.10% de chance pour 25.00$
  else if (rand < 0.00002) return "25.00$";  
  else return "00.00$"; // 99.80% de chance pour 00$
}

// Codes de couleur ANSI pour le terminal
const COLORS = {
  blue: "\x1b[34m",  // Bleu pour Visa
  red: "\x1b[31m",   // Rouge pour Mastercard
  yellow: "\x1b[33m", // Jaune pour les numéros de carte
  purple: "\x1b[35m", // Violet pour les CVV
  green: "\x1b[32m",  // Vert pour le montant
  reset: "\x1b[0m"    // Réinitialiser la couleur
};

// Fonction pour générer une carte cadeau
function generateGiftCard() {
  const cardType = getRandomCardType();
  const cardNumber = generateDigits(16);
  const formattedCardNumber = formatCardNumber(cardNumber); // Formater le numéro de carte
  const cvv = generateDigits(3);
  const amount = getRandomAmount();

  // Ajouter 5 espaces devant et 3 après "Visa"
  const formattedCardType = cardType === "Visa" ? "   " + cardType + "   " : cardType;

  // Définir les couleurs basées sur le type de carte
  const cardClass = cardType === "Visa" ? COLORS.blue : COLORS.red;
  const amountClass = COLORS.green;

  // Créer l'affichage de la carte
  let cardDisplay = `[${cardClass}${formattedCardType}${COLORS.reset}] || ➤ || ${COLORS.yellow}${formattedCardNumber}${COLORS.reset} || ➤ || ${COLORS.purple}${cvv}${COLORS.reset} || ➤ || ${amountClass}${amount}${COLORS.reset}`;

  // Si la carte est valide, ajouter "CARTE VALIDE !" à la fin
  if (amount === "25.00$" || amount === "50.00$") {
    cardDisplay += " CARTE VALIDE !";
  }

  return cardDisplay;
}

// Simulation loop
let foundValidCard = false;

// Simulation pour afficher les cartes
function startSimulation() {
  const interval = setInterval(() => {
    const giftCard = generateGiftCard();
    console.log(giftCard); // Afficher dans le terminal

    // Arrêter dès qu'une carte valide est trouvée
    if (giftCard.includes("CARTE VALIDE !")) {
      console.log("[CARTE TROUVÉE] " + giftCard);
      clearInterval(interval); // Arrêter la simulation dès qu'une carte valide est trouvée
    }
  }, 75); // Afficher une carte toutes les 2000ms
}

startSimulation(); // Démarre la simulation
