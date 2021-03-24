<template>
  <TitleBar>Profile Page</TitleBar>

  <section class="section section-member-join-form px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <div>
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
          <div v-if="globalShare.isLogined">
            <div class="btns">
              <router-link :to="'/order/doAdd?directorId=' + state.member.id + '&clientId=' + globalShare.loginedMember.id" class="block btn-primary mt-2 h-10 w-full rounded-md">
                의뢰요청
              </router-link>
              <router-link :to="'/review/doAdd?relTypeCode=director&relId=' + state.member.id" class="block btn-secondary mt-2 h-10 w-full rounded-md">
                후기/평점 작성
              </router-link>
            </div>
          </div>
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