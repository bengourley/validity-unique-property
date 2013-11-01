module.exports = createValidator

function createValidator(findOne, options) {

  if (!options) options = {}

  var idProperty = options.idProperty || '_id'

  function validate(keys, keyDisplayName, object, callback) {

    var queryObject = {}
      , values = []

    // Force fields to be an array if only a single value
  ; [].concat(keys).forEach(function (field) {
      queryObject[field] = object[field]
      values.push(object[field])
    })

    values = values.join(',')

    findOne(queryObject, function (err, foundObject) {

      // No object was found, so the property is unique
      if (!foundObject) return callback(null, undefined)

      // An object with the same property was found…

      if (!object[idProperty]) {

        // This is a new object that doesn't yet have an id
        return callback(null, '"' + values + '" already in use')

      } else {

        if (object[idProperty] === foundObject[idProperty]) {

          // An existing idProperty suggests that this object already exists
          // in the collection, so check its id against the foundObject. If the
          // ids match, it's essentially the same object, so allow it to have the
          // unique property.
          return callback(null, undefined)

        } else {

          // Otherwise the ids differ, so it's a different
          // object that already has this property
          return callback(null, '"' + values + '" already in use')

        }

      }
    })


  }

  return validate

}