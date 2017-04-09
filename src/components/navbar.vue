<template>
<div class="uk-navbar-container" v-cloak>
  <nav class="uk-navbar">
    <div class="uk-navbar-left">
      <router-link to="/" class="uk-logo uk-navbar-item">PortfolioUno</router-link>
    </div>
    <div class="uk-navbar-right">
      <ul class="uk-navbar-nav">
        <li class="uk-active">
          <router-link to="/blog" class="uk-navbar-item link animated-underline">Blog</router-link>
        </li>
        <li class="uk-active">
          <router-link to="/projects" class="uk-navbar-item link animated-underline">Projects</router-link>
        </li>
        <li class="uk-active">
          <router-link to="/resume" class="uk-navbar-item link animated-underline">Resumé</router-link>
        </li>
        <li class="uk-active">
          <router-link to="/contact" class="uk-navbar-item link animated-underline">Contact</router-link>
        </li>
      </ul>
    </div>
  </nav>
</div>
</template>
