//axios 설치해야 함 
//npm i axios
//npm i @types/axios 도 설치해야함 
//axios: ajax통신을 받아오는 것
//@types/axios: typescript에서 axios를 다루는데 도움이 되는 정보들
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {IArticle, IDirector, IClient} from '../types'

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
export interface MainApi__article_list__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    articles: IArticle[]
  };
}

// /usr/article/detail 의 응답 타입
export interface MainApi__article_detail__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    article: IArticle
  };
}

// /usr/member/doJoin 의 응답 타입
export interface MainApi__client_doJoin__IResponseBody extends Base__IResponseBodyType1 {
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

// /usr/member/list 의 응답 타입
export interface MainApi__director_list__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    directors: IDirector[]
  };
}

// /usr/member/doOrder 의 응답 타입
export interface MainApi__client_doOrder__IResponseBody extends Base__IResponseBodyType1 {
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
      localStorage.removeItem("loginedClientNickname");
      localStorage.removeItem("loginedClientProfileImgUrl");

      location.replace('/usr/client/login');
    }

    return axiosResponse;
  }

  // http://localhost:8090/usr/article/list?boardId=? 를 요청하고 응답을 받아오는 함수
  public article_list(boardId: number) {
    return this.get<MainApi__article_list__IResponseBody>(`/usr/article/list?boardId=${boardId}`);
  }

  // http://localhost:8090/usr/detail/id?id=? 를 요청하고 응답을 받아오는 함수
  public article_detail(id: number) {
    return this.get<MainApi__article_detail__IResponseBody>(`/usr/article/detail?id=${id}`);
  }



  
  /* Member 관련 */

  // http://localhost:8024/usr/member/doJoin/loginId=?&loginPw=?...... 를 요청하고 응답을 받아오는 함수
   // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
   public client_doJoin(loginId:string, loginPw:string, name:string, nickname:string, cellphoneNo:string, email:string, address_state:string, address_city:string, address_street:string, genFileIdsStr:string) {
    return this.postByForm<MainApi__client_doJoin__IResponseBody>(
      `/usr/client/doJoin`, {
        loginId,
        loginPw,
        name,
        nickname,
        cellphoneNo,
        email,
        address_state,
        address_city,
        address_street,
        genFileIdsStr
      }
    );
  }

  // http://localhost:8024/common/genFile/doUpload=?&profileImg=?...... 를 요청하고 응답을 받아오는 함수
  public common_genFile_doUpload(profileImg:File) {
    const formData = new FormData();
    formData.append("file__client__0__common__attachment__1", profileImg);
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


  // http://localhost:8090/usr/member/list?boardId=? 를 요청하고 응답을 받아오는 함수
  public director_list() {
    return this.get<MainApi__director_list__IResponseBody>(`/usr/director/list`);
  }

   // http://localhost:8090/usr/member/doOrder/loginId=?&loginPw=?...... 를 요청하고 응답을 받아오는 함수
   // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public client_doOrder(option1:string, option1qty:number, option2:string, option2qty:number, option3:string, option3qty:number, option4:string, option4qty:number, option5:string, option5qty:number, body:string, directorId:number, clientId:number) {
    return this.postByForm<MainApi__client_doOrder__IResponseBody>(
      `/usr/client/doOrder`, {
    option1,
    option1qty,
    option2,
    option2qty,
    option3,
    option3qty,
    option4,
    option4qty,
    option5,
    option5qty,
    body,
    directorId,
    clientId
      }
    );
  }

  

} 

