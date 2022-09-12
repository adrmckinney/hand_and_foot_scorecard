const ConfigTools = configs => {
  const map = mapFunc => {
    return Object.values(configs).map(mapFunc)
  }

  const keyMap = mapFunc => {
    return Object.entries(configs).map(mapFunc)
  }

  const filter = filterFunc => {
    return Object.values(configs).filter(filterFunc)
  }

  const find = findFunc => {
    return Object.values(configs).find(findFunc)
  }

  const findByValue = value => {
    return Object.values(configs).find(item => '' + item?.value === '' + value)
  }

  const findByName = name => {
    return Object.values(configs).find(item => '' + item?.name === '' + name)
  }

  const where = (key: string, operator: string, target: any) => {
    return Object.values(configs).filter(item => {
      switch (operator) {
        case '=':
          return item?.[key] === target
        case '>':
          return item?.[key] > target
        case '<':
          return item?.[key] > target
        case '<=':
          return item?.[key] <= target
        case '>=':
          return item?.[key] >= target
        case '!=':
        case '!==':
          return item?.[key] !== target
        default:
          return false
      }
    })
  }

  return {
    ...configs,
    map,
    keyMap,
    filter,
    find,
    findByValue,
    findByName,
    where,
  }
}

export default ConfigTools
