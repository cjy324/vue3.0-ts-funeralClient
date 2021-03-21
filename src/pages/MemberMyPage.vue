<template>
  <TitleBar>My Page</TitleBar>

  <section class="section section-member-join-form px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <div v-if="globalShare.isLogined" v-on:submit.prevent="checkAndJoin">
          <div title="프로필 이미지">
            <img class="h-96 rounded-lg object-cover object-center" :src="'http://localhost:8090' + state.member.extra__thumbImg">
          </div>
          <div title="회원유형">
            <p>회원유형</p>
            {{state.member.authLevel}}
          </div>
          <div title="아이디">
            <p>아이디</p>
            {{state.member.loginId}}
          </div>
          <div title="이름">
            <p>이름</p>
            {{state.member.name}}
          </div>
          <div title="닉네임">
            <p>닉네임</p>
            {{state.member.nickname}}
          </div>
          <div title="전화번호">
            <p>전화번호</p>
            {{state.member.cellphoneNo}}
          </div>
          <div title="이메일">
            <p>이메일</p>
            {{state.member.email}}
          </div>
          <div title="주소">
            <p>주소</p>
            {{state.member.address}}
          </div>
          <div>
            <div class="btns">
              <router-link class="btn-secondary" :to="'/member/doModify?id=' + state.member.id">회원정보수정</router-link>
              <router-link class="btn-danger" to="member/doDelete">탈퇴</router-link>
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
import { IMember } from '../types'

export default defineComponent({
  name: 'MemberMyPage',
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
      member: {} as IMember
    });

    function loadMember(id:number) {
      mainApi.member_detail(id)
      .then(axiosResponse => {
        state.member = axiosResponse.data.body.member;
      });
    }
    onMounted(() => {
      loadMember(props.id);
    });
    watch(() => props.id, (newValue, oldValue) => {
      loadMember(props.id);
    })

    return {
      state,
    }
  }
})
</script>

<style scoped>
</style> 