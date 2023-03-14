<template>
  <div id="app">
    <header-component />
    <!-- Title Section -->
    <welcome-component />
    <!-- Title Section -->
    <bio-component />

    <div class="background-1">
      <div style="top:36%; position: relative;">
        <h1>My Related Skillset</h1>
      </div>
    </div>

    <skills-component />
    <hr/>
    <jobs-component />

    <div class="background-2">
      <div style="top:36%; position: relative; z-index: 1;">
        <h1>Contact Me</h1>
      </div>
    </div>

    <div class="contact-me">
      Follow the links in the header to my email, linkedin, and github. My cell phone number
      and professional references are available on request. This website is still under active construction.
      <div class="contact-box">
        <div>
          <a href="mailto:jsim247@gmail.com">Gmail</a>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/jdsimmons1/">LinkedIn</a>
        </div>
        <div>
          <a href="https://github.com/johnsimmons2">Github</a>
        </div>
      </div>
    </div>
    <hr/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Welcome from './components/Welcome.vue';
import Bio from './components/Bio.vue';
import Skills from './components/Skills.vue';
import Jobs from './components/Jobs.vue';
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueAlertify from 'vue-alertify';

Vue.use(VueResource);
Vue.use(VueAlertify);

export default {
  name: 'App',
  components: {
    'header-component': Header,
    'welcome-component': Welcome,
    'bio-component': Bio,
    'skills-component': Skills,
    'jobs-component': Jobs,
  },
};
</script>

<style scoped>
hr {
    color: var(--js-primary);
    background-color: var(--js-primary);
}

.contact-box {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

a {
  color: rgb(201, 201, 255);
}

.contact-me {
  border-radius: 4px;
  background-color: var(--js-primary);
  box-shadow: 5px 7px 7px rgba(0, 0, 0, 0.6);
  color: var(--js-white);
  width: 70%;
  margin: 30px auto;
  padding: 20px;
  text-align: center;
}

h1,
h2 {
  margin: auto;
  color: var(--js-white);
  font-weight: bolder;
  text-align: center;
  text-shadow: 2px 2px black;
  animation: on-awake 0.4s ease-out;
}

.background-1 {
  background-image: url('/assets/technology.jpg');
  background-color: var(--js-primary);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  clip-path: polygon(0 0, 100% 0, 100% 96%, 0 93%);
  margin-top: -32px;
  width: 100%;
  height: 30rem;
}

.background-2 {
  background-image: url('/assets/galaxy.jpg');
  background-color: var(--js-primary);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  border-top: solid 32px var(--js-primary);
  border-bottom: solid 32px var(--js-primary);
  margin-top: 24px;
  width: 100%;
  height: 10rem;
}
</style>
