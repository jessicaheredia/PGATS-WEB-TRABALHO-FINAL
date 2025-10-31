import { faker } from '@faker-js/faker'

export function getRandomEmail() {
  // return `qa-tester-${getRandomNumber()}@test.com`
  return faker.internet.email({ firstName: 'QAJH' })
}