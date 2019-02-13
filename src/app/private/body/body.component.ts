import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from 'src/app/_service/general.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ActivatedRoute, Params } from '@angular/router';

import { NgxDrpOptions, PresetItem, Range } from 'ngx-mat-daterange-picker';
import { ModalDirective } from 'ngx-bootstrap';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  //#region variables
  @ViewChild('dateRangePicker') dateRangePicker;

  @ViewChild('productDetailModal') productDetailModal: ModalDirective;
  

 
  range: Range = { fromDate: new Date(), toDate: new Date() };
  options: NgxDrpOptions;
  presets: Array<PresetItem> = [];

  allData: any = [];
  searchFilter = '';
  allDataClone: any[];

  p: number = 1;
  d: number = 1;
  filterModel: any = {};
  ip = environment.ip;
  rangeDates: any;
  // range: any;
  filterProducts: any;
  singleShopSelected: boolean = false;
  selelctedShop: any = {};
  currentRange: any;
  loading = true;
  successTrigger = false;
  errorTrigger = false;
  myMessage: any;
  zones: any = [];
  selectedZone: any = {};
  loadingData = true;
  regions: any = [];
  selectedRegion: any = {};
  cities: any = []
  selectedCity: any = {};

  categories: any = [];
  selectedCategory = [];

  chanels: any = [];
  selectedChanel: any = {};
  wrongRange: boolean = false;
  uId: number = 0;
  filterData: any[] = [];
  allDataSelectedShop: any[]=[];
  selectedProduct: any={};

  imageLoading=false;
  shopClassification: string='';

  //#endregion

  constructor(private route: ActivatedRoute, private generalService: GeneralService) {  }

  ngOnInit() {
    this.uId =JSON.parse(localStorage.getItem('userId'));


    this.getZoneList();
    var d = new Date();
    var s = moment(d).subtract(1, 'day').format('YYYY-MM-DD');
    var e = moment(d).subtract(1, 'day').format('YYYY-MM-DD');
    this.currentRange = JSON.stringify({ startDate: s, endDate: e, userId: this.uId });
    console.log('contructor date range', this.currentRange);
    this.getData(this.currentRange);
    this.currentRange = JSON.parse(this.currentRange)

    const today = new Date();
    today.setDate(today.getDate()-1);
    // const fromMin = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    // const fromMax = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    // const toMin = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    // const toMax = new Date(today.getFullYear(), today.getMonth() + 2, 0);

    this.setupPresets();
    this.options = {
      presets: this.presets,
      format: 'mediumDate',
      range: { fromDate: today, toDate: today },
      applyLabel: "Submit",
      calendarOverlayConfig: {
        shouldCloseOnBackdropClick: false,

        // hasBackDrop: false
      },
      // fromMinMax: { fromDate: fromMin, toDate: fromMax },
      // toMinMax: { fromDate: toMin, toDate: toMax },
       // cancelLabel: "Cancel",
      // excludeWeekends:true,

    };
  }


  //#region date range
  updateRange(range: Range) {
    this.loadingData = true;
    this.range = range;
    // console.log("update range", this.range);
    var s = moment(this.range.fromDate).format('YYYY-MM-DD');
    var e = moment(this.range.toDate).format('YYYY-MM-DD');


    this.currentRange = JSON.stringify({ startDate: s, endDate: e, userId: this.uId });
    // console.log('contructor date currentRange', this.currentRange);
    if (s <= e) {
      this.getData(this.currentRange);
    }

    else {
      this.wrongRange = true;

      setTimeout(() => {
        this.wrongRange = false;

      }, 4000);
    }
    this.currentRange = JSON.parse(this.currentRange);

  }

  setupPresets() {

    const backDate = (numOfDays) => {
      const today = new Date();
      return new Date(today.setDate(today.getDate() - numOfDays));
    }

    const today = new Date();
    const yesterday = backDate(1);
    const minus7 = backDate(7)
    const minus30 = backDate(30);
    const currMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const currMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    // this.presets = [
    //   { presetLabel: "Yesterday", range: { fromDate: yesterday, toDate: today } },
    //   { presetLabel: "Last 7 Days", range: { fromDate: minus7, toDate: today } },
    //   { presetLabel: "Last 30 Days", range: { fromDate: minus30, toDate: today } },
    //   { presetLabel: "This Month", range: { fromDate: currMonthStart, toDate: currMonthEnd } },
    //   { presetLabel: "Last Month", range: { fromDate: lastMonthStart, toDate: lastMonthEnd } }
    // ]
  }
  // #endregion

  getShop(shop) {

    // console.log(shop);
    this.allData = [];
    this.allData = this.allDataClone;
    this.singleShopSelected = true;
    this.selelctedShop = shop;
    // localStorage.setItem('selelctedShop',JSON.stringify(this.selelctedShop))

    let filterData: any = [];
    filterData = this.allDataClone.filter(d => d.shopId === shop.shopId);
    console.log("shopes", filterData)
    if (filterData.length > 0)
    {
      this.allDataSelectedShop = filterData;
      // localStorage.setItem('allDataSelectedShop',JSON.stringify(filterData))
    }

    window.scroll(0, 0);
  // window.scroll(0,0);

  // window.open('/shop/'+shop.shopId,'_blank')
  }
  
  zoneChange() {
    this.regions=[];
    this.cities=[];
    this.chanels=[];
    this.loadingData = true;
    this.allData = this.allDataClone;
    // console.log('selected zone', this.selectedZone, this.allData[0]);
    this.filterData = [];
    this.generalService.getRegion(this.selectedZone.id, this.uId).subscribe(data => {
      this.regions = data;
      // this.filterAllData();
    }, error => {

    });
    this.filterData = this.allData.filter(d => d.zone == this.selectedZone.title);
    // console.log("after zone selected", filterData)

    this.allData = this.filterData;
    this.loadingData = false;

  }

  getCategoryName(product) {

    return product.assetName;//product.assetItemList[0].value;

  }

  regionChange() {
    this.loadingData = true;

    this.allData = this.allDataClone;
    this.filterData = [];
    // console.log('regions id', this.selectedRegion);
    this.generalService.getCities(this.selectedRegion.id, this.uId).subscribe(data => {
      this.cities = data[0];
      console.log('cities list', data);
      this.chanels = data[1];
      // this.filterAllData();

    }, error => {

    });

    this.filterData = this.allData.filter(d => d.zone == this.selectedZone.title && d.region == this.selectedRegion.title);
    this.allData = this.filterData;
    this.loadingData = false;

  }

  cityChange() {
    this.loadingData = true;
    // console.log("seelcted city", this.selectedCity);
    this.allData = this.allDataClone;
    this.filterData = [];
    this.filterData = this.allData.filter(d => d.zone == this.selectedZone.title && d.region === this.selectedRegion.title && (d.city == this.selectedCity.title));
    this.allData = this.filterData;
    this.loadingData = false;


  }

  chanelChange() {
    // console.log("seelcted chanel", this.selectedChanel);
    // this.generalService.getCategories(this.selectedChanel,this.uId).subscribe(data => {
    //   this.categories = data;
    //   // this.filterAllData();

    // }, error => { });
    this.allData = this.allDataClone;
    this.filterData= [];
    // console.log(this.allData[0])
    this.filterData = this.allData.filter(d => d.zone == this.selectedZone.title && d.region === this.selectedRegion.title && (d.areaPmpkl == this.selectedChanel.areaPmpkl));
    this.allData = this.filterData;


  }

  getall() {
    this.singleShopSelected = false;
    // this.loadingData=false;
    // console.log('get alla called',this.allDataClone)

    if(this.filterData.length>0)
    this.allData = this.filterData;    
    else
     this.allData=this.allDataClone;
  }


  getZoneList() {
    this.generalService.getZone(this.uId).subscribe(data => {
      // console.log('zone list', data)
      this.zones = data;
    }, error => {
      // console.log("zone list error", error);
      // let er = JSON.parse(error._body)
      // this.myMessage = er.description//'Username OR password is invalid.';
      // this.errorTrigger = true;
      // this.loading = false;
      // setTimeout(() => {
      //   this.errorTrigger = false;

      // }, 3000);
    });
  }

  getData(range) {
    this.selectedCity = {};
    this.selectedRegion = {};
    this.selectedCategory = [];
    this.selectedZone = {};

    this.generalService.getDataByDateRange(range).subscribe(data => {
      console.log('data',data)
      this.allData = data;
      this.allDataClone = this.allData.slice();
      console.log(this.allData[0]);
      if (this.allData.length == 0) {
        this.successTrigger = true;
        this.myMessage = 'No Data Found';

      }
      this.loading = false;
      setTimeout(() => {
        this.loadingData = false;

      }, 5000);

    }, error => {
      console.log('error body',error);
      // let er = JSON.parse(error._body)
      // this.myMessage = er.description//'Username OR password is invalid.';
      // this.errorTrigger = true;
      this.loading = false;
      setTimeout(() => {
        this.errorTrigger = false;

      }, 3000);

    });
  }

  getRandumHeightWidth() {
    // console.log('randum height',Math.floor(Math.random() * 40) + 300)
    return { height: Math.floor(Math.random() * 200) + 100 + 'px', width: Math.floor(Math.random() * 400) + 200 + 'px' }
    // ;
  }

  getDetailProdutsForShop(shop) {
    this.loadingData=true;
    // debugger
    this.generalService.getDetailDataForShop(shop,this.uId).subscribe(data => {
      // this.allDataSelectedShop = [];
      this.allDataSelectedShop = data
      this.loadingData=false;        

      
    }, error => {

    })
  }

  getAlert(product) {
    this.selectedProduct = product;
    this.showProductDetailModal();
    this.imageLoading=true;
    setTimeout(() => {

      this.imageLoading=false;
      
    }, 2000);
  }

  showProductDetailModal(): void {
    this.productDetailModal.show();
  }

  hideProductDetailModal(): void {
    this.productDetailModal.hide();
  }

  getAllDataClassification(shopClassification:string){

    // console.log(shopClassification);
    // console.log('all data',this.allData);
    // console.log('filter data',this.filterData);
    // this.allData = this.allDataClone;
    this.shopClassification=shopClassification

    if(this.filterData.length==0 && this.allData.length>0)
    {
       this.allData=this.allDataClone
    
    }
    else if(this.filterData.length>0){
      this.allData=this.filterData

    }

   if(shopClassification == '') {
      this.allData=this.allDataClone
    }
    else if(shopClassification != ''){
      let d= this.allData.filter(d => d.shopClassification === shopClassification);
      this.allData = d;
    }

    
    
      // this.filterData= [];

  
      // 
     
      
    
   

    
  }

  getSuperSearch(search:string){
    console.log(search);
    
    if(search.length>1){
    this.loadingData=true;

      this.generalService.getSuperSearch(search).subscribe(data=>{
        console.log('search date',data)
        this.allData=data;
        this.loadingData=false;
      },error=>{});
    }
    else if(search.length<=1){
      this.allData=this.allDataClone;

    }
   
  }
