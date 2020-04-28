<template>
  <div class="container mail-content">
      <div class="row">
          <div class="col-md-12 header">
              <router-link to="/" class="prev">
                <svg class="icon arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 8">
                    <path class="a" d="M2.9882,3.00782a.29009.29009,0,0,1-.07319.19286L.51262,5.90234a.29054.29054,0,0,1-.43456-.38577l2.23114-2.509L.07806.48856A.29045.29045,0,0,1,.50284.09233l.00978.011L2.91512,2.8152A.28942.28942,0,0,1,2.9882,3.00782Z"/>
                </svg>
                <svg class="icon arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 8">
                    <path class="a" d="M2.9882,3.00782a.29009.29009,0,0,1-.07319.19286L.51262,5.90234a.29054.29054,0,0,1-.43456-.38577l2.23114-2.509L.07806.48856A.29045.29045,0,0,1,.50284.09233l.00978.011L2.91512,2.8152A.28942.28942,0,0,1,2.9882,3.00782Z"/>
                </svg>
              </router-link>
              <span v-if="mail.isClipped" role="button" @click="noFunction()">
                  <svg width="18px" class="icon clip-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.93083 15">
                    <path class="a" d="M6.799,3.6254A2.30522,2.30522,0,1,0,3.56718,6.85622l4.304,4.304a.5222.5222,0,0,0,.7385-.7385l-4.304-4.304c-.53586-.53586-.87743-1.33808-.23084-1.98466.64553-.64659,1.4488-.304,1.98466.23189L11.032,9.3364c1.90632,1.90841,2.38159,2.78793,1.24615,3.92441-1.149,1.148-2.367.86385-4.20121-.96935L2.367,6.57941C1.1741,5.38653.33845,3.43842,1.90633,1.87159c1.86141-1.86141,3.98708-.03134,4.59293.57555l5.11038,5.11142a.5222.5222,0,0,0,.7385-.7385L7.23776,1.70864C5.18625-.34288,2.86-.56223,1.16678,1.13308c-1.711,1.71-1.5261,4.196.4617,6.18484l5.711,5.711C7.96726,13.6567,9.31161,15,10.85756,15a3.01214,3.01214,0,0,0,2.16014-1.00173c2.07554-2.07658.15564-3.99857-1.24616-5.40141Z"/>
                </svg>
              </span>
              <span>...</span>
              <h2><span v-if="mail.replies">Re:&nbsp;</span>{{ mail.subject }}</h2>
          </div>
      </div>
      <div v-if="mail.replies" class="row">
          <div v-for="i in mail.replies" class="col-md-12 replies" :key="i">
              <div class="content-wrap">
                  <h3>
                    <div class="img-wrap">
                        <img src="../assets/logo.png" />
                    </div>
                    <span>MAIL ARCHIVER</span>
                  </h3>
                  <p>
                      {{ placeHolder | truncate(100, null)}}
                  </p>
              </div>
          </div>
      </div>
      <div class="row">
            <div class="col-md-12 body">
                <div class="content-wrap">
                    <h3>
                        <div class="img-wrap">
                            <img src="../assets/logo.png" />
                        </div>
                        <span>MAIL ARCHIVER&nbsp;<small>&lt;{{ mail.from }}&gt;</small></span>
                        <span>to&nbsp;:&nbsp;&lt;{{ mail.to }}&gt;</span>
                    </h3>
                    <p> 
                        {{ mail.body }}
                    </p>
                    <div class="navs">
                        <a href="#" class="btn" @click="noFunction()">
                            <svg class="icon" width="30px" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 14 10">
                                <path class="a" d="M0,0V7.20007H11.35144V0ZM9.90466.80005,5.67542,4.34863,1.44617.80005ZM.80005,6.4V1.30225L5.41858,5.17773a.39868.39868,0,0,0,.51367,0l4.61914-3.876V6.4Z"/>
                            </svg>
                            Reply
                        </a>
                        <a href="#" class="btn" @click="noFunction()">
                            <svg class="icon" width="30px" xmlns="http://www.w3.org/2000/svg" viewBox="1.5 10 8 8" style="transform: rotate(-90deg);">
                                <path class="a" d="M3.54952,13.76637a.36946.36946,0,0,0,0,.52093l2.13177,2.14285L7.82044,14.291a.36945.36945,0,0,0-.52093-.52093L6.05075,15.01513v-2.7963a.36946.36946,0,0,0-.73892,0v2.80738L4.06307,13.77745A.36946.36946,0,0,0,3.54952,13.76637Z"/>
                            </svg>
                            Forward
                        </a>  
                    </div>
                </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'mail',
    data(){
        return {
            mail: undefined,
            placeHolder: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum cum cupiditate sapiente porro aut voluptatem. Harum non doloribus, quidem ipsa, officia accusantium nobis, perferendis culpa voluptatibus cum unde illum voluptate?'
        }
    },
    components: {},
    methods: {
        loadMail(){
            // Requery email data
            // axios.get(...)
            // .then((res)=> {
            // })
            // .catch((err)=> {
            // });
            let dbRes = require('../assets/js/data.js')
            for(let mail in dbRes.default) {
                if(dbRes.default[mail].id == this.$route.params.id) {
                    this.mail = dbRes.default[mail]
                }
            }
        },
        noFunction(){
            console.log('Feature not available')
        }
    },
    watch: {
      '$route': function() {
        this.loadMail()
      }
    },
    created: function() {
        this.loadMail()
    }
}
</script>

