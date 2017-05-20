module.exports = {
    extends: 'eslint:recommended',
    env: {
        node: true,
        es6: true
    },
    rules: {
        'indent': ['error', 4],
        'quote-props': ['error', 'as-needed'],
        'no-cond-assign': 0,
        'no-console': 0,
        'no-control-regex': 0,
        'no-undef': 0,
        'no-unused-vars': 0,
        'semi': ['error', 'never']
    }
}
