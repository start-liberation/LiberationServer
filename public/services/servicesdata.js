var data = 
  [ 
  	{ "category": "customer",
	  "services":
	    [
	      { "name": "create",
	   	    "description": "Create a customer",
	   	    "url":"http://medmanage.sytes.net:3000/customer/new",
	 		method:"POST", 
	 		data:"\{\"customerContact\"\9902455333\"\}"	   	    
	      },
	      { "name": "get",
	   	    "description": "Get customer information",
	   	    "url":"http://medmanage.sytes.net:3000/customer/9902455333",
	 		method:"GET", 
	 		data:""	   	    
	      }
	    ]
    },
    { "category": "order",
      "services":
        [
	      { "name": "create",
	   	    "description": "Create an order",
	   	    "url":"http://medmanage.sytes.net:3000/orders/order/new",
	 		method:"POST", 
	 		data:"\{\"customerContact\"\9902455333\"\}"	   	    
	      }
	    ]
	 },
    { "category": "vendor",
      "services":
        [
	      { "name": "create",
	   	    "description": "Create a vendor",
	   	    "url":"http://medmanage.sytes.net:3000/vendor/new",
	 		method:"POST", 
	 		data:"\{\"customerContact\"\9902455333\"\}"	   	    
	      }
	    ]
	 }
  ];
