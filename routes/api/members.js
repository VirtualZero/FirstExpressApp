const express = require('express')
const members = require('../../Members')
const uuid = require('uuid')
const router = express.Router()

// Gets single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    }

    else {
        res.status(400).json({ msg: `Member with id ${req.params.id} not found.` })
    }  
});

// Gets all members
router.get('/', (req, res) => {
    res.json(members)
});

// Create Member
router.post('/add-member', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Must include name and email.' })
    }

    members.push(newMember)
    //return res.json(members);

    // Or for Views
    return res.redirect('/')
})

// Update Member
router.put('/update-member/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        const updateMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;
                return res.json({ msg: 'Member Updated!', member })
            }
        })
    }

    else {
        res.status(400).json({ msg: `Member with id ${req.params.id} not found.` })
    }  
});

// Delete Member
router.delete('/delete-member/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        res.json(
            {
                msg: 'Member Deleted!',
                members: members.filter(
                    member => member.id !== parseInt(
                        req.params.id
                    )
                )
            }
        )
    }

    else {
        res.status(400).json({ msg: `Member with id ${req.params.id} not found.` })
    }  
});

module.exports = router