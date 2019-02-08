import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModalDirective } from 'ngx-bootstrap';
import { GeneralService } from 'src/app/_service/general.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent implements OnInit {

  
  @ViewChild('productDetailModal') productDetailModal: ModalDirective;


  allDataSelectedShop:any[]=[];
  selelctedShop:any={};
  singleShopSelected:true;
  selectedProduct: any={};
  ip = environment.ip;
  loadingData: boolean=false;
  imageLoading: boolean=false;
  uId: number=0;
  constructor(private generalService:GeneralService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.uId=JSON.parse(localStorage.getItem('userId'));

    this.allDataSelectedShop=JSON.parse(localStorage.getItem('allDataSelectedShop'));
    this.selelctedShop=JSON.parse(localStorage.getItem('selelctedShop'));
    console.log(this.selelctedShop)
    this.route.params.subscribe(p=>{
      let id=+p['id'];
    console.log(id)

      if(!this.selelctedShop){
      this.loadingData=true;
        this.getDetailProdutsForShop(id);
      // localStorage.clear();
      }

     else if(this.selelctedShop.shopId!=id){
        this.loadingData=true;
          this.getDetailProdutsForShop(id);
        localStorage.clear();
        }
    })

  }
  getCategoryName(product) {

    return product.assetName;

  }
  getDetailProdutsForShop(shopId) {
    console.log('selected shopId ',shopId)

    this.loadingData=true;
    this.generalService.getDetailDataForShop(shopId,this.uId).subscribe(data => {
      console.log('selected data ',data)

      this.allDataSelectedShop = [];
      this.allDataSelectedShop = data;
      
      if(this.allDataSelectedShop.length>0)
      this.selelctedShop=this.allDataSelectedShop[0];

      this.loadingData=false;        

      
    }, error => {

    })
  }
  showProductDetailModal(): void {
    this.productDetailModal.show();
  }

  hideProductDetailModal(): void {
    this.productDetailModal.hide();
  }
  getAlert(product) {
    this.selectedProduct = product;
    this.showProductDetailModal();
    this.imageLoading=true;
    setTimeout(() => {

      this.imageLoading=false;
      
    }, 2000);
  }

}
