<template>
    <div class="container archiver">
      <div class="row">
        <div class="col-md-12 mt-4 mb-2 form-field">
          <v-date-picker 
            :mode="'range'" 
            :max-date="today" 
            :input-props='{
              class: "form-control search-bar",
              name:"date",
              readonly: true
            }'
            v-model="search.date"
            @input="searchDate()"/>  
            <span class="svg-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 40 40">
                <path class="a" d="M17.81684,17.04048,12.86753,12.064a7.33089,7.33089,0,1,0-.79573.79645L17.018,17.83373a.5629.5629,0,1,0,.79885-.79325ZM7.32474,13.47375a6.16023,6.16023,0,0,1-6.16583-6.1546V7.31352a6.16022,6.16022,0,1,1,6.16583,6.16023Z"/>
              </svg>
            </span>
        </div>
      </div>
      <div v-if="!this.$route.params.id" class="row">
        <div class="col-md-12 info-field">
            <p>
              Results : <span><b>{{ search.results.length }}</b>&nbsp;{{ search.results.length > 1 ? 'mails' : 'mail'}}</span>
            </p>
        </div>
      </div>
      <div v-if="!this.$route.params.id" class="row">
        <div class="col-md-12 result-field">
          <div class="container list">
            <div v-if="search.results.length == 0">
              <div class="row">
                <div class="col-md-12">
                  <div class="image-wrapper">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <img alt="Email archiver logo" src="../assets/logo.png">
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="row header">
                <div class="col-3 from">
                  <span :class="this.sortClass('from')" @click="sortBy('from')">From</span>
                </div>
                <div class="col-3 to">
                  <span :class="this.sortClass('to')" @click="sortBy('to')">To</span>
                </div>
                <div class="col-3 subject">
                  <span :class="this.sortClass('subject')" @click="sortBy('subject')">Subject</span>
                </div>
                <div class="col-3 date">
                  <span :class="this.sortClass('date')" @click="sortBy('date')">Date</span>
                </div>
              </div>
              <RowItem v-for="(item, index) in search.results" :key="index" :data="item" :sort="search.currentSort"/>
            </div>
          </div>
        </div>
      </div>
      <Mail v-else />
    </div>
</template>

<script>
import RowItem from '@/components/RowItem'
import Mail from './Mail'
// import Axios from 'axios'
const moment = require('moment');

export default {
  name: 'Home',
  components: {
    RowItem,
    Mail
  },
  data() {
      return {
        dbData: [],
        today: new Date(),
        search: {
          date: {
            start: String,
            end: String
          },
          results: [],
          sortBy: {
            from : false,
            to: false,
            subject: false,
            date: false
          },
          currentSort: ''
        }
      }
  },
  methods: {
    sortClass(type){
      let vm = this
      let sortActive = 'sort'
      let sortReverse = 'reverse'
      let rVal
      if(vm.search.currentSort == type) {
        if(!vm.search.sortBy[type]){
         rVal = sortActive+' '+sortReverse
        } else {
         rVal = sortActive
        }
      } else {
       rVal = ''
      }
      return rVal
    },
    initDate(){
      this.$set(this.search.date, 'start', this.today)
      this.$set(this.search.date, 'end', this.today)
    },
    initData(){
      // Fetch DB data with Axios
      // Axios.get('....')
      // .then((res)=> {
      //   console.log(res)
      // })
      // .catch((err)=> {
      //   console.log(err)
      // });
      let dbRes = require('../assets/js/data.js')
      this.dbData = dbRes.default
    },
    searchDate() {
      let vm = this
      vm.search.results = []
      let list = JSON.parse(JSON.stringify((vm.dbData)))

      for(let item in list) {
        
        let date = list[item].date
        // if(moment(vm.search.date.start).isSame(vm.search.date.end)) {
        //   // Today 
        //   if(moment(date).isSame(vm.search.date.end, 'day')) {
        //     vm.$set(vm.search.results, item, list[item])
        //   }
        // }else
        if(moment(date).isSameOrBefore(vm.search.date.end, 'day') && moment(date).isSameOrAfter(vm.search.date.start, 'day') ){
          // Within
          vm.search.results.push(list[item])
        }
      }
      // Reload home page
      if(vm.$route.params.id) {
        vm.$router.replace('/');
      }
    },
    sortBy(type){  
      let vm = this
      for(let sortType in vm.search.sortBy) {
        if(sortType !== type) {
          vm.$set(vm.search.sortBy, sortType, false)
        }
      }
      vm.search.results.sort(vm.dynamicSort(type))
    },
    dynamicSort(type) {
      let vm = this
      let sortReverse = false
      let byDate = type == 'date' ? true : false
      vm.$set(vm.search, 'currentSort', type)

      if(vm.search.sortBy[type]){
        sortReverse = true
        vm.$set(vm.search.sortBy, type, false)
      } else {
        sortReverse = false
        vm.$set(vm.search.sortBy, type, true)
      }

      return function (a,b) {
        if(byDate) {
          if(sortReverse){
            return moment(a[type]).diff(vm.today) - moment(b[type]).diff(vm.today)
          }else{
            return moment(b[type]).diff(vm.today) - moment(a[type]).diff(vm.today)
          }
        } else {
          if(sortReverse){
            return b[type].localeCompare(a[type])
          }else{
            return a[type].localeCompare(b[type])
          }       
        } 
      }
    }
  },
  created: function() {
    this.initDate()
    this.initData()
  }
}
</script>

