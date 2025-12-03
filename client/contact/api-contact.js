const create = async (contact) => {
  try {
    let response = await fetch('/api/contacts/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const list = async (signal) => {
  try {
    let response = await fetch('/api/contacts/', {
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const read = async (params, signal) => {
  try {
    let response = await fetch('/api/contacts/' + params.contactId, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const remove = async (params) => {
  try {
    let response = await fetch('/api/contacts/' + params.contactId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

export { create, list, read, remove }