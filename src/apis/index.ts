//axios 설치해야 함 
//npm i axios
//npm i @types/axios 도 설치해야함 
//axios: ajax통신을 받아오는 것
//@types/axios: typescript에서 axios를 다루는데 도움이 되는 정보들
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {IOrder, IClient, IExpert, IAssistant, IReview, IFuneral} from '../types'

// API 원형
abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(instance: AxiosInstance) {
    this.instance = instance;

    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  private _initializeRequestInterceptor() {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  };

  private _initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  };

  protected _handleRequest(config:AxiosRequestConfig) : AxiosRequestConfig {
    return config;
  }

  protected _handleResponse(axiosResponse:AxiosResponse) : AxiosResponse {
    return axiosResponse;
  }

  protected _handleError(error: AxiosError) {
    if (error.response) {
      // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
      alert('요청을 처리하는 중에 오류가 발생하였습니다.');
    }
    else if (error.request) {
      // 요청이 이루어 졌으나 응답을 받지 못했습니다.
      // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
      // Node.js의 http.ClientRequest 인스턴스입니다.
      alert('서버 또는 네트워크의 상태가 좋지 않습니다.');
    }
    else {
      // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
      console.log('Error', error.message);
    }

    return Promise.reject(error);
  };

  // get전송으로 바로 전송하기 위한 로직
  public get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.get(url, config);
  }

  // POST전송으로 전송하기 위한 로직
  public postByForm<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    const params = new URLSearchParams();

    for ( let key in data ) {
      params.append(key, data[key]);
    }

    config =  {} as AxiosRequestConfig;

    config.headers = {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    };

    return this.instance.post(url, params, config);
  }

  // POST전송으로 바로 전송하기 위한 로직
  public post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.post(url, data, config);
  }

}

// 응답타입1
interface Base__IResponseBodyType1 {
  resultCode:string;
  msg:string;
  fail:boolean;
  success:boolean;
}

// /usr/article/list 의 응답 타입
export interface MainApi__order_list__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    orders: IOrder[]
  };
}

// /usr/article/list 의 응답 타입
export interface MainApi__funeral_list__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    funerals: IFuneral[]
  };
}

// /usr/article/list 의 응답 타입
export interface MainApi__funeral_myList__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    funerals: IFuneral[]
  };
}

// /usr/article/detail 의 응답 타입
export interface MainApi__order_detail__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    order: IOrder
  };
}

// /usr/member/doJoin 의 응답 타입
export interface MainApi__client_doJoin__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    id: number
  };
}

// /usr/member/doJoin 의 응답 타입
export interface MainApi__expert_doJoin__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    id: number
  };
}

// /usr/member/doJoin 의 응답 타입
export interface MainApi__assistant_doJoin__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    id: number
  };
}

// /common/genFile/doUpload 의 응답 타입
export interface MainApi__common_genFile_doUpload__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    genFileIdsStr: string
  };
}

// /usr/member/authKey 의 응답 타입
export interface MainApi__client_authKey__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    authKey : string,
    client : IClient,
  };
}

// /usr/member/authKey 의 응답 타입
export interface MainApi__expert_authKey__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    authKey : string,
    expert : IExpert,
  };
}


// /usr/member/authKey 의 응답 타입
export interface MainApi__assistant_authKey__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    authKey : string,
    assistant : IAssistant,
  };
}

// /usr/member/list 의 응답 타입
export interface MainApi__expert_list__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    //응답을 받기위해선 key명이 백엔드와 동일해야 함
    //또한 백엔드로부터 ResultData와 같이 json형태로 받아야 함
    //ex) return new ResultData("S-1", "성공", "members", members);
    experts: IExpert[]
  };
}

// /usr/member/list 의 응답 타입
export interface MainApi__assistant_list__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    //응답을 받기위해선 key명이 백엔드와 동일해야 함
    //또한 백엔드로부터 ResultData와 같이 json형태로 받아야 함
    //ex) return new ResultData("S-1", "성공", "members", members);
    assistants: IAssistant[]
  };
}

// /usr/member/detail 의 응답 타입
export interface MainApi__client_detail__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    client: IClient
  };
}

// /usr/member/detail 의 응답 타입
export interface MainApi__expert_detail__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    expert: IExpert
  };
}

// /usr/member/detail 의 응답 타입
export interface MainApi__assistant_detail__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    assistant: IAssistant
  };
}

// /usr/member/doModify 의 응답 타입
export interface MainApi__client_doModify__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    client: IClient,
    id: number
  };
}

