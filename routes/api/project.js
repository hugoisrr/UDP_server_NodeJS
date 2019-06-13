const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const io = require("../../config/socket");

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

      res.statuis(201).json(project);
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

/*----------  Workstation Routes  ----------*/

/**
 * @route    POST api/project/workstation/:id
 * @desc     Add workstation on a project
 * @access   Public
 */
router.post(
  "/workstation/:id",
  [
    check("workstation", "workstation is required")
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

      const newWorkstation = {
        workstation: req.body.workstation
      };

      const workstations = project.workstations.unshift(newWorkstation);

      await project.save();
      io.getIO().emit("workstations", {
        action: "create",
        workstations: workstations
      });
      res.status(201).json(workstations);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route    GET api/project/workstation/:id
 * @desc     Get all workstations
 * @access   Public
 */
router.get("/workstation/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const workstations = project.workstations;

    if (!workstations.length) {
      return res
        .status(404)
        .json({ msg: "There are no workstations in this project" });
    }

    res.json(workstations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route    DELETE api/project/workstation/:id/:workstation_id
 * @desc     Delete workstation from project
 * @access   Public
 */
router.delete("/workstation/:id/:workstation_id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    const workstation = project.workstations.find(
      workstation => workstation.id === req.params.workstation_id
    );

    if (!workstation) {
      return res.status(404).json({ msg: "Workstation does not exist" });
    }

    const removeIndex = project.workstations
      .map(workstation => workstation.id.toString())
      .indexOf(req.params.workstation_id);

    project.workstations.splice(removeIndex, 1);

    await project.save();

    if (!project.workstations.length) {
      return res.json({ msg: "There are no workstations" });
    } else {
      res.json(project.workstations);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
