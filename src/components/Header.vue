<template>
  <div class="header-wrapper">
    <h2 class="site-title">
    </h2>
    <div>
      <ul>
        <li><b>Jonathan Simmons</b></li>
        <li><a href="https://www.linkedin.com/in/jdsimmons1/" target="_blank"><img class='logo-image' alt='Linkedin' src='/assets/linkedin.png'/></a></li>
        <li><a href="https://github.com/johnsimmons2" target="_blank"><img class='logo-image' alt='Github' src='/assets/github.png'/></a></li>
        <li><a href="mailto:jsim247@gmail.com"><img class='logo-image' alt='Email me' src='/assets/gmail.png'/></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.logo-image {
  width: 2rem;
  height: 2rem;
}

.site-title {
  margin-left: 20px;
}

.header-wrapper {
  position: fixed;
  color: var(--js-white);
  background-color: var(--js-primary);
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 999;
  box-shadow: 0 5px 5px rgba(0,0,0,0.2);
}

ul {
  margin: 0;
  display: flex;
  flex-direction: row;
  list-style: none;
  padding-right: 10px;
}

li {
  margin: auto;
  font-weight: 500;
  align-self: center;
  padding: 20px;
  transition: all 180ms;
  animation-fill-mode: none;
  animation-play-state: paused;
}

li img {
  background-color: transparent;
  border-radius: 50%;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
}

li:hover {
  transform: scale(1.15);
  animation-play-state: running;
  animation: bounce 0.5s linear 1;
}

@keyframes bounce {
  0% { transform: translateY(0); }
  25% { transform: translateY(-6px) scale(1.05); }
  50% { transform: translateY(0) scale(1.09); }
  63% { transform: translateY(-3px) scale(1.14); }
  75% { transform: translateY(0) scale(1.15); }
  100% { transform: translateY(0) scale(1.15); }
}
</style>
