const { Contact, User } = require('../models');
const mediaService = require('../services/mediaService');

exports.createContact = async (req, res) => {
    try {
        const { name, email, subject, message, division } = req.body;
        let finalMessage = message;

        if (req.file) {
            // A non-logged-in user is uploading, so pass null for the user object
            const mediaFile = await mediaService.handleFileUpload(req.file, null);
            const fileUrl = `${process.env.APP_URL || 'http://localhost:5000'}${mediaFile.url}`;
            finalMessage += `\n\nAttachment: [${mediaFile.name}](${fileUrl})`;
        }

        const newContact = await Contact.create({
            name,
            email,
            subject,
            message: finalMessage,
            division: division || 'General'
        });

        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ message: "Error creating contact inquiry", error: error.message });
    }
};

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.findAll({
            include: { model: User, as: 'assignee', attributes: ['name'] },
            order: [['createdAt', 'DESC']]
        });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching contacts", error: error.message });
    }
};

exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findByPk(req.params.id);
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: "Error fetching contact", error: error.message });
    }
};

exports.updateContact = async (req, res) => {
     try {
        const contact = await Contact.findByPk(req.params.id);
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        
        const { status, assigneeId } = req.body;
        await contact.update({ status, assigneeId });

        res.json({ message: "Contact updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating contact", error: error.message });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByPk(req.params.id);
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        await contact.destroy();
        res.json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting contact", error: error.message });
    }
};