export const toggleCSSclasses = (el, ...cls: string[]) =>
  cls.map((cl) => el.classList.toggle(cl))
