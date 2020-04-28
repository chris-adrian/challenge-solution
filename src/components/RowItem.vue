<template>
    <router-link class="mail-link" :to="{ path: '/'+data.id}">
        <div :class="'row item '+this.isClipped()">
            <div class="col-sm-12 col-md-3 from">
                <span :class="{ active : sort == 'from' }">{{ data.from }}</span>
            </div>
            <div class="col-sm-12 col-md-3 to">
                <span :class="{ active : sort == 'to' }" >{{ data.to }}</span><span v-if="data.replies" class="badge badge-secondary">+{{ data.replies }}</span>
            </div>
            <div class="col-sm-12 col-md-3 subject">
                <span :class="{ active : sort == 'subject' }">{{ data.subject }}</span>
                <svg class="icon clip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.93083 15">
                    <path d="M6.799,3.6254A2.30522,2.30522,0,1,0,3.56718,6.85622l4.304,4.304a.5222.5222,0,0,0,.7385-.7385l-4.304-4.304c-.53586-.53586-.87743-1.33808-.23084-1.98466.64553-.64659,1.4488-.304,1.98466.23189L11.032,9.3364c1.90632,1.90841,2.38159,2.78793,1.24615,3.92441-1.149,1.148-2.367.86385-4.20121-.96935L2.367,6.57941C1.1741,5.38653.33845,3.43842,1.90633,1.87159c1.86141-1.86141,3.98708-.03134,4.59293.57555l5.11038,5.11142a.5222.5222,0,0,0,.7385-.7385L7.23776,1.70864C5.18625-.34288,2.86-.56223,1.16678,1.13308c-1.711,1.71-1.5261,4.196.4617,6.18484l5.711,5.711C7.96726,13.6567,9.31161,15,10.85756,15a3.01214,3.01214,0,0,0,2.16014-1.00173c2.07554-2.07658.15564-3.99857-1.24616-5.40141Z"/>
                </svg>
            </div>
            <div class="col-sm-12 col-md-3 date">
                <svg class="icon clip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.93083 15">
                    <path d="M6.799,3.6254A2.30522,2.30522,0,1,0,3.56718,6.85622l4.304,4.304a.5222.5222,0,0,0,.7385-.7385l-4.304-4.304c-.53586-.53586-.87743-1.33808-.23084-1.98466.64553-.64659,1.4488-.304,1.98466.23189L11.032,9.3364c1.90632,1.90841,2.38159,2.78793,1.24615,3.92441-1.149,1.148-2.367.86385-4.20121-.96935L2.367,6.57941C1.1741,5.38653.33845,3.43842,1.90633,1.87159c1.86141-1.86141,3.98708-.03134,4.59293.57555l5.11038,5.11142a.5222.5222,0,0,0,.7385-.7385L7.23776,1.70864C5.18625-.34288,2.86-.56223,1.16678,1.13308c-1.711,1.71-1.5261,4.196.4617,6.18484l5.711,5.711C7.96726,13.6567,9.31161,15,10.85756,15a3.01214,3.01214,0,0,0,2.16014-1.00173c2.07554-2.07658.15564-3.99857-1.24616-5.40141Z"/>
                </svg>
                <span :class="{ active : sort == 'date' }">
                    {{ this.setDate() }}
                </span>
                <svg class="icon arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 8">
                    <path class="a" d="M2.9882,3.00782a.29009.29009,0,0,1-.07319.19286L.51262,5.90234a.29054.29054,0,0,1-.43456-.38577l2.23114-2.509L.07806.48856A.29045.29045,0,0,1,.50284.09233l.00978.011L2.91512,2.8152A.28942.28942,0,0,1,2.9882,3.00782Z"/>
                </svg>
            </div>
        </div>
    </router-link>
</template>

<script>
const moment = require('moment');

export default {
    name: 'RowItem',
    props: {
        data: undefined,
        today: Date,
        sort: String
    },
    methods: {
        isClipped() {
            if(this.data.isClipped) {
                return 'clip'
            }
            return ''
        },
        setDate() {
            let date = this.data.date
            
            if(moment(this.today).diff(date, 'days') <= 1) {
                return moment(date).format('HH:MM')
            } else {
                if(moment(this.today).year() == moment(date).year()){
                    return moment(date).format('MMM DD')
                } else {
                    return moment(date).format('YYYY/MM/DD')
                }
            }
        }
    }
}
</script>

<style>
    .item .active {
        font-weight: bold;
    }
</style>