import angular from 'angular';

import { Meteor } from 'meteor/meteor';

import templateUrl from './userCreate.html';

class userCreateController {
  createAccount() {
    let valid = false;
    if (this.credentials.email !== '' &&
    this.credentials.password !== '' && this.credentials.fullName !== '') {
      valid = true;
    }
    if (valid) {
      Accounts.createUser({
        email: this.credentials.email,
        password: this.credentials.password,
        profile: {
          name: this.credentials.fullName,
          active: true,
        },
      }, this.$bindToContext((error) => {
        if (error) {
          this.error = 'Error: Email already used';
        } else {

        }
      }));
    }
  }
}

const name = 'userCreate';
export default angular.module(name, []).component(name, {
  templateUrl,
  controller: userCreateController,
  controllerAs: name,
});
