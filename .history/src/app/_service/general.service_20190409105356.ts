import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  isUserExist=false;
  ip=environment.ip;

  constructor(private http: Http) {

    let user=localStorage.getItem('Authorized');
    if(user){
      this.isUserExist=true;
    }


   }

isUserLoginIn(){
  return this.isUserExist;
}

  headerCTJson(userId) {
    let header = new Headers({'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': true});
    header.append("userId",userId)
    // let header = new Headers({'userId':'80'});

    // let header =  new Headers({ 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    // 'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    // 'Access-Control-Allow-Credentials': true });
    // header.append('userId','80')

    return header;
  }

  // public getData(){
  //   let url=this.ip+'shopFacia?regionId&zoneId&startDate=2018-07-01&endDate=2018-07-01&shopIds=undefined&assetIds=undefined&competId=1&primId=1&channelId=undefined&json=y';
  //   // let httpOption = this.headerCTJson('');
  //   // const option = new RequestOptions({ headers: httpOption });
  //   return this.http.post(url,null).map(
  //     response => response.json()
  //   );
  // }

  public getDataByDateRange(range: any) {
    let url = this.ip+'clientShopFacia';
    let headers = this.headerCTJson(80);
    // let option1 = new RequestOptions({ headers: httpOption });
    // console.log(option1)
    // ,{headers:headers}
    return this.http.post(url, range).map(
      response => response.json()
    );


  }


  login(login){
    let cradentials={userName:'',password:''}

    let url = this.ip + 'pictureLogin';
     let httpOption = this.headerCTJson('');
    const option = new RequestOptions({ headers: httpOption });
    return this.http.post(url,cradentials).map(
      response => response.json()
    );

  }


  getZone(uId:any){
    var filter=JSON.stringify({act:0,userId:uId});
    let url = this.ip+'loadFilters';
    let httpOption = this.headerCTJson('');
    const option = new RequestOptions({ headers: httpOption });
    return this.http.post(url,filter).map(response => response.json());

  }

  getRegion(zoneId,uId:any){
    var filter=JSON.stringify({act:1,zoneId:zoneId,userId:uId});
    let url = this.ip+'loadFilters';
    let httpOption = this.headerCTJson('');
    const option = new RequestOptions({ headers: httpOption });
    return this.http.post(url,filter ).map(
      response => response.json()
    );

  }

  getCities(regionId,uId:any){
    var filter=JSON.stringify({act:2,regionId:regionId,userId:uId});
    let url = this.ip+'loadFilters';
    let httpOption = this.headerCTJson('');
    const option = new RequestOptions({ headers: httpOption });
    return this.http.post(url,filter ).map(
      response => response.json()
    );

  }

  getCategories(channelId,uId:any){
    var filter=JSON.stringify({act:3,channelId:channelId,userId:uId});
    let url = this.ip+'loadFilters';
    let httpOption = this.headerCTJson('');
    const option = new RequestOptions({ headers: httpOption });
    return this.http.post(url,filter ).map(
      response => response.json()
    );

  }
  getMerchandiser(cityId,uId:any){
    var filter=JSON.stringify({act:4,cityId:cityId,userId:uId});
    let url = this.ip+'loadFilters';
    let httpOption = this.headerCTJson('');
    const option = new RequestOptions({ headers: httpOption });
    return this.http.post(url,filter ).map(
      response => response.json()
    );

  }

  getDetailDataForShop(shopId:any,uId:any){
// debugger
    let obj={      
        shop_id:shopId,
        survey_id:-1,
        zone:'',
        region:'',
        city:'',
        channel_name:'',
        asset_name:'',
        image_type:'',
        userId:uId
        
    }
    let url = this.ip+'shopfacia-details';
    return this.http.post(url,JSON.stringify(obj) ).map(
      response => response.json()
    );

  }

  
  getSuperSearch(search:String,uId){

    let obj={      
        shop_name:search,
        zone:'',
        region:'',
        city:'',
        channel_name:'',
        asset_name:'',
        image_type:'',
        userId:uId
        
    }


    let url = this.ip+'shopfacia-details';
    return this.http.post(url,JSON.stringify(obj) ).map(
      response => response.json()
    );

  }
}
