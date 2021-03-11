<template>
  <!-- 메인-지도사 리스트 시작 -->
  <section class="directorList-section bg-gray-500">
    <div class="mt-6" v-bind:key="article.id" v-for="article in state.articles">
      {{ article.title }} {{ article.regDate }}
    </div>
    <div class="h-2 bg-gray-500"></div>
    <!--리스트 search 시작-->
    <form class="flex h-10 directorList-section-search m-2 text-right rounded-md" v-on:submit="seacrchDirector">
      <input ref="searchKewoardElRef" class="h-full w-full rounded-l-md pl-4" type="text" placeholder="검색어 입력">
      <button class="w-20 text-white rounded-r-md bg-blue-500" type="submit">검색</button>
    </form>
    <!--리스트 search 끝-->
    <!--리스트 grid 시작-->
    <div class="directorList-section-grid grid grid-cols-1 md:grid-cols-3 gap-3">
      <!--리스트 grid__body 시작-->
      <div class="directorList-section-grid__body p-8 bg-white m-2 border rounded-xl">
        <!--프로필 이미지-->
        <div class="flex justify-center overflow-hidden">
          <img class="h-96 rounded-lg object-cover object-center" src="https://taegon.kim/wp-content/uploads/2018/05/image-5.png">
        </div>
        <!--이름-->
        <div class="text-center m-4">
          <router-link to="/director/profile" class="text-indigo-500 font-bold text-xl md:text-2xl hover:text-gray-700">
            홍길동
          </router-link>
        </div>
        <!--소개멘트-->
        <h1 class="font-semibold text-gray-900 leading-none text-xl mt-1 mb-3 capitalize break-normal">
          간단하게 자신을 소개할 멘트를 작성해주세요.
        </h1>
        <!--활동이력-->
        <div class="max-w-full border mt-2 p-1 pl-2 rounded-md">
          <p class="text-base font-medium tracking-wide text-gray-600 mt-1">
            지역: 대전광역시
          </p>
          <p class="text-base font-medium tracking-wide text-gray-600 mt-1">
            자격증: 장례지도사 2급
          </p>
          <p class="text-base font-medium tracking-wide text-gray-600 mt-1">
            경력: 5년
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
      <!--리스트 grid__body 끝-->
    </div>
    <!--리스트 grid 끝-->
  </section>
  <!-- 메인-지도사 리스트 끝 -->

</template>

<script lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance, onMounted, watch } from 'vue'
import { IArticle } from '../types/'
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
   
    const searchKewoardElRef = ref<HTMLInputElement>();



    const state = reactive({
      articles: [] as IArticle[]
    });

    function loadArticles(boardId:number){
      mainApi.article_list(boardId)
      .then(axiosResponse => {
          state.articles = axiosResponse.data.body.articles;
      });
    }

    // onMounted 바로 실행하는 것이 아닌 모든 것이 준비되었을때 실행됨
    onMounted(() => {
      loadArticles(props.boardId);
    });

    

    function seacrchDirector(){

      if(searchKewoardElRef.value == null ){
        return;
      }

      const searchKewoard = searchKewoardElRef.value.value.trim();

      if(searchKewoard.length == 0){
        alert('키워드를 입력해주세요.')
        return;
      }
      
      mainApi.article_doWrite(1, searchKewoard, searchKewoard)
        .then(axiosResponse => {
          alert(axiosResponse.data.msg);
        });

      
    };


    return{
      state,
      seacrchDirector,
      searchKewoardElRef,
      
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