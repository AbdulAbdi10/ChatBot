const chatbox = document.getElementById("chatbox");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const languageSelect = document.getElementById("languageSelect");
const clearChatBtn = document.getElementById("clearChatBtn");
const quickButtons = document.querySelectorAll("[data-quick]");

const content = {
  en: {
    welcome:
      "Hi! Welcome to FreshMart Grocery. I can help with store hours, delivery, halal items, payment methods, produce, and location. How can I help you today?",
    fallback:
      "I do not have that answer yet. Please call us at (612) 555-1234 and a team member will help you.",
    placeholders: {
      input: "Type your question here..."
    },
    ui: {
      clear: "Clear"
    },
    answers: [
      {
        keywords: ["hours", "open", "close", "time"],
        answer: "FreshMart is open every day from 8:00 AM to 9:00 PM."
      },
      {
        keywords: ["delivery", "deliver", "same-day", "pickup"],
        answer:
          "Yes. We offer local same-day delivery for orders placed before 3:00 PM. Pickup is also available."
      },
      {
        keywords: ["halal", "meat"],
        answer:
          "Yes. We carry halal meat in our fresh meat section. Please call ahead if you want today's availability."
      },
      {
        keywords: ["ebt", "snap", "payment", "pay", "card", "cash"],
        answer:
          "Yes. We accept EBT/SNAP for eligible items, along with cash and major credit cards."
      },
      {
        keywords: ["location", "address", "where", "located"],
        answer: "We are located at 123 Main Street, Minneapolis, MN."
      },
      {
        keywords: [
          "produce",
          "organic",
          "fruit",
          "vegetable",
          "fruits",
          "vegetables"
        ],
        answer:
          "Yes. We carry fresh produce every day, including a selection of organic fruits and vegetables."
      },
      {
        keywords: ["phone", "contact", "call", "staff", "person", "someone"],
        answer:
          "You can reach our team at (612) 555-1234 during store hours. A staff member will be happy to help."
      },
      {
        keywords: ["special", "sale", "deal", "deals"],
        answer:
          "This week's demo special is 10% off fresh produce and buy one, get one free on selected pantry items."
      }
    ]
  },

  so: {
    welcome:
      "Salaan! Kusoo dhawoow FreshMart Grocery. Waxaan kaa caawin karaa saacadaha dukaanka, gaarsiinta, hilibka xalaasha ah, hababka lacag bixinta, khudaarta, iyo goobta dukaanka. Maxaan kaa caawin karaa maanta?",
    fallback:
      "Jawaabtaas hadda ma hayo. Fadlan naga soo wac (612) 555-1234 si shaqaale kuu caawiyo.",
    placeholders: {
      input: "Halkan ku qor su'aashaada..."
    },
    ui: {
      clear: "Nadiifi"
    },
    answers: [
      {
        keywords: ["hours", "open", "close", "time", "saacad", "furan", "xiran", "goorma"],
        answer:
          "FreshMart wuxuu furan yahay maalin kasta laga bilaabo 8:00 subaxnimo ilaa 9:00 fiidnimo."
      },
      {
        keywords: ["delivery", "deliver", "pickup", "gaarsiin", "keenis"],
        answer:
          "Haa. Waxaan bixinnaa gaarsiin isla maalintaas ah haddii dalabka la sameeyo ka hor 3:00 galabnimo. Qaadasho dukaanka ahna waa la heli karaa."
      },
      {
        keywords: ["halal", "meat", "xalaal", "hilib"],
        answer:
          "Haa. Waxaan haynaa hilib xalaal ah qeybta hilibka cusub. Fadlan horay usoo wac haddii aad rabto helitaanka maanta."
      },
      {
        keywords: ["ebt", "snap", "payment", "pay", "card", "cash", "lacag", "bixin"],
        answer:
          "Haa. Waxaan aqbalnaa EBT/SNAP alaabta u qalanta, sidoo kale lacag caddaan ah iyo kaararka waaweyn."
      },
      {
        keywords: ["location", "address", "where", "located", "goob", "cinwaan"],
        answer: "Waxaan ku yaalnaa 123 Main Street, Minneapolis, MN."
      },
      {
        keywords: ["produce", "organic", "fruit", "vegetable", "khudaar", "miraha"],
        answer:
          "Haa. Waxaan haynaa khudaar iyo miro cusub maalin kasta, oo ay ku jiraan qaar organic ah."
      },
      {
        keywords: ["phone", "contact", "call", "staff", "person", "someone", "wac", "shaqaale"],
        answer:
          "Waxaad la xiriiri kartaa shaqaalaheena lambarkan (612) 555-1234 inta lagu jiro saacadaha dukaanka."
      },
      {
        keywords: ["special", "sale", "deal", "deals", "qiimo dhimis"],
        answer:
          "Qiimo dhimista tusaalaha ee toddobaadkan waa 10% khudaar cusub ah iyo hal iibsato hal bilaash ah qaar ka mid ah alaabta bakhaarka."
      }
    ]
  }
};

let currentLanguage = "en";

function addMessage(text, sender = "bot") {
  const row = document.createElement("div");
  row.className = `message-row ${sender}`;

  const bubble = document.createElement("div");
  bubble.className = `message ${sender}`;
  bubble.textContent = text;

  row.appendChild(bubble);
  chatbox.appendChild(row);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function getResponse(input) {
  const langData = content[currentLanguage];
  const normalized = input.toLowerCase();

  for (const item of langData.answers) {
    const matched = item.keywords.some((keyword) =>
      normalized.includes(keyword.toLowerCase())
    );

    if (matched) {
      return item.answer;
    }
  }

  return langData.fallback;
}

function sendUserMessage(text) {
  addMessage(text, "user");

  const reply = getResponse(text);

  setTimeout(() => {
    addMessage(reply, "bot");
  }, 250);
}

function renderWelcome() {
  chatbox.innerHTML = "";
  addMessage(content[currentLanguage].welcome, "bot");
}

function updateLanguageUI() {
  userInput.placeholder = content[currentLanguage].placeholders.input;
  clearChatBtn.textContent = content[currentLanguage].ui.clear;
  renderWelcome();
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = userInput.value.trim();
  if (!value) return;

  sendUserMessage(value);
  userInput.value = "";
  userInput.focus();
});

quickButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const question = button.getAttribute("data-quick");
    sendUserMessage(question);
  });
});

languageSelect.addEventListener("change", (event) => {
  currentLanguage = event.target.value;
  updateLanguageUI();
});

clearChatBtn.addEventListener("click", () => {
  renderWelcome();
});

updateLanguageUI();