// categoryChange() {
  //   console.log(this.selectedCategory);
  //   this.allData = [];
  //   this.allData = this.allDataClone;
  //   let filterData: any = [];

  //   this.selectedCategory.forEach(e => {
  //     var ft = this.allData.filter(d => d.assetName === e.title && d.imageType === 'Primary');
  //     filterData.push(ft)

  //   });
  //   if (filterData[2]) {
  //     this.allData = filterData[0].concat(filterData[1]).concat(filterData[2]);
  //     console.log("triple filter list", this.allData)

  //   }
  //   else if (filterData[1]) {
  //     this.allData = filterData[0].concat(filterData[1]);
  //     console.log("double filter list", this.allData)


  //   }
  //   else if
  //     (filterData[0]) {
  //     this.allData = filterData[0];
  //     console.log("single filter list", this.allData)


  //   }


  // }

  // filterAllData() {
  //   this.loadingData = true;

  //   // this.allData = [];
  //   this.allData = this.allDataClone;
  //   let filterData: any = [];
  //   let zone = (this.selectedZone != {}) ? this.selectedZone.title : '';
  //   let region = (this.selectedRegion != {}) ? this.selectedRegion.title : '';
  //   let city = (this.selectedCity != {}) ? this.selectedCity.title : '';
  //   let chanel = (this.selectedChanel != {}) ? this.selectedChanel.title : '';

  //   console.log("current zone is", zone)
  //   console.log("current region is", region)
  //   console.log("current city is", city)

  //   let i = 0;
  //   this.allData.forEach(e => {
  //     if (zone != undefined && region == undefined && city == undefined && chanel == undefined)
  //       filterData = this.allData.filter(d => d.zone === zone);

  //     else if (zone != undefined && region != undefined && city == undefined && chanel == undefined)
  //       filterData = this.allData.filter(d => d.zone === zone && d.region === region && chanel == undefined);

  //     else if (zone != undefined && region != undefined && city != undefined && chanel == undefined)
  //       filterData = this.allData.filter(d => d.zone === zone && d.region === region && d.city === city);

  //     else if (zone != undefined && region != undefined && city != undefined && chanel != undefined)
  //       filterData = this.allData.filter(d => d.zone === zone && d.region === region && d.city === city && d.channelName === chanel);

  //   });

  //   this.allData = filterData;

  //   setTimeout(() => {
  //     this.loadingData = false;
  //   }, 4000);

  // }
}