<style>
  .mail-link,
  .mail-link:hover {
    color: inherit;
    text-decoration: none;
  }
  .image-wrapper {
    height: 500px;
    height: 50vh;
  }
  .image-wrapper table {
    width: 100%;
    height: 100%;
  }
  .image-wrapper table tr td {
    vertical-align: middle;
  }
  .form-field {
    text-align: left;
  }
  .form-field span,
  .form-field .svg-wrap {
    display: inline-block;
    height: 44px;
    vertical-align: middle;
  }
  .form-field span input,
  .form-field span svg {
    height: 100%;
    width: 100%;
  }
  .form-field .svg-wrap {
    width: 50px;
    border-radius: 0px 5px 5px 0px;
    border-top: solid 1px#ced4da;
    border-right: solid 1px#ced4da;
    border-bottom: solid 1px#ced4da;
    background-color: #f8f9fa;
  }
  .form-field span input{
    background-image: url('../assets/icon_calender.svg');
    background-repeat: no-repeat;
    background-size: 25px 25px;
    padding-left: 50px;
    background-position: 14px 8px;
    box-shadow: inset 0px 0px 2px rgba(0,0,0,0.2);
    border-radius: 5px 0px 0px 5px;
  }
  .form-field span input[readonly] {
    background-color: #fff;
  }
  .info-field span b {
    font-size: 130%;
  }
  .info-field p {
    font-weight: bold;
    text-align: left;
    border-bottom: solid 1px #e9ecef;
    margin: 5px 0px 0px;
    padding-bottom: 10px;
    color: #616161;
  }
  .list .header {
    background-color: #f8f9fa;
    padding: 10px 0px;
    border-top: solid 1px #f1f1f1;
    border-bottom: solid 1px #f1f1f1;
    text-align: left;
  }
  .list .header span { 
    cursor: pointer;
    font-weight: bold;
    position: relative;
    color: #888888;
  }
  .list .header span.sort { 
    color: #000;
    margin-right: 20px;
  } 
  .list .header span:hover {
    text-decoration: underline;
  }
  .list .header .sort::after {
    content: url('../assets/icon_arrow01.svg');
    width: 10px;
    height: auto;
    position: absolute;
    right: -20px;
    bottom: -2px;
  }
  .list .header .sort.reverse::after {
    bottom: -5px;
    transform: scale(1,-1);
  }
  .list .header span,
  .list .item span,
  .list .item svg,
  .list .item .badge {
    cursor: pointer;
    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none; 
    -moz-user-select: none;
    -ms-user-select: none; 
    user-select: none;
  }
  .list .item {
    text-align: left;
    background-color: #fff;
    padding: 12px 0;
  }
  .list .item:hover {
    background-color: #f8f9fa;
  }
  .list .item:active {
    background-color: #f5f5f5;
  }
  .list .item:active span,
  .list .item:active svg { 
    color: #0000ff;
  }
  .list .mail-link:not(:last-child) .item { 
    border-bottom: solid 1px #e9ecef;
  }
  .list .item > div:not(.date) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: inherit;
  }
  .list .item .icon {
    fill: currentColor;
    display: none;
  }
  .list .item .to .badge {
    background-color: #a2a0a0;
    position: absolute;
    right: 0;
    top: 3px;
  }
  .list .item .date .icon { 
    display: none;
  }
  @media screen and (min-width: 768px){ 
    .list .item .to ,
    .list .item .subject {
      padding-right: 30px;
    }
    .list .item.clip .subject .clip-icon {
      position: absolute;
      display: inline-block;
      width: 18px;
      top: 0;
      right: 0;
    }
  }
  @media screen and (max-width: 767px){
    div.info-field {
      padding: 0px;
    }
    div.info-field p { 
      padding-left: 15px;
      padding-right: 15px;
    }
    .row.header > div:not(:last-child) {
      border-right: solid 1px #696969;
    }
    .container.archiver {
      max-width: 100%;
    }
    .container.list {
      max-width: 100%;
      padding-left: 0px;
      padding-right: 0px;
    }
    .list .item .to .badge {
      right: 15px;
    }
    .list .header .col-3 {
      width: auto;
      flex: none;
    }
    .list .item {
      border-bottom: solid 1px#f8f9fa;
      margin-bottom: 5px;
      position: relative;
    }
    .list .item .from,
    .list .item .to { 
      padding-left: 40px;
    }
    .list .item::after {
      content: url('../assets/icon_mail_sp.svg');
      width: 14px;
      height: auto;
      position: absolute;
      top: 20px;
      left: 15px;
    }
    .list .item .subject {
      font-size: 110%;
    }
    .list .item .date {
      position: absolute;
      top: 10px;
      right: 0;
      text-align: right;
      width: auto;
      background-color: inherit;
      border-radius: 5px;
    }
    .list .item.clip .date .icon,
    .list .item .date .icon.arrow-icon {
      display: inline-block;
      vertical-align: middle;
    }
    .list .item .date .icon.arrow-icon {
      width: 8px;
    }
    .list .item.clip .date .icon.clip-icon {
      width: 15px;
      margin-right: 5px;
    }
    .list .item.clip .subject .clip-icon { 
      display: none;
    }
  }
</style>
