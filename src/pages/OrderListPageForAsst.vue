<template>
  <!-- 메인-요청 리스트 시작 -->
  <section class="orderList-section bg-gray-500">
    <div class="h-2 bg-gray-500"></div>
    <!--리스트 search 시작-->
    <div class="flex h-10 orderList-section-search m-2 text-right rounded-md">
      <select ref="selectStepLevelElRef" class="h-full w-1/4 rounded-l-md" id="" @change="onChangeStepLevel">
        <option value="0">진행단계 전체</option>
        <option value="1">요청서 검토중</option>
        <option value="2">장례준비중</option>
        <option value="3">장례진행중</option>
        <option value="4">장례종료(결제대기중)</option>
        <option value="5">결제완료</option>
      </select>
      <select class="h-full w-1/4" id="" @change="onChangeSearchKeywordType($event)">
        <option value="title">제목</option>
        <option value="body">내용</option>
        <option value="funeralHome">장례식장</option>
      </select>
      <input id="searchKeywordElRef" ref="searchKeywordElRef" class="h-full w-full pl-4" type="text" placeholder="검색어 입력" :value="searchKeyword" @keyup.enter="onInput($event)" >
      <button class="w-20 text-white rounded-r-md bg-blue-500" type="button" @click="onClickInput">검색</button>
    </div>
    <!--리스트 search 끝-->
    <!--리스트 grid 시작-->
    <div class="orderList-section-grid grid grid-cols-1 md:grid-cols-3 gap-3 overflow-hidden">
      <!--리스트 grid__body 시작-->
      <div class="mt-6" v-bind:key="order.id" v-for="order in filteredOrders">
      <div class="orderList-section-grid__body p-8 bg-white m-2 border rounded-xl">
        <!--진행단계-->
        <div class="btn-success">
          진행단계: {{returnToString(order.stepLevel)}}
        </div>
        <!--제목-->
        <div class="text-center m-4">
          <router-link :to="'/order/detail?id=' + order.id" class="text-indigo-500 font-bold text-xl md:text-2xl hover:text-gray-700">
            {{ order.title }}
          </router-link>
        </div>
        <!--담당지도사-->
        <h1 class="font-semibold text-gray-900 leading-none text-xl mt-1 mb-3 capitalize break-normal">
          담당지도사: {{order.extra__expertName}}
        </h1>
        <!--의뢰인명-->
        <h1 class="font-semibold text-gray-900 leading-none text-xl mt-1 mb-3 capitalize break-normal">
          의뢰인: {{order.extra__clientName}}
        </h1>
         <!--장례식장-->
        <h1 class="font-semibold text-gray-900 leading-none text-xl mt-1 mb-3 capitalize break-normal">
          장례식장: {{order.funeralHome}}
        </h1>
        <!--예상인원-->
        <div class="max-w-full border mt-2 p-1 pl-2 rounded-md">
          예상인원
          <p class="text-base font-medium tracking-wide text-gray-600 mt-1">
            -  {{ order.head }}
          </p>
        </div>
        <!--종교-->
        <div class="max-w-full border mt-2 p-1 pl-2 rounded-md">
          종교
          <p class="text-base font-medium tracking-wide text-gray-600 mt-1">
            -  {{ order.religion }}
          </p>
        </div>
        <!--장례기간-->
        <div class="max-w-full border mt-2 p-1 pl-2 rounded-md">
          장례기간
          <p class="text-base font-medium tracking-wide text-gray-600 mt-1">
            - 시작일: {{ order.startDate }} / 종료일: {{ order.endDate }}
          </p>
        </div>
        <router-link :to="'/order/detail?id=' + order.id" class="block btn-primary mt-2 h-10 w-full rounded-md">
            상세보기
        </router-link>
        <router-link :to="'/funeral/doApply?relTypeCode=expert&relId=' + " class="block btn-secondary mt-2 h-10 w-full rounded-md">
            지원하기
        </router-link>
        
      </div>
      </div>
      <!--리스트 grid__body 끝-->
    </div>
    <!--리스트 grid 끝-->
  </section>
  <!-- 메인-지도사 리스트 끝 -->

</template>

<script lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance, onMounted, computed, watch } from 'vue'
import { IOrder } from '../types'
import { MainApi } from '../apis'

