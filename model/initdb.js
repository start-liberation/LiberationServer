// $ mongo < dbinit.js
use LiberationPM

db.customers.drop()
db.orders.drop()
db.vendors.drop()

db.createCollection("customers")
db.createCollection("orders")
db.createCollection("vendors")

show collections

db.customers.insert({"contact": 9902455333, "name": "Ashish Mathur", "email":"reachashishmathur@gmail.com", "address":"E24 MIMS Ardendale, Kannamangala Main Road, Bangalore, 560067", "prefVendContact":"08045936901", "createdOn": Date.now, "modifiedOn": Date.now, "lastLogin":Date.now})
db.customers.insert({"contact": 1111111111, "name": "Balaji Srinivasan", "email":"email@gmail.com", "address":"Chennai, 560067", "prefVendContact":"08045936901", "createdOn": Date.now, "modifiedOn": Date.now, "lastLogin":Date.now})
db.customers.insert({"contact": 2222222222, "name": "Madhu Tadiparthi", "email":"email@gmail.com", "address":"Bangalore, 560067", "prefVendContact":"08045936901", "createdOn": Date.now, "modifiedOn": Date.now, "lastLogin":Date.now})

db.customers.find({}, {contact:1, name:1, email:1, _id:0})

db.orders.insert({"orderId": 1, "customerContact": 1111111111, "vendorContact": 9111111111, "drugList": [ {"drugName":"Crocin", "strength":"100mg", "quantity":100}], "createdOn": Date.now(), "status": 0, acceptedOrRejectedAt: Date.now(), "transitAt": Date.now(), "deliveredAt": Date.now(), "status": 0});
db.orders.insert({"orderId": 2, "customerContact": 1111111111, "vendorContact": 9111111111, "drugList": [ {"drugName":"Crocin", "strength":"100mg", "quantity":100}], "createdOn": Date.now(), "status": 0, acceptedOrRejectedAt: Date.now(), "transitAt": Date.now(), "deliveredAt": Date.now(), "status": 0});
db.orders.insert({"orderId": 3, "customerContact": 1111111111, "vendorContact": 9111111111, "drugList": [ {"drugName":"Crocin", "strength":"100mg", "quantity":100}], "createdOn": Date.now(), "status": 0, acceptedOrRejectedAt: Date.now(), "transitAt": Date.now(), "deliveredAt": Date.now(), "status": 0});
db.orders.insert({"orderId": 4, "customerContact": 1111111111, "vendorContact": 9111111111, "drugList": [ {"drugName":"Crocin", "strength":"100mg", "quantity":100}], "createdOn": Date.now(), "status": 0, acceptedOrRejectedAt: Date.now(), "transitAt": Date.now(), "deliveredAt": Date.now(), "status": 0});
db.orders.insert({"orderId": 5, "customerContact": 1111111111, "vendorContact": 9111111111, "drugList": [ {"drugName":"Crocin", "strength":"100mg", "quantity":100}], "createdOn": Date.now(), "status": 0, acceptedOrRejectedAt: Date.now(), "transitAt": Date.now(), "deliveredAt": Date.now(), "status": 0});
db.orders.insert({"orderId": 6, "customerContact": 1111111111, "vendorContact": 9111111111, "drugList": [ {"drugName":"Crocin", "strength":"100mg", "quantity":100}], "createdOn": Date.now(), "status": 0, acceptedOrRejectedAt: Date.now(), "transitAt": Date.now(), "deliveredAt": Date.now(), "status": 0});

db.orders.find({}, {_id: 0, orderId:1, customerContact:1, vendorContact:1})

db.vendors.insert({"name": "Mr Medicine Man", "shopName": "Popular Medicals", "email": "email@gmail.com", "contact" : 9111111111, "address" : "Seegehalli", "createdOn": Date.now(), "modifiedOn": Date.now(), "lastLogin": Date.now()});
db.vendors.insert({"name": "Mr Ramesh", "shopName": "Amazing Medicals", "email": "email@gmail.com", "contact" : 9222222222, "address" : "Marathahalli", "createdOn": Date.now(), "modifiedOn": Date.now(), "lastLogin": Date.now()});
db.vendors.insert({"name": "Mr Chennai", "shopName": "Mount Road Medicals", "email": "email@gmail.com", "contact" : 9333333333, "address" : "Meenambaakam", "createdOn": Date.now(), "modifiedOn": Date.now(), "lastLogin": Date.now()});

db.vendors.find({}, {_id:0, shopName:1, contact:1, address:1})