// /usr/member/doModify 의 응답 타입
export interface MainApi__expert_doModify__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    expert: IExpert,
    id: number
  };
}

// /usr/member/doModify 의 응답 타입
export interface MainApi__assistant_doModify__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    assistant: IAssistant,
    id: number
  };
}



// /usr/order/doAdd 의 응답 타입
export interface MainApi__order_doAdd__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    id: number
  };
}

// /usr/order/doModify 의 응답 타입
export interface MainApi__order_doModify__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    id: number,
    order: IOrder
  };
}

export interface MainApi__order_changeStepLevel__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    id: number
  };
}

// /usr/review/doAdd 의 응답 타입
export interface MainApi__review_doAdd__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    id: number
  };
}

// /usr/review/doDelete 의 응답 타입
export interface MainApi__review_doDelete__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    id: number
  };
}

// /usr/member/list 의 응답 타입
export interface MainApi__review_list__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    reviews: IReview[]
  };
}

// /usr/rating/doAdd 의 응답 타입
export interface MainApi__rating_doAdd__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    id: number
  };
}



// http://localhost:8090/ 와의 통신장치
export class MainApi extends HttpClient {
  public constructor() {
    super(
      axios.create({
        baseURL:'http://localhost:8090/',
      })
    );
  }

  protected _handleRequest(config:AxiosRequestConfig) {
    config.params = {};
    config.params.authKey = localStorage.getItem("authKey");
    return config;
  };

  protected _handleResponse(axiosResponse:AxiosResponse) : AxiosResponse {
    // 로그인 정보 체크
    // axiosResponse?.data?.resultCode == "F-A" || axiosResponse?.data?.resultCode == "F-B" (초보 버전)
    // axiosResponse?.data?.resultCode == "F-A" => 로그인 정보가 아예 없는 경우
    // axiosResponse?.data?.resultCode == "F-B" => 로그인 정보가 틀린 경우

    // axiosResponse?.data?.resultCode == "F-A" || axiosResponse?.data?.resultCode == "F-B" (초보 버전)
    //["F-A", "F-B"].includes(axiosResponse?.data?.resultCode) (고급 버전)
    
    /* 로그인 정보 체크 후 로그인 화면으로 이동 */
    if (["F-A", "F-B"].includes(axiosResponse?.data?.resultCode)) {
      alert('로그인 후 이용해주세요.');

      //비정상 로그인인 경우 localStorage 초기화
      localStorage.removeItem("authKey");
      localStorage.removeItem("loginedClientId");
      localStorage.removeItem("loginedClientName");
      localStorage.removeItem("loginedClientProfileImgUrl");
      localStorage.removeItem("loginedAssistantId");
      localStorage.removeItem("loginedAssistantName");
      localStorage.removeItem("loginedAssistantProfileImgUrl");
      localStorage.removeItem("loginedExpertId");
      localStorage.removeItem("loginedExpertName");
      localStorage.removeItem("loginedExpertProfileImgUrl");

      location.replace('/usr/home/main');
    }

    return axiosResponse;
  }

  // http://localhost:8090/usr/article/list?boardId=? 를 요청하고 응답을 받아오는 함수
  public order_list(memberId:number, memberType:string) {
    return this.get<MainApi__order_list__IResponseBody>(`/usr/order/list?memberId=${memberId}&memberType=${memberType}`);
  }
  // http://localhost:8090/usr/article/list?boardId=? 를 요청하고 응답을 받아오는 함수
  public funeral_list() {
    return this.get<MainApi__funeral_list__IResponseBody>(`/usr/funeral/list`);
  }
  // http://localhost:8090/usr/article/list?boardId=? 를 요청하고 응답을 받아오는 함수
  public funeral_myList(memberId:number, memberType:string) {
    return this.get<MainApi__funeral_myList__IResponseBody>(`/usr/funeral/myList?memberId=${memberId}&memberType=${memberType}`);
  }

  // http://localhost:8090/usr/detail/id?id=? 를 요청하고 응답을 받아오는 함수
  public order_detail(id: number) {
    return this.get<MainApi__order_detail__IResponseBody>(`/usr/order/detail?id=${id}`);
  }

