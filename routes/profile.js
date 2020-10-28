const express = require('express')
const config = require('config')
const axios = require('axios')
const auth = require('../middleware/auth')
const User = require('../models/User')
const Profile = require('../models/Profile')
const router = express.Router()
const ghId = config.get('githubClientId')
const ghCs = config.get('githubClientSecret')
const ghToken = config.get('githubToken')

router.get('/profile/me', auth, async (req, res) => {
    const user = await req.user
    const _id = req.user._id
    let match = {}

    try {
        match = await Profile.findOne({ owner: _id }).populate('owner', ['name', 'avatar'])
        if (!match) {
            throw new Error('Profile not found')
        }
        res.json(match)
    } catch(e) {
        console.error(e)
        res.status(500).send(e.message)
    }
})

router.post('/profile', auth, async (req, res) => {
    const user = await req.user
    const _id = req.user._id
    const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        githubusername,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram
    } = req.body

    // build profile object
    const profileFields = {}
    profileFields.owner = _id
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (status) profileFields.status = status
    if (bio) profileFields.bio = bio
    if (githubusername) profileFields.githubusername = githubusername
    if (skills) {
        profileFields.skills = skills.split(',').map((skill) => skill.trim())
    }
    // build social object
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram

    try {
        let profile = await Profile.findOne({ owner: _id })
        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { $set: profileFields },
                { new: true }
            )

            return res.json(profile)
        }

        profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)
    } catch (e) {
        console.error(e.message)
        res.status(500).send(e.message)
    }
})

router.get('/profiles', async (req, res) => {
    
    try {
        const profiles = await Profile.find().populate('owner', ['name', 'avatar'])
        res.json(profiles)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.get('/profile/:owner_id', async (req, res) => {
    
    try {
        const profile = await Profile.findOne({ owner: req.params.owner_id }).populate('owner', ['name', 'avatar'])
        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' })
        }
        res.json(profile)
    } catch (e) {
        if (e.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' })
        }
        res.status(500).send(e.message)
    }
})

router.delete('/profile/me', auth, async (req, res) => {
    const user = await req.user
    const _id = req.user._id

    try {
        // delete profile
        await Profile.findOneAndDelete({ owner: _id })
        // delete user
        await User.findOneAndDelete({ _id })
        res.json({ msg: 'Successfully deleted account' })
    } catch(e) {
        console.error(e)
        res.status(500).send(e.message)
    }
})

router.patch('/profile/me/experience', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    console.log(updates)
    const allowedUpdates = ['title', 
                            'company', 
                            'location', 
                            'from',
                            'to',
                            'current',
                            'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!'})
    }

    try {
        const user = await req.user
        const profile = await Profile.findOne({ owner: req.user._id }).populate('owner', ['name', 'avatar'])
        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' })
        }
        const newExp = {}
        updates.forEach((update) => newExp[update] = req.body[update])
        profile.experience.unshift(newExp)
        await profile.save()
        
        res.send(profile)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.post('/profile/me/experience/:_id', auth, async (req, res) => {
    const user = await req.user
    const _id = req.user._id
    try {
        const profile = await Profile.findOne({ owner: _id })
        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' })
        }
        profile.experience.forEach((exp) => {
            if (exp.id !== req.params._id) {
                throw new Error('Could not delete experience that does not exist')
            }
        })
        profile.experience = profile.experience.filter((exp) => exp.id !== req.params._id)
        await profile.save()
        res.json({ msg: 'Experience was successfully deleted' })
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.patch('/profile/me/education', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    console.log(updates)
    const allowedUpdates = ['school', 
                            'degree', 
                            'fieldofstudy', 
                            'from',
                            'to',
                            'current',
                            'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!'})
    }

    try {
        const user = await req.user
        const profile = await Profile.findOne({ owner: req.user._id }).populate('owner', ['name', 'avatar'])
        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' })
        }
        const newEdu = {}
        updates.forEach((update) => newEdu[update] = req.body[update])
        profile.education.unshift(newEdu)
        await profile.save()
        
        res.send(profile)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.post('/profile/me/education/:_id', auth, async (req, res) => {
    const user = await req.user
    const _id = req.user._id
    try {
        const profile = await Profile.findOne({ owner: _id })
        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' })
        }
        profile.education.forEach((edu) => {
            if (edu.id !== req.params._id) {
                throw new Error('Could not delete education that does not exist')
            }
        })
        profile.education = profile.education.filter((edu) => edu.id !== req.params._id)
        await profile.save()
        res.json({ msg: 'Education was successfully deleted' })
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.get('/profile/github/:username', async (req, res) => {
    try {
        const uri = encodeURI(`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`)
        const headers = {    
            'user-agent': 'node.js',
            Authorization: `token ${ghToken}`
        }

        const githubResponse = await axios.get(uri, { headers })

        return res.json(githubResponse.data)
        
    } catch (e) {
        console.error(e.message)
        res.status(404).json({ msg: 'No Github Profile Found...' })
    }
})

module.exports = router