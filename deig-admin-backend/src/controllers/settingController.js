
const { Setting } = require('../models');

exports.getAllSettings = async (req, res) => {
    try {
        const settings = await Setting.findAll({ order: [['group', 'ASC'], ['key', 'ASC']] });
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching settings", error: error.message });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        // Expects an array of objects: [{ key: 'site_name', value: 'New Name' }, ...]
        const updates = req.body; 
        
        if (!Array.isArray(updates)) {
            return res.status(400).json({ message: "Invalid data format. Expected an array of settings." });
        }

        const promises = updates.map(async (update) => {
            const setting = await Setting.findByPk(update.key);
            if (setting) {
                return setting.update({ value: String(update.value) });
            }
        });

        await Promise.all(promises);
        res.json({ message: "Settings updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating settings", error: error.message });
    }
};
