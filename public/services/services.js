
function createNode(tag, parent, attrs, innerText) {
  var child = document.createElement(tag);
  parent.appendChild(child);

  // Create attributes and add them to the tag
  for (i = 0; i < attrs.length; i++) {
    createAttribute(attrs[i], child);
  }

  child.innerText = innerText;
  return child;
}

function createAttribute(attrdesc, node) {
  var attr = document.createAttribute(attrdesc.name);
  attr.value = attrdesc.value;
  node.setAttributeNode(attr);
}

function loaddata() {
  
  var i, j, category, service, catblock, tabblock;

  tabblock = document.getElementById("toc");

  catblock = document.getElementById("category");

  for (i = 0; i < data.length; i++) {
    var category = data[i];
    var catName = category.category;

    // create the link for this category
    var a = createNode("a", catblock, [
      { "name":"index",   "value":i },
      { "name":"href",    "value": "javascript:void(0)"},
      { "name":"name",    "value":catName },
      { "name":"class",   "value":"catlink" }, 
      { "name":"onclick", "value":"openCategory(event, \'" + i + "\')" } ], 
      catName);

    // Create the services div
    var services = data[i].services;
    var servicesblock = document.getElementById("servicesblock");

    // create the services block for this category
    // eg. <div id="customer_services" class="customer services">
    var serviceblock = createNode("div", servicesblock, [
      { "name":"id",      "value":data[i].category + "_services" },
      { "name":"class",   "value":data[i].category + " services" } ],
      "");

    for (j = 0; j < services.length; j++) {
      // eg <a href="javascript:void(0)" name="customer_service_create" class="customer service" onclick="openService(event, 'customer', 'create')">Create</a>
      var service = services[j];
      var n = createNode("a", serviceblock, [
        { "name":"href",      "value":"javascript:void(0)" },
        { "name":"name",      "value":catName + "_service_" + service.name},
        { "name":"catindex",  "value":i },
        { "name":"serviceindex", "value":j },
        { "name":"class",     "value":catName + " service"},
        { "name":"onclick",   "value":"openService(event, " + i + ", " + j + ")" } ], //, \'" + data[i].category + "\', \'" + data[i].services[j].name + "\')"} ],
        service.name);
      }
    }
  }

  
function openCategory(event, catIndex) {
  var catData = data[catIndex];

	// Categories are always Visible
    var i, j, list, services_section, category, service, selected, services;
    
 	// About prior selected category and services ...
  selCat = document.querySelectorAll("div.category a.selected");
 	for (i = 0; i < selCat.length; i++) {
    // Unselect the category
 		selCat[i].className = selCat[i].className.replace(" selected", "");
    selCatIndex = parseInt(selCat[i].getAttribute("index"));
    category = data[selCatIndex];

      // UNSELECT and hide all services from that category that was previously selected
    services = document.querySelectorAll("div." + category.category + ".services");
    for (i = 0; i < services.length ; i++) {
      services[i].className = services[i].className.replace(" selected", "");
      services[i].style.display="none";
    }

 	}

  // About The category to be selected now 
  // Select the category
  event.currentTarget.className += " selected";
  var catName = event.currentTarget.name;
  
  // Show the services block for this category
  category = document.getElementById(catName + "_services");
  category.style.display = "block";
  category.className += " selected";
  
  // Now reveal the services for the current category only
 	list = document.getElementsByClassName(catName + " service");
	for (i = 0; i < list.length; i++) {
		service = list[i];
		service.style.display = "block";
		
		// select the first service
		if (i==0) {
			openService(event, catIndex, i);
		}
	}
}

function openService(event, catIndex, serviceIndex) {

  var catName = data[catIndex].category;
  var serviceName = data[catIndex].services[serviceIndex].name;

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
    
    showServiceDetails(event, catIndex, serviceIndex);
}

function showServiceDetails(event, catIndex, serviceIndex) {
	var element, varname, service;

  // Find the category
  var catName = data[catIndex].category;
  var serviceName = data[catIndex].services[serviceIndex].name;
	
  service = data[catIndex].services[serviceIndex];;
	
	if (service != null) {
		//document.getElementById("name").innerText = (service == null || service.name == null ? "" : service.name);
		document.getElementById("desc").value = (service == null || service.desc == null ? "" : service.desc);
		document.getElementById("url").value =  (service == null || service.url == null ? "" : url + service.url);
		document.getElementById("method").value = (service == null || service.method == null ? "" : service.method);
		document.getElementById("data").value = (service == null || service.data == null ? "" : service.data);
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

