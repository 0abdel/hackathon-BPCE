require("dotenv").config();

const { TeamsActivityHandler, TurnContext } = require("botbuilder");
const fetch = require("node-fetch");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;


if (!GEMINI_API_KEY) {
    console.log("❌ Erreur : Clé API Gemini manquante. Vérifiez votre fichier .env !");
    process.exit(1);
}


const CHANGEMENT_NB = 136;


class TeamsBot extends TeamsActivityHandler {
    constructor() {

        super();
        this.conversationHistory = {};
        this.onMessage(async (context, next) => {
            const conversationId = context.activity.conversation.id;

            const removedMentionText = TurnContext.removeRecipientMention(context.activity);
            const userMessage = removedMentionText?.toLowerCase().replace(/\n|\r/g, "").trim();

            // Ensure we have a history array initialized
            if (!this.conversationHistory[conversationId]) {
                this.conversationHistory[conversationId] = [];
            }

            // 🧠 Clone the full history and add the new message to send to Gemini
            const historyForGemini = [...this.conversationHistory[conversationId], {
                role: "user",
                text: userMessage,
            }];

            // 🗣 Ask Gemini with the complete context
            const botResponse = await this.getGeminiResponse(historyForGemini);

            // 💾 Now update the real history after we get a response
            this.conversationHistory[conversationId].push({
                role: "user",
                text: userMessage,
            });

            this.conversationHistory[conversationId].push({
                role: "model",
                text: botResponse,
            });

            await context.sendActivity(botResponse);
            await next();
        });


        // Gérer l'ajout de nouveaux membres
        const fs = require('fs').promises; // Use promise-based fs module

        this.onMembersAdded(async (context, next) => {
            await context.sendActivity("Bonjour, je suis l'Agent Smith. J'ai détecté un nouveau changement. J'ai remarqué plusieurs problèmes le concernant.");
            const membersAdded = context.activity.membersAdded;

            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id) {
                    try {
                        const conversationId = context.activity.conversation.id;

                        // Ensure conversation history is initialized
                        if (!this.conversationHistory[conversationId]) {
                            this.conversationHistory[conversationId] = [];
                        }

                        // Get changements
                        const objChang = await fetch(`http://localhost:3010/api/changements/${CHANGEMENT_NB}`);

                        if (!objChang.ok) {
                            throw new Error('Network response was not ok');
                        }

                        const changement = await objChang.json();

                        // // Get direction
                        // let directionName = changement.nom_complet_direction;
                        // directionName = directionName.replace(/ /g, "%20").replace(/'/g, "%27");
                        let url = `http://localhost:3010/api/direction/`;
                        const objDir = await fetch(url);

                        if (!objDir.ok) {
                            throw new Error('Network response was not ok');
                        }
                        const directions = await objDir.json();

                        let fileContent = await fs.readFile('prompt.txt', 'utf8');

                        let removedMentionText = JSON.stringify(changement) + "\n" + JSON.stringify(directions) + "\n" + fileContent;

                        const userMessage = removedMentionText.toLowerCase().replace(/\n|\r/g, "").trim();
                        const botResponse = await this.getGeminiResponse(userMessage);

                        this.conversationHistory[conversationId].push({
                            role: "user",
                            text: userMessage,
                        });
                        this.conversationHistory[conversationId].push({
                            role: "model",
                            text: botResponse,
                        });

                        await context.sendActivity(botResponse);

                    } catch (error) {
                        console.error("Error:", error);
                    }

                    break;
                }
            }
            await next();
        });
    }

    async getGeminiResponse(conversationInput) {
        try {
            let formattedMessages;

            if (Array.isArray(conversationInput)) {
                // ✅ conversation history (array of messages with role/text)
                formattedMessages = conversationInput.map((entry) => ({
                    role: entry.role,
                    parts: [{ text: entry.text }],
                }));
            } else if (typeof conversationInput === 'string') {
                // ✅ single message (string), likely from onMembersAdded
                formattedMessages = [{
                    role: "user",
                    parts: [{ text: conversationInput }],
                }];
            } else {
                throw new Error("❌ Type de contenu inattendu pour la requête Gemini");
            }


            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: formattedMessages,
                    }),
                }
            );

            if (!response.ok) {
                const errorMessage = `Erreur API: ${response.statusText} (Code ${response.status})`;
                console.log("Erreur de réponse API : ", errorMessage);
                throw new Error(errorMessage);
            }

            const result = await response.json();

            if (
                !result ||
                !result.candidates ||
                !result.candidates[0] ||
                !result.candidates[0].content
            ) {
                console.log("Structure inattendue de la réponse", result);
                throw new Error("⚠️ Réponse inattendue de Gemini");
            }

            return result.candidates[0].content.parts[0].text;

        } catch (error) {
            console.log("❌ Erreur API Gemini:", error);
            return "Désolé, une erreur est survenue en essayant de générer une réponse.";
        }
    }
}
module.exports.TeamsBot = TeamsBot;