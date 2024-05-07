import mongoose from "mongoose";

const introSchema = new mongoose.Schema({
    name: {
       type: String,
       required: true,
    },
    info: {
        type: [String],
        required: true,
     },
     about : {
        type: String,
        required: true,
    }
},  { collection: 'Intro' });


const projectsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    frameworks: {
        type: [String],
        required: false
    },
    languages: {
        type: [String],
        required: false
    },
    link: {
        type: [String],
        required: false
    }
}, { collection: 'Project' })

const experienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true
    },
    date_start: {
        type: String,
        required: true
    },
    date_end: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    }
}, { collection: 'Experience' })

const contactSchema = new mongoose.Schema({
    gitHub: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    linkedIn: {
        type: String,
        required: true
    }
}, { collection: 'Contact' })

const skillSchema = new mongoose.Schema({
    Link: {
        type: String,
        required: true,
    },
    Tab: {
        type: String,
        required: true,
    },
    File: {
        type: String,
        required: true,
    }
}, { collection: 'Skill' })

const Intro = mongoose.model("Intro", introSchema);
const Project = mongoose.model("Project", projectsSchema);
const Experience = mongoose.model("Experience", experienceSchema);
const Contact = mongoose.model("Contact", contactSchema);
const Skill = mongoose.model("Skill", skillSchema);

export {
    Intro,
    Project,
    Experience, 
    Contact,
    Skill
};