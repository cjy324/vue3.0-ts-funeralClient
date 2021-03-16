export interface IArticle {
  id:number;
  regDate:string;
  updateDate:string;
  boardId:number;
  memberId:number;
  title:string;
  body:string;
  extra__writer:string;
}

export interface IDirector {
  id:number;
  regDate:string;
  updateDate:string;
  loginId:string;
  loginPw:string;
  authLevel:number;
  authKey:string;
  name:string;
  nickname:string;
  cellphoneNo:string;
  email:string;
  address_state:string;
	address_city:string;
	address_street:string;
  extra__thumbImg:string;
}

export interface IClient {
  id:number;
  regDate:string;
  updateDate:string;
  loginId:string;
  loginPw:string;
  authLevel:number;
  authKey:string;
  name:string;
  nickname:string;
  cellphoneNo:string;
  email:string;
  address_state:string;
	address_city:string;
	address_street:string;
  extra__thumbImg:string;
}