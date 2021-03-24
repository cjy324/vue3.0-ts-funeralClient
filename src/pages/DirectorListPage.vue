<template>
  <!-- 메인-지도사 리스트 시작 -->
  <section class="memberList-section bg-gray-500">
    <div class="h-2 bg-gray-500"></div>
    <!--리스트 search 시작-->
    <div class="flex h-10 memberList-section-search m-2 text-right rounded-md">
      <select class="h-full w-1/4 rounded-l-md" id="" @change="onChangeSearchKeywordType($event)">
        <option value="name">이름</option>
        <option value="address">지역</option>
      </select>
      <input ref="searchKeywordElRef" class="h-full w-full pl-4" type="text" placeholder="검색어 입력" :value="searchKeyword" @keyup.enter="onInput($event)" >
      <button class="w-20 text-white rounded-r-md bg-blue-500" type="button" @click="onClickInput">검색</button>
    </div>
    <!--리스트 search 끝-->
    <!--리스트 grid 시작-->
    <div class="memberList-section-grid grid grid-cols-1 md:grid-cols-3 gap-3 overflow-hidden">
      <!--리스트 grid__body 시작-->
      <template v-bind:key="member.id" v-for="member in filteredMembers">
      <div class="mt-6">
      <div class="memberList-section-grid__body p-8 bg-white m-2 border rounded-xl">
        <!--프로필 이미지-->
        <div class="flex justify-center overflow-hidden">
          <img v-if="member.extra__thumbImg != null" class="h-96 rounded-lg object-cover object-center" :src="'http://localhost:8090' + member.extra__thumbImg">
          <img v-if="member.extra__thumbImg == null" class="h-96 rounded-lg object-cover object-center" :src="'http://via.placeholder.com/300?text=NoImage'">
        </div>
        <!--이름-->
        <div class="text-center m-4">
          <router-link :to="'/director/profile?id=' + member.id" class="text-indigo-500 font-bold text-xl md:text-2xl hover:text-gray-700">
            {{ member.name }}
          </router-link>
          <router-link :to="'/director/profile?id=' + member.id" class="block btn-success mt-2 h-10 w-full rounded-md">
          상세보기
        </router-link>
        </div>
        <!--소개멘트-->
        <h1 class="font-semibold text-gray-900 leading-none text-xl mt-1 mb-3 capitalize break-normal">
          소개멘트 작성란입니다.
        </h1>
        <!--지역-->
        <div class="max-w-full border mt-2 p-1 pl-2 rounded-md">
          지역
          <p class="text-base font-medium tracking-wide text-gray-600 mt-1">
            - {{ member.address }} 
          </p>
        </div>
        <!--경력-->
        <div class="max-w-full border mt-2 p-1 pl-2 rounded-md">
          경력
          <p class="text-base font-medium tracking-wide text-gray-600 mt-1">
            - {{ member.cellphoneNo }}
          </p>
          <p class="text-base font-medium tracking-wide text-gray-600 mt-1">
            - {{ member.email }}
          </p>
          <p class="text-base font-medium tracking-wide text-gray-600 mt-1">
            - {{ member.regDate }}
          </p>
        </div>
        <router-link :to="'/order/doAdd?directorId=' + member.id + '&clientId=' + globalShare.loginedMember.id" class="block btn-primary mt-2 h-10 w-full rounded-md">
          의뢰요청
        </router-link>
        <!--평점-->
        <div class="flex justify-center items-center w-full text-center mt-3">
          <div class="font-bold text-xl mr-5">
            '{{ member.name }}'님의 전체 평점
          </div>
          <div class="border rounded-full h-24 w-24 bg-yellow-500 flex justify-center items-center">
            <div class="font-bold text-2xl text-white">
              {{ member.extra__ratingPoint.toFixed(1) }}/5
            </div>
            <star-rating :increment="0.5"></star-rating>
          </div>
        </div>
        <!--후기-->
        <div class="flex justify-between items-end h-8 w-full border-b-4 font-semibold">
          <p class="pb-1">
            매칭 후기
          </p>
          <div class="text-sm cursor-pointer hover:text-blue-500">
            더보기
          </div>
        </div>
        <!--template를 활용하면 v-for문 내 v-for문 즉, 이중v-for문 사용이 가능해진다.-->
        <!--또한, vue3.0부터는 동일 태그내에 v-for랑 v-if를 사용할 수 없는 것 같다.(권장하는 방법이 아닌듯..) -->
        <!--하지만 template를 활용해 v-for를 분리해주면 v-for와 v-if를 동시에 사용가능해진다. -->
        <template v-bind:key="review.id" v-for="(review, index) in state.reviews" >
        <div class="mt-2 border-b-2 border-t-2" v-if="review.relId === member.id">
            <p class="text-gray-900 p-2">
              {{review.body}} {{index}}
            </p>
            <p class="text-gray-500 p-2 text-sm">
              {{review.updateDate}} / {{review.extra__writer}}
            </p>
        </div>
        </template>
      </div>
      </div>
      </template>
      <!--리스트 grid__body 끝-->
    </div>
    <!--리스트 grid 끝-->
  </section>
  <!-- 메인-지도사 리스트 끝 -->

</template>

<script lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance, onMounted, computed, watch } from 'vue'
import { IMember, IReview } from '../types'
import { MainApi } from '../apis'

const searchKeywordElRef = ref<HTMLInputElement>();

export default defineComponent({
  name: 'DirectorListPage',

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
      members: [] as IMember[],
      searchKeyword: '' as string,
      result:'' as string,
      reviews: [] as IReview[],

    });

    let searchKeywordType = "name";

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

    //alert("1");
    const filteredMembers = computed(() => {
      //alert("2");
      state.result = state.searchKeyword;

      let filteredMembers = state.members;
      
      if(searchKeywordType == "name"){
        filteredMembers = state.members.filter((member:IMember) => member.name.includes(state.searchKeyword))
      }
      if(searchKeywordType == "address"){
        filteredMembers = state.members.filter((member:IMember) => member.address.includes(state.searchKeyword))
      }
      return filteredMembers
    })

    function loadMembers(){
      //alert("4");
      mainApi.director_list()
      .then(axiosResponse => {
          state.members = axiosResponse.data.body.members;
      });

    }


    const filteredReviews = computed(() => {
      
      const limitCount = 5;

      let filteredReviews = [];

      for(let i = 0; i < limitCount; i++){
        if(state.reviews.length < limitCount){
          filteredReviews = state.reviews
          return filteredReviews;
        }
        filteredReviews[i] = state.reviews[i]
      }

      return filteredReviews
    })

    const relTypeCode = 'director';

    function loadReviews(relTypeCode:string){
      mainApi.review_list(relTypeCode)
      .then(axiosResponse => {
          state.reviews = axiosResponse.data.body.reviews;
      });

    }

    // onMounted 바로 실행하는 것이 아닌 모든 것이 준비되었을때 실행됨
    onMounted(() => {
      //alert("3");
      loadMembers();
      loadReviews(relTypeCode);
    });


    return{
      state,
      filteredMembers,
      filteredReviews,
      searchKeywordElRef,
      onInput,
      onClickInput,
      onChangeSearchKeywordType,

    }

  }
})
</script>


<style scoped>
/* https://tailwindcomponents.com/component/blogs-posts-card */
.memberList-section-grid__body{
  min-width: 400px;
}

</style>