// Calculate work experience
export default function calculateExp(user) {
	function calculateWorkExperience(workPeriods) {
		// Step 1: Parse and sort the work periods by start date
		const periods = workPeriods
			.map(({ start_date, end_date }) => ({
				start: new Date(start_date),
				end: new Date(end_date),
			}))
			.sort((a, b) => a.start - b.start);

		// Step 2: Merge overlapping or contiguous periods
		const merged = [];
		periods.forEach((current) => {
			if (!merged.length || current.start > merged[merged.length - 1].end) {
				// No overlap, add the current period
				merged.push(current);
			} else {
				// Overlap, merge the periods
				merged[merged.length - 1].end = new Date(
					Math.max(merged[merged.length - 1].end, current.end)
				);
			}
		});

		// Step 3: Calculate total duration in days
		const totalDuration = merged.reduce((sum, period) => {
			const duration = (period.end - period.start) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
			return sum + duration;
		}, 0);

		// Convert total duration to years and months
		const years = Math.floor(totalDuration / 365);
		const months = Math.floor((totalDuration % 365) / 30);
		return parseFloat(((years * 12 + months) / 12).toFixed(1));
	}

	const workPeriods = user.data.user_data.user.workEx.map(
		({ start_date, end_date }) => ({
			start_date,
			end_date,
		})
	);
	return calculateWorkExperience(workPeriods);
}
