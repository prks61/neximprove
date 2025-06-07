const Filing = require("../models/filing");

// Create a new filing
exports.createFiling = async (req, res) => {
  try {
    const filing = new Filing(req.body);
    await filing.save();

    // Simulate webhook for EDI submission
    setTimeout(() => {
      console.log(`Webhook triggered for filing ${filing._id}`);
      // In a real system, this would call the actual EDI submission API
    }, 2000);

    res.status(201).json(filing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all filings
exports.getAllFilings = async (req, res) => {
  try {
    const filings = await Filing.find().sort({ submissionDate: -1 });
    res.json(filings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single filing
exports.getFiling = async (req, res) => {
  try {
    const filing = await Filing.findById(req.params.id);
    if (!filing) {
      return res.status(404).json({ error: "Filing not found" });
    }
    res.json(filing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a filing
exports.updateFiling = async (req, res) => {
  try {
    const filing = await Filing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!filing) {
      return res.status(404).json({ error: "Filing not found" });
    }
    res.json(filing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a filing
exports.deleteFiling = async (req, res) => {
  try {
    const filing = await Filing.findByIdAndDelete(req.params.id);
    if (!filing) {
      return res.status(404).json({ error: "Filing not found" });
    }
    res.json({ message: "Filing deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
