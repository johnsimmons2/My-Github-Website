<!-- 
  Grabs the skills from the skills json file
-->

<template>
  <div class="main-container">
    <h1 class="skill-header">Related Technologies</h1>
    <div class="skills-container">
      <div v-if="!loaded">
        Hi there! I'm still fetching this data. Please wait while I load.
      </div>
      <div v-else v-for="(skill, id) in skills" :key="id" ref=skills>
        <div
          class="skills-obj" :tag="'skill-' + id"
          :style="{ 'background-image': 'url(' + getImgUrl(skill.name) + ')' }"
          @mousedown="setActive(id)"
          @mouseleave="setActive(-1)"
        >
          <div class="skill-description" :style="getLeft(id)" v-if="activeId === id" @mouseover.stop>
            {{ skill.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Skills',

  data() {
    return {
      skills: {},

      loaded: {
        default: false,
        type: Boolean,
      },

      activeId: {
        default: -1,
        type: Boolean,
      },

      firstBoxClick: {
        default: false,
        type: Boolean,
      },

      windowWidth: {
        default: 0,
        type: Number,
      }
    };
  },

  methods: {
    getSkills() {
      this.$http
        .get('skills.json')
        .then(function(data) {
          this.skills = data.body['skills'];
          this.loaded = true;
          console.log(this.skills);
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    getImgUrl(name) {
      return '/assets/' + name.replace(/[\s\\.]/, '').toLowerCase() + '.png';
    },

    setActive(id) {
      if (this.activeId === id) {
        this.activeId = -1;
      } else {
        this.activeId = id;
        if (this.firstBoxClick === false && this.activeId !== -1) {
          this.$root.$alertify.warning('Click again or move the cursor to close the box.');
          this.firstBoxClick = true;
        }
      }
    },

    getLeft(id) {
      // Calculate CSS rem to px, plus an adjustment for the padding of the div.
      let overlap = this.$refs.skills[id].getBoundingClientRect().left + 28 * parseFloat(getComputedStyle(document.documentElement).fontSize);
      // Default to 10px left for aesthetic.
      let adjustment = 10;
      if (overlap >= this.windowWidth) {
        // Get the inverse of the overlap difference
        adjustment = (overlap - this.windowWidth) * -1;
      }
      let result = "left: " + adjustment + "px;";
      return result;
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    }
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  mounted: function() {
    this.activeId = -1;
    this.firstBoxClick = false;
    this.windowWidth = window.innerWidth;
    this.loaded = false;
    this.getSkills();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
};

</script>

<style scoped>
.skill-description {
  background-color: var(--js-primary-soft);
  color: var(--js-white);
  font-weight: 500;
  border-radius: 0px 5px 5px 5px;
  position: absolute;
  height: auto;
  width: 20rem;
  box-shadow: 5px 7px 7px rgba(0, 0, 0, 0.6);
  padding: 12px;
  margin-right: auto;
  user-select: none;
}

.main-container {
  display: grid;
  grid-template-columns: 2fr 5fr 1fr;
  justify-items: center;
  background-color: var(--js-primary-soft);
}

.skill-header {
  text-align: center;
  grid-row: span 1;
  color: var(--js-white);

  margin: auto;
}

.skills-container {
  grid-row: span 2;
  margin: auto;
  width: 100%;
  background-color: var(--js-primary);
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  justify-items: center;
  padding: 50px;
  border-radius: 4px;
  box-shadow: 5px 7px 7px rgba(0, 0, 0, 0.6);
}

.skills-obj {
  background-color: var(--js-white);
  background-size: cover;
  justify-self: center;
  border-radius: 4px;
  padding: 12px;
  transition: 180ms;
  width: 140px;
  height: 140px;
}

.skills-obj:hover {
  transform: scale(1.05);
  cursor: pointer;
  box-shadow: 5px 7px 7px rgba(0, 0, 0, 0.6);
}
</style>
