<template>
  <!-- 메인-지도사 리스트 시작 -->
  <section class="directorList-section bg-gray-500">
    <div class="h-2 bg-gray-500"></div>
    <!--리스트 search 시작-->
    <div class="flex h-10 directorList-section-search m-2 text-right rounded-md">
      <select class="h-full w-1/4 rounded-l-md" id="" @change="onChangeSearchKeywordType($event)">
        <option value="name">이름</option>
        <option value="nickname">닉네임</option>
        <option value="loginId">아이디</option>
      </select>
      <select class="h-full w-1/6" @change="onChangePageElRef($event)">
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      <input id="searchKeywordElRef" ref="searchKeywordElRef" class="h-full w-full pl-4" type="text" placeholder="검색어 입력" :value="searchKeyword" @keyup.enter="onInput($event)" >
      <button class="w-20 text-white rounded-r-md bg-blue-500" type="button">검색</button>
    </div>
    <!--리스트 search 끝-->
    <!--리스트 grid 시작-->
    <div class="directorList-section-grid grid grid-cols-1 md:grid-cols-3 gap-3 overflow-hidden">
      <!--리스트 grid__body 시작-->
      <div class="mt-6" v-bind:key="member.id" v-for="member in filteredMembers">
      <div class="directorList-section-grid__body p-8 bg-white m-2 border rounded-xl">
        <!--프로필 이미지-->
        <div class="flex justify-center overflow-hidden">
          <img class="h-96 rounded-lg object-cover object-center" src="https://taegon.kim/wp-content/uploads/2018/05/image-5.png">
        </div>
        <!--이름-->
        <div class="text-center m-4">
          <router-link to="/director/profile" class="text-indigo-500 font-bold text-xl md:text-2xl hover:text-gray-700">
            {{ member.name }}
          </router-link>
        </div>
        <!--소개멘트-->
        <h1 class="font-semibold text-gray-900 leading-none text-xl mt-1 mb-3 capitalize break-normal">
          소개멘트 작성란입니다.
        </h1>
        <!--활동이력-->
        <div class="max-w-full border mt-2 p-1 pl-2 rounded-md">
          활동이력
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
        <button class="btn-primary mt-2 h-10 w-full rounded-md">
          선택
        </button>
        <!--평점-->
        <div class="flex justify-center items-center w-full text-center mt-3">
          <div class="font-bold text-xl mr-5">
            '{{ member.name }}'님의 전체 평점
          </div>
          <div class="border rounded-full h-24 w-24 bg-yellow-500 flex justify-center items-center">
            <div class="font-bold text-2xl text-white">
              4.5/5
            </div>
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
        <div class="mt-2 border-b-2 border-t-2">
            <p class="text-gray-900 p-2">
              후기를 작성합니다. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            </p>
            <p class="text-gray-500 p-2 text-sm">
              2021-03-11 15:15:15
            </p>
        </div>
        <!--후기-->
        <div class="mt-2 border-b-2 border-t-2">
            <p class="text-gray-900 p-2">
              후기를 작성합니다. ipsum, sapiente earum voluptates reiciendis fuga sit! Minima quaerat sit sed iusto consectetur.
            </p>
            <p class="text-gray-500 p-2 text-sm">
              2021-03-11 15:15:15
            </p>
        </div>
        
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
import { IMember } from '../types/'
import { MainApi } from '../apis/'

const searchKeywordElRef = ref<HTMLInputElement>();

export default defineComponent({
  name: 'DirectorList',

//프롭스 속성은 컴포넌트 간에 데이터를 전달할 수 있는 컴포넌트 통신 방법입니다. 
//프롭스 속성을 기억할 때는 상위 컴포넌트에서 하위 컴포넌트로 내려보내는 데이터 속성으로 기억하면 쉽습니다
  props: {
    globalShare: {
      type: Object,
      required: true
    },
    boardId: {
      type: Number,
      required: true,
      default:1
    },
  },

  setup(props){
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;

    const state:any = reactive({
      members: [] as IMember[],
      searchKeyword: '' as String,
      result:'' as String,
    });

    
    //21.03.16 리스트 검색기능 구현 진행중..
    //문제점
    // 검색버튼 클릭시에도 onInput이 되도록 개선 필요

    let searchKeywordType = "name";
    let page = "1";

    function onInput(event:any){
      state.searchKeyword = event.target.value;
      return state.searchKeyword;
    }

    function onChangeSearchKeywordType(event:any){
      searchKeywordType = event.target.value;
      return searchKeywordType;
    };

    function onChangePageElRef(event:any){
      page = event.target.value;
      return page;
    }

    //alert("1");
    const filteredMembers = computed(() => {
      //alert("2");
      state.result = state.searchKeyword;

      let filteredMembers = state.members;

      if(searchKeywordType == "name"){
        filteredMembers = state.members.filter((member:IMember) => member.name.includes(state.searchKeyword))
      }
      if(searchKeywordType == "nickname"){
        filteredMembers = state.members.filter((member:IMember) => member.nickname.includes(state.searchKeyword))
      }
      if(searchKeywordType == "loginId"){
        filteredMembers = state.members.filter((member:IMember) => member.loginId.includes(state.searchKeyword))
      }
      return filteredMembers
    })
    
    

    function loadMembers(boardId:number, searchKeywordType:string, searchKeyword:string, page:number){
      //alert("4");
      mainApi.member_list(boardId, searchKeywordType, searchKeyword, page)
      .then(axiosResponse => {
          state.members = axiosResponse.data.body.members;
      });

    }

    // onMounted 바로 실행하는 것이 아닌 모든 것이 준비되었을때 실행됨
    onMounted(() => {
      //alert("3");
      loadMembers(props.boardId, "name", "", 1);
    });

    return{
      state,
      filteredMembers,
      onInput,
      onChangeSearchKeywordType,
      onChangePageElRef

    }

  }
})
</script>


<style scoped>
/* https://tailwindcomponents.com/component/blogs-posts-card */
.directorList-section-grid__body{
  min-width: 400px;
}

</style>