import { createApp, reactive, computed } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// 앱 컴포넌트 불러오기
import App from './App.vue'

// 전역 css 불러오기
import './index.css'

// 전역 컴포넌트 불러오기
import * as Util from './utils/'; // utils파일로 부터 가져오는 모든 것(*)은 Util로 치환


// 각 페이지 불러오기
import HomeMain from './pages/HomeMain.vue'
import DirectorList from './pages/DirectorList.vue'
import DirectorProfile from './pages/DirectorProfile.vue'

// 전역state 만들기
/// localStorage에서 로그인 정보 가져오기
const authKey = localStorage.getItem("authKey")
const loginedMemberId  = Util.toIntOrNull(localStorage.getItem("loginedMemberId"))
const loginedMemberName = localStorage.getItem("loginedMemberName")
const loginedMemberNickname  = localStorage.getItem("loginedMemberNickname")



// MainApi 불러오기
import { MainApi } from './apis/'

// MainApi 객체 생성
const mainApi = new MainApi();

// 라우팅 정보 설정(구성)
const routes = [
  { 
    path: '/', 
    component: HomeMain 
  },
  { 
    path: '/member/list', 
    component: DirectorList, 
    props: (route:any) => ({ boardId: route.query.boardId})
  },
  { 
    path: '/director/profile', 
    component: DirectorProfile 
  },


];


// 라우팅 정보를 가져오는 라우터 생성
const router = createRouter({
  //Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  //routes : routes 이름이 똑같으면 아래처럼 축약 가능
  routes
});


//앱 생성
//createApp(App).mount('#app') 이것을 풀어보면 아래와 같음
const app = createApp(App);

//앱에 라우터 적용
app.use(router)

//앱에 전역 라이브러리 등록
app.config.globalProperties.$mainApi = mainApi;
app.config.globalProperties.$router = router;

//앱에 전역 컴포넌트 적용
//모든 곳에서 컴포넌트를 불러올수 있게 해줌
//app.component('TitleBar',TitleBar)
//app.component('FormRow',FormRow)

//앱 표시
app.mount('#app');