const searchKeywordElRef = ref<HTMLInputElement>();
const selectStepLevelElRef = ref<HTMLInputElement>();

export default defineComponent({
  name: 'OrderListPageForAsst',

//props 속성은 컴포넌트 간에 데이터를 전달할 수 있는 컴포넌트 통신 방법입니다. 
//props 속성을 기억할 때는 상위 컴포넌트에서 하위 컴포넌트로 내려보내는 데이터 속성으로 기억하면 쉽습니다
  props: {
    globalShare: {
      type: Object,
      required: true
    },
  },

  setup(props){
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;

    const state = reactive({
      orders: [] as IOrder[],
      searchKeyword: '' as string,
      result:'' as string,
      selectStepLevel: 0,
    });

    let searchKeywordType = "title";

    function onInput(event:any){
      state.searchKeyword = event.target.value;
      return state.searchKeyword;
    }

    function onClickInput() {
      if(searchKeywordElRef.value == undefined){
        return;
      }

      state.searchKeyword = searchKeywordElRef.value.value;
      return state.searchKeyword;
    }

    function onChangeSearchKeywordType(event:any){
      searchKeywordType = event.target.value;
      return searchKeywordType;
    };


    function onChangeStepLevel() {

      if(selectStepLevelElRef.value == undefined){
        return;
      }
      state.selectStepLevel = parseInt(selectStepLevelElRef.value?.value);
      return state.selectStepLevel;
    }

    function returnToString(stepLevel:any) {
      let stepLevelToStr = ''; 
      if(stepLevel == 1){
        stepLevelToStr = '요청서 검토중';
      }
      if(stepLevel == 2){
        stepLevelToStr = '외뢰승인(장례준비중)';
      }
      if(stepLevel == 3){
        stepLevelToStr = '장례진행중';
      }
      if(stepLevel == 4){
        stepLevelToStr = '장례종료(결제대기중)';
      }
      if(stepLevel == 5){
        stepLevelToStr = '결제완료';
      }

      return stepLevelToStr;
    }

    //alert("1");
    const filteredOrders = computed(() => {
      //alert("2");
      state.result = state.searchKeyword;

      let filteredOrders = state.orders;
      
      //filteredOrders = state.orders.filter((order:IOrder) => order.stepLevel === state.selectStepLevel)
      if(state.selectStepLevel == 0){
        if(searchKeywordType == "title"){
        filteredOrders = state.orders.filter((order:IOrder) => order.title.includes(state.searchKeyword))
      }
      if(searchKeywordType == "body"){
        filteredOrders = state.orders.filter((order:IOrder) => order.body.includes(state.searchKeyword))
      }
      if(searchKeywordType == "funeralHome"){
        filteredOrders = state.orders.filter((order:IOrder) => order.funeralHome.includes(state.searchKeyword))
      }
      }
      else{
        if(searchKeywordType == "title"){
        filteredOrders = state.orders.filter((order:IOrder) => order.title.includes(state.searchKeyword) && order.stepLevel === state.selectStepLevel)
      }
      if(searchKeywordType == "body"){
        filteredOrders = state.orders.filter((order:IOrder) => order.body.includes(state.searchKeyword) && order.stepLevel === state.selectStepLevel)
      }
      if(searchKeywordType == "funeralHome"){
        filteredOrders = state.orders.filter((order:IOrder) => order.funeralHome.includes(state.searchKeyword) && order.stepLevel === state.selectStepLevel)
      }
      }

      return filteredOrders
    })


    function loadOrders(){
      //alert("4");
      mainApi.order_list_forAssistant()
      .then(axiosResponse => {
          state.orders = axiosResponse.data.body.orders;
      });

    }

    // onMounted 바로 실행하는 것이 아닌 모든 것이 준비되었을때 실행됨
    onMounted(() => {
      //alert("3");
      loadOrders();
    });


    return{
      state,
      filteredOrders,
      searchKeywordElRef,
      onInput,
      onClickInput,
      returnToString,
      onChangeSearchKeywordType,
      onChangeStepLevel,
      selectStepLevelElRef

    }

  }
})
</script>


<style scoped>
/* https://tailwindcomponents.com/component/blogs-posts-card */
.orderList-section-grid__body{
  min-width: 400px;
}

</style>