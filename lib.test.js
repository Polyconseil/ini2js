const lib = require('.')


describe ('parseConfig', function () {

  it('parses an empty file', function () {
    expect(lib.parseConfig(['./test_files/empty.ini'])).toEqual({})
  })

  it('raises when parsing a file with a global key', function () {
    expect(() => lib.parseConfig(['./test_files/global.ini'])).toThrowError(/Global section/)
  })

  it('raises when parsing a file with dotted section keys', function () {
    expect(() => lib.parseConfig(['./test_files/dotted_sections.ini'])).toThrowError(/Keyed sections/)
  })

  it('parses a simple file', function () {
    expect(lib.parseConfig(['./test_files/simple.ini'])).toEqual({section: {foo: "bar"}})
  })

  it('parses a file with typed values', function () {
    expect(lib.parseConfig(['./test_files/typed_values.ini'])).toEqual({
      bool: {vrai: true, faux: false},
      numbers: {number: 42},
    })
  })

  it('parses multiple files and merge them', function () {
    expect(lib.parseConfig(['./test_files/merge1.ini', './test_files/merge2.ini'])).toEqual({
      mergedSection: {
        key1: "value1",
        key2: "value2",
      },
      section1: {
        key: "value",
      },
      section2: {
        key: "value",
      },
    })
  })

})
