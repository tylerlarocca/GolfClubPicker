const path = require('path');
const fs = require('fs');

exports.getDrivers = (req, res) => {
    const filePath = path.join(__dirname, '../data/drivers.json');
    if (fs.existsSync(filePath)) {
        const drivers = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        res.json(drivers);
    } else {
        res.status(404).json({ message: 'No drivers found' });
    }
};
