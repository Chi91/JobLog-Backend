const Job = require("./JobModel");
const studentService = require("../student/StudentService");

// get all jobs from database
function getJobs(query, callback) {
	let limit = query.limit ? query.limit : 100;
	let studentID = query.studentID;
	let field = query.fieldIDs ?? "";
	let course = query.courseIDs ?? "";
	let tag = query.tag ?? "";
	let title = query.title ?? "";

	if (field.includes(",")) {
		let temp = [];
		field.split(",").forEach((value) => {
			temp.push(new RegExp(value, "gi"));
		});
		field = temp;
	} else {
		field = new RegExp(field, "gi");
	}

	if (course.includes(",")) {
		let temp = [];
		course.split(",").forEach((value) => {
			temp.push(new RegExp(value, "gi"));
		});
		course = temp;
	} else {
		course = new RegExp(course, "gi");
	}

	if (tag.includes(",")) {
		let temp = [];
		tag.split(",").forEach((value) => {
			temp.push(new RegExp(value, "gi"));
		});
		tag = temp;
	} else {
		tag = new RegExp(tag, "gi");
	}

	let filter = {
		fieldIDs: query.fieldIDs ? { $in: field } : undefined,
		courseIDs: query.courseIDs ? { $in: course } : undefined,
		tagList: query.tag ? { $in: tag } : undefined,
		companyName: { $regex: new RegExp(query.companyname, "gi") },
		jobTitle: { $regex: new RegExp(title, "gi") },
		companyID: query.company,
	};

	Object.keys(filter).forEach((key) => {
		if (filter[key] === undefined) {
			delete filter[key];
		}
	});

	Job.find(filter, (err, result) => {
		if (err) {
			callback(err);
		} else {
			if (studentID) {
				matchTimes(studentID, result, (err, result) => {
					if (err) {
						callback(err);
					} else {
						callback(null, result);
					}
				});
			} else {
				callback(null, result);
			}
		}
	}).limit(limit);
}

// get one specific job from database
function getJobByID(jobID, callback) {
	Job.findById({ _id: jobID }, (err, result) => {
		if (err) {
			if (JSON.stringify(err.message).includes("_id")) {
				callback(null, null);
			} else {
				callback(err);
			}
		} else if (!result) {
			callback(null, null);
		} else {
			callback(null, result);
		}
	});
}

// Set Job with CompanyID
function saveJob(payload, reqBody, callback) {
	const { id, name } = payload;
	const subset = { id, name };
	if (!reqBody) {
		return callback(null, null);
	} else {
		let newJob = new Job(reqBody);
		newJob.companyID = subset.id;
		newJob.companyName = subset.name;
		newJob.save(function (err, result) {
			if (err) {
				return callback(err, null);
			} else {
				return callback(null, result);
			}
		});
	}
}

//update job from database
function updateJob(jobID, updateBody, callback) {
	getJobByID(jobID, (err, result) => {
		if (err) {
			callback("Error in getJobByID(): " + err);
		} else if (!result) {
			callback(null, null);
		} else {
			result = Object.assign(result, updateBody);
			result
				.save()
				.then((saveJob) => {
					callback(null, saveJob);
				})
				.catch((updateErr) => {
					callback(updateErr);
				});
		}
	});
}

// delete job from database
function deleteJob(jobID, callback) {
	getJobByID(jobID, (err, result) => {
		if (err) {
			callback("Error in getJobByID(): " + err);
		} else if (!result) {
			callback(null, null);
		} else {
			Job.deleteOne({ _id: jobID })
				.then((deletedJob) => {
					callback(null, deletedJob);
				})
				.catch((deleteErr) => {
					callback(deleteErr);
				});
		}
	});
}

function deleteManyJob(deleteCompanyID, callback) {
	Job.deleteMany({ companyID: deleteCompanyID }, (err, result) => {
		if (err) {
			return callback(err, null);
		} else {
			return callback(null, result);
		}
	});
}

const createSubset = (data) => {
	if (!data) {
		return null;
	}

	let subset = {
		jobID: data._id,
		companyID: data.companyID,
		companyName: data.companyName,
		fieldIDs: data.fieldIDs,
		courseIDs: data.courseIDs,
		tagList: data.tagList,
		jobTitle: data.jobTitle,
		jobSummary: data.jobSummary,
		jobType: data.jobType,
		salaryPerHour: data.salaryPerHour,
		vacation: data.vacation,
		weeklyHours: data.weeklyHours,
		weeklyTimeSlots: data.weeklyTimeSlots,
		benefits: data.benefits,
	};
	return subset;
};

const matchTimes = (id, jobs, callback) => {
	const offset = 0.1;
	let helper = [];
	studentService.getStudentByID(id, (err, result) => {
		if (err || !result) {
			callback(err);
		} else {
			if (!result.availability) {
				callback(null, helper);
			} else {
				let availability = result.availability;
				jobs.forEach((gig) => {
					let count = 0;
					let target;
					availability.forEach((student) => {
						target = gig.weeklyHours - gig.weeklyHours * offset;
						if (result.weeklyHours >= gig.weeklyHours) {
							gig.weeklyTimeSlots.forEach((job) => {
								if (job.day == student.day) {
									if (job.beginn < student.end) {
										let start =
											job.beginn > student.beginn ? job.beginn : student.beginn;
										let end = job.end < student.end ? job.end : student.end;

										let endingHour = parseInt(end.split(":")[0]);
										let endingMinute = parseInt(end.split(":")[1]);
										let startingHour = parseInt(start.split(":")[0]);
										let startingMinute = parseInt(start.split(":")[1]);

										if (startingMinute > endingMinute) {
											endingMinute += 60;
											endingHour -= 1;
										}
										// Stunde - Stunde + Minute - Minute -> Minuten werden in Bruchteil von 60 zerteilt, da job.weeklyHours in float angegeben wird
										count +=
											endingHour -
											startingHour +
											(endingMinute - startingMinute) / 60;
									}
								}
							});
						}
					});
					if (count >= target) {
						helper.push(gig);
					}
				});
				callback(null, helper);
			}
		}
	});
};

module.exports = {
	getJobs,
	getJobByID,
	saveJob,
	updateJob,
	deleteJob,
	deleteManyJob,
	createSubset,
};
