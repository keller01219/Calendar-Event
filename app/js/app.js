/**
 * Created by Heinfried on 12/27/2014.
 */
'use strict';

var app = angular.module('eventCalendar', ['ui.router', 'ngCookies', 'firebase']);

app.config(function ($stateProvider, $httpProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/otherwise');
    $httpProvider.defaults.useXDomain = true;

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: UserCtrl
        })
        .state('signin', {
            url: '/signin',
            templateUrl: 'views/login.html',
            controller: UserCtrl
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'views/signup.html',
            controller: UserCtrl
        })
        .state('main', {
            url: '/main',
            templateUrl: 'views/main.html',
            controller: MainCtrl
        })
        .state('eventList', {
            url: '/event-list',
            templateUrl: 'views/eventList.html',
            controller: CalendarCtrl
        })
        .state('eventCreate', {
            url: '/event-create?eventId',
            templateUrl: 'views/eventCreate.html',
            controller: CalendarCtrl
        })
        .state('eventDetail', {
            url: '/event-detail?eventId',
            templateUrl: 'views/eventDetail.html',
            controller: CalendarCtrl
        })
        .state('eventShare', {
            url: '/event-share?eventId',
            templateUrl: 'views/eventShare.html',
            controller: ShareCtrl
        })
        .state('setting' ,{
            url: '/setting',
            templateUrl: 'views/setting.html',
            controller: SettingCtrl
        })
        .state("otherwise", {
            url : '/otherwise',
            templateUrl: 'views/home.html',
            controller: UserCtrl
        })
    //$locationProvider.html5Mode(true);
});

app.run(function ($rootScope, $state, $cookieStore) {
    $rootScope.$state = $state;
    $rootScope.firebaseUrl = 'https://vivid-inferno-7237.firebaseio.com/';

    $rootScope.userToken = $cookieStore.get('user') ? $cookieStore.get('user') : {};

    $rootScope.navigateTo = function(state, $stateParams){
        $state.transitionTo(state, $stateParams, { reload: true, inherit: false, notify: true });
    };
    $state.go('home');
});