module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    //强制使用单引号
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'jsx-quotes': ['error', 'prefer-single'],
  },
}
