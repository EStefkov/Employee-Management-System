const { response } = require('express')
const Employee = require('../models/Employee')

// show the list of employees
const index = (req,res,next) =>{
    Employee.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message:'An erroe Ocured!'
        })
    })
}
// show single employee
const show = (req ,res,next) => {
    let employeeId = req.body.employeeId
    Employee.findById(employeeId)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!!'
        })
    })
}

// adding employee
const store = (req,res,next) =>{
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })
    if(req.file){
        employee.avatar = req.file.path
    }

    //ako iskam da  dobavqm poveche ot 1 fail 
    /*
      if(req.files){
        let path = ''
        req.files.forEach(function(files,index,arr){
            path = path + files.path + ','
        })
        path = path.substring(0,path.lastIndexOf(","))
        employee.avatar = path
    }
     */
    employee.save()
    .then(response => {
        res.json({ 
            message: 'Employee added successfully!'
        })
    })
    .catch(error =>{
        res.json({
            message: 'Employee didnt added!'
        })
    })
}

//update an employee

const update = (req,res,next) =>{
    let employeeId=req.body.employeeId
    
    let updateData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }

    Employee.findByIdAndUpdate(employeeId, {$set: updateData})
    .then(() =>{
        res.json({ 
            message: 'Employee updated successfully!'
        })
    })
    .catch(error =>{
        res.json({
            message: 'Employee didnt updated!'
        })
    })
}

//delete an employee
const destroy = (req,res,next) => {
    let employeeId = req.body.employeeId
    Employee.findByIdAndDelete(employeeId)
    .then(() =>{
        res.json({ 
            message: 'Employee deleted successfully!'
        })
    })
    .catch(error =>{
        res.json({
            message: 'Employee didnt deleted!'
        })
    })
}

module.exports = {
    index, show, store, update, destroy
}