import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  //TODO: change default user
  if (Meteor.users.find().count() === 0 ) {
    var id = Accounts.createUser({
        email: 'admin@admin.co.nz',
        password: 'admin',
        profile: {
            name: 'Administrator',
            active: true,
        }
    });
    Roles.addUsersToRoles(id, 'super-admin', Roles.GLOBAL_GROUP);
  }
});
