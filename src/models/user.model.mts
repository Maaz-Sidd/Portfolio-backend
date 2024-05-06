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
    start_date: {
        type: String,
        required: true
    },
    end_date: {
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

const Intro = mongoose.model("Intro", introSchema);
const Project = mongoose.model("Project", projectsSchema);
const Experience = mongoose.model("Experience", experienceSchema);
const Contact = mongoose.model("Contact", contactSchema);
export {
    Intro,
    Project,
    Experience, 
    Contact
};