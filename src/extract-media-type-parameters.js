
function extractMediaTypeParameters (mediatype) {
  if (typeof mediatype !== 'string') {
    throw new TypeError('mediatype must be a string')
  }

  if (mediatype.includes(';') === false) {
    return {}
  }

  return mediatype
    .replace(/^[^;]*;/, '') // trim everything upto and including the first ';' character
    .split(';') // split remaining string up into 'name=value' parameters
    .map(param => param.split('=')) // split each parameter up so we now have a name and a value
    .map(([ name, value ]) => [ name.replace(' ', '').toLowerCase(), (value || '').replace(/'|"/g, '') ])
    .filter(([ name ]) => name.length > 0)
    .reduce((accumulator, [ name, value ]) => ({ ...accumulator, [name]: value }), {})
}

module.exports = extractMediaTypeParameters
