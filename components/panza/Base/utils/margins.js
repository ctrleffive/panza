const n = (key, x, s) => typeof x === 'number' ? { [key]: s[x] } : null

const margins = (props, scale) => {

  const s = scale || []
  const {
    m, mx, my, mt, mr, mb, ml
  } = props || {}

  const result = Object.assign({},
    n('margin', m, s),
    n('marginTop', mt, s),
    n('marginBottom', mb, s),
    n('marginTop', my, s),
    n('marginBottom', my, s),
    n('marginLeft', ml, s),
    n('marginRight', mr, s),
    n('marginLeft', mx, s),
    n('marginRight', mx, s)
  )

  return result
}

export default margins