// $ mongo < dbinit.js
use LiberationPM

db.customers.drop()
db.orders.drop()
db.vendors.drop()

db.createCollection("customers")
db.createCollection("orders")
db.createCollection("vendors")

show collections

db.customers.insert({"contact": 919902455333, "name": "Ashish Mathur", "email":"reachashishmathur@gmail.com", "address":"E24 MIMS Ardendale, Kannamangala Main Road, Bangalore, 560067", "prefVendContact":919111111111, "createdOn": Date.now, "modifiedOn": Date.now, "lastLogin":Date.now})
db.customers.insert({"contact": 919962520940, "name": "Balaji Srinivasan", "email":"balaji.july83@gmail.com", "address":"Chennai, 560067", "prefVendContact":919222222222, "createdOn": Date.now, "modifiedOn": Date.now, "lastLogin":Date.now})
db.customers.insert({"contact": 919448756530, "name": "Madhu Tadiparthi", "email":"madhut00@gmail.com", "address":"Bangalore, 560067", "prefVendContact":919333333333, "createdOn": Date.now, "modifiedOn": Date.now, "lastLogin":Date.now})

db.customers.find({}, {contact:1, name:1, email:1, _id:0})

db.vendors.insert({"name": "Mr Medicine Man", "shopName": "Popular Medicals", "email": "email@gmail.com", "contact" : 919111111111, "address" : "Seegehalli", "createdOn": Date.now(), "modifiedOn": Date.now(), "lastLogin": Date.now()});
db.vendors.insert({"name": "Mr Ramesh", "shopName": "Amazing Medicals", "email": "email@gmail.com", "contact" : 919222222222, "address" : "Marathahalli", "createdOn": Date.now(), "modifiedOn": Date.now(), "lastLogin": Date.now()});
db.vendors.insert({"name": "Mr Chennai", "shopName": "Mount Road Medicals", "email": "email@gmail.com", "contact" : 919333333333, "address" : "Meenambaakam", "createdOn": Date.now(), "modifiedOn": Date.now(), "lastLogin": Date.now()});

db.vendors.find({}, {_id:0, shopName:1, contact:1, address:1})

db.orders.insert({"orderId": 1, "customerContact": 919902455333, "vendorContact": 9111111111, "drugList": [ {"drugName":"Crocin", "strength":"100mg", "quantity":100}], "createdOn": Date.now(), "status": 0, acceptedOrRejectedAt: Date.now(), "transitAt": Date.now(), "deliveredAt": Date.now(), "status": 0});
db.orders.insert({"orderId": 2, "customerContact": 919962520940, "vendorContact": 919222222222, "drugList": [ {"drugName":"Crocin", "strength":"100mg", "quantity":100}], "createdOn": Date.now(), "status": 0, acceptedOrRejectedAt: Date.now(), "transitAt": Date.now(), "deliveredAt": Date.now(), "status": 0});
db.orders.insert({"orderId": 3, "customerContact": 919962520940, "vendorContact": 919222222222, "drugList": [ {"drugName":"Crocin", "strength":"100mg", "quantity":100}], "createdOn": Date.now(), "status": 0, acceptedOrRejectedAt: Date.now(), "transitAt": Date.now(), "deliveredAt": Date.now(), "status": 0});
db.orders.insert({"orderId": 4, "customerContact": 919962520940, "vendorContact": 919222222222, "drugList": [ {"drugName":"Crocin", "strength":"100mg", "quantity":100}], "createdOn": Date.now(), "status": 0, acceptedOrRejectedAt: Date.now(), "transitAt": Date.now(), "deliveredAt": Date.now(), "status": 0});
db.orders.insert({"orderId": 5, "customerContact": 919448756530, "vendorContact": 919333333333, "drugList": [ {"drugName":"Crocin", "strength":"100mg", "quantity":100}], "createdOn": Date.now(), "status": 0, acceptedOrRejectedAt: Date.now(), "transitAt": Date.now(), "deliveredAt": Date.now(), "status": 0});
db.orders.insert({"orderId": 6, "customerContact": 919448756530, "vendorContact": 919333333333, "drugList": [ {"drugName":"Crocin", "strength":"100mg", "quantity":100}], "createdOn": Date.now(), "status": 0, acceptedOrRejectedAt: Date.now(), "transitAt": Date.now(), "deliveredAt": Date.now(), "status": 0});

db.orders.find({}, {_id: 0, orderId:1, customerContact:1, vendorContact:1})
