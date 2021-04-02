<template>
  <TitleBar>Profile Page</TitleBar>

  <section class="section section-expert-join-form px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <div>
          <div title="프로필 이미지">
            <img v-if="state.expert.extra__thumbImg != null" class="h-96 rounded-lg object-cover object-center" :src="'http://localhost:8090' + state.expert.extra__thumbImg">
            <img v-if="state.expert.extra__thumbImg == null" class="h-96 rounded-lg object-cover object-center" :src="'http://via.placeholder.com/300?text=NoImage'">
          </div>
          <div title="회원유형">
            <p>회원유형</p>
            장례지도사
          </div>
          <div title="아이디">
            <p>아이디</p>
            {{state.expert.loginId}}
          </div>
          <div title="이름">
            <p>이름</p>
            {{state.expert.name}}
          </div>
          <div title="전화번호">
            <p>전화번호</p>
            {{state.expert.cellphoneNo}}
          </div>
          <div title="이메일">
            <p>이메일</p>
            {{state.expert.email}}
          </div>
          <div title="주소">
            <p>주소</p>
            {{state.expert.region}}
          </div>
          <div v-if="globalShare.isLogined">
            <div class="btns">
              <router-link :to="'/order/doAdd?experId=' + state.expert.id + '&clientId=' + globalShare.loginedClient.id" class="block btn-primary mt-2 h-10 w-full rounded-md">
                의뢰요청
              </router-link>
              <router-link :to="'/review/doAdd?relTypeCode=expert&relId=' + state.expert.id" class="block btn-secondary mt-2 h-10 w-full rounded-md">
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
import { IExpert } from '../types'

export default defineComponent({
  name: 'ExpertProfile',
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
      expert: {} as IExpert
    });

    function loadExpert(id:number) {
      mainApi.expert_detail(id)
      .then(axiosResponse => {
        state.expert = axiosResponse.data.body.expert;
      });
    }
    onMounted(() => {
      loadExpert(props.id);
    });
    watch(() => props.id, (newValue, oldValue) => {
      loadExpert(props.id);
    })

    return {
      state,
    }
  }
})
</script>

<style scoped>
</style> 