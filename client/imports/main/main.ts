import {Component} from '@angular/core';
import {Dashboard} from '../dashboard/dashboard';
import {NewsFeed} from '../news-feed/news-feed';
import {Sidebar} from '../sidebar/sidebar';
import {MembersList} from '../my-team/my-team';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';



// Main.ts has no component to run
@Component({
	// Within main.html there is another <router-outlet>, so the directives are needed
	selector: 'main',
	directives: [...ROUTER_DIRECTIVES],
	templateUrl: 'client/imports/main/main.html'
})

export class Main {
	// Properties
	constructor() {
		// Code
	}

}
