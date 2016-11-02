import angular from 'angular';

import templateUrl from './authLoginButton.html';

class authLoginButtonController {
  constructor($scope, $reactive, $state) {
    'ngInject';
    $reactive(this).attach($scope);

    //set up scope variables
    this.credentials = { email: '', password: '', fullName: '' };
    this.go = $state.go;

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

  emailLogin() {
    Meteor.loginWithPassword(this.credentials.email, this.credentials.password,
    this.$bindToContext((err) => {
      if (err) {
        console.log(`Login Error: ${err.message}`);
      }else{
        this.goTo('home');
      }
    }));
  }

  logOut(){
    Meteor.logout();
    this.goTo('home');
  }

  goTo(location){
    this.go(location);
  }
}

const name = 'authLoginButton';
export default angular.module(name, []).component(name, {
  templateUrl,
  controller: authLoginButtonController,
  controllerAs: name,
});
