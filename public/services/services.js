
function openCategory(event, catName) {

	// Categories are always Visible
    var i, j, list, services_section, category, service, selected;
    
 	// UNSELECT
 	// Unselect all previously selected categories
 	selected = document.querySelectorAll("div.category a.selected");
 	for (i = 0; i < selected.length; i++) {
 		selected[i].className = selected[i].className.replace(" selected", "");
 	}
 	
 	selected = document.querySelectorAll("div.services");
    for (i = 0; i < selected.length ; i++) {
    	selected[i].className = selected[i].className.replace(" selected", "");
    	selected[i].style.display="none";
    }
    
 	selected = document.querySelectorAll("div.services a.selected");
    for (i = 0; i < selected.length ; i++) {
    	selected[i].className = selected[i].className.replace(" selected", "");
    }
    
    // SELECT
    // Select the category
    event.currentTarget.className += " selected";
    
    // Locate the category block and mark it selected
    category = document.getElementById(catName + "_services");
    category.style.display = "block";
    category.className += " selected";
    
    // Now enable the services for the current category only
   	list = document.getElementsByClassName(catName + " service");
	for (i = 0; i < list.length; i++) {
		service = list[i];
		service.style.display = "block";
		
		// select the first service
		if (i==0) {
			openService(event, catName, service.innerText.toLowerCase());
		}
	}
}

function openService(event, catName, serviceName) {

	// First hide the previously displayed service description
 	// Unselect all previously selected 
 	selected = document.querySelectorAll("div.services a.selected");
    for (i = 0; i < selected.length ; i++) {
    	selected[i].className = selected[i].className.replace(" selected", "");
    }

    var sname, i;
    sname = "a[name="+catName+"_service_"+serviceName+"]";
    // Select the selected service
  	selected = document.querySelectorAll(sname);
  	for (i = 0; i < selected.length; i++) {
  		selected[i].className += " selected";
  	}
    
    showServiceDetails(event, catName, serviceName);
}

 function loaddata() {
 var i, j, category, service, catblock;
 
 /*
  			catblock = document.createElement("div");
  			document.body.appendChild(catblock);
  			var node = document.createAttribute("class");
  			node.value = "category";
  			catblock.setAttributeNode(node);
  			*/
  			catblock = document.getElementsByClassName("category")[0];
  
    //<a href="javascript:void(0)" name="customer" class="catlink" onclick="openCategory(event, 'customer')">Customer</a>
    if (catblock == null) {
    	console.log("Could not find the categories block");
    }
    else {
 	for (i = 0; i < data.length; i++) {
 		category = data[i];
 			var a = document.createElement("a");
 			catblock.appendChild(a);
  			var node = document.createAttribute("href");
  			node.value = "javascript:void(0)";
  			a.setAttributeNode(node);
  			node = document.createAttribute("name");
  			node.value = category.category;
  			a.setAttributeNode(node);
  			node = document.createAttribute("class");
  			node.value = "catlink";
  			a.setAttributeNode(node);
  			node = document.createAttribute("onclick");
  			node.value = "openCategory(event, \'" + category.category + "\')";
  			a.setAttributeNode(node);
  			a.innerText = category.category.charAt(0).toUpperCase() + category.category.slice(1);
  			
  			for (j = 0; j < category.services.length; j++) {
 				service = category.services[j];
  			
   				//  <a href="javascript:void(0)" name="customer_service_create" class="customer service" onclick="openService(event, 'customer', 'create')">Create</a>

 			
 			}
 
 		}
    }
 }
/*
	{
  		customer : [
  			{
  				service : {
 			name:"Get",
	 		desc:"Get a Customer", 
	 		url:"http://medmanage.sytes.net:3000/customer/:contact", 
	 		method:"GET", 
	 		data:"\{\"customerContact\"\:9902455333\"\}"
	 	},
	 	service : {
 			name:"Post",
	 		desc:"Create a Customer", 
	 		url:"http://medmanage.sytes.net:3000/customer/new", 
	 		method:"POST", 
	 		data:"\{\"customerContact\"\:9902455333\"\}"
	 	}
	 	]
	 	
	 }
	 ]
};
*/
  			

var services = {
customercreate: {
	name:"Create",
	 desc:"Create a Customer", 
	 url:"http://medmanage.sytes.net:3000/customer/new", 
	 method:"POST", 
	 data:"a bunch of post data. Need to figure out how to escape JSON chanracters"
	
},
customerget : {
	name:"Get",
	 desc:"Get a Customer", 
	 url:"http://medmanage.sytes.net:3000/customer/:contact", 
	 method:"GET", 
	 data:"\{\"customerContact\"\:9902455333\"\}"	
}
};

function showServiceDetails(event, catName, serviceName) {
	var element, varname, service;
	
	varname = catName+serviceName;
	service = services[varname];
	
	if (service != null) {
		document.getElementById("name").innerText = service.name;
		document.getElementById("desc").innerText = service.desc;
		document.getElementById("url").innerText = service.url;
		document.getElementById("method").innerText = service.method;
		document.getElementById("data").innerText = service.data;
	}
	else {
		document.getElementById("servicedetail").className.replace(" selected", "");
		document.getElementById("servicedetail").style.display = "none";
		
		document.getElementById("name").innerText = "";
		document.getElementById("desc").innerText = "";
		document.getElementById("url").innerText = "";
		document.getElementById("method").innerText = "";
		document.getElementById("data").innerText = "";
		
	}

    // Now reveal the selected service
    selected = document.getElementById("servicedetail");
    if (selected != null) {
    	selected.style.display = "block";
    }
}

document.addEventListener('DOMContentLoaded', function() {
	   loaddata();
	}, false);

