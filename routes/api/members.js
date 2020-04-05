const express = require("express")
const router = express.Router()
// Simple REST API route
const members = require('../../members')
const logger = require("../../middlewares/logger")

// uuid for get dynamic IDs
const uuid = require("uuid")



// get all members
router.get('/', logger, (req, res) => {
    // res.status(200).json({
    //     members
    // })
    res.json(members)
})

// get a single member
router.get('/:id', (req, res) => {
    // res.json(req.params.id)

    /* using filter method */
    // res.json(members.filter((member) =>
    //     member.id === parseInt(req.params.id)
    // ))

    /* using forEach loop method */
    // members.forEach((member) => {
    //     if (member.id === parseInt(req.params.id)) {
    //         res.json(member)
    //     }
    // })

    /* using for loop method */
    // for (var i = 0; i < members.length; i++) {
    //     console.log(members[i])
    //     if (members[i].id === parseInt(req.params.id)) {
    //         res.json(members[i])
    //     }
    // }


    const found = members.some(member =>
        member.id === parseInt(req.params.id))

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({
            message: `Member not found for ID ${req.params.id}!`
        })
    }
})


// create a member
router.post('/', (req, res) => {
    // res.send(req.body)
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {
        res.status(400).json({
            message: 'Please include a name and email'
        })
    }
    members.push(newMember)
    // res.json(members)
    res.redirect('/')
})

// update a member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        const updMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;


                res.json({
                    message: 'Member updated!', member
                })
            }
        })
    } else {
        res.status(400).json({
            message: `No member found with ID ${req.params.id}`
        })
    }
})


// delete a member
router.delete('/:id', (req, res) => {

    const found = members.some(member =>
        member.id === parseInt(req.params.id))

    if (found) {
        res.json({ message: 'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id)) })
    } else {
        res.status(400).json({
            message: `Member not found for ID ${req.params.id}!`
        })
    }
})




module.exports = router