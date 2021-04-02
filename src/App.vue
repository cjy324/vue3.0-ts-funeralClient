<template>
  <header class="header-bar h-10 bg-gray-100   md:h-20">
    <div class="container mx-auto flex h-full">
      <!-- router-link는 a와 같다고 보면 됨 -->
      <!-- to는 href -->
      <router-link to="/" class="h-full flex items-center px-2">
        <img class="block w-5 md:w-10" src="./assets/logo.png" alt="">
      </router-link>

      <div class="flex-grow"></div>

      <router-link v-if="globalShare.isLogined && !!globalShare.loginedClient.profileImgUrl" :to="'/client/detail?id='+globalShare.loginedClient.id" class="header-bar__profile-img flex items-center">
        <img :src="'http://localhost:8090' + globalShare.loginedClient.profileImgUrl" class="rounded-full" width="40" height="40" alt="">
      </router-link>

      <nav class="header-bar__menu-box-1 overflow-x-auto ml-2">
        <ul class="flex h-full">
          <li>
            <router-link to="/" class="h-full flex items-center font-bold px-4 hover:bg-black hover:text-white">
              HOME
            </router-link>
          </li>
          <li>
            <router-link to="/expert/list" class="h-full flex items-center font-bold px-4 hover:bg-black hover:text-white">
              DIRECTOR's
            </router-link>
          </li>
          <li>
            <router-link to="/assistant/list" class="h-full flex items-center font-bold px-4 hover:bg-black hover:text-white">
              ASSISTANT's
            </router-link>
          </li>
          <li v-if="globalShare.loginedAssistant.id !== null || globalShare.loginedExpert.id !== null">
            <router-link to="/funeral/list" class="h-full flex items-center font-bold px-4 hover:bg-black hover:text-white">
              FUNERAL LIST
            </router-link>
          </li>
          <li v-if="globalShare.loginedClient.id !== null">
            <router-link :to="'/order/list?memberId='+ globalShare.loginedClient.id + '&memberType=client'" class="h-full flex items-center font-bold px-4 hover:bg-black hover:text-white">
              ORDER LIST
            </router-link>
          </li>
          <li v-if="globalShare.loginedExpert.id !== null">
            <router-link :to="'/order/list?memberId='+ globalShare.loginedExpert.id + '&memberType=expert'" class="h-full flex items-center font-bold px-4 hover:bg-black hover:text-white">
              ORDER LIST
            </router-link>
          </li>
          <li v-if="globalShare.loginedExpert.id !== null">
            <router-link :to="'/funeral/myList?memberId='+ globalShare.loginedExpert.id + '&memberType=expert'" class="h-full flex items-center font-bold px-4 hover:bg-black hover:text-white">
              MY FUNERAL LIST
            </router-link>
          </li>
          <li v-if="globalShare.loginedAssistant.id !== null">
            <router-link :to="'/funeral/myList?memberId='+ globalShare.loginedAssistant.id + '&memberType=assistant'" class="h-full flex items-center font-bold px-4 hover:bg-black hover:text-white">
              MY FUNERAL LIST
            </router-link>
          </li>
          <li v-if="globalShare.loginedClient.id !== null">
            <router-link :to="'/client/myPage?id='+ globalShare.loginedClient.id" class="h-full flex items-center font-bold px-4 hover:bg-white hover:text-black whitespace-nowrap">
              MyPage
            </router-link>
          </li>
          <li v-if="globalShare.loginedAssistant.id !== null">
            <router-link :to="'/assistant/myPage?id='+ globalShare.loginedAssistant.id" class="h-full flex items-center font-bold px-4 hover:bg-white hover:text-black whitespace-nowrap">
              MyPage
            </router-link>
          </li>
          <li v-if="globalShare.loginedExpert.id !== null">
            <router-link :to="'/expert/myPage?id='+ globalShare.loginedExpert.id" class="h-full flex items-center font-bold px-4 hover:bg-white hover:text-black whitespace-nowrap">
              MyPage
            </router-link>
          </li>
          <li v-if="globalShare.isLogined == false">
            <router-link to="/client/join" class="h-full flex items-center font-bold px-4 hover:bg-white hover:text-black whitespace-nowrap">
              Sign-up
            </router-link>
          </li>
          <li v-if="globalShare.isLogined == false">
            <router-link to="/client/login" class="h-full flex items-center font-bold px-4 hover:bg-black hover:text-white">
              Log-in(Client)
            </router-link>
          </li>
          <li v-if="globalShare.isLogined == false">
            <router-link to="/assistant/login" class="h-full flex items-center font-bold px-4 hover:bg-black hover:text-white">
              Log-in(Assistant)
            </router-link>
          </li>
          <li v-if="globalShare.isLogined == false">
            <router-link to="/expert/login" class="h-full flex items-center font-bold px-4 hover:bg-black hover:text-white">
              Log-in(Expert)
            </router-link>
          </li>
          <li v-if="globalShare.isLogined">
            <a v-on:click="globalShare.logout" class="cursor-pointer h-full flex items-center font-bold px-4 hover:bg-white hover:text-black whitespace-nowrap">
              Log-out
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <!-- 이것을 해주어야 다른 페이지를 불러올 수 있음 -->
    <router-view></router-view>
  </main>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
//import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  props: {
    globalShare: {
      type: Object,
      required: true
    }
  },
  setup(props){

    let memberId = 0;

    if(props.globalShare.loginedClientId !== 0){
      memberId = props.globalShare.loginedClientId;
      return memberId;
    }
    if(props.globalShare.loginedAssistantId !== 0){
      memberId = props.globalShare.loginedClientId;
      return memberId;
    }
    if(props.globalShare.loginedClientId !== 0){
      memberId = props.globalShare.loginedClientId;
      return memberId;
    }
  return{
      memberId
  }
  },

  components: {
  }
});
</script>

<style lang="postcss">
.btn-primary {
  @apply py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg;
}
.btn-secondary {
  @apply py-2 px-4 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg;
}
.btn-success {
  @apply py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg;
}
.btn-danger {
  @apply py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg;
}
.btn-warning {
  @apply py-2 px-4 bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 focus:ring-offset-yellow-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg;
}
.btn-info {
  @apply py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg;
}
.btn-link {
  @apply underline text-blue-500 hover:text-red-500 cursor-pointer;
}


/* css 선택자 */
/* .btns 자식들 중에 class로 'btn-'를 갖고 있는 엘리먼트의 다음 엘리먼트 */
.btns > [class*="btn-"] + [class*="btn-"] {
  margin-left: theme('spacing.2');
}
</style> 