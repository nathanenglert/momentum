import "server-only"

type Dictionary = {
  [key: string]: () => Promise<any>
}

const dictionaries: Dictionary = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  bro: () =>
    import("../dictionaries/bro.json").then((module) => module.default),
}

export const getDictionary = async (locale: string): Promise<any> => {
  return dictionaries[locale]()
}
