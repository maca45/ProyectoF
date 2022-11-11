import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  perfumes:String[]=[]

  constructor() { }

  ngOnInit(): void {
    this.perfumes=[
      //Productos
      "https://http2.mlstatic.com/D_NQ_NP_605524-MLA44598851482_012021-W.webp",
      "https://http2.mlstatic.com/D_NQ_NP_911620-MLA47864966459_102021-W.webp",
      "https://http2.mlstatic.com/D_NQ_NP_843923-MLA52132977991_102022-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_2X_889906-MLA48671451936_122021-F.webp",
      "https://http2.mlstatic.com/D_NQ_NP_727870-MLA50611473000_072022-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_890142-MLA49900530633_052022-O.jpg",
      "http://d3ugyf2ht6aenh.cloudfront.net/stores/001/040/363/products/combo11-7c1fff68999322b15f15720641550070-640-0.png",
      "https://http2.mlstatic.com/D_NQ_NP_772770-MLA49211946466_022022-O.jpg",
      ""
    ]
  }

}
