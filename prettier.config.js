// prettier.config.js or .prettierrc.js
module.exports = {
    trailingComma: 'none',
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    plugins: [
        require('prettier-plugin-tailwindcss'),
        require('prettier-plugin-prisma')
    ]
}
