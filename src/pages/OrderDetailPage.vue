<template>

  <TitleBar>요청사항 페이지</TitleBar>

  <section class="section section-order-write-form-box px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <div v-if="(state.order.id !== undefined && globalShare.loginedMember.id === state.order.clientId) || (state.order.id !== undefined && globalShare.loginedMember.id === state.order.directorId)">
          <div title="제목">
            <div>
              제목 : 
              {{state.order.title}}
            </div>
          </div>
          <div>
            <div>
              의뢰인 :
              {{state.order.extra__member}}
            </div>
          </div>
          <div title="옵션1">
            <div>
              옵션1: {{state.order.option1}} / 수량: {{ state.order.option1qty}}
            </div>
          </div>
          <div title="옵션2">
            <div>
              옵션2: {{state.order.option2}} / 수량: {{ state.order.option2qty}}
            </div>
          </div>
          <div title="옵션3">
            <div>
              옵션3: {{state.order.option3}} / 수량: {{ state.order.option3qty}}
            </div>
          </div>
          <div title="옵션4">
            <div>
              옵션4: {{state.order.option4}} / 수량: {{ state.order.option4qty}}
            </div>
          </div>
          <div title="옵션5">
            <div>
              옵션5: {{state.order.option5}} / 수량: {{ state.order.option5qty}}
            </div>
          </div>
          <div>
            <div class="btns">
              <button class="btn-primary">수정</button>
              <button class="btn-primary">취소</button>
            </div>
          </div>
        </div>
        <!-- 의뢰인/전문가 구분방법 고민 필요... -->
        <div v-if="globalShare.loginedMember.id !== state.order.clientId || globalShare.loginedMember.id !== state.order.directorId">
          <p>해당 요청페이지에 대한 권한이 없습니다.</p>
          <router-link class="btn-link" to="/home/main">홈</router-link>으로 이동
        </div>
        <div v-if="globalShare.loginedMember.id == null">
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