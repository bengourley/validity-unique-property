# validity-unique-property

Validity style validator to ensure a property is unique within entities available in a given service

## Installation

      npm install validity-unique-property

## Usage

Below is a simple example for usage with schemata:

```js

var validity = require('validity')
  , schemata = require('schemata')
  , createUniqueValidator = require('validity-unique-property')
  , save = ?

var schema = schemata(
    { age:
      { type: Number
      , validators: { all: [ createUniqueValidator(save) ] }
      }
    })

```

## API

### var validate = createUniqueValidator(Function: findOne)

Create a validate function. `findOne(obj, cb)` should be a query function that allows
the validator access to whatever persistence mechanism you are using, in order to check
for the uniqueness of the given property. `obj` is a query object and `cb` is a
callback function `cb(err, foundObject)`.

### validate(String:key, String:keyDisplayName, Object:object, Function:cb)

This is a validity compatible function, which in turn is used by schemata for schema validation.

The callback signature cb(err, errorMessage).

err is an Error object if something bad happened and null otherwise.
errorMessage is a String if a validation error happened and undefined otherwise.

## Licence
Licensed under the [New BSD License](http://opensource.org/licenses/bsd-license.php)