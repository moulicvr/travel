
const express = require('express'),
    bodyParser = require('body-parser'),
    form = require('express-form'),
    field = form.field;

const hbs = require('hbs');
const fs = require('fs');


var app = express();

//app.use(bodyParser());

app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
app.use(bodyParser.json());



const port = process.env.PORT || 3001;

hbs.registerPartials(__dirname + '/views/partials');
app.set('View Engine', hbs);


app.use((req, res, next)=>{
  var now = new Date().toString();
  //console.log(`${now} ${req.method} ${req.url}`);
  var loginDetails = `${now} ${req.method} ${req.url} ${req.ip}`;

  fs.appendFile('server.log', loginDetails+'\n', (err)=>{
    if(err){
      console.log('Unable to append the file');
    }
  });
  next();
});


app.use(express.static(__dirname + '/public'));

app.get('/tab', (req , res) =>{
	  res.render('Tab.hbs',{
	    pageTitel: 'Tab Page',
	    currentYear: new Date().getFullYear(),
	    welcomeMessage: 'Welcome to new adventure of travel.'
	  });

	/*res.send({
	    name:'Mouli',
	    lines:[
	      'playing with childern',
	      'learning',
	      'being average'
	    ]
	  });*/
	});


app.get('/home', (req , res) =>{
	  res.render('Home.hbs',{
	    pageTitel: 'Home Page',
	    currentYear: new Date().getFullYear(),
	    welcomeMessage: 'Welcome to new adventure of travel.'
	  });

	/*res.send({
	    name:'Mouli',
	    lines:[
	      'playing with childern',
	      'learning',
	      'being average'
	    ]
	  });*/
	});

app.get('/about', (req , res) =>{
	  res.render('About.hbs',{
	    pageTitel: 'About Page',
	    currentYear: new Date().getFullYear(),
	    welcomeMessage: 'Welcome to new adventure of travel.'
	  });

	/*res.send({
	    name:'Mouli',
	    lines:[
	      'playing with childern',
	      'learning',
	      'being average'
	    ]
	  });*/
	});


app.get('/deals', (req , res) =>{
	  res.render('Deals.hbs',{
	    pageTitel: 'Deals',
	    currentYear: new Date().getFullYear(),
	    welcomeMessage: 'Welcome to new adventure of travel.'
	  });

	/*res.send({
	    name:'Mouli',
	    lines:[
	      'playing with childern',
	      'learning',
	      'being average'
	    ]
	  });*/
	});


app.get('/contact', (req , res) =>{
	  res.render('Contact.hbs',{
	    pageTitel: 'Contact Page',
	    currentYear: new Date().getFullYear(),
	    welcomeMessage: 'Welcome to new adventure of travel.'
	  });

	/*res.send({
	    name:'Mouli',
	    lines:[
	      'playing with childern',
	      'learning',
	      'being average'
	    ]
	  });*/
	});

const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
  projectId: 'travelform-fb48a',
  keyFilename: './serviceAccountKey.json',
});

app.post('/contactUpdate', function(req, res) {
	var email = req.body.email;
	var contact = req.body.contact;
	var firstName = req.body.first_name;
	var lastName = req.body.last_name;
	var emailOrMobile = req.body.email || req.body.contact;
	var contactDetailsId = `Contacts/${emailOrMobile}`;
	const document1 = firestore.doc(contactDetailsId);
	var data = {
			  Email: `${email}`,
			  Phone: `${contact}`,
			  FirstName: `${lastName}`,
			  LastName:`${firstName}`
			  
			 };
	document1.set(data).then(() => {
	//Document created successfully.
		console.log('Contact details updated successfully')
		});
	});


app.post('/subscribeForm', function(req, res) {
	var email = req.body.email;
	var Phone = req.body.Phone;
	var emailOrMobile = req.body.email || req.body.Phone;
	var subscriribeDetails = `Subscribe/${emailOrMobile}`;
	
	//res.send('We got your "' + emailOrMobile + 'and we ensure you donot miss offers.');
	console.log('You sent the name "' + req.body.emailOrMobile + '".');
	  
	const document1 = firestore.doc(subscriribeDetails);
	/*  var data = {
			  name: 'Los Angeles',
			  state: 'CA',
			  country: 'USA'
			};
	  */
	  var data = {
			  Email: `${email}`,
			  Phone: `${Phone}`
			};
	//Enter new data into the document.
	document1.set(data).then(() => {
	//Document created successfully.
	});
	 
	//req.body.success = 'Success';
	//res.render('Contact.hbs', {req: req.body});
	 
	
	});



app.listen(port , ()=>{
	  console.log(`Server started port ${port}`);
	});