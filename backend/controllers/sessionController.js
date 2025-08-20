import Session from "../models/Session.js";

export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: "published" });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.userId });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      user_id: req.userId,
    });
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const saveDraft = async (req, res) => {
  try {
    const { id, title, tags, json_file_url } = req.body;

    const tagsArray = tags
      ? Array.isArray(tags)
        ? tags
        : tags.split(",").map((t) => t.trim())
      : [];

    let session;
    if (id) {
      // Update existing draft by ID
      session = await Session.findOneAndUpdate(
        { _id: id, user_id: req.userId },
        {
          title,
          tags: tagsArray,
          json_file_url,
          status: "draft",
          updated_at: new Date(),
        },
        { new: true }
      );
    } else {
      // Update existing draft for user, OR create a new one
      session = await Session.findOneAndUpdate(
        { user_id: req.userId, status: "draft" },
        {
          title,
          tags: tagsArray,
          json_file_url,
          status: "draft",
          updated_at: new Date(),
          $setOnInsert: { created_at: new Date() },
        },
        { new: true, upsert: true }
      );
    }

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const publishSession = async (req, res) => {
  try {
    const { id } = req.body;

    const session = await Session.findOneAndUpdate(
      { _id: id, user_id: req.userId },
      {
        status: "published",
        updated_at: new Date(),
      },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
