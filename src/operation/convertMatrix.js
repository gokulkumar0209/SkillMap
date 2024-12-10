import calculateExp from "./experience";
import calculatePriority from "./priority_calculation";

export default function convertMatrix(allData) {
	const all_skills = new Set();

	// Helper functions
	function canJoinIn() {
		return Math.floor(Math.random() * 100) + 1;
	}

	function salary() {
		return Math.floor(Math.random() * 100);
	}

	let matrix = []; // Array to store user data
	let headers = ["name", "experience", "can_join_in", "expected_salary"]; // Predefined headers for basic fields

	// Process each user's data
	for (let data of allData) {
		let row = {};
		row.name = data.name || "unknown";
		row.experience = calculateExp(data) || 0;
		row.can_join_in = canJoinIn();
		row.expected_salary = salary();

		// Safely access skillsets
		const skillsets = data?.data?.data?.skillset || [];
		for (const skillset of skillsets) {
			const skills = skillset?.skills || [];
			for (const skill of skills) {
				const skill_name = skill?.name || "unknown";
				all_skills.add(skill_name); // Add skill name to the skill set
				row[skill_name] = skill?.pos?.[0]?.consensus_score || 0; // Safely access consensus_score
			}
		}

		matrix.push(row); // Add the user data row to matrix
	}

	// Prepare the result matrix to look like a table

	const resultMatrix = [];
	const priorityMatrix = calculatePriority(matrix);
	// Add the first row (user IDs)
	let headerRow = ["SkillMap"];
	for (let i = 0; i < allData.length; i++) {
		headerRow.push(allData[i].id); // Add user IDs
	}
	resultMatrix.push(headerRow); // Add the header row

	// Add rows for experience, can_join_in, and expected_salary
	let experienceRow = ["experience"];
	let canJoinRow = ["can_join_in"];
	let salaryRow = ["expected_salary"];

	for (let user of matrix) {
		experienceRow.push(user.experience); // Add user experience to the row
		canJoinRow.push(user.can_join_in); // Add user can_join_in value
		salaryRow.push(user.expected_salary); // Add user expected salary
	}

	resultMatrix.push(experienceRow); // Add the experience row
	resultMatrix.push(canJoinRow); // Add the can_join_in row
	resultMatrix.push(salaryRow); // Add the expected salary row

	// Add rows for each skill (skill names in the first column and scores in subsequent columns)
	for (let skill of all_skills) {
		let skillRow = [skill]; // Start each row with the skill name
		for (let user of matrix) {
			const userSkillScore = user[skill] || 0;
			skillRow.push(userSkillScore);
		}
		resultMatrix.push(skillRow);
	}
	return resultMatrix;
}
