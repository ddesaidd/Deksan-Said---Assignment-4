import Contact from '../models/contact.model.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {
  const contact = new Contact(req.body)
  try {
    await contact.save()
    return res.status(200).json({
      message: "Successfully created!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const list = async (req, res) => {
  try {
    let contacts = await Contact.find().select('firstname lastname email message created')
    res.json(contacts)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const contactByID = async (req, res, next, id) => {
  try {
    let contact = await Contact.findById(id)
    if (!contact)
      return res.status('400').json({
        error: "Contact not found"
      })
    req.contact = contact
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve contact"
    })
  }
}

const read = (req, res) => {
  return res.json(req.contact)
}

const remove = async (req, res) => {
  try {
    let contact = req.contact
    let deletedContact = await contact.deleteOne()
    return res.status(200).json({
      message: "Successfully deleted!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default { create, contactByID, read, list, remove }