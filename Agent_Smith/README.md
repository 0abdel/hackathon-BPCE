# Overview of the Basic Bot template

Examples of Microsoft Teams bots in everyday use include:

- Bots that notify about build failures.
- Bots that provide information about the weather or bus schedules.
- Bots that provide travel information.

A bot interaction can be a quick question and answer, or it can be a complex conversation. Being a cloud application, a bot can provide valuable and secure access to cloud services and corporate resources.

## Get started with the Basic Bot template

> **Prerequisites**
>
> To run the Basic Bot template in your local dev machine, you will need:
>
> - [Node.js](https://nodejs.org/), supported versions: 18, 20
> - [Teams Toolkit Visual Studio Code Extension](https://aka.ms/teams-toolkit) version 5.0.0 and higher or [Teams Toolkit CLI](https://aka.ms/teamsfx-toolkit-cli)

> For local debugging using Teams Toolkit CLI, you need to do some extra steps described in [Set up your Teams Toolkit CLI for local debugging](https://aka.ms/teamsfx-cli-debugging).

1. First, select the Teams Toolkit icon on the left in the VS Code toolbar.
2. Press F5 to start debugging which launches your app in Teams App Test Tool using a web browser. Select `Debug in Test Tool`.
3. The browser will pop up to open Teams App Test Tool.
4. You will receive a welcome message from the bot, and you can send anything to the bot to get an echoed response.

**Congratulations**! You are running an application that can now interact with users in Teams App Test Tool:

![basic bot](https://github.com/OfficeDev/TeamsFx/assets/9698542/bdf87809-7dd7-4926-bff0-4546ada25e4b)

## What's included in the template

| Folder       | Contents                                            |
| - | - |
| `.vscode`    | VSCode files for debugging                          |
| `appPackage` | Templates for the Teams application manifest        |
| `env`        | Environment files                                   |
| `infra`      | Templates for provisioning Azure resources          |

The following files can be customized and demonstrate an example implementation to get you started.

| File                                 | Contents                                           |
| - | - |
|`teamsBot.js`| Handles business logics for the Basic Bot.|
|`index.js`|`index.js` is used to setup and configure the Basic Bot.|

The following are Teams Toolkit specific project files. You can [visit a complete guide on Github](https://github.com/OfficeDev/TeamsFx/wiki/Teams-Toolkit-Visual-Studio-Code-v5-Guide#overview) to understand how Teams Toolkit works.

| File                                 | Contents                                           |
| - | - |
|`teamsapp.yml`|This is the main Teams Toolkit project file. The project file defines two primary things:  Properties and configuration Stage definitions. |
|`teamsapp.local.yml`|This overrides `teamsapp.yml` with actions that enable local execution and debugging.|
|`teamsapp.testtool.yml`| This overrides `teamsapp.yml` with actions that enable local execution and debugging in Teams App Test Tool.|

## Extend the Basic Bot template

Following documentation will help you to extend the Basic Bot template.

- [Add or manage the environment](https://learn.microsoft.com/microsoftteams/platform/toolkit/teamsfx-multi-env)
- [Create multi-capability app](https://learn.microsoft.com/microsoftteams/platform/toolkit/add-capability)
- [Add single sign on to your app](https://learn.microsoft.com/microsoftteams/platform/toolkit/add-single-sign-on)
- [Access data in Microsoft Graph](https://learn.microsoft.com/microsoftteams/platform/toolkit/teamsfx-sdk#microsoft-graph-scenarios)
- [Use an existing Microsoft Entra application](https://learn.microsoft.com/microsoftteams/platform/toolkit/use-existing-aad-app)
- [Customize the Teams app manifest](https://learn.microsoft.com/microsoftteams/platform/toolkit/teamsfx-preview-and-customize-app-manifest)
- Host your app in Azure by [provision cloud resources](https://learn.microsoft.com/microsoftteams/platform/toolkit/provision) and [deploy the code to cloud](https://learn.microsoft.com/microsoftteams/platform/toolkit/deploy)
- [Collaborate on app development](https://learn.microsoft.com/microsoftteams/platform/toolkit/teamsfx-collaboration)
- [Set up the CI/CD pipeline](https://learn.microsoft.com/microsoftteams/platform/toolkit/use-cicd-template)
- [Publish the app to your organization or the Microsoft Teams app store](https://learn.microsoft.com/microsoftteams/platform/toolkit/publish)
- [Develop with Teams Toolkit CLI](https://aka.ms/teams-toolkit-cli/debug)
- [Preview the app on mobile clients](https://aka.ms/teamsfx-mobile)

















# Teams Bot alimenté par Gemini AI

**Ce projet implémente un bot Microsoft Teams** qui utilise l'API **Gemini** de Google pour générer des réponses intelligentes aux messages des utilisateurs. Le bot est conçu pour répondre de manière interactive et personnalisée, en tirant parti des capacités avancées de l'intelligence artificielle de Gemini.

---

## :warning: Prérequis

Avant de commencer, assurez-vous que vous avez :

- **Node.js** installé sur votre machine (version 14.x ou supérieure).
- **Une clé API Gemini** obtenue via Google Cloud.
- **Fichier `.env`** contenant la clé API pour l'accès à Gemini.

---

## :package: Installation

1. **Clonez le projet** ou téléchargez les fichiers nécessaires dans un répertoire local.

   ```bash
   git clone https://votre-repository.git
   ```

2. **Installez les dépendances** :

   ```bash
   npm install
   ```

3. **Créez un fichier `.env`** à la racine de votre projet.

4. **Ajoutez votre clé API Gemini** dans le fichier `.env` :

   ```env
   GEMINI_API_KEY=VotreCléAPI
   ```

---

## :rocket: Fonctionnalités

- **Réponse automatique** aux messages des utilisateurs dans Microsoft Teams en utilisant l'API Gemini.
- **Message de bienvenue** pour les nouveaux membres rejoignant la conversation.
- **Gestion des erreurs** : Si une erreur se produit lors de l'appel à l'API Gemini ou si une clé API est manquante, un message d'erreur informatif est renvoyé à l'utilisateur.

---

## :memo: Architecture

### `TeamsBot` Class

La classe `TeamsBot` étend `TeamsActivityHandler` et gère deux événements principaux :

1. **`onMessage`** : 
   - Cette méthode est déclenchée lorsqu'un utilisateur envoie un message au bot.
   - Le message est nettoyé (en supprimant la mention du bot), puis envoyé à l'API Gemini pour générer une réponse.
   - Le bot répond ensuite avec la réponse générée par Gemini.

2. **`onMembersAdded`** : 
   - Cette méthode est déclenchée lorsqu'un membre rejoint la conversation.
   - Un message de bienvenue est envoyé.

### `getGeminiResponse` Function

Cette fonction interagit avec l'API Gemini pour obtenir une réponse en fonction du message de l'utilisateur :

- **Requête POST à Gemini** : La fonction envoie un message à l'API Gemini pour générer une réponse, en incluant le texte du message de l'utilisateur.
- **Vérification de la réponse** : Après avoir reçu la réponse de Gemini, la structure de la réponse est vérifiée pour s'assurer qu'elle est correcte. Si la réponse est valide, elle est renvoyée à l'utilisateur. Sinon, un message d'erreur générique est retourné.

### Exemple de Requête API

Le corps de la requête envoyée à l'API Gemini ressemble à ceci :

```json
{
  "contents": [
    {
      "parts": [
        {
          "text": "Message de l'utilisateur"
        }
      ]
    }
  ]
}
```

La réponse attendue ressemble à ceci :

```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          "Réponse générée par Gemini"
        ]
      }
    }
  ]
}
```

### Gestion des Erreurs

- Si l'API Gemini retourne une erreur ou si la clé API est incorrecte, un message d'erreur générique est renvoyé à l'utilisateur :
  
  ```bash
  Désolé, une erreur est survenue en essayant de générer une réponse. Vérifiez votre clé API ou contactez l'administrateur.
  ```

---

## :green_heart: Lancer le Bot

1. Une fois que vous avez effectué les configurations nécessaires, lancez le bot avec la commande suivante :

    ```
    
   ```

2. Vous devriez maintenant pouvoir interagir avec votre bot Teams et recevoir des réponses intelligentes générées par Gemini.

---

## :wrench: Dépannage

### :exclamation: Clé API manquante

Si la clé API Gemini est manquante ou invalide, vous obtiendrez l'erreur suivante :

```bash
❌ Erreur : Clé API Gemini manquante. Vérifiez votre fichier .env !
```

Assurez-vous que la clé est correctement ajoutée au fichier `.env` et qu'elle est valide.

### :exclamation: Erreur dans la Réponse de Gemini

Si la structure de la réponse de Gemini est incorrecte ou si une erreur réseau se produit, vous recevrez un message comme suit :

```bash
❌ Erreur API Gemini: [Détails de l'erreur]
```

Vérifiez que l'API Gemini est accessible et que le format de la réponse est correct.

---

## :bulb: Contribution

Si vous souhaitez contribuer à ce projet, n'hésitez pas à ouvrir des issues ou à soumettre des pull requests. Toute aide pour améliorer ce bot est la bienvenue !

---

## :clipboard: Licence

Ce projet est sous licence [MIT](LICENSE).

---

**Auteur :** [Votre nom ou votre équipe]  
**Date de création :** [Date]