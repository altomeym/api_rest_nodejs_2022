const fs = require('fs')
const { matchedData } = require('express-validator')
const { storageModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')

const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = `${__dirname}/../storage`

/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const data = await storageModel.find(id)
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'ERROR_GET_ITEMS')
    }
}

/**
 * Obtener un registro o documento de la lista
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const data = await storageModel.findById(id)
        res.send({ data })
    } catch (e) {
        handleHttpError(res, 'ERROR_GET_ITEM')
    }
}

/**
 * Insertar un registro o documento a la lista
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        const { file } = req
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData)
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'ERROR_CREATE_ITEM')
    }
}

/**
 * Actualizar un registro o documento de la lista
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
    try {
    } catch (e) {
        handleHttpError(res, 'ERROR_UPDATE_ITEM')
    }
}

/**
 * Eliminar un registro o documento de la lista
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const dataFile = await storageModel.findById(id)
        await storageModel.delete({_id: id})
        const { filename } = dataFile
        const filePath = `${MEDIA_PATH}/${filename}`
        //fs.unlinkSync(filePath)
        const data = {
            filePath,
            delete: 1
        }
        res.send({ data })
    } catch (e) {
        handleHttpError(res, 'ERROR_DELETE_ITEM')
    }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }