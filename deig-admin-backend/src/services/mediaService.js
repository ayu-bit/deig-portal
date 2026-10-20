const { Media } = require('../models');
const fs = require('fs');
const path = require('path');

const getFileType = (mimetype) => {
    if (mimetype.startsWith('image/')) return 'Image';
    if (mimetype.startsWith('video/')) return 'Video';
    if (mimetype === 'application/pdf') return 'Document';
    if (mimetype.includes('zip') || mimetype.includes('compressed')) return 'Archive';
    return 'Document';
};

// This service abstracts storage logic. It can be swapped for an S3 service.
class MediaService {

    async handleFileUpload(file, user) { // user can be null for public uploads
        // For local storage, the file is already in `uploads/`. We just need to create a DB record.
        // The URL will be relative to the server.
        const fileUrl = `/uploads/${file.filename}`;

        const newMedia = await Media.create({
            name: file.originalname,
            url: fileUrl,
            type: getFileType(file.mimetype),
            size: file.size,
            uploaderId: user ? user.id : null
        });

        return newMedia;
    }

    async handleFileDelete(mediaFile) {
         // 1. Delete the physical file if it exists (for local storage)
        const storageType = process.env.STORAGE_TYPE || 'local';
        if (storageType === 'local') {
            // mediaFile.url is like '/uploads/filename'. We need to build the absolute path.
            const filePath = path.join(__dirname, '../../', mediaFile.url);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        // If using S3, you would call the S3 delete object method here.

        // 2. Delete the database record
        await mediaFile.destroy();

        return true;
    }
}

module.exports = new MediaService();