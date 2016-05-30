// import {Meteor} from 'meteor/meteor';


// export class FBManage {
	
// 	statusChangeCallback(res) {
// 		console.log('FB.statusChange', res);

// 		if (res.status == 'connected') {
// 			this.testAPI();
// 		} else if (res.status === 'not_authorized') {
// 			document.getElementById('status').innerHTML = 'Please log into this app.';
// 		} else {
// 			document.getElementById('status').innerHTML = 'Please log into Facebook.';
// 		}
// 	}

// 	checkLoginState() {
// 		FB.getLoginStatus(function(response) {
// 			this.statusChange(response);
// 		});
// 	}

// 	testAPI() {
// 		console.log('Welcome! Fetching your information...');
// 		FB.api('/me', function(res) {
// 			console.log('Successful login for: '+res.name);
// 			document.getElementById('status').innerHTML = 'Thanks for loggin in, ' + res.name + '!';
// 		})
// 	}

// }