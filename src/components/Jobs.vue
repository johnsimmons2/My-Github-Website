<!-- 
  Grabs the skills from the skills json file
-->

<template>
    <div class="main-container">
      <h1 class="job-header">Employment History</h1>
      <div class="jobs-container">
        <div v-if="!loaded">
          Hi there! I'm still fetching this data. Please wait while I load.
        </div>
        <div v-else v-for="(job, id) in jobs" :key="id" ref=jobs>
          <div
            class="jobs-obj" :tag="'job-' + id"
            :style="{ 'background-image': 'url(' + getImgUrl(job.img) + ')' }"
            @mousedown="setActive(id)"
            @mouseleave="setActive(-1)"
          >
            <div class="job-description" :style="getLeft(id)" v-if="activeId === id" @mouseover.stop>
                <div>
                    <b><u>{{ job.name }}</u></b>
                </div>
                <div v-for="(desc, id2) in job.positions" :key="id2" ref="posdesc">
                    - {{ desc }}
                </div>
                <div>
                    <i>From {{ job.duration }}</i>
                </div>
                <hr/>
                <div v-for="(desc, id2) in job.descriptions" :key="id2" ref="jobdesc">
                    {{ desc }}
                    <hr>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Jobs',
  
    data() {
      return {
        jobs: {},
  
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
      getJobs() {
        this.$http
          .get('skills.json')
          .then(function(data) {
            this.jobs = data.body['jobs'].sort((a,b) => {
                if (a.order < b.order){
                    return -1
                }
            });
            this.loaded = true;
            console.log(this.jobs);
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
        let overlap = this.$refs.jobs[id].getBoundingClientRect().left + 28 * parseFloat(getComputedStyle(document.documentElement).fontSize);
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
      this.getJobs();
      this.$nextTick(() => {
        window.addEventListener('resize', this.onResize);
      })
    },
  };
  
  </script>
  
  <style scoped>
  .job-description {
    background-color: var(--js-primary-soft);
    color: var(--js-white);
    font-weight: 500;
    border-radius: 0px 5px 5px 5px;
    position: absolute;
    z-index: -1;
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
  
  .job-header {
    text-align: center;
    grid-row: span 1;
    color: var(--js-white);
    margin: auto;
  }
  
  .jobs-container {
    grid-row: span 2;
    margin: auto;
    width: 100%;
    background-color: var(--js-primary);
    display: grid;
    z-index: 100;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    justify-items: center;
    padding: 50px;
    border-radius: 4px;
    box-shadow: 5px 7px 7px rgba(0, 0, 0, 0.6);
  }
  
  .jobs-obj {
    background-color: var(--js-white);
    background-size: contain;
    background-position: 50%;
    background-repeat: no-repeat;
    justify-self: center;
    border-radius: 4px;
    padding: 12px;
    transition: 180ms;
    width: 140px;
    height: 140px;
  }
  
  .jobs-obj:hover {
    transform: scale(1.05);
    cursor: pointer;
    box-shadow: 5px 7px 7px rgba(0, 0, 0, 0.6);
  }
  </style>
  