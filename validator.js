module.exports = createValidator

function createValidator(findOne, options) {

  if (!options) options = { keys: [] }

  var idProperty = options.idProperty || '_id'

  function validate(key, keyDisplayName, object, callback) {

    var queryObject = {}
      , values = []

    // Concat schema key onto the options keys to construct the
    // query and force fields to be an array if only a single value
  ; [].concat(key).concat(options.keys).forEach(function (field) {
      queryObject[field] = object[field]
      values.push(object[field])
    })

    values = values.join(',')

    findOne(queryObject, function (err, foundObject) {
      if (err) return callback(err)

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
