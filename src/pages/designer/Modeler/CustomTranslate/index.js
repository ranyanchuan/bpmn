/*
 * @ 功能：自定义语言（i18n）
 */

import translations from './i18n';

// 自定义翻译
function customTranslate(template, replacements) {
  replacements = replacements || {};
  // 转换
  template = translations[template] || template;

  // 替换
  return template.replace(/{([^}]+)}/g, (_, key) => {
    return replacements[key] || `{${key}}`;
  });
}

export default {
  __init__: ['translate'],
  translate: ['value', customTranslate],
};
