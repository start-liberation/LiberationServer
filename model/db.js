 /*   
	* We required Mongoose
    * We set the connection string for the MongoDB database
    * We defined the User schema
    * We built the User model
    * We defined the Medicines schema
    * We built the Medicines model
    * We opened the Mongoose connection to the database
    */

var mongoose = require('mongoose'),
dbURI='mongodb://35.225.10.0/LiberationPM';
//dbURI = 'mongodb://localhost/LiberationPM';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
	console.log('Mongoose connection error: ' + err);
});

//Take care of reconnecting back when it is disconnected
//unintentionally
mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected');
});

mongoose.connection.on('SIGINT', function() {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through app termination');
		process.exit(0);
	});
});

//connection events snipped out for brevity

/***************************************************************
CUSTOMER SCHEMA
****************************************************************/
var customerSchema =  new mongoose.Schema({
	contact: {type: Number, unique: true, require: true},
	name: String,
	email: String,
	address: String,
	prefVendCont: Number,
	createdOn: {type: Date, default: Date.now},
	modifiedOn: Date,
	lastLogin: Date
});

//Get the customer details using contact
customerSchema.statics.findByContact = function (contact, callback) {
	this.findOne(
	{ contact: contact },
	'name contact email address prefVendCont lastLogin',
	{sort: 'name'},
	callback);
};

//Update customer profile
customerSchema.statics.update = function (customerData, callback) {
	console.log("customer profile update : " + JSON.stringify(customerData));
	this.findOneAndUpdate(
	{ contact: customerData.contact },
	{$set : {name: customerData.name,
			 email : customerData.email,
			 address : customerData.address,
			 prefVendCont: customerData.prefVendCont,
			 modifiedOn: customerData.modifiedOn,
			 lastLogin: customerData.lastLogin
		}
	},
	{new: true},
	callback);
};
//Build the Customer  Model
mongoose.model('Customer', customerSchema);

/***************************************************************
USER DRUG PRESCRIPTION SCHEMA
****************************************************************/
var prescriptionSchema =  new mongoose.Schema({
	name: String,
	contact: Number,
	drugList: [{
		drugName: String,
		strength: String,
		dosage: Number,
		inorout : Boolean
	}],
	createdOn: {type: Date, default: Date.now},
	modifiedOn: Date
});

prescriptionSchema.statics.findByUserContact = function (userContact, callback) {
	this.find(
	{ contact: userContact },
	'_id name',
	{sort: 'modifiedOn'},
	callback);
};

//Build the User Model
mongoose.model('Prescription', prescriptionSchema);

/***************************************************************
USER DRUG ORDER SCHEMA
****************************************************************/
var orderSchema =  new mongoose.Schema({
	orderId: Number,
	customerContact: Number,
	vendorContact: Number,
	drugList: [{
		drugName: String,
		strength: String,
		quantity: Number
	}],
	createdOn: {type: Date, default: Date.now},
	acceptedOrRejectedAt: Date,
	transitAt: Date,
	deliveredAt: Date,
	status: Number // Enum: 0 = new, 1 = accepted, 2 = transit, 3 = delivered, -1 = rejected
});

//Find user orders to show on 'My Orders' screen - DONE & TESTED
orderSchema.statics.findAll = function (callback) {
	this.find(
	{ },
	'orderId status',
	{sort: 'orderId'},
	callback);
};

//Find user orders to show on 'My Orders' screen - DONE & TESTED
orderSchema.statics.findByCustomerContact = function (customerContact, callback) {
	this.find(
	{ customerContact: customerContact },
	'orderId status',
	{sort: 'orderId'},
	callback);
};

//Find user orders - to show on an order detail screen for a customer or a vendor - DONE & TESTED
orderSchema.statics.findByOrderId = function (orderId, callback) {
	this.findOne(
	{ orderId: orderId },
	'orderId status customerContact vendorContact createdOn drugList',
	{sort: 'orderId'},
	callback);
};

