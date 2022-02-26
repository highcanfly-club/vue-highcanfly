# HighCanFly site web (activement basé sur Vue Notus) <a href="https://twitter.com/HighCanFlyClub" target="_blank">![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&logo=twitter)</a>

![version](https://img.shields.io/badge/version-1.0.1-blue.svg) ![license](https://img.shields.io/badge/license-MIT-blue.svg) <a href="https://github.com/eltorio/vue-highcanfly/issues?q=is%3Aopen+is%3Aissue" target="_blank">![GitHub issues open](https://img.shields.io/github/issues/eltorio/vue-highcanfly.svg)</a> <a href="https://github.com/eltorio/vue-highcanfly/issues?q=is%3Aissue+is%3Aclosed" target="_blank">![GitHub issues closed](https://img.shields.io/github/issues-closed-raw/eltorio/vue-highcanfly.svg)</a>
 <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Licence Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />Ce(tte) œuvre est mise à disposition selon les termes de la <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Licence Creative Commons Attribution -  Partage dans les Mêmes Conditions 4.0 International</a>.

![Vue Notus](https://repository-images.githubusercontent.com/448899125/ce3dc56f-2f1e-49dc-83d3-c6297308bf46?raw=true)

### <a href="https://www.highcanfly.club">High Can Fly - club de parapente du nord</a>

On vole aussi dans le nord de la France… 
Marcher et Voler, voilà ce qui nous ressemble. 
Vous êtes un pilote autonome, en progression ou débutant; partagez notre passion du vol libre.

### Code source de notre site web

Utilisation du code source : le code de notre site est diffusé sous licence MIT avec une clause d'attribution. C'est à dire que si vous réutilisez du code vous devez en citer l'auteur… L'auteur c'est moi !
Par contre l'ensemble des images est diffusé sous licence CC-EY-SA<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Licence Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/80x15.png" /></a><br />Ce travail est mis à disposition selon les termes de la <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Licence Creative Commons Attribution -  Partage dans les Mêmes Conditions 4.0 International</a>.

### Pages actives directement

- [/src/views/ViewLanding.vue](https://www.highcanfly.club/)
  - [code](/src/views/ViewLanding.vue)
  - [code formulaire](/src/components/Forms/EmailForm.vue)
  - [code hCaptcha](src/components/hCaptcha/hcaptcha.vue) et [code serveur](/functions/sendemail.js)
- [/src/views/ViewAbout.vue](https://www.highcanfly.club/about)
  - [code](/src/views/ViewAbout.vue)
- [/src/views/ViewBlog.vue](https://www.highcanfly.club/blog)
  - [code](/src/views/ViewBlog.vue)
- [/src/views/SitesDePratique.vue](https://www.highcanfly.club/map-site-de-pratique)
  - [code](/src/views/SitesDePratique.vue)
  - [code carte](/src/components/Maps/OLMapSitesDePratique.vue)
- [/src/views/ViewPolicy.vue](https://www.highcanfly.club/policy)
  - [code](/src/views/ViewPolicy.vue)
- [/src/views/ViewMeteo.vue](https://www.highcanfly.club/meteo)
  - [code](/src/views/ViewMeteo.vue)

### Bugs

Si vous constatez un problème merci d'ouvrir une "issue" en précisant : 

- le navigateur
- sa version
- la taille approximative de l'écran (ex 1000x600)
- Sur mobile le modèle et l'orientation (ex Apple iPhone 8SE portrait)
- Bien sûr le bug ! 

### [Structured content powered by Sanity.io](https://sanity.io)

![Structured content powered by Sanity.io](https://cdn.sanity.io/images/3do82whm/next/51af00784c5addcf63ae7f0c416756acca7e63ac-353x71.svg?dl=sanity-logo.svg)
The news are structured and stored and structured by Sanity.io .
We use the Sanity client v3 and the GROQ query language.

### Our theme : Vue Notus

<b>A beautiful UI Kit and Admin for Tailwind CSS and VueJS.</b>
Start your development with a Free Tailwind CSS and VueJS UI Kit and Admin. Let Vue Notus amaze you with its cool features and build tools and get your project to a whole new level.

Vue Notus is Free and Open Source. It features multiple HTML and VueJS elements and it comes with dynamic components for VueJS.

It is based on [Tailwind Starter Kit](https://www.creative-tim.com/learning-lab/tailwind-starter-kit/presentation?ref=vn-github-readme) by Creative Tim, and it is build with both presentation pages, and pages for an admin dashboard.

Speed up your web development with a beautiful product made by <a href="https://creative-tim.com/" target="_blank">Creative Tim </a>.
If you like bright and fresh colors, you will love this Free Tailwind CSS Template! It features a huge number of components that can help you create amazing websites.

### Get Started

- Install NodeJS **LTS** version from <a href="https://nodejs.org/en/?ref=creativetim">NodeJs Official Page</a>
- Download the product on this page
- Unzip the downloaded file to a folder in your computer
- Open Terminal
- Go to your file project (where you’ve unzipped the product)
- (If you are on a linux based terminal) Simply run `npm run install:clean`
- (If not) Run in terminal `npm install`
- (If not) Run in terminal `npm run build:tailwind` (each time you add a new class, a class that does not exist in `src/assets/styles/tailwind.css`, you will need to run this command)
- (If not) Run in terminal `npm run serve`
- Navigate to https://localhost:8080
- Check more about [Tailwind CSS](https://tailwindcss.com/?ref=creativetim)

### Pages

If you want to get inspiration or just show something directly to your clients,
you can jump start your development with our pre-built example pages. You will be able
to quickly set up the basic structure for your web project.

Here are all the page from the project:
- [Presentation](https://demos.creative-tim.com/vue-notus/?ref=vn-github-readme)
- Admin Samples
  - [Dashboard](https://demos.creative-tim.com/vue-notus/admin/dashboard?ref=vn-github-readme)
  - [Settings](https://demos.creative-tim.com/vue-notus/admin/settings?ref=vn-github-readme)
  - [Tables](https://demos.creative-tim.com/vue-notus/admin/tables?ref=vn-github-readme)
  - [Maps](https://demos.creative-tim.com/vue-notus/admin/maps?ref=vn-github-readme)
- Authentication Samples
  - [Login](https://demos.creative-tim.com/vue-notus/auth/login?ref=vn-github-readme)
  - [Register](https://demos.creative-tim.com/vue-notus/auth/register?ref=vn-github-readme)
- Presentation Samples
  - [Landing](https://demos.creative-tim.com/vue-notus/landing?ref=vn-github-readme)
  - [Profile](https://demos.creative-tim.com/vue-notus/profile?ref=vn-github-readme)


### Fully Coded Components

Vue Notus is built with over frontend 120 components, giving you the freedom of choosing and combining. All components can take variations in colors, that you can easily modify using Tailwind CSS classes (NOTE: each time you add a new class, a class that does not exist in `src/assets/styles/tailwind.css`, you will need to compile again tailwind).

You will save a lot of time going from prototyping to full-functional code, because all elements are implemented.
This Free Tailwind CSS Template is coming with prebuilt examples, so the development process is seamless, switching from our pages to the real website is very easy to be done.

Every element has multiple states for colors, styles, hover, focus, that you can easily access and use.


### CSS Components

Vue Notus comes with 120 Fully Coded CSS elements, such as [Alerts](https://www.creative-tim.com/learning-lab/tailwind/vue/alerts/notus?ref=vn-github-readme), [Buttons](https://www.creative-tim.com/learning-lab/tailwind/buttons/notus-vuejs?ref=vn-github-readme), [Inputs](https://www.creative-tim.com/learning-lab/tailwind/inputs/notus-vuejs?ref=vn-github-readme) and many more.

Please [check all of them here](https://www.creative-tim.com/learning-lab/tailwind/vue/alerts/notus?ref=vn-github-readme).

### VueJS Components

We also feature the following 18 dynamic components:
- [Alerts](https://www.creative-tim.com/learning-lab/tailwind/vue/alerts/notus?tws=vtw-github-readme)
- [Popper for Menus](https://www.creative-tim.com/learning-lab/tailwind/vue/dropdowns/notus?tws=vtw-github-readme)
- [Menus](https://www.creative-tim.com/learning-lab/tailwind/vue/menus/notus?ref=vn-github-readme)
- [Modals](https://www.creative-tim.com/learning-lab/tailwind/vue/modals/notus?ref=vn-github-readme)
- [Navbars](https://www.creative-tim.com/learning-lab/tailwind/vue/navbar/notus?ref=vn-github-readme)
- [Popper for popover content](https://www.creative-tim.com/learning-lab/tailwind/vue/popovers/notus?ref=vn-github-readme)
- [Tabs](https://www.creative-tim.com/learning-lab/tailwind/vue/tabs/notus?ref=vn-github-readme)
- [Popper for tooltips content](https://www.creative-tim.com/learning-lab/tailwind/vue/tooltips/notus?ref=vn-github-readme)


## Table of Contents

* [Versions](#versions)
* [Documentation](#documentation)
* [Quick Start](#quick-start)
* [Files and folders](#files-and-folders)
* [Browser Support](#browser-support)
* [Reporting Issues](#reporting-issues)
* [Licensing](#licensing)
* [Useful Links](#useful-links)
* [Resources](#resources)

## Versions

[<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/angular.jpg?raw=true" width="60" height="60" />](https://www.creative-tim.com/product/notus-angular?ref=vn-github-readme)[<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/js.png?raw=true" width="60" height="60" />](https://www.creative-tim.com/product/notus-js?ref=vn-github-readme)[<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/nextjs.jpg?raw=true" width="60" height="60" />](https://www.creative-tim.com/product/notus-nextjs?ref=vn-github-readme)[<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/react.jpg?raw=true" width="60" height="60" />](https://www.creative-tim.com/product/notus-react?ref=vn-github-readme)[<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/svelte.jpg?raw=true" width="60" height="60" />](https://www.creative-tim.com/product/notus-svelte?ref=vn-github-readme)[<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/vue.jpg?raw=true" width="60" height="60" />](https://www.creative-tim.com/product/vue-notus?ref=vn-github-readme)


| Angular | JavaScript / HTML | NextJS | React | Svelte | VueJS |
| :---: | :---: | :---: | :---: | :---: | :---: |
| [![Notus Angular](https://github.com/creativetimofficial/public-assets/blob/master/notus-angular/notus-angular.jpg?raw=true)](https://www.creative-tim.com/product/notus-angular?ref=vn-github-readme)  | [![Notus JS](https://github.com/creativetimofficial/public-assets/blob/master/notus-js/notus-js.jpg?raw=true)](https://www.creative-tim.com/product/notus-js?ref=vn-github-readme)  | [![Notus NextJS](https://github.com/creativetimofficial/public-assets/blob/master/notus-nextjs/notus-nextjs.jpg?raw=true)](https://www.creative-tim.com/product/notus-nextjs?ref=vn-github-readme)  | [![Notus React](https://github.com/creativetimofficial/public-assets/blob/master/notus-react/notus-react.jpg?raw=true)](https://www.creative-tim.com/product/notus-react?ref=vn-github-readme)  | [![Notus Svelte](https://github.com/creativetimofficial/public-assets/blob/master/notus-svelte/notus-svelte.jpg?raw=true)](https://www.creative-tim.com/product/notus-svelte?ref=vn-github-readme)  | [![Vue Notus](https://github.com/creativetimofficial/public-assets/blob/master/vue-notus/vue-notus.jpg?raw=true)](https://www.creative-tim.com/product/vue-notus?ref=vn-github-readme)

## Documentation
The documentation for the Vue Notus is hosted at our <a href="https://www.creative-tim.com/learning-lab/tailwind/vue/overview/notus?ref=vn-readme" target="_blank">website</a>.

## Quick start

- <a href="https://www.creative-tim.com/product/vue-notus?ref=vn-github-readme" target="_blank">Download from Creative Tim</a>.
- <a href="https://github.com/eltorio/vue-highcanfly" target="_blank">Check it on Github</a>.

## Files and Folder

This is the project structure that you will get upon the download:
```
vue-notus
.
├── CHANGELOG.md
├── ISSUE_TEMPLATE.md
├── LICENSE.md
├── README.md
├── babel.config.js
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── img
│   │   │   ├── github.svg
│   │   │   └── google.svg
│   │   └── styles
│   │       ├── index.css
│   │       └── tailwind.css
│   ├── components
│   │   ├── Cards
│   │   │   ├── CardBarChart.vue
│   │   │   ├── CardLineChart.vue
│   │   │   ├── CardPageVisits.vue
│   │   │   ├── CardProfile.vue
│   │   │   ├── CardSettings.vue
│   │   │   ├── CardSocialTraffic.vue
│   │   │   ├── CardStats.vue
│   │   │   └── CardTable.vue
│   │   ├── Dropdowns
│   │   │   ├── IndexDropdown.vue
│   │   │   ├── NotificationDropdown.vue
│   │   │   ├── PagesDropdown.vue
│   │   │   ├── TableDropdown.vue
│   │   │   └── UserDropdown.vue
│   │   ├── Footers
│   │   │   ├── Footer.vue
│   │   │   ├── FooterAdmin.vue
│   │   │   └── FooterSmall.vue
│   │   ├── Headers
│   │   │   └── HeaderStats.vue
│   │   ├── Maps
│   │   │   └── MapExample.vue
│   │   ├── Navbars
│   │   │   ├── AdminNavbar.vue
│   │   │   ├── AuthNavbar.vue
│   │   │   └── IndexNavbar.vue
│   │   └── Sidebar
│   │       └── Sidebar.vue
│   ├── layouts
│   │   ├── Admin.vue
│   │   └── Auth.vue
│   ├── main.js
│   └── views
│       ├── Index.vue
│       ├── Landing.vue
│       ├── Profile.vue
│       ├── admin
│       │   ├── Dashboard.vue
│       │   ├── Maps.vue
│       │   ├── Settings.vue
│       │   └── Tables.vue
│       └── auth
│           ├── Login.vue
│           └── Register.vue
├── tailwind.config.js
└── vue.config.js
```

## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

| Chrome | Firefox | Edge | Safari | Opera |
|:---:|:---:|:---:|:---:|:---:|
| <img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/chrome-logo.png?raw=true" width="64" height="64"> | <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/firefox-logo.png" width="64" height="64"> | <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/edge-logo.png" width="64" height="64"> | <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/safari-logo.png" width="64" height="64"> | <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/opera-logo.png" width="64" height="64"> |

## Reporting Issues

We use GitHub Issues as the official bug tracker for the Vue Notus. Here are some advices for our users that want to report an issue:

1. Make sure that you are using the latest version of the Vue Notus. Check the CHANGELOG from your dashboard on our <a href="https://www.creative-tim.com/?ref=vn-readme" target="_blank">website</a>.
2. Providing us reproducible steps for the issue will shorten the time it takes for it to be fixed.
3. Some issues may be browser specific, so specifying in what browser you encountered the issue might help.

## Licensing

- Copyright 2021 <a href="https://www.creative-tim.com/?ref=vn-readme" target="_blank">Creative Tim</a>

- Licensed under <a href="https://github.com/eltorio/vue-highcanfly/blob/main/LICENSE.md" target="_blank">MIT</a>

## Useful Links

- <a href="https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w" target="_blank">Tutorials</a>
- <a href="https://www.creative-tim.com/affiliates/new?ref=vn-readme" target="_blank">Affiliate Program</a> (earn money)
- <a href="http://blog.creative-tim.com/?ref=vn-readme" target="_blank">Blog Creative Tim</a>
- <a href="https://www.creative-tim.com/templates/free?ref=vn-readme" target="_blank">Free Products</a> from Creative Tim
- <a href="https://www.creative-tim.com/templates/premium?ref=vn-readme" target="_blank">Premium Products</a> from Creative Tim
- <a href="https://www.creative-tim.com/templates/react?ref=vn-readme" target="_blank">React Products</a> from Creative Tim
- <a href="https://www.creative-tim.com/templates/angular?ref=vn-readme" target="_blank">Angular Products</a> from Creative Tim
- <a href="https://www.creative-tim.com/templates/vuejs?ref=vn-readme" target="_blank">VueJS Products</a> from Creative Tim
- <a href="https://www.creative-tim.com/templates?ref=vn-readme" target="_blank">More products</a> from Creative Tim
- Check our Bundles <a href="https://www.creative-tim.com/bundles?ref=vn-readme" target="_blank">here</a>
- Check our awesome builder <a href="https://www.creative-tim.com/builder/argon?ref=vn-readme" target="_blank">here</a>
- Check Tailwind Starter Kit, the project behind this product <a href="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/presentation?ref=vn-readme" target="_blank">here</a>

### Social Media

Twitter: <a href="https://twitter.com/CreativeTim" target="_blank">https://twitter.com/CreativeTim</a>

Facebook: <a href="https://www.facebook.com/CreativeTim" target="_blank">https://www.facebook.com/CreativeTim</a>

Dribbble: <a href="https://dribbble.com/creativetim" target="_blank">https://dribbble.com/creativetim</a>

Instagram: <a href="https://www.instagram.com/creativetimofficial/" target="_blank">https://www.instagram.com/creativetimofficial/</a>


## Resources
- Demo: <a href="https://demos.creative-tim.com/vue-notus/?ref=vn-readme" target="_blank">https://demos.creative-tim.com/vue-notus/?ref=vn-readme</a>
- Download Page: <a href="https://www.creative-tim.com/product/vue-notus?ref=vn-github-readme" target="_blank">https://www.creative-tim.com/product/vue-notus</a>
- Documentation: <a href="https://www.creative-tim.com/learning-lab/tailwind/vue/overview/notus?ref=vn-readme" target="_blank">https://www.creative-tim.com/learning-lab/tailwind/vue/overview/notus</a>
- License Agreement: <a href="https://www.creative-tim.com/license?ref=vn-readme" target="_blank">https://www.creative-tim.com/license?ref=vn-readme</a>
- Support: <a href="https://www.creative-tim.com/contact-us?ref=vn-readme" target="_blank">https://www.creative-tim.com/contact-us?ref=vn-readme</a>
- Issues: <a href="https://github.com/eltorio/vue-highcanfly/issues" target="_blank">Github Issues Page</a>
