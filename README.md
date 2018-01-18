Ember HammerJS 
==============

[![Greenkeeper badge](https://badges.greenkeeper.io/html-next/ember-hammerjs.svg)](https://greenkeeper.io/)

[![npm version](https://badge.fury.io/js/ember-hammerjs.svg)](http://badge.fury.io/js/ember-hammerjs)
[![Build Status](https://travis-ci.org/runspired/ember-hammerjs.svg?branch=master)](https://travis-ci.org/runspired/ember-hammerjs)
[![Ember Observer Score](http://emberobserver.com/badges/ember-hammerjs.svg)](http://emberobserver.com/addons/ember-hammerjs)

Ember HammerJS provides an easy way to use hammer.js by making it simple
to define and use [HammerJS](https://github.com/hammerjs/hammer.js) managers
 and recognizers throughout your app.

This library provides the base primitives which [ember-gestures](https://github.com/runspired/ember-gestures)
uses to give you hammer.js based event methods on your components.

If you are looking for a complete box solution, or "fast click" support
you will want to check out ember-gestures and [ember-hammertime](https://github.com/runspired/ember-hammertime).
You should use this library directly when you need isolated, targeted
use of managers and recognizers.

## Installation

Make sure you stop and restart your `ember-cli` asset server after installation.

**via `ember install`**

```cli
ember install ember-hammerjs
```

This will run the default blueprint which additionally installs `hammer.js`.

**via `npm install`**

If you installed this via `npm`, you will need to run the default blueprint.

```cli
npm install --save-dev ember-hammerjs && ember g ember-hammerjs
```


## Support, Questions, Collaboration

This addon is part of the [ember-gestures](https://github.com/runspired/ember-gestures)
family, for support join the [e-gestures](https://embercommunity.slack.com/messages/e-gestures/)
channel on Slack.

[![Slack Status](https://ember-community-slackin.herokuapp.com/badge.svg)](https://ember-community-slackin.herokuapp.com/)


### Status

[Changelog](./CHANGELOG.md)

[![dependencies](https://david-dm.org/runspired/ember-hammerjs.svg)](https://david-dm.org/runspired/ember-hammerjs)
[![devDependency Status](https://david-dm.org/runspired/ember-hammerjs/dev-status.svg)](https://david-dm.org/runspired/ember-hammerjs#info=devDependencies)


#### Recognizers and Managers

A `Recognizer` detects a gesture on a target element by listening to 
received touch, mouse, and pointer events and passing through a series
of rules to determine whether it's gesture is occurring.

`Recognizer`s are registered with a `Manager`, which emits the recognized
gestures for consumption by your app. This addon does the grunt work of
creating Managers and wiring up Recognizers for you.

All you need to do to use gestures is tell your app where you want a
Manager to be created and what Recognizers it should have.

Example
```js
import RecognizerMixin from 'ember-hammerjs/mixins/recognizers';
import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend(RecognizerMixin, {
  recognizers: 'pan tap press'
});
```

The component would create a new Manager and add the recognizers for [pan](./addon/recognizers/pan.js),
[tap](./addon/recognizers/tap.js), and [press](./addon/recognizers/press.js).

The component would recognize gestures based on events originating on it
or it's child elements.

You should be strategic about where you put your components with Managers.
You don't need a lot of Managers, you just need them placed strategically.
You could even put one at the base of your app, but be warned `pinch`
`rotate` `pan` and `swipe` can break scrolling behavior if not placed correctly.

##### Note

`pan` and `swipe` are horizontal only (configured this way to avoid 
breaking vertical scroll). `vertical-pan` and `vertical-swipe` are
vertical only (configured this way to avoid breaking horizontal scroll).

`vertical-` variants will still trigger the usual `pan` and `swipe` events,
and can be used together with `pan` and `swipe` to capture gestures both
horizontally and vertically at the same time.

#### Using Gestures

Using gestures emitted by Hammer recognizers with Ember is almost like using any other event with Ember.
Your recognizers will be configured to emit `Events`, so to consume a gesture, you just need to add an
event handler to your component.  The handler's name just needs to match the camelCase version of a gesture
event.

Example
```js
import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  panStart(e) {
     // do something with the event
  }
});
```

Gesture events bubble through the DOM, so you can use them with actions as well.

```hbs
<div {{action "foo" on="swipeRight"}}>
```

#### Create A Recognizer

`ember g recognizer <name>`

This will generate the file `ember-gestures/recognizers/name.js`.
Once you've filled out the recognizer (see [./addon/recognizers/](./addon/recognizers/) for examples),
it will be available to use in your app just like the default recognizers.

#### Increase the size of touchable areas to improve user experience on small controls

Sometimes smaller buttons or critical buttons need a larger capture area than their visible area.
You can increase the area that recognizes touch events for a specific button with a little bit of CSS.

[Example Gist](https://gist.github.com/runspired/506f39a4abb2be48d63f)

### Testing


The jQuery events you need to trigger are the Hammer variant, meaning it
is entirely lowercase `swiperight`, `panup`.

jQuery events come with baggage, and using the `trigger` helper executes
handlers in a different order than they would otherwise execute, and in
some situations will cause a handler to execute twice.  If you are experiencing
issues with testing gesture events, try creating your own `trigger` helper
that uses native APIs instead of jQuery to trigger the event.

## Tips and Tricks

Don't add recognizers to components created within an `{{#each}}` loop.
Use a recognizer at the base of the `each` instead.

## Contributing

Contributions are very welcome.

When making a PR try to use the following conventions:

**Commit Messages:**

`type(shortname): action based description`

Examples:

- chore(deps): bump deps in package.json and bower.json
- docs(component): document the `fast-action` component

**Branch Naming:**

`type/short-description`

Examples:

- chore/bump-deps
- docs/fast-action-component