//Find user orders with status new - to show on orders list by status to a vendor - DONE & TESTED
orderSchema.statics.findByStatus = function (status, callback) {
	console.log("status JSON Object is : " + JSON.stringify(status));
	console.log("status: " + status.status);
	console.log("customerContact : " + status.customerContact);
	console.log("vendorContact: " + status.vendorContact);
	if(status.status != undefined) {
		var statusNum = 0;
		if(isNaN(status.status)) {
			console.log("Status is not a numerical : " + status.status);
			switch(status.status) {
				case "new": 
					statusNum = 0;
					break;
				case "accepted":
					statusNum = 1;
					break;
				case "transit":
					statusNum = 2;
					break;
				case "delivered":
					statusNum = 3;
					break;
				case "rejected":
					statusNum = 4;
					break;
			}
		} else {
			statusNum = parseInt(status.status);
		}

		if(status.customerContact != undefined) {
			console.log("Find by status + customerContact");
			this.find(  {$and:[{status: statusNum}, {vendorContact: status.customerContact}]},
						'orderId status drugList customerContact vendorContact',
						{sort: 'orderId'},
						callback);
		} else if(status.vendorContact != undefined) {
			console.log("Find by status :" + statusNum +  ", vendorContact: " + status.vendorContact);
			this.find( {$and:[{status: statusNum}, {vendorContact: status.vendorContact}]},
						'orderId status drugList customerContact vendorContact',
						{sort: 'orderId'},
						callback);
		} else {
			console.log("Find by status");
			this.find(   {status: statusNum},
						'orderId status drugList customerContact vendorContact',
						{sort: 'orderId'},
						callback);
		}
	} else {
		if(status.customerContact != undefined) {
			console.log("Find by customerContact");
			this.find({customerContact: status.customerContact},
						'orderId status drugList customerContact vendorContact',
						{sort: 'orderId'},
						callback);
		} else if(status.vendorContact != undefined) {
			console.log("Find by vendorContact");
			this.find({vendorContact: status.vendorContact},
						'orderId status drugList customerContact vendorContact',
						{sort: 'orderId'},
						callback);
		}
	}
};

// Update Order status - DONE & TESTED
orderSchema.statics.updateByOrderId = function (orderData, callback) {
	
	console.log("order id = " + orderData.orderId);
	this.findOneAndUpdate(
			{ orderId: orderData.orderId },
			{$set : {status: orderData.status,
				acceptedOrRejectedAt: Date.now()
				}
			}, 
			{new: true},
			callback);

	/*
	if ( (orderData.status === 1) || (orderData.status === -1) ) {
		this.findOneAndUpdate(
				{ orderId: orderData.orderId },
				{$set : {status: orderData.status,
					acceptedOrRejectedAt: Date.now()
					}
				}, 
				{new: true},
				callback);
	} else if (orderData.status === 2) {
		this.findOneAndUpdate(
				{ orderId: orderData.orderId },
				{$set : {status: orderData.status,
					transitAt: Date.now()
					}
				}, 
				{new: true},
				callback); 
	} else if (orderData.status === 3) {
		this.findOneAndUpdate(
				{ orderId: orderData.orderId },
				{$set : {status: orderData.status,
					deliveredAt: Date.now()
					}
				}, 
				{new: true},
				callback); 
	} else {
		callback;
	}
	*/
	
};

//Build the User Model
mongoose.model('Order', orderSchema);

/***************************************************************
DRUG SCHEMA
****************************************************************/
var drugSchema = new mongoose.Schema({
	name: String,
	companyName: String,
	composition: [String],
	strength: String,
	type : String,
	genericName : String,
	modifiedOn: {type: Date, default: Date.now}
});


//Build the Drug Model
mongoose.model('Drug', drugSchema);

/*****************************************************************
 * VENDOR SCHEMA
 *****************************************************************/
var vendorSchema = new mongoose.Schema({
	name: String,
	shopName: String,
	email: String,
	contact : Number,
	address : String,
	/*otherContacts: [Number],
	addrress: {shopNum: String,
		buildingName: String,
		street: String,
		area: String,
		city: String,
		state: String,
		pincode: Number 
		},
	regId: String,*/
	createdOn: {type: Date, default: Date.now},
	modifiedOn: Date,
	lastLogin: Date
	
});

//Get the vendor details using contact
vendorSchema.statics.findByContact = function (contact, callback) {
	this.findOne(
	{ contact: contact },
	'name shopName contact email address lastLogin',
	{sort: 'name'},
	callback);
};

//Update customer profile
vendorSchema.statics.update = function (vendorData, callback) {
	console.log("vendor profile update : " + JSON.stringify(vendorData));
	this.findOneAndUpdate(
	{ contact: vendorData.contact },
	{$set : {name: vendorData.name,
			 email : vendorData.email,
			 address : vendorData.address,
			 modifiedOn: vendorData.modifiedOn,
			 lastLogin: vendorData.lastLogin
		}
	},
	{new: true},
	callback);
};

// Get all vendors (eventually will have to introduce the notion of proximity ot User)
vendorSchema.statics.findAll = function (callback) {
	this.find(
	{ },
	'name shopName contact',
	{sort: 'shopName'},
	callback);
};

//Build the Vendor model
mongoose.model('Vendor', vendorSchema);
/*****************************************************************
 * ORDER QUEUE SCHEMA
 *****************************************************************/
var orderQueueSchema = new mongoose.Schema({
	queue: [{orderId : Number}]
});
