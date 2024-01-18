import { camelCase, kebabCase, snakeCase } from 'lodash-es'
import transformKeys from '../../util/transformKeys'

const basicObject = { snakeCaseMe: '1234', niceJob: 'thanks' }

const nestedObject = {
  nestedArray: [
    { first_name: 'Bill', last_name: 'Withers' },
    { first_name: 'Johnny', last_name: 'Cash' },
  ],
  nestedObject: {
    key: "I'm a key",
    value: "I'm a value",
  },
}

test('transforms keys of a basic object', () => {
  expect(transformKeys(basicObject, snakeCase)).toEqual({
    snake_case_me: '1234',
    nice_job: 'thanks',
  })
})

test('accepts any string transforming function', () => {
  expect(transformKeys(basicObject, kebabCase)).toEqual({
    'snake-case-me': '1234',
    'nice-job': 'thanks',
  })
})

test('handles nested arrays and objects', () => {
  expect(transformKeys(nestedObject, camelCase)).toEqual({
    nestedArray: [
      { firstName: 'Bill', lastName: 'Withers' },
      { firstName: 'Johnny', lastName: 'Cash' },
    ],
    nestedObject: {
      key: "I'm a key",
      value: "I'm a value",
    },
  })
})
