# HACKATON EPITECH TOULOUSE

 

## 4/5 Mars 2025

 

### Projet Assistant Changements

 

#### Ressources

 

##### Documents de référence

 

1. **Donnees changement hackaton Toulouse.xls**

   - Données de changements (1000 changements sur 10 jours)

   - Liste des directions, leurs périodes d’activités et leurs périodes sensibles

   - Liste des applications de chacune des directions et leur sensibilité

 

2. **Hackaton Epith Toulouse Mars .docx**

   - Le présent document, donnant le contexte, et les informations nécessaires au projet

 

#### Un changement ?

 

Un changement est une intervention sur un équipement de production (Serveurs, équipement réseau, stockage, etc.) qui modifie le comportement d’un élément, ou de l’ensemble d’une chaîne de liaison (ex : montée de version d’une application, paramétrage réseau, ajout d’un disque sur une baie de stockage, ajout d’un service sur un serveur, etc.).

 

#### Contexte

 

Dans le cadre de la gestion des Changements, un Chatbot pourrait intervenir en amont dès la saisie du changement, pour challenger et apporter des suggestions sur certains points qui manqueraient d'informations, quand le risque justifie des précisions ou quand le changement semble ne pas respecter les bonnes pratiques (créneau, période, mode opératoire, pré requis, etc.).

 

Dans le cadre de cet hackaton, nous simulerons cette saisie avec un jeu de données correspondant à 10 jours de changements (1000 entrées).

 

#### Objectif

 

- **Création d'un Chatbot** : Développer un chatbot capable de scorer la qualité d’un changement (modèle opératoire, plage d’intervention, continuité de l’activité métier) et de mener une conversation naturelle avec l'utilisateur.

- **Automatisation des Réponses** : Le chatbot doit être capable de poser les bonnes questions pour obtenir toutes les informations nécessaires et s'assurer que la réponse satisfait les critères de contraintes, sinon (si insoluble) répondre que le changement sera soumis à une décision du comité.

- **Expérience Utilisateur** : Assurer que l'interaction avec le chatbot soit intuitive et agréable pour l'utilisateur.

 

L’intéraction se fera en fonction d’un changement issu du jeu de données ou d’une sollicitation utilisateur (voir exemple en chapitre IV).

 

#### Spécifications du livrable

 

- **Critères d’appréciation du livrable**

  - Interface Utilisateur : Une interface conviviale où l'utilisateur peut interagir avec le chatbot.

  - Dialogue Naturel : Utilisation de techniques de traitement du langage naturel (LLM) pour permettre au chatbot de comprendre et de répondre de manière pertinente.

  - Personnalisation : Le chatbot doit pouvoir s'adapter à différents types de domaines métiers.

  - Qualité de l'Interaction : Fluidité et pertinence des échanges entre le chatbot et l'utilisateur.

  - Complétude des Réponses : Capacité du chatbot à collecter toutes les informations nécessaires pour proposer une modification de la saisie du changement.

  - Technologie Utilisée : Utilisation efficace des technologies de LLM.

  - Innovation : Originalité et créativité dans la conception et les fonctionnalités du chatbot.

  - Expérience Utilisateur : Facilité d'utilisation et satisfaction de l'utilisateur final.

 

- **Livrable**

  - Prototype Fonctionnel : Un chatbot opérationnel capable de mener une conversation.

  - Documentation Technique : Description des technologies utilisées, de l'architecture du système et des étapes de développement.

  - Démonstration : Présentation du chatbot en action, montrant comment il interagit avec l'utilisateur et re score la confiance d'un changement.

 

#### Critères d’évaluations

 

- Qualité de l'Interaction : Fluidité et pertinence des échanges entre le chatbot et l'utilisateur.

- Complétude des Réponses : Pertinence de la détection du bot et contre-proposition attendue.

- Technologie Utilisée : Utilisation efficace des technologies de LLM.

- Innovation : Originalité et créativité dans la conception et les fonctionnalités du chatbot.

- Expérience Utilisateur : Facilité d'utilisation et satisfaction de l'utilisateur final.

- Sample de recette : Passage des tests sur des questions types.

- Gestion des ressources : Empreinte carbone, coûts, risques.

- Qualité de la soutenance (Pitch) :

  - Nom & Présentation de l'équipe.

  - Nom du projet.

  - Architecture & choix technique.

  - Démo.

 

#### Questions typiques / Points d’attention sur la qualité/risque d’un changement

 

- Le changement est-il planifié sur une période privilégiée (cf. périodes sensibles, créneaux à éviter) ?

- Le changement découpe-t-il l’opération, ou est-ce fait en une fois sur l’ensemble du système d’information ?

- Le changement est-il transverse (nombreuses applications impactées) ?

- Le changement entraîne-t-il une coupure de service ?

- Un changement avec impact a-t-il l’accompagnement adéquat (validation post changement) ?

- Le changement a-t-il reçu ses approbations ?

- Est-ce la première fois que l’on fait ce changement ?

- Le changement est-il automatisé ou manuel ?

- Le bénéfice du changement vaut-il le risque ?

 

#### Exemples de saisies à l’assistant avec réponse attendue

 

- Peux-tu me valider que le changement xxx est valide ?

  - Non il n’est pas valide, je pense qu’il faudrait le décaler au xx/xx xxhxx au vu de la période sensible du métier xxx, etc.

- Peux-tu vérifier quel(s) changement(s) entreraient en contention avec mon changement xxx ?

  - Attention le changement xxx est transverse et pourrait entrer en contention avec votre changement xxx.

- Peux-tu me proposer un créneau de planification de mon changement à destination du métier xxx sur l’application xxx ?

  - L’application xxx pourrait être proposée au plus tôt le xx/xx xxhxx, afin de ne pas rentrer en contention avec la période sensible.

- Peux-tu me donner un score de confiance sur le changement xxx ?

  - Le score de confiance du changement xxx est de xx% pour les raisons suivantes :

    - L’impact utilisateur n’est pas négligeable.

    - Le temps de mise en œuvre est long, et pourrait déborder sur l’activité métier en cas de souci.

    - Le changement n’a pas été approuvé.

 

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
  
