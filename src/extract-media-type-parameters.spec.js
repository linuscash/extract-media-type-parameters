/* eslint-env jest */

const extractMediaTypeParameters = require('./extract-media-type-parameters')

describe('extract-media-type-parameters', function () {
  test('when given a media type with no parameters it returns no parameters', function () {
    expect(extractMediaTypeParameters('application/json')).toEqual({})
  })

  describe('a media type with parameters', function () {
    test('when given a media type with a single parameter it extracts the parameter', function () {
      expect(extractMediaTypeParameters('application/json;data=test')).toEqual({ data: 'test' })
    })

    test('when given a media type with multiple parameters it extracts successfully', function () {
      expect(extractMediaTypeParameters('appliction/json; q=1; charset=utf-8')).toEqual({ q: '1', charset: 'utf-8' })
    })

    test('when given a media type with a quoted value it extracts the whole value', function () {
      expect(extractMediaTypeParameters('appliction/json;name="Linus Cash"')).toEqual({ name: 'Linus Cash' })
    })

    test('when given a media type with spacing between parameters it extracts successfully', function () {
      expect(extractMediaTypeParameters('appliction/json; name="Linus Cash"; hello=world')).toEqual({ name: 'Linus Cash', hello: 'world' })
    })
  })

  describe('a media type with an attribute but no value it extracts it as an empty string', function () {
    test('an attribute with an equals sign extracts as an empty string', function () {
      expect(extractMediaTypeParameters('application/json;attribute=')).toEqual({ attribute: '' })
    })

    test('an attribute without an equals sign extracts as an empty string', function () {
      expect(extractMediaTypeParameters('application/json;attribute')).toEqual({ attribute: '' })
    })
  })

  describe('when given something other than a string it will throw a friendly error', function () {
    it('throws when given an object', function () {
      expect(() => extractMediaTypeParameters({})).toThrow(new TypeError('mediatype must be a string'))
    })

    it('throws when given undefined', function () {
      expect(() => extractMediaTypeParameters(undefined)).toThrow(new TypeError('mediatype must be a string'))
    })

    it('throws when given a number', function () {
      expect(() => extractMediaTypeParameters(42)).toThrow(new TypeError('mediatype must be a string'))
    })
  })
})
