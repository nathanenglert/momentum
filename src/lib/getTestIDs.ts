import { faker } from "@faker-js/faker"

/**
 * This function is used to generate a testID for a component.
 * Source: https://www.matthewsessions.com/blog/react-test-id
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function getTestIDs(): any {
  if (process.env.NODE_ENV !== "test") return {}

  const ids = new Map()
  const proxy = new Proxy(
    {},
    {
      get: function (obj, prop) {
        if (ids.has(prop) === false) {
          ids.set(prop, faker.string.uuid())
        }
        return ids.get(prop)
      },
    }
  )
  return proxy
}
