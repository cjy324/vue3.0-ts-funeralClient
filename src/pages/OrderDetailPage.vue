<template>

  <TitleBar>요청사항 페이지</TitleBar>

  <section class="section section-order-write-form-box px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <div v-if="state.order.id !== undefined && globalShare.loginedClient.id === state.order.clientId">
          <div title="진행단계">
            <div class="btn-success">
              진행단계 : 
              {{state.order.stepLevel}}
            </div>
          </div>
          <div title="제목">
            <div>
              제목 : 
              {{state.order.title}}
            </div>
          </div>
          <div>
            <div>
              의뢰인 :
              {{state.order.extra__clientName}}
            </div>
          </div>
          <div>
            <div>
              담당지도사 :
              {{state.order.extra__expertName}}
            </div>
          </div>
          <div title="장례식장">
            <div>
              장례식장 : 
              {{state.order.funeralHome}}
            </div>
          </div>
          <div title="예상인원">
            <div>
              예상인원: 
              {{state.order.head}} 
            </div>
          </div>
          <div title="종료">
            <div>
              종교: 
              {{state.order.religion}}
            </div>
          </div>
          <div title="장례기간">
            <div>
              시작일: {{state.order.startDate}} / 종료일: {{ state.order.endDate}}
            </div>
          </div>
          <div title="상세 요청 사항">
            <div>
              상세 요청 사항 : 
              {{state.order.body}}
            </div>
          </div>
          <div>
            <div class="btns mt-2">
              <router-link v-if="globalShare.loginedClient.id === state.order.clientId" class="btn-secondary" :to="'/order/doModify?id=' + state.order.id">수정</router-link>
              <router-link v-if="globalShare.loginedClient.id === state.order.clientId" class="btn-danger" to="doDelete">삭제</router-link>
              <router-link :to="'/order/list?memberId='+ globalShare.loginedClient.id" class="btn-primary">리스트로 가기</router-link>
            </div>
          </div>
        </div>
        <!-- 의뢰인/전문가 구분방법 고민 필요... -->
        <div v-if="globalShare.loginedClient.id !== state.order.clientId">
          <p>해당 요청서에 대한 권한이 없습니다.</p>
          <router-link class="btn-link" to="/home/main">홈</router-link>으로 이동
        </div>
        <div v-if="globalShare.loginedClient.id == null">
          <router-link class="btn-link" to="/member/login">로그인</router-link> 후 이용해주세요.
        </div>
      </div>
    </div>
  </section>


</template>

<script lang="ts">
import { defineComponent, reactive, watch, getCurrentInstance, onMounted } from 'vue'
import { MainApi } from '../apis'
import { IOrder } from '../types'


export default defineComponent({
  name: 'OrderDetailPage',

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

  setup(props){

    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;

    const state = reactive({
      order: {} as IOrder
    });

    function loadOrder(id:number) {
      mainApi.order_detail(id)
      .then(axiosResponse => {
        state.order = axiosResponse.data.body.order;
      });
    }
    onMounted(() => {
      loadOrder(props.id);
    });
    watch(() => props.id, (newValue, oldValue) => {
      loadOrder(props.id);
    })
    
    return {
      state

    }

  }
  
})
</script>

<style scoped>

</style>