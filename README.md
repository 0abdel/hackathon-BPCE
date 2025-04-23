
##### Documents de référence
**Donnees changement hackaton Toulouse.xls**

   - Données de changements (1000 changements sur 10 jours)

   - Liste des directions, leurs périodes d’activités et leurs périodes sensibles

   - Liste des applications de chacune des directions et leur sensibilité

#### Modèles de données
- **Données changements**

  - Numéro du changement
  - Date de début du changement
  - Date de fin du changement
  - Description courte
  - Impact sur le service
  - Description impact


  - Périmètre impacté
Localisé : uniquement une application
Restreint : uniquement un métier
Etendu : transverse

  - Direction du changement (métier ou DSI)

  - Risque à faire lié à la maîtrise de l’opération

  - Description

  - Risque ne pas faire

- **Directions**

  - Nom de la direction (format court)

  - Type de direction (métier ou informatique)

  - Plage d’activité de la direction (si métier)

  - Période sensible de la direction (si métier)

  - Période où l’on évite fortement les changements sur une direction (applicatifs ou infrastructure impactant la direction)

- **Applications**

  - Nom de l’application

  - Direction de l’application

  - Plage de service : Plage d’activité de la direction (si métier)

  - Application sensible (Oui ou Non) (infra si sensibilité selon périmètre impacté)
  


# USAGE

## Run database
```sh
cd backend
npm install
npm start
```

## Run Teams Bot
Install [Microsoft teams Toolkit](https://learn.microsoft.com/fr-fr/microsoftteams/platform/toolkit/install-teams-toolkit?tabs=vscode) vscode extension.\
Generate a Gemini API key and write it as `GEMINI_API_KEY` in a `.env` file. Eg :
```sh
GEMINI_API_KEY="my_api_key"
```

Then :

```sh
cd Agent_Smith
code .
```

Press F5 to run project.\
A localhost page should open with the Teams sandbox environement.

