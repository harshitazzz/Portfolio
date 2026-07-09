const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const projectRoutes = require('./routes/projectRoutes');
const heroRoutes = require('./routes/heroRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const Project = require('./models/Project');
const Hero = require('./models/Hero');
const About = require('./models/About');
const Experience = require('./models/Experience');
const Achievement = require('./models/Achievement');
const educationRoutes = require('./routes/educationRoutes');
const Education = require('./models/Education');
const socialLinkRoutes = require('./routes/socialLinkRoutes');
const SocialLink = require('./models/SocialLink');
const messageRoutes = require('./routes/messageRoutes');
const Message = require('./models/Message');
const contactInfoRoutes = require('./routes/contactInfoRoutes');
const ContactInfo = require('./models/ContactInfo');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Make uploads folder static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const RESUME_PATH = path.join(__dirname, 'data', 'resume.json');
const MESSAGES_PATH = path.join(__dirname, 'data', 'messages.json');

// Ensure data folder and files exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

if (!fs.existsSync(MESSAGES_PATH)) {
  fs.writeFileSync(MESSAGES_PATH, JSON.stringify([], null, 2), 'utf-8');
}

// Mount Routes
app.use('/api/projects', projectRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/social-links', socialLinkRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/contact-info', contactInfoRoutes);

// API Routes
app.get('/api/resume', async (req, res) => {
  try {
    if (!fs.existsSync(RESUME_PATH)) {
      return res.status(404).json({ error: 'Resume data not found' });
    }
    const data = JSON.parse(fs.readFileSync(RESUME_PATH, 'utf-8'));
    
    // Fetch dynamic projects from MongoDB
    const dynamicProjects = await Project.find({});
    
    // Fetch dynamic hero from MongoDB
    const dynamicHero = await Hero.findOne();

    // Fetch dynamic about from MongoDB
    const dynamicAbout = await About.findOne();
    const dynamicAchievements = await Achievement.find().sort({ createdAt: -1 });
    const dynamicEducation = await Education.find().sort({ createdAt: -1 });
    const dynamicSocialLinks = await SocialLink.find().sort({ order: 1, createdAt: 1 });
    const dynamicContactInfo = await ContactInfo.findOne();

    // Fetch dynamic experience from MongoDB
    const dynamicExperiences = await Experience.find().sort({ createdAt: -1 });

    // Override static projects with dynamic ones if any exist
    const mappedProjects = dynamicProjects.map(p => ({
      id: p._id,
      title: p.title,
      category: p.techStack.join(', '),
      description: p.description,
      imageName: p.image, 
      link: p.githubLink || '#',
      liveLink: p.liveDemoLink,
      techStack: p.techStack
    }));

    if (mappedProjects.length > 0) {
      data.projects = mappedProjects;
    }

    // Always set experience to DB data to allow empty states
    data.experience = dynamicExperiences.map(e => ({
      id: e._id,
      role: e.role,
      company: e.company,
      period: e.period,
      description: e.description
    }));

    // Always send achievements array (even if empty) for empty-state handling
    data.achievements = dynamicAchievements.map(a => ({
      id: a._id,
      title: a.title,
      description: a.description,
      image: a.image
    }));

    // Always send education array for empty-state handling
    data.education = dynamicEducation.map(e => ({
      id: e._id,
      title: e.title,
      subtitle: e.subtitle,
      cgpa: e.cgpa,
      period: e.period,
    }));

    // Add dynamic social links
    data.socialLinks = dynamicSocialLinks.map(s => ({
      id: s._id,
      title: s.title,
      url: s.url,
      order: s.order
    }));

    if (dynamicHero) {
      if (!data.personal) data.personal = {};
      if (dynamicHero.headline) data.personal.headline = dynamicHero.headline;
      if (dynamicHero.subHeadline) data.personal.subHeadline = dynamicHero.subHeadline;
      if (dynamicHero.avatarVideo) data.personal.avatarVideo = dynamicHero.avatarVideo;
      if (dynamicHero.backgroundImage) data.personal.backgroundImage = dynamicHero.backgroundImage;
    }

    if (dynamicContactInfo) {
      if (!data.personal) data.personal = {};
      if (dynamicContactInfo.email) data.personal.email = dynamicContactInfo.email;
      if (dynamicContactInfo.location) data.personal.location = dynamicContactInfo.location;
    }

    if (dynamicAbout) {
      if (!data.about) data.about = {};
      if (dynamicAbout.headline) data.about.philosophy = dynamicAbout.headline;
      if (dynamicAbout.subHeadline) data.about.subPhilosophy = dynamicAbout.subHeadline;
      if (dynamicAbout.techStack && dynamicAbout.techStack.length > 0) data.about.skills = dynamicAbout.techStack;
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching resume data:', error);
    res.status(500).json({ error: 'Failed to read resume data' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields (name, email, message) are required.' });
    }

    const newMessage = new Message({
      name,
      email,
      message
    });

    await newMessage.save();

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to save message. Please try again.' });
  }
});

// Start Server (local dev)
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

// Export for Vercel serverless
module.exports = app;
