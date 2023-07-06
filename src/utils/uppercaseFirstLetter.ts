export const uppercaseFirstLetter = (text: string) => {
    const firstLetter = text.at(0)?.toUpperCase()
    const restOfText = text.slice(1)
    const formattedText = firstLetter + restOfText
    return formattedText
}
