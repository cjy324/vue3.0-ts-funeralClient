<template>
  <TitleBar>My Page</TitleBar>

  <section class="section section-client-join-form px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <div v-if="globalShare.isLogined">
          <div title="프로필 이미지">
            <img v-if="state.client.extra__thumbImg != null" class="h-96 rounded-lg object-cover object-center" :src="'http://localhost:8090' + state.client.extra__thumbImg">
            <img v-if="state.client.extra__thumbImg == null" class="h-96 rounded-lg object-cover object-center" :src="'http://via.placeholder.com/300?text=NoImage'">
          </div>
          <div title="회원유형">
            <p>회원유형</p>
            일반회원
          </div>
          <div title="아이디">
            <p>아이디</p>
            {{state.client.loginId}}
          </div>
          <div title="이름">
            <p>이름</p>
            {{state.client.name}}
          </div>
          <div title="전화번호">
            <p>전화번호</p>
            {{state.client.cellphoneNo}}
          </div>
          <div title="이메일">
            <p>이메일</p>
            {{state.client.email}}
          </div>
          <div title="주소">
            <p>주소</p>
            {{state.client.region}}
          </div>
          <div>
            <div class="btns mt-2">
              <router-link class="btn-secondary" :to="'/client/doModify?id=' + state.client.id">회원정보수정</router-link>
              <router-link class="btn-danger" to="client/doDelete">탈퇴</router-link>
            </div>
          </div>
        </div>
        <div v-else>
          로그인 후 이용가능합니다.<router-link class="btn-link" to="/">홈</router-link> 으로 이동
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, getCurrentInstance, onMounted } from 'vue'
import { MainApi } from '../apis'
import { IClient } from '../types'

export default defineComponent({
  name: 'ClientMyPage',
  props: {
    globalShare: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;

    const state = reactive({
      client: {} as IClient
    });

    function loadClient(id:number) {
      mainApi.client_detail(id)
      .then(axiosResponse => {
        state.client = axiosResponse.data.body.client;
      });
    }
    onMounted(() => {
      loadClient(props.id);
    });
    watch(() => props.id, (newValue, oldValue) => {
      loadClient(props.id);
    })

    return {
      state,
    }
  }
})
</script>

<style scoped>
</style> 