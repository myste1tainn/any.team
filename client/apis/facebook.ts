import {Meteor} from 'meteor/meteor';

function applyPathArguments(target: string, searches: string[], args: string[]): string {
	if (searches.length != args.length) {
		console.log('Exception number searches and arguments mismatched');
		return null;
	}

	for (var i = searches.length - 1; i >= 0; i--) {
		var search = searches[i],
			arg = args[i];

		target = applyPathArgument(target, search, arg);
	}

	return target;
}
function applyPathArgument(target: string, search: string, arg: string): string {
	if (target.indexOf(search) > -1) {
		target = target.replace(search, arg);
	}
	return target;
}

class FBSDK {
	private FB: FB;
	initialzed: boolean;
	accessToken: string;
	userID: string;
	Event: FBSDKEvents;
	XFBML: FBSDKXFBML;
	Canvas: FBSDKCanvas;

	constructor() {
		this.init({
			appId: '1595130040816435',
			xfbml: true,
			version: 'v2.6'
		});

		if (!window.FB) {
			(function() {
				var js: any,
				id = 'facebook-jssdk',
				ref = document.getElementsByTagName('script')[0];

				if (document.getElementById(id)) {
					return;
				}

				js = document.createElement('script');
				js.id = id;
				js.async = true;
				js.src = "//connect.facebook.net/en_US/sdk.js";

				ref.parentNode.insertBefore(js, ref);
			})();
		}
	}

	init(fbInitObject: Object) {
		var self = this;
		if (!!window.fbAsyncInit) {
			window.fbAsyncInit = function() {
				window.FB.init(fbInitObject)
				self.FB = window.FB;

				if (!self.accessToken) {
					self.getLoginStatus();
				}
			}
		}
	}

	/* This method lets you make calls to the Graph API. */	
	api(path: string, callback: (fbResponseObject: any) => any): Object;
	api(path: string, callback: (fbResponseObject: any) => any, params: APIParams): Object;
	api(path: string, callback: (fbResponseObject: any) => any, params: APIParams, method: string): Object;
	api(path: string, callback: (fbResponseObject: any) => any, params?: APIParams, method?: string): Object {
		var _runBlock = (res) => {
			if (res.status == 'connected') {
				if (!params) {
					if (!method) method = 'GET';
				} else {
					if (!method) method = 'POST';
					if (!params.accessToken) params.accessToken = this.accessToken;
				}

				path = applyPathArgument(path, '{user-id}', this.userID);

				this.FB.api(path, method, params, callback);
			} else {
				callback({ status: 500, error: 'Error not connected!' });
			}
		}

		if (!!this.accessToken) {
			_runBlock({ status: 'connected' });
		} else {
			this.getLoginStatus(_runBlock);
		}

		return this.FB;
	}

	/* This method is used to trigger different forms of Facebook created UI dialogs. */
	ui(params: FBUIParams, handler: (fbResponseObject: any) => any): void {
		this.FB.ui(params, handler);
	}

	/* Allows you to determine if a user is logged in to Facebook and has authenticated your app */
	getLoginStatus(handler?: Function, force?: Boolean): void {
		var _self = this,
			_handler = (res) => {

			if (res.status == 'connected') {
				_self.userID = res.authResponse.userID;
				_self.accessToken = res.authResponse.accessToken;
			}

			if (handler) handler(res);
		}

		this.FB.getLoginStatus(_handler, force);
	}

	/* Calling FB.login prompts the user to authenticate your application using the Login Dialog. */
	login(handler: (fbResponseObject: any) => any, params?: FBLoginOptions): void {
		this.FB.login(handler, params);
	}

	/* Log the user out of your site and Facebook */
	logout(handler: (fbResponseObject: any) => any): void {
		this.FB.logout(handler);
	}

	/* Synchronous accessor for the current authResponse. */
	getAuthResponse(): Object {
		return this.FB.getAuthResponse();
	}



}

export const FB = new FBSDK();