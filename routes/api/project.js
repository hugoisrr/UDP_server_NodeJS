const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

const Project = require("../../models/Project");

/*----------  Project Routes  ----------*/

/**
 * @route    POST api/project
 * @desc     Create or update project
 * @access   Public
 */
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newProject = new Project({
        name: req.body.name,
        description: req.body.description
      });

      const project = await newProject.save();

      res.json(project);
    } catch (err) {
      if (err.code === 11000) {
        console.error(err.message);
        res.status(400).send("Project's name taken");
      } else {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }
  }
);

/**
 * @route    GET api/project
 * @desc     Get project all projects
 * @access   Public
 */
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ date: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route    GET api/project/:id
 * @desc     Get project by ID
 * @access   Public
 */
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Project not found" });
    }
    res.status(500).send("Server Error");
  }
});

/**
 * @route    DELETE api/project/:id
 * @desc     Delete a project
 * @access   Public
 */
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    await project.remove();

    res.json({ msg: "Project removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Project not found" });
    }
    res.status(500).send("Server Error");
  }
});

/*----------  Location Routes  ----------*/

/**
 * @route    POST api/project/location/:id
 * @desc     Add location on a project
 * @access   Public
 */
router.post(
  "/location/:id",
  [
    check("location", "Location is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const project = await Project.findById(req.params.id);

      const newLocation = {
        location: req.body.location
      };

      project.locations.unshift(newLocation);

      await project.save();

      res.json(project.locations);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route    DELETE api/project/location/:id/:location_id
 * @desc     Delete location from project
 * @access   Public
 */
router.delete("/location/:id/:location_id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    const location = project.locations.find(
      location => location.id === req.params.location_id
    );

    if (!location) {
      return res.status(404).json({ msg: "Location does not exist" });
    }

    const removeIndex = project.locations
      .map(location => location.id.toString())
      .indexOf(req.params.location_id);

    project.locations.splice(removeIndex, 1);

    await project.save();

    res.json(project.locations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/*----------  Workstation Routes  ----------*/

/**
 * @route    POST api/project/location/workstation/:id/:location_id
 * @desc     Add workstation on a location
 * @access   Public
 */
router.post(
  "/location/workstation/:id/:location_id",
  [
    check("workstation", "Workstation is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const project = await Project.findById(req.params.id);

      const location = project.locations.find(
        location => location.id === req.params.location_id
      );

      if (!location) {
        return res.status(404).json({ msg: "Location does not exist" });
      }

      const newWorkstation = {
        workstation: req.body.workstation
      };

      location.workstations.unshift(newWorkstation);

      await project.save();

      res.json(location.workstations);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route    DELETE api/project/location/workstation/:id/:location_id/:workstation_id
 * @desc     Delete workstation from location
 * @access   Public
 */
router.delete(
  "/location/workstation/:id/:location_id/:workstation_id",
  async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);

      const location = project.locations.find(
        location => location.id === req.params.location_id
      );

      if (!location) {
        return res.status(404).json({ msg: "Location does not exist" });
      }

      const removeIndex = location.workstations
        .map(workstation => workstation.id.toString())
        .indexOf(req.params.workstation_id);

      location.workstations.splice(removeIndex, 1);

      await project.save();

      res.json(project.locations);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
