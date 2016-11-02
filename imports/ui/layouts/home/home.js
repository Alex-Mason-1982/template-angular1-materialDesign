import angular from 'angular';

import header from '../../components/header/header';
import userCreate from '../../components/userCreate/userCreate';

import templateUrl from './home.html';

class homeController {
  constructor($scope, $reactive) {
    'ngInject';
    $reactive(this).attach($scope);

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
}

const name = 'home';
export default angular.module(name, [
  header.name,
  userCreate.name,
]).component(name, {
  templateUrl,
  controller: homeController,
  controllerAs: name,
})
.config(config);
function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/home',
      template: '<home></home>'
    });
};
