const Location = require('../models/locationModel'); 
const User = require('../models/user'); 

// Show the last known location of the user
exports.showLocation = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res.status(400).json({ error: 'User not authenticated'});
  }
  try {
    // Fetch the latest location of the user from the location collection
    const lastLocation = await Location.findOne({ userId}).sort({ timestamp: -1 });

    if (!lastLocation) {
      return res.status(404).json({ error: 'No location found for this user' });
    }

    return res.status(200).json({
      message: 'Location fetched successfully!',
      location: {
        latitude: lastLocation.latitude,
        longitude: lastLocation.longitude,
      },
    });
  } catch (error) {
    console.error('Error fetching location:', error);
    res.status(500).json({ error: 'Failed to fetch location' });
  }
};


exports.updateLocation = async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
   
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
 //   const existingLocation = await Location.findOne({ userId: user._id });
    const existingLocation = await Location.findOne({ userId });

    if (existingLocation) {
      existingLocation.latitude = latitude;
      existingLocation.longitude = longitude;
      await existingLocation.save();
      return res.status(200).json({ message: 'Location updated successfully!' });
    } else {
      
      const newLocation = new Location({
        userId,
        latitude,
        longitude,
      });

     
      await newLocation.save();
      return res.status(201).json({ message: 'Location created successfully!' });
    }
  } catch (error) {
    console.error('Error updating or creating location:', error);
    res.status(500).json({ error: 'Failed to update or create location' });
  }
};
