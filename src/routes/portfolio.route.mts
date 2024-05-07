import express from 'express';
import {Intro, Project, Experience, Contact, Skill} from '../models/user.model.mjs'
import { User } from '../models/admin.model.mjs';
import exp from 'constants';

const router = express.Router();

router.get('/get-portfolio-data', async(req, res) => {
    try {
        const Intros = await Intro.find();
        const Projects = await Project.find();
        const Experiences = await Experience.find();
        const Contacts = await Contact.find();
        const Skills = await Skill.find();
        
        res.status(200).send({
            intro: Intros,
            project: Projects,
            experience: Experiences,
            contact: Contacts,
            skill: Skills
        });

    } catch(error){
        console.error('Error fetching portfolio data:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

router.post("/update-intro", async(req, res) => {
    try {
        const { _id, ...updateData } = req.body;
        const intro = await Intro.findOneAndUpdate(
            {_id: _id},
            updateData,
            {new: true}
        ); 
        if (!intro) {
            return res.status(404).send({ success: false, message: "Intro not found" });
        }
        res.status(200).send({ data: intro, success: true, message: "Intro updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
});

router.post("/add-experience", async(req, res) => {
    try {
        const { ...updateData } = req.body;
        const experience = new Experience(updateData);
        await experience.save();
        res.status(200).send({ data: experience, success: true, message: "Experience added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
});

router.post("/update-experience", async(req, res) => {
    try {
        const { _id, ...updateData } = req.body;
        const experience = await Experience.findOneAndUpdate(
            {_id: _id},
            updateData,
            {new: true}
        ); 
        if (!experience) {
            return res.status(404).send({ success: false, message: "experience not found" });
        }
        res.status(200).send({ data: experience, success: true, message: "Experience updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
});

router.post("/delete-experience", async(req, res) => {
    try {
        const { _id} = req.body;
        const experience = await Experience.findOneAndDelete(
            {_id: _id},
            {new: true}
        ); 
        if (!experience) {
            return res.status(404).send({ success: false, message: "Experience not found" });
        }
        res.status(200).send({ data: experience, success: true, message: "Experience Deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
});



router.post("/add-project", async(req, res) => {
    try {
        const { ...updateData } = req.body;
        const project = new Project(updateData);
        await project.save();
        res.status(200).send({ data: project, success: true, message: "Project added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
});

router.post("/update-project", async(req, res) => {
    try {
        const { _id, ...updateData } = req.body;
        const project = await Project.findOneAndUpdate(
            {_id: _id},
            updateData,
            {new: true}
        ); 
        if (!project) {
            return res.status(404).send({ success: false, message: "Project not found" });
        }
        res.status(200).send({ data: project, success: true, message: "project updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
});

router.post("/delete-project", async(req, res) => {
    try {
        const { _id} = req.body;
        const project = await Project.findOneAndDelete(
            {_id: _id},
            {new: true}
        ); 
        if (!project) {
            return res.status(404).send({ success: false, message: "Project not found" });
        }
        res.status(200).send({ data: project, success: true, message: "Project Deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
});

router.post("/add-skill", async(req, res) => {
    try {
        const { ...updateData } = req.body;
        const skill = new Skill(updateData);
        await skill.save();
        res.status(200).send({ data: skill, success: true, message: "Skill added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
});

router.post("/delete-skill", async(req, res) => {
    try {
        const { _id} = req.body;
        const skill = await Skill.findOneAndDelete(
            {_id: _id},
            {new: true}
        ); 
        if (!skill) {
            return res.status(404).send({ success: false, message: "Skill not found" });
        }
        res.status(200).send({ data: skill, success: true, message: "Skill Deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
});

router.post("/update-contact", async(req, res) => {
    try {
        const { _id, ...updateData } = req.body;
        const contact = await Contact.findOneAndUpdate(
            {_id: _id},
            updateData,
            {new: true}
        ); 
        if (!contact) {
            return res.status(404).send({ success: false, message: "contact not found" });
        }
        res.status(200).send({ data: contact, success: true, message: "contact updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
});

router.post("/admin-login", async(req, res) =>{
    try {
        const admin = await User.findOne({
            username: req.body.username, 
            password: req.body.password
        });

        if(admin){
            res.status(200).send({
                data: admin.username,
                success: true,
                message: "login successful!"
            });
        } else {
            res.status(500).send({
                data: admin,
                success: false,
                message: "Invalid username or password"
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});



export {router};