const express = require("express");
const router = express.Router();
const jobservice = require("./JobService");
const utility = require("../../utils/AuthenticationUtils");

// GET request for all jobs
router.get("/", function (req, res) {
	jobservice.getJobs(req.query, function (err, jobs) {
		if (jobs && !err) {
			let array = [];
			jobs.map((element) => {
				array.push(jobservice.createSubset(element));
			});
			res.status(200).send(array);
		} else if (!jobs) {
			res.status(404);
			res.json({ Error: err });
		} else {
			res.status(500);
			res.json({ Error: err.message });
		}
	});
});

// GET request for one specific job
router.get("/:id", function (req, res) {
	jobservice.getJobByID(req.params.id, function (err, job) {
		if (job) {
			res.status(200).json(job);
		} else if (!job) {
			res.status(404);
			res.json({ Error: "Could not find job " + req.params.id });
		} else {
			res.status(500);
			res.json({ Error: err.message });
		}
	});
});

// POST request
router.post(
	"/",
	utility.isAuthenticated,
	utility.isCompanyOrAdmin,
	function (req, res) {
		let payload = res.locals.payload;
		jobservice.saveJob(payload, req.body, function (err, job) {
			if (job) {
				res.status(201).send(jobservice.createSubset(job));
			} else if (!job) {
				res.status(400).json({ Error: err.message });
			} else {
				res.status(500).json({ Error: err.message });
			}
		});
	}
);

// PUT request
router.put(
	"/:id",
	utility.isAuthenticated,
	utility.isCompanyOrAdmin,
	function (req, res) {
		jobservice.updateJob(req.params.id, req.body, function (err, job) {
			if (err) {
				res.status(400).json({ Error: err.message });
			} else if (!job) {
				res.status(404).json({ Error: "Could not find job " + req.params.id });
			} else {
				res.status(202).json(job);
			}
		});
	}
);

// DELETE request
router.delete(
	"/:id",
	utility.isAuthenticated,
	utility.isCompanyOrAdmin,
	function (req, res) {
		jobservice.deleteJob(req.params.id, function (err, result) {
			if (result) {
				res.status(204).json([]);
			} else if (!result) {
				res.status(404).json({ Error: "Could not find job " + req.params.id });
			} else {
				res.status(500).json({ Error: err.message });
			}
		});
	}
);

module.exports = router;
