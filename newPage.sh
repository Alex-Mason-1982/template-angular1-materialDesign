mkdir imports/ui/layouts/$1
mkdir imports/ui/layouts/$1/test
touch imports/ui/layouts/$1/$1.js
touch imports/ui/layouts/$1/$1.html
touch imports/ui/layouts/$1/test/$1.test.js

cat <<EOT >> imports/ui/layouts/$1/$1.js
import angular from 'angular';

import templateUrl from './$1.html';

class $1Controller {}

const name = '$1';
export default angular.module(name, []).component(name, {
  templateUrl,
  controller: $1Controller,
  controllerAs: name,
});

EOT
