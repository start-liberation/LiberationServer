var data = [ 
    {
      "category":"customer",
  	  "services" : 
  	    [
  	      { 
		  	  "name": "create",
		   	  "description": "Create a customer",
		 	  "method":"POST", 
		   	  "url":"/customer/new",
		 	  "data":"{\"name\":\"Madhu Tadiparthi\", \"contact\": 9448756530, \"email\":\"madhut00@gmail.com\", \"prefVendCont\": 918028450292 }"
	      },  	    
	      {
		      "name": "get",
		   	  "description": "Get customer information",
		   	  "url":"/customer/:contactNumber",
		 	  "method":"GET", 
		 	  "data":""	   	    
	      },
	      {
	      	  "name": "update",
		   	  "description": "Update customer information",
		   	  "url":"/customer/update/:contactNumber",
		 	  "method":"POST", 
		 	  "data":""	      	  
	      },
	      {
	      	  "name": "login",
		   	  "description": "Login customer",
		   	  "url":"/customer/login/:contactNumber",
		 	  "method":"POST", 
		 	  "data":""	      	  
	      }
	    ]   
    },
    {
      "category":"order",
      "services": 
        [
          {
		      "name": "create",
		   	  "description": "Create an order",
		   	  "url":"/orders/order/new",
		 	  "method":"POST", 
		 	  "data":"{\"customerContact\":\"9902455333\"}"	   	    
	      }	 
	    ]   
	},
    {
      "category":"vendor",
      "services": 
        [
          {
	      	  "name": "create",
		   	  "description": "Create a vendor",
		   	  "url":"/vendor/new",
		 	  "method":"POST", 
		 	  "data":"{\"customerContact\":\"9902455333\"}"	   	    
	      },
          {
	      	  "name": "get",
		   	  "description": "Retreive a vendor",
		   	  "url":"/vendor/new",
		 	  "method":"GET", 
		 	  "data":""	   	    
	      },
          {
	      	  "name": "update",
		   	  "description": "Create a vendor",
		   	  "url":"/vendor/update/:contactNumber",
		 	  "method":"POST", 
		 	  "data":"{\"vendorContact\":\"08045936111\"}"	   	    
	      }	      
	    ]
    }
];

var url = 'http://medmanage.sytes.net:3000';