<style>
.mail-content {
    text-align: left;
}
.mail-content .header {
    margin: 10px 0;
    padding: 0;
    color: #616161;
}
.mail-content .header a {
    color: #616161;
    width: 50px;
    white-space: nowrap;
    background-color: #fff;
}
.mail-content .header > span:hover,
.mail-content .header a:hover,
.mail-content .header a:active { 
    color: #0000ff;
}
.mail-content .header a,
.mail-content .header > span {
    display: inline-block;
    vertical-align: middle;
    font-weight: bold;
}
.mail-content .header > span { 
    margin-left: 10px;
    cursor: pointer;    
}
.mail-content .header .prev {
    text-align: center;
}
.mail-content .header .prev svg{
    width: 10px;
    fill: currentColor;
    transform: scale(-1,1);
}
.mail-content .header h2 {
    font-size: 1.5em;
    margin: 1em 0px;
    margin-left: 50px;
    color: #000;
}
.mail-content .replies,
.mail-content .body {
    padding: 0px;
    overflow: auto;
}
.mail-content .body .content-wrap{
    min-width: 767px;
    margin-bottom: 1em;
}
.mail-content .body h3 {
    font-size: 1.2em;
}
.mail-content .replies h3 {
    margin: 0px;
}
.mail-content .replies h3 img,
.mail-content .body h3 img {
    width: 75%;
    height: auto;
    position: absolute;
    top: -10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    /* border-radius: 10px; */
}
.mail-content .replies h3 .img-wrap,
.mail-content .body h3 .img-wrap {
    width: 50px;
    position: relative;
}
.mail-content .replies h3 .img-wrap,
.mail-content .body h3 .img-wrap,
.mail-content .body h3 span {
    display: inline-block;
    vertical-align: middle;
}
.mail-content .replies h3 .img-wrap + span {
    font-size: 60%;
    font-weight: bold;
}
.mail-content .body h3 .img-wrap + span {
    font-size: 90%;
    font-weight: bold;
}
.mail-content .body h3 .img-wrap + span small,
.mail-content .body h3 span + span { 
    color: #969696;
}
.mail-content .body h3 span + span{
    font-size: 70%;
    margin-left: 50px;
    display: block;
}
.mail-content .replies p {
    margin-bottom: 10px;
    padding: 0 0 10px 50px;
    border-bottom: solid 1px #e9ecef;
    font-size: 90%;
}
.mail-content .body p {
    padding: 1.5em 0 1.5em 50px;
    border-bottom: solid 1px #e9ecef;
}
.mail-content .body .navs {
    padding-bottom: 10px;
    margin-left: 50px;
}
.mail-content .body .navs a {
    border: solid 1px #e9ecef;
    height: 40px;
}
.mail-content .body .navs a:not(:first-child) {
    margin-left: 15px;
}
</style>