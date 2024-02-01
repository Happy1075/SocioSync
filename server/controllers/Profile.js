const Profile = require("../models/Profile");
const User = require("../models/User");
const { fileUpload } = require("../utils/fileUploader");
// Method for updating a profile
exports.updateProfile = async (req, res) => {
	try {
		const { dateOfBirth = "", about = "", contactNumber, gender} = req.body;
		const id = req.user.id;

		// Find the profile by id
		const userDetails = await User.findById(id);
		const profile = await Profile.findById(userDetails.profile);

		// Update the profile fields
		profile.dateOfBirth = dateOfBirth;
		profile.about = about;
		profile.contactNumber = contactNumber;
        profile.gender = gender;

		// Save the updated profile
		await profile.save();

		return res.json({
			success: true,
			message: "Profile updated successfully",
			profile,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

exports.getAllUserDetails = async (req, res) => {
	try {
    User.find({}, "userName", (err, users) => {
        if (err) {
        console.error(err);
        return;
		  }
		  const allUsers = users.map(user => user.username);
		  console.log(allUsers);
		});

    return res.json({
			  success: true,
			  message: "all Users are",
			  allUsers: allUsers,
		});
	}

  catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};


exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await fileUpload(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};