  // http://localhost:8090/usr/member/doOrder/loginId=?&loginPw=?...... 를 요청하고 응답을 받아오는 함수
  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public order_doAdd(title:string, funeralHome:string, head:number, religion:string, startDate:string, endDate:string, body:string, expertId:number, clientId:number) {
    return this.postByForm<MainApi__order_doAdd__IResponseBody>(
      `/usr/order/doAdd`, {
        title,
        funeralHome,
        head,
        religion,
        startDate,
        endDate,
        body,
        expertId,
        clientId
      }
    );
  }

  // http://localhost:8090/usr/member/doOrder/loginId=?&loginPw=?...... 를 요청하고 응답을 받아오는 함수
  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public order_doModify(id:number, title:string, funeralHome:string, head:number, religion:string, startDate:string, endDate:string, body:string, expertId:number, clientId:number) {
    return this.postByForm<MainApi__order_doModify__IResponseBody>(
      `/usr/order/doModify`, {
        id,
        title,
        funeralHome,
        head,
        religion,
        startDate,
        endDate,
        body,
        expertId,
        clientId
      }
    );
  }

  // http://localhost:8090/usr/detail/id?id=? 를 요청하고 응답을 받아오는 함수
  public order_changeStepLevel(id: number, stepLevel: number) {
    return this.get<MainApi__order_changeStepLevel__IResponseBody>(`/usr/order/changeStepLevel?id=${id}&stepLevel=${stepLevel}`);
  }

  
  /* Member 관련 */

  // http://localhost:8024/usr/member/doJoin/loginId=?&loginPw=?...... 를 요청하고 응답을 받아오는 함수
  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public client_doJoin(loginId:string, loginPw:string, name:string, cellphoneNo:string, email:string, region:string, genFileIdsStr:string) {
    return this.postByForm<MainApi__client_doJoin__IResponseBody>(
      `/usr/client/doJoin`, {
        loginId,
        loginPw,
        name,
        cellphoneNo,
        email,
        region,
        genFileIdsStr
      }
    );
  }

  // http://localhost:8024/usr/member/doJoin/loginId=?&loginPw=?...... 를 요청하고 응답을 받아오는 함수
  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public expert_doJoin(loginId:string, loginPw:string, name:string, cellphoneNo:string, email:string, region:string, license:string, career:string, genFileIdsStr:string) {
    return this.postByForm<MainApi__expert_doJoin__IResponseBody>(
      `/usr/expert/doJoin`, {
        loginId,
        loginPw,
        name,
        cellphoneNo,
        email,
        region,
        career,
        license,
        genFileIdsStr
      }
    );
  }

  // http://localhost:8024/usr/member/doJoin/loginId=?&loginPw=?...... 를 요청하고 응답을 받아오는 함수
  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public assistant_doJoin(loginId:string, loginPw:string, name:string, cellphoneNo:string, email:string, region:string, career:string, genFileIdsStr:string) {
    return this.postByForm<MainApi__assistant_doJoin__IResponseBody>(
      `/usr/assistant/doJoin`, {
        loginId,
        loginPw,
        name,
        cellphoneNo,
        email,
        region,
        career,
        genFileIdsStr
      }
    );
  }

  // http://localhost:8024/common/genFile/doUpload=?&profileImg=?...... 를 요청하고 응답을 받아오는 함수
  public common_genFile_doUpload(profileImg:File) {
    const formData = new FormData();
    formData.append("file__member__0__common__attachment__1", profileImg);
    return this.post<MainApi__common_genFile_doUpload__IResponseBody>(
      `/common/genFile/doUpload`, formData
    );
  }

  // http://localhost:8090/usr/member/authKey/loginId=?&loginPw=? 를 요청하고 응답을 받아오는 함수
  public client_authKey(loginId: string, loginPw: string) {
    return this.postByForm<MainApi__client_authKey__IResponseBody>(
      `/usr/client/authKey`, {
        loginId,
        loginPw,
      }
    );
  }

  // http://localhost:8090/usr/member/authKey/loginId=?&loginPw=? 를 요청하고 응답을 받아오는 함수
  public expert_authKey(loginId: string, loginPw: string) {
    return this.postByForm<MainApi__expert_authKey__IResponseBody>(
      `/usr/expert/authKey`, {
        loginId,
        loginPw,
      }
    );
  }

  // http://localhost:8090/usr/member/authKey/loginId=?&loginPw=? 를 요청하고 응답을 받아오는 함수
  public assistant_authKey(loginId: string, loginPw: string) {
    return this.postByForm<MainApi__assistant_authKey__IResponseBody>(
      `/usr/assistant/authKey`, {
        loginId,
        loginPw,
      }
    );
  }

  // http://localhost:8090/usr/detail/id?id=? 를 요청하고 응답을 받아오는 함수
  public client_detail(id: number) {
    return this.get<MainApi__client_detail__IResponseBody>(`/usr/client/detail?id=${id}`);
  }

  // http://localhost:8090/usr/detail/id?id=? 를 요청하고 응답을 받아오는 함수
  public expert_detail(id: number) {
    return this.get<MainApi__expert_detail__IResponseBody>(`/usr/expert/detail?id=${id}`);
  }

  // http://localhost:8090/usr/detail/id?id=? 를 요청하고 응답을 받아오는 함수
  public assistant_detail(id: number) {
    return this.get<MainApi__assistant_detail__IResponseBody>(`/usr/assistant/detail?id=${id}`);
  }

  // http://localhost:8090/usr/member/list?boardId=? 를 요청하고 응답을 받아오는 함수
  public expert_list() {
    return this.get<MainApi__expert_list__IResponseBody>(`/usr/expert/list`);
  }

  // http://localhost:8090/usr/member/list?boardId=? 를 요청하고 응답을 받아오는 함수
  public assistant_list() {
    return this.get<MainApi__assistant_list__IResponseBody>(`/usr/assistant/list`);
  }

  // http://localhost:8024/usr/member/doJoin/loginId=?&loginPw=?...... 를 요청하고 응답을 받아오는 함수
  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public client_doModify(id:number, loginId:string, loginPw:string, name:string, cellphoneNo:string, email:string, region:string, genFileIdsStr:string) {
    return this.postByForm<MainApi__client_doModify__IResponseBody>(
      `/usr/client/doModify`, {
        id,
        loginId,
        loginPw,
        name,
        cellphoneNo,
        email,
        region,
        genFileIdsStr
      }
    );
  }

  // http://localhost:8024/usr/member/doJoin/loginId=?&loginPw=?...... 를 요청하고 응답을 받아오는 함수
  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public expert_doModify(id:number, loginId:string, loginPw:string, name:string, cellphoneNo:string, email:string, acknowledgment_step:string, region:string, license:string, career:string, genFileIdsStr:string) {
    return this.postByForm<MainApi__expert_doModify__IResponseBody>(
      `/usr/expert/doModify`, {
        id,
        loginId,
        loginPw,
        name,
        cellphoneNo,
        email,
        acknowledgment_step,
        region,
        license,
        career,
        genFileIdsStr
      }
    );
  }

  // http://localhost:8024/usr/member/doJoin/loginId=?&loginPw=?...... 를 요청하고 응답을 받아오는 함수
  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public assistant_doModify(id:number, loginId:string, loginPw:string, name:string, cellphoneNo:string, email:string, region:string, career:string, genFileIdsStr:string) {
    return this.postByForm<MainApi__assistant_doModify__IResponseBody>(
      `/usr/client/doModify`, {
        id,
        loginId,
        loginPw,
        name,
        cellphoneNo,
        email,
        region,
        career,
        genFileIdsStr
      }
    );
  }


  // http://localhost:8090/usr/member/doOrder/loginId=?&loginPw=?...... 를 요청하고 응답을 받아오는 함수
  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public review_doAdd(relTypeCode:string, relId:number, body:string, clientId:number) {
    return this.postByForm<MainApi__review_doAdd__IResponseBody>(
      `/usr/review/doAdd`, {
        relTypeCode,
        relId,
        body,
        clientId,
        
      }
    );
  }

  // http://localhost:8090/usr/member/list?boardId=? 를 요청하고 응답을 받아오는 함수
  public review_doDelete(id:number) {
    return this.get<MainApi__review_doDelete__IResponseBody>(`/usr/review/doDelete?id=${id}`);
  }

  // http://localhost:8090/usr/member/list?boardId=? 를 요청하고 응답을 받아오는 함수
  public review_list(relTypeCode:string) {
    return this.get<MainApi__review_list__IResponseBody>(`/usr/review/list?relTypeCode=${relTypeCode}`);
  }
   

  // http://localhost:8090/usr/member/doOrder/loginId=?&loginPw=?...... 를 요청하고 응답을 받아오는 함수
  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public rating_doAdd(relTypeCode:string, relId:number, point:number, clientId:number) {
    return this.postByForm<MainApi__rating_doAdd__IResponseBody>(
      `/usr/rating/doAdd`, {
        relTypeCode,
        relId,
        point,
        clientId,
        
      }
    );
  }

} 

