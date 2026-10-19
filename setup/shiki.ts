import { defineShikiSetup } from '@slidev/types'
import type { ThemeRegistrationRaw } from 'shiki'

const cyanTheme: ThemeRegistrationRaw = {
  name: 'balanced-dark',
  type: 'dark',
  colors: {
    'editor.background': '#0a1214',
    'editor.foreground': '#e8f1f5',
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#7b93a0', fontStyle: 'italic' },
    },
    {
      scope: ['string', 'string.quoted'],
      settings: { foreground: '#f4c96b' },
    },
    {
      scope: ['constant.numeric', 'constant.language'],
      settings: { foreground: '#f19cc6' },
    },
    {
      scope: ['keyword', 'storage.type', 'storage.modifier'],
      settings: { foreground: '#93b7ff' },
    },
    {
      scope: ['entity.name.function', 'support.function'],
      settings: { foreground: '#7ee0e8' },
    },
    {
      scope: ['variable', 'variable.other', 'variable.parameter'],
      settings: { foreground: '#e8f1f5' },
    },
    {
      scope: ['entity.name.type', 'support.type', 'support.class'],
      settings: { foreground: '#c7a9ff' },
    },
    {
      scope: ['punctuation', 'meta.brace'],
      settings: { foreground: '#b4c8d0' },
    },
    {
      scope: ['keyword.operator', 'keyword.operator.assignment'],
      settings: { foreground: '#f19cc6' },
    },
    {
      scope: ['meta.tag', 'entity.name.tag'],
      settings: { foreground: '#93b7ff' },
    },
    {
      scope: ['entity.other.attribute-name'],
      settings: { foreground: '#f4c96b' },
    },
    {
      scope: ['support.constant', 'constant.other'],
      settings: { foreground: '#f19cc6' },
    },
    {
      scope: ['meta.property-name', 'support.type.property-name'],
      settings: { foreground: '#7ee0e8' },
    },
  ],
}

export default defineShikiSetup(() => {
  return {
    themes: {
      dark: cyanTheme,
      light: cyanTheme,
    },
  }
})
