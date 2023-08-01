# Crée ton bloc-notes

Dans le projet d'aujourd'hui, tu vas recréer l'application **Bloc-Notes** disponible sur tous les appareils. Tu pourras même y accéder en hors-ligne et toujours avoir tes données stockées.

## 1. Introduction

L'une des applications les plus connues au monde est le simple bloc-notes. Disponible sur Windows comme sur Mac, ce dernier peut servir à n'importe quel moment, et pour tout le monde.  
  
Ton objectif, aujourd'hui, sera de créer un bloc-notes. Dans celui-ci, tu pourras écrire en markdown, et ton texte sera affiché en live sous forme de HTML.  
  
Si tu ne sais pas comment écrire en markdown, c'est facile, ne t'en fais pas: suit [ce lien](https://guides.github.com/features/mastering-markdown/).  
  
L'ensemble des notes sera stocké dans le localStorage. Ainsi, tu ne risques aucun souci avec le RGPD.

## 2. L'application

Ton application sera constituée de plusieurs parties.

![](https://i.imgur.com/S5lrsHL.jpg)

Sur la gauche, l'utilisateur aura accès à une barre de navigation. Celle-ci contiendra la liste de tes notes. L'utilisateur pourra y voir un titre et le début du texte (~15 mots). L'utilisateur peut créer une nouvelle note en cliquant sur le bouton du haut.À droite, prenant ~80% de la largeur, l'utilisateur verra le contenu de la note sélectionnée, bien mis en forme en HTML, dans la partie haute.  
  
Dans la partie basse, un champ de texte (input) permettant de définir le nom de la note, ainsi qu'un autre champ (textarea) permettant de modifier le contenu de la note en markdown.

Pour transformer ton markdown en HTML, tu pourras utiliser la lib ["showdown"](https://github.com/showdownjs/showdown). Celle-ci te permet de transformer du markdown en HTML, et inversement. C'est grâce à cela que le markdown sera affiché en HTML et en live, sur la partie du dessus. En cliquant sur "save", l'utilisateur sauvegarde la note. C'est-à-dire que s'il recharge la page, sa note est toujours visible dans la liste à gauche. Il faudra donc sauvegarder les notes dans le localStorage.

L'utilisateur peut changer de note en cliquant sur l'une d'elles dans la liste à gauche. Il peut la modifier à sa guise.

## 3. Rendu attendu

Le rendu attendu est un repo gitHub contenant ton application.

- L'utilisateur peut ajouter une note.
- L'utilisateur peut modifier une note.
- L'utilisateur peut consulter une note.
- L'utilisateur peut basculer entre les notes pour voir celle qui lui plaît.

[OPTIONNEL] Le bouton "sauvegarder" n'existe plus, et les notes sont sauvegardées régulièrement ou à chaque changement dans le texte.

## 4. La démarche à suivre

Ce projet peut se sembler compliqué, j'ai donc décidé de t'assister un petit peu et te guider, jusqu'à ce que tu aies créé une note. Tu seras ensuite mis en autonomie pour la gestion de plusieurs notes. Ne te mets pas la pression. Tu peux avoir les points nécessaires pour réussir l'épreuve si tu arrives à faire une seule note qui est sauvegardée dans le localStorage.

Pour commencer, initialise une application React comme d'habitude.  
  
Ton composant `App` contiendra deux parties pour le moment: `MarkdownInput` et `NoteDisplay`. C'est ce qui constituera la partie de droite de l'application.

Le composant `NoteDisplay` correspondra à la partie du haut, où on verra le texte transposé en HTML.  
  
Le composant `MarkdownInput` correspondra à la partie du bas, avec le `<textarea />` contenant le texte en Markdown et le bouton de sauvegarde.

### 4.1. MarkdownInput

Je t'invite à commencer par le `MarkdownInput`. Nous allons séparer cette phase en 2 actions:

- Mettre en place un **composant contrôlé**
- Appeler une fonction de callback fournie par le parent, qui utilisera la `value` du textarea. Dans un premier temps, celle-ci fera juste un `console.log()` de cette valeur.

Pour mettre en place le composant contrôlé, je t'invite à suivre [ce lien](https://dmitripavlutin.com/controlled-inputs-using-react-hooks/) qui explique bien le principe (sans forcément aller jusqu'au "debouncing", pour le moment).

Pour appeler un callback fourni par le parent, si ce n'est pas encore clair pour toi je t'invite à lire [cette page](https://fr.reactjs.org/docs/faq-functions.html) de la documentation React qui en parle (même si les exemples utilisent des "Class Components").

### 4.2. NoteDisplay

Pour mettre en place le composant `NoteDisplay`, nous allons tout d'abord devoir récupérer la donnée que tu as envoyée au parent (ici, `App`), contenant la valeur du textarea. Nous la passerons ensuite à `NoteDisplay` avec une prop.

Dans `NoteDisplay`, il faudra que tu importes la lib `showdown`, et que tu instancies son convertisseur:

```js
import Showdown from 'showdown';
const converter = new Showdown.Converter();
// ...
```

Pour transformer du Markdown en HTML, il suffira ensuite de faire `converter.makeHtml(markdownValue)`.  
  
Si tu associes le résultat de cette conversion à une variable `content` par exemple, et que tu places cette variable dans une balise `<div>` du JSX, tu verras que dans le navigateur, les balises du HTML elles-mêmes apparaissent, elles ne seront pas interprétées! Pour pouvoir interpréter le HTML et l'insérer dans ton DOM, il va falloir passer cette variable `content` à une prop `dangerouslySetInnerHTML` que React ajoute sur tout élément HTML. Pour t'en servir, tu peux aller [voir cette page](https://fr.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml) de la doc.

À ce niveau-là, normalement, à chaque fois que tu écris du markdown dans ton éditeur, tu devrais le voir interprété en live un peu plus haut dans ta page.

### 4.3. Sauvegarder ce que tu écris dans le localStorage

Pour sauvegarder ce que tu écris, je t'invite à créer un bouton "save" dans ton composant `MarkdownInput`. Au clic sur ce bouton, tu appelleras une fonction `handleSave`, qui utilisera `localStorage.setItem()`, en lui passant un nom (par ex. `blocNote`), et le contenu en markdown (non transformé).

Ensuite, si tu fais un `console.log()` de `localStorage.getItem('blocNote')`, tu devrais voir le contenu "brut" de ton bloc-notes s'afficher dans la console.

Si c'est bien le cas, alors il faudra utiliser ceci pour récupérer ces données, lors du chargement de l'application. Pour cela, tu pourras utiliser une fonction en paramètre de `useState`, qui pourra directement initialiser le state avec ces données. Pourquoi une fonction? Pour éviter que `localStorage.getItem()`, qui est gourmand en ressources machine, ne soit appelée à chaque rendu!

### 4.4. À toi de jouer !

Fort de tous ces conseils, à toi de voir comment tu veux penser la composition de ton application. Souviens-toi juste qu'il n'y a pas de _trop petit_ composant! 😉

## 5. Pour aller plus loin

Si tu souhaites évoluer dans ton coin et que tu n'as pas fini les projets précédents, n'hésite pas à les reprendre et les finir.