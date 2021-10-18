
/**
 * For auto formatting
 *  - Use this plugin = https://marketplace.visualstudio.com/items?itemName=Wscats.vue
 *  - Update settings.json ->
 * "[vue]": {
        "editor.defaultFormatter": "Wscats.vue"
    },
 * Add the lines below to use the vue3 snippets extension
    "[vue]": {
        "editor.defaultFormatter": "Wscats.vue"
    },
 * Remove other formatters
 * "vue3snippets.singleQuote": true,
    "vue3snippets.printWidth": 120,
    "vue3snippets.tabWidth": 2
 */
module.exports = {
    trailingComma: 'single',
    semi: true,
    singleQuote: true,
    endOfLine: 'lf'
};
