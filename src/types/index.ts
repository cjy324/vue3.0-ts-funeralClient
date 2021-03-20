export interface IOrder {
  id:number;
  regDate:string;
  updateDate:string;
  option1:string;
	option1qty:number;
	option2:string;
	option2qty:number;
	option3:string;
	option3qty:number;
	option4:string;
	option4qty:number;
	option5:string;
	option5qty:number;
	title:string;
	body:string;
	directorId:number;
	clientId:number;
  extra__member:string;
}

export interface IMember {
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
  address:string;
  extra__thumbImg:string;
}
