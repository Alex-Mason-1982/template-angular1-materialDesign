import angular from 'angular';

import { Meteor } from 'meteor/meteor';

import authLoginButton from '../authLoginButton/authLoginButton';

import templateUrl from './header.html';

class headerController {
  constructor($scope, $reactive, $mdSidenav, $state, $rootScope) {
    'ngInject';
    $reactive(this).attach($scope);

    //set up scope variables
    this.go = $state.go;

    //watch for state changes
    $scope.$watch($state.current.name, function(){
      $scope.currentNavItem =  $state.current.name;
      console.log($scope.currentNavItem);
    })

    $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){
      $scope.currentNavItem = toState.name;

    });

    //toggle side menu
    this.toggle = () => {
      $mdSidenav('menu').toggle();
    };

    //helpers
    this.helpers({
      user() {return Meteor.user();},
      userActive() {
        if(Meteor.user()){
          if(!Meteor.user().profile.active){
            console.log('Login Error: User Suspended');
            Meteor.logout();
            return false;
          }
          return true;
        }else{
          return false;
        }
      },
    });
  }

  goTo(location){
    this.go(location);
  }
}

const name = 'header';
export default angular.module(name, [
  authLoginButton.name,
]).component(name, {
  templateUrl,
  controller: headerController,
  controllerAs: name,
});
