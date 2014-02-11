# validity-unique-property

[![Build Status](https://travis-ci.org/bengourley/validity-unique-property.png?branch=master)](https://travis-ci.org/bengourley/validity-unique-property)

Validity style validator to ensure a property is unique within entities available in
a given collection, for instance: all users must have a unique email address.

## Installation

    npm install validity-unique-property

## Usage

Below is a simple example for usage with schemata and save:

```js

var validity = require('validity')
  , schemata = require('schemata')
  , save = require('save')
  , collection = save('user')
  , createUniqueValidator = require('validity-unique-property')

var schema = schemata(
    { emailAddress:
      { type: String
      , validators: { all: [ validity.email, createUniqueValidator(collection.findOne) ] }
      }
    })
```

## API

### var validate = createUniqueValidator(Function: findOne, Object: options)

Create a validate function. `findOne(obj, cb)` should be a query function that allows
the validator access to whatever persistence mechanism you are using, in order to check
for the uniqueness of the given property. `obj` is a query object and `cb` is a
callback function `cb(err, foundObject)`.

There are 2 possible `options` to this validity function. `idProperty` (which defaults to `_id`)
and `keys` which is an array used to perform multi property validation (defaults to `[]`) i.e
only validating against the key this validator is used on.

### validate(String:key, String:keyDisplayName, Object:object, Function:cb)

This is a validity compatible function, which in turn is used by schemata for schema validation.

The callback signature cb(err, errorMessage).

err is an Error object if something bad happened and null otherwise.
errorMessage is a String if a validation error happened and undefined otherwise.

## Licence
Licensed under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
