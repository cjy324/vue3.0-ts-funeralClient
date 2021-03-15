<template>
  <!-- 메인-지도사 리스트 시작 -->
  <section class="directorList-section bg-gray-500">
    <div class="h-2 bg-gray-500"></div>
    <!--리스트 search 시작-->
    <form class="flex h-10 directorList-section-search m-2 text-right rounded-md" v-on:submit="seacrchDirector">
      <select ref="searchKeywordTypeElRef" class="h-full w-full" id="" @change="onChangeSearchKeywordType($event)">
        <option value="name">이름</option>
        <option value="nickname">닉네임</option>
        <option value="loginId">아이디</option>
      </select>
      <select ref="pageElRef" id=""  @change="onChangePageElRef($event)">
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      <input ref="searchKeywordElRef" class="h-full w-full rounded-l-md pl-4" type="text" placeholder="검색어 입력" v-bind:value="inputText" v-on:input="updateInput">
      <button class="w-20 text-white rounded-r-md bg-blue-500" type="submit">검색</button>
    </form>
    <!--리스트 search 끝-->
    <!--리스트 grid 시작-->
    <div class="directorList-section-grid grid grid-cols-1 md:grid-cols-3 gap-3">
      <!--리스트 grid__body 시작-->
      <div class="mt-6" v-bind:key="member.id" v-for="member in state.members">
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
          {{ member.nickname }}
        </h1>
        <!--활동이력-->
        <div class="max-w-full border mt-2 p-1 pl-2 rounded-md">
          <p class="text-base font-medium tracking-wide text-gray-600 mt-1">
            {{ member.cellphoneNo }}
          </p>
          <p class="text-base font-medium tracking-wide text-gray-600 mt-1">
            {{ member.email }}
          </p>
          <p class="text-base font-medium tracking-wide text-gray-600 mt-1">
            {{ member.regDate }}
          </p>
        </div>
        <!--평점-->
        <div class="flex justify-center items-center w-full text-center mt-3">
          <div class="font-bold text-xl mr-5">
            '홍길동'님의 전체 평점
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
import { defineComponent, reactive, ref, getCurrentInstance, onMounted, watch, Events } from 'vue'
import { IMember } from '../types/'
import { MainApi } from '../apis/'
import { Router } from 'vue-router'

export default defineComponent({
  name: 'DirectorList',

  props: {
    globalShare: {
      type: Object,
      required: true
    },
    boardId: {
      type: Number,
      required: true,
      default:1
    }
  },

  setup(props){
    const router:Router = getCurrentInstance()?.appContext.config.globalProperties.$router;
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;
   
    const searchKeywordElRef = ref<HTMLInputElement>();
    const searchKeywordTypeElRef = ref<HTMLSelectElement>();
    const pageElRef = ref<HTMLSelectElement>();



    const state = reactive({
      inputText:'',
      members: [] as IMember[]
    });

    let searchKeyword = "";
    let searchKeywordType = "name";
    let page = "1";


    if(searchKeywordElRef.value?.value.trim() != undefined){
      searchKeyword = searchKeywordElRef.value?.value.trim();
      alert(searchKeyword);
    }


    function onChangeSearchKeywordType(event:Event){
      if(searchKeywordTypeElRef.value?.value != undefined){
      searchKeywordType = searchKeywordTypeElRef.value?.value;
      }
      
    };

    function onChangePageElRef(event:Event){
      if(pageElRef.value?.value != undefined){
      page = pageElRef.value?.value;
    }
      alert(page+"바뀜");
    }

    
    function updateInput(event:Event) {
      var updatedText = searchKeywordElRef.value?.value;
      if(updatedText != undefined){
        state.inputText = updatedText;
      }
      searchKeyword = state.inputText;
    }

    const startLoadMember = (boardId:number, searchKeywordType:string, searchKeyword:string, page:number) => {
      loadMembers(boardId, searchKeywordType, searchKeyword, page);
    }
   

    function loadMembers(boardId:number, searchKeywordType:string, searchKeyword:string, page:number){
      
      mainApi.member_list(boardId, searchKeywordType, searchKeyword, 1)
      .then(axiosResponse => {
          state.members = axiosResponse.data.body.members;
      });

      
    }


    //검색 옵션 다 반영 후에 리스트 불러오기
    const changeSearchOptions = (onSuccess:Function) => {

    }














 
    // onMounted 바로 실행하는 것이 아닌 모든 것이 준비되었을때 실행됨
    onMounted(() => {
      startLoadMember(1, searchKeywordType, searchKeyword, 1);
    });

    

    function seacrchDirector(){

      if(searchKeywordElRef.value == null ){
        return;
      }

      const searchKeyword = searchKeywordElRef.value.value.trim();

      if(searchKeyword.length == 0){
        alert('키워드를 입력해주세요.')
        return;
      }

    };


    return{
      state,
      seacrchDirector,
      searchKeywordElRef,
      searchKeywordTypeElRef,
      updateInput,
      onChangeSearchKeywordType,
      onChangePageElRef,
      pageElRef,
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