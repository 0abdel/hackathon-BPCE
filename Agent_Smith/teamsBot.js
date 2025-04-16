require("dotenv").config();

const { TeamsActivityHandler, TurnContext } = require("botbuilder");
const fetch = require("node-fetch");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.log("❌ Erreur : Clé API Gemini manquante. Vérifiez votre fichier .env !");
    process.exit(1);
}

class TeamsBot extends TeamsActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {

            // Nettoyage du message (supprime la mention du bot)
            const removedMentionText = TurnContext.removeRecipientMention(context.activity);
            const userMessage = removedMentionText.toLowerCase().replace(/\n|\r/g, "").trim();


            // Obtenir une réponse de Gemini
            const botResponse = await this.getGeminiResponse(userMessage);

            // Répondre à l'utilisateur
            await context.sendActivity(botResponse);

            await next();
        });

        // Gérer l'ajout de nouveaux membres
        const fs = require('fs').promises; // Use promise-based fs module

        this.onMembersAdded(async (context, next) => {
            await context.sendActivity("Bonjour, je suis l'Agent Smith. J'ai détecté un nouveau changement. Il y a plusieurs problèmes concernant celui-ci.");
            const membersAdded = context.activity.membersAdded;

            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id) {
                    try {
                        // Get changements
                        const objChang = await fetch(`http://localhost:3010/api/changements/799`);

                        if (!objChang.ok) {
                            throw new Error('Network response was not ok');
                        }

                        const changement = await objChang.json();

                        // Get direction
                        let directionName = changement.nom_complet_direction;
                        directionName.replace(/ /g, "%20").replace(/'/g, "%27");
                        let url = `http://localhost:3010/api/direction/` + directionName;
                        const objDir = await fetch(url);

                        if (!objDir.ok) {
                            throw new Error('Network response was not ok');
                        }
                        const direction = await objDir.json();

                        let fileContent = await fs.readFile('prompt.txt', 'utf8');

                        let removedMentionText = JSON.stringify(changement) + "\n" + JSON.stringify(direction) + "\n" + fileContent;

                        const userMessage = removedMentionText.toLowerCase().replace(/\n|\r/g, "").trim();
                        const botResponse = await this.getGeminiResponse(userMessage);

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

    // Fonction pour obtenir la réponse de Gemini
    async getGeminiResponse(prompt) {
        try {

            // Changement de la structure du corps de la requête pour correspondre à l'exemple cURL
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{ text: prompt }]
                        }]
                    }),
                }
            );

            // Vérification de la réponse de l'API
            if (!response.ok) {
                const errorMessage = `Erreur API: ${response.statusText} (Code ${response.status})`;
                console.log("Erreur de réponse API : ", errorMessage); // Log détaillé
                throw new Error(errorMessage);
            }

            const result = await response.json();

            // Vérification de la structure de la réponse
            if (!result || !result.candidates || !result.candidates[0] || !result.candidates[0].content) {
                console.log("Structure inattendue de la réponse", result);
                throw new Error("⚠️ Réponse inattendue de Gemini");
            }


            return result.candidates[0].content.parts[0];

        } catch (error) {
            console.log("❌ Erreur API Gemini:", error);
            return "Désolé, une erreur est survenue en essayant de générer une réponse. Vérifiez votre clé API ou contactez l'administrateur.";
        }
    }
}

module.exports.TeamsBot = TeamsBot;