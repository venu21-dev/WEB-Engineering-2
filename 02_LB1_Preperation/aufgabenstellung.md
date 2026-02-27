# LB1 Vorbereitungsauftrag: Rezeptbuch-App

## Ausgangslage

Du baust eine **Rezeptbuch-Anwendung** als Vue 3 Single-Page-Application. Die App ermöglicht es, Rezepte zu durchsuchen, nach Kategorien zu filtern, Favoriten zu verwalten und neue Rezepte zu erfassen.

Es wird **kein Backend** benötigt. Alle Daten leben im Pinia Store. In `src/data/rezepte.js` findest du Startdaten mit 10 Rezepten — schau dir diese Datei an, um die Datenstruktur eines Rezepts zu verstehen.

## Setup

```bash
npm install
npm run dev
```

## Was bereits vorhanden ist

- **`main.js`** — Entry Point, Pinia und Router sind bereits eingebunden
- **`main.css`** — Komplettes Styling mit vordefinierten CSS-Klassen (schau rein, es gibt z.B. `.card`, `.rezept-grid`, `.filter-btn`, `.form-card`, `.detail-section`, etc.)
- **`data/rezepte.js`** — 10 Starter-Rezepte als Array
- **Leere Dateien** für Store, Router, Views und Komponenten — du musst sie befüllen

## Anforderungen

### 1. Pinia Store

Implementiere in `src/stores/rezepte.js` einen Store mit der Composition API (Setup-Syntax), der die gesamte Datenverwaltung übernimmt.

Der Store soll:
- Die Rezepte und die aktuell gewählte Filter-Kategorie als State verwalten
- Berechnete Werte bereitstellen (z.B. gefilterte Rezeptliste, Favoritenliste, Statistiken wie Anzahl und Durchschnittswerte)
- Aktionen anbieten für: Kategorie-Filter setzen/zurücksetzen, Favoriten toggeln, neues Rezept hinzufügen, Rezept löschen

### 2. Routing

Die App soll 4 Seiten haben:

| Seite | Beschreibung |
|-------|-------------|
| **Übersicht** (`/`) | Alle Rezepte mit Filter und Statistik |
| **Rezeptdetail** (`/rezept/:id`) | Einzelansicht eines Rezepts (dynamische Route) |
| **Neues Rezept** (`/neues-rezept`) | Formular zum Erfassen |
| **Favoriten** (`/favoriten`) | Nur favorisierte Rezepte |

Ergänze die Routen im Router und sorge dafür, dass die Navigation in `App.vue` alle Seiten verlinkt.

### 3. Wiederverwendbare Komponenten

Erstelle mindestens zwei Komponenten, die über **Props und Events** mit ihren Eltern-Komponenten kommunizieren:

- **RezeptKarte** — Stellt ein einzelnes Rezept als Karte dar. Wird auf der Übersichts- und Favoritenseite wiederverwendet. Soll den Rezeptnamen als Link zur Detailseite enthalten und einen Favorit-Button haben.
- **KategorieFilter** — Zeigt Filter-Buttons für die vorhandenen Kategorien. Hebt die aktive Kategorie hervor.

### 4. Views

**Übersicht:** Zeigt Statistiken (Anzahl Rezepte, Favoriten, Durchschnittszeit), den Kategorie-Filter und darunter alle (gefilterten) Rezepte als Grid. Bei leerer Kategorie eine entsprechende Meldung anzeigen.

**Rezeptdetail:** Liest die ID aus der URL, findet das Rezept im Store und zeigt alle Details an (Zutaten, Anleitung, Meta-Infos). Bietet die Möglichkeit, das Rezept als Favorit zu markieren oder zu löschen. Bei ungültiger ID eine Fehlermeldung.

**Neues Rezept:** Ein Formular mit Two-Way-Binding für alle Felder eines Rezepts. Kategorie und Schwierigkeit als Dropdowns. Zutaten als kommaseparierter Text, der beim Speichern in ein Array umgewandelt wird. Nach dem Speichern Weiterleitung zur Übersicht.

**Favoriten:** Zeigt nur die als Favorit markierten Rezepte. Leerer Zustand mit Hinweis, wenn noch keine Favoriten vorhanden sind.

## Technische Vorgaben

- Nutze die **Composition API** (`<script setup>`) in allen Komponenten
- Der Pinia Store nutzt die **Setup-Syntax** (`defineStore('name', () => { ... })`)
- Das Styling ist in `main.css` vorbereitet — schau dir die verfügbaren Klassen an und nutze sie
- Die Imports in `main.js` sind bereits korrekt konfiguriert

## Erwartetes Ergebnis

Eine funktionierende Rezeptbuch-App, in der du:
- Zwischen 4 Seiten navigieren kannst
- Rezepte nach Kategorie filtern kannst
- Rezepte als Favorit markieren und wieder entfernen kannst
- Neue Rezepte über ein Formular hinzufügen kannst
- Einzelne Rezepte auf einer Detailseite betrachten und löschen kannst