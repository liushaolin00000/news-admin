<template>
   <div>
     <router-view></router-view>
     <!-- <div id="main" style="width:750px;height:750px"></div> -->
   </div>
</template>

<script>
// import echarts from 'echarts'
export default {
//   mounted(){
//     // 基于准备好的dom，初始化echarts实例
// var myChart = echarts.init(document.getElementById('main'));
// myChart.setOption({
//     title: {
//         text: 'ECharts 入门示例'
//     },
//     tooltip: {},
//     xAxis: {
//         data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
//     },
//     yAxis: {},
//     series: [{
//         name: '销量',
//         type: 'funnel',
//         data: [5, 20, 36, 10, 10, 20]
//     }]
// });
//   }
}
</script>

<style>
  *{
  margin:0;
  padding:0;
  box-sizing: border-box;
  vertical-align: middle;
}

a{
  color:inherit;
  text-decoration: none;
}

ul,li,ol{
  list-style: none;
}

em,i{
  font-style: normal;
}
</style>