var RSVP = require('rsvp');
var VersionChecker = require('ember-cli-version-checker');

module.exports = {

  name: 'ember-hammerjs',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var promises = [];
    var bowerPackages = [
      { name: 'hammer.js', target: '2.0.6' }
    ];
    var addonPackages = [];
    var checker = new VersionChecker(this);

    if (checker.for('ember', 'bower').satisfies('>= 2.3')) {
      addonPackages.push({name: 'ember-getowner-polyfill', target: '^1.0.0'});
    }

    promises.push(this.addBowerPackagesToProject(bowerPackages));
    if (addonPackages.length) {
      promises.push(this.addAddonsToProject({ packages: addonPackages }));
    }

    return RSVP.all(promise);
  }

};
