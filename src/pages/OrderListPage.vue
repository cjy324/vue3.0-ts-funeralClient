<template>
  <!-- 메인-요청 리스트 시작 -->
  <section class="orderList-section bg-gray-500">
    <div class="h-2 bg-gray-500"></div>
    <!--리스트 search 시작-->
    <div class="flex h-10 orderList-section-search m-2 text-right rounded-md">
      <select class="h-full w-1/4 rounded-l-md" id="" @change="onChangeSearchKeywordType($event)">
        <option value="title">제목</option>
        <option value="body">내용</option>
        <option value="stepLevel">진행단계</option>
        <option value="funeralHome">장례식장</option>
      </select>
      <input id="searchKeywordElRef" ref="searchKeywordElRef" class="h-full w-full pl-4" type="text" placeholder="검색어 입력" :value="searchKeyword" @keyup.enter="onInput($event)" >
      <button class="w-20 text-white rounded-r-md bg-blue-500" type="button">검색</button>
    </div>
    <!--리스트 search 끝-->
    <!--리스트 grid 시작-->
    <div class="orderList-section-grid grid grid-cols-1 md:grid-cols-3 gap-3 overflow-hidden">
      <!--리스트 grid__body 시작-->
      <div class="mt-6" v-bind:key="order.id" v-for="order in filteredOrders">
      <div class="orderList-section-grid__body p-8 bg-white m-2 border rounded-xl">
        <!--진행단계-->
        <div class="btn-success">
          진행단계: {{order.stepLevel}}
        </div>
        <!--제목-->
        <div class="text-center m-4">
          <router-link :to="'/order/detail?id=' + order.id" class="text-indigo-500 font-bold text-xl md:text-2xl hover:text-gray-700">
            {{ order.title }}
          </router-link>
        </div>
        <!--의뢰인명-->
        <h1 class="font-semibold text-gray-900 leading-none text-xl mt-1 mb-3 capitalize break-normal">
          의뢰인: {{order.extra__member}}
        </h1>
         <!--장례식장-->
        <h1 class="font-semibold text-gray-900 leading-none text-xl mt-1 mb-3 capitalize break-normal">
          장례식장: {{order.funeralHome}}
        </h1>
        <!--옵션-->
        <div class="max-w-full border mt-2 p-1 pl-2 rounded-md">
          옵션1
          <p class="text-base font-medium tracking-wide text-gray-600 mt-1">
            - 내용: {{ order.option1 }} / 수량: {{ order.option1qty }}
          </p>
        </div>
        <div class="max-w-full border mt-2 p-1 pl-2 rounded-md">
          옵션2
          <p class="text-base font-medium tracking-wide text-gray-600 mt-1">
            - 내용: {{ order.option2 }} / 수량: {{ order.option2qty }}
          </p>
        </div>
        <div class="max-w-full border mt-2 p-1 pl-2 rounded-md">
          옵션3
          <p class="text-base font-medium tracking-wide text-gray-600 mt-1">
            - 내용: {{ order.option3 }} / 수량: {{ order.option3qty }}
          </p>
        </div>
        <div class="max-w-full border mt-2 p-1 pl-2 rounded-md">
          옵션4
          <p class="text-base font-medium tracking-wide text-gray-600 mt-1">
            - 내용: {{ order.option4 }} / 수량: {{ order.option4qty }}
          </p>
        </div>
        <div class="max-w-full border mt-2 p-1 pl-2 rounded-md">
          옵션5
          <p class="text-base font-medium tracking-wide text-gray-600 mt-1">
            - 내용: {{ order.option5 }} / 수량: {{ order.option5qty }}
          </p>
        </div>
        <!--추가 요청 내용-->
        <div class="max-w-full border mt-2 p-1 pl-2 rounded-md">
          추가 요청사항
          <p class="text-base font-medium tracking-wide text-gray-600 mt-1">
            - {{ order.body }}
          </p>
        </div>
        <router-link :to="'/order/detail?id=' + order.id" class="block btn-primary mt-2 h-10 w-full rounded-md">
            상세보기
        </router-link>
        <router-link :to="'/review/doAdd?relTypeCode=director&relId=' + order.directorId" class="block btn-secondary mt-2 h-10 w-full rounded-md">
            후기/평점 작성
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

export default defineComponent({
  name: 'OrderListPage',

//props 속성은 컴포넌트 간에 데이터를 전달할 수 있는 컴포넌트 통신 방법입니다. 
//props 속성을 기억할 때는 상위 컴포넌트에서 하위 컴포넌트로 내려보내는 데이터 속성으로 기억하면 쉽습니다
  props: {
    globalShare: {
      type: Object,
      required: true
    },
    memberId: {
      type: Number,
      required: true
    }
  },

  setup(props){
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;

    const state = reactive({
      orders: [] as IOrder[],
      searchKeyword: '' as string,
      result:'' as string,
      
    });

    let searchKeywordType = "title";

    function onInput(event:any){
      state.searchKeyword = event.target.value;
      return state.searchKeyword;
    }

    function onChangeSearchKeywordType(event:any){
      searchKeywordType = event.target.value;
      return searchKeywordType;
    };

    //alert("1");
    const filteredOrders = computed(() => {
      //alert("2");
      state.result = state.searchKeyword;

      let filteredOrders = state.orders;
      
      if(searchKeywordType == "title"){
        filteredOrders = state.orders.filter((order:IOrder) => order.title.includes(state.searchKeyword))
      }
      if(searchKeywordType == "body"){
        filteredOrders = state.orders.filter((order:IOrder) => order.body.includes(state.searchKeyword))
      }
      if(searchKeywordType == "stepLevel"){
        filteredOrders = state.orders.filter((order:IOrder) => order.body.includes(state.searchKeyword))
      }
      if(searchKeywordType == "funeralHome"){
        filteredOrders = state.orders.filter((order:IOrder) => order.body.includes(state.searchKeyword))
      }
      return filteredOrders
    })

    const memberId = props.memberId;

    function loadOrders(memberId:number){
      //alert("4");
      mainApi.order_list(memberId)
      .then(axiosResponse => {
          state.orders = axiosResponse.data.body.orders;
      });

    }

    // onMounted 바로 실행하는 것이 아닌 모든 것이 준비되었을때 실행됨
    onMounted(() => {
      //alert("3");
      loadOrders(memberId);
    });


    return{
      state,
      filteredOrders,
      onInput,
      onChangeSearchKeywordType,

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