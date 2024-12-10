import PriorityQueue from "js-priority-queue";

export default function calculatePriority(allData) {
    console.log(allData)
	// Define the custom comparator based on calculated priority
	const customComparator = (a, b) => b.priority - a.priority;

	// Initialize the priority queue
	const pq = new PriorityQueue({ comparator: customComparator });

	// Process and calculate priority for each object
	allData.forEach((item) => {
		const canJoinFactor = (item.can_join_in / 100) * 5; // Convert can_join_in to 5-point scale
		const experienceFactor = (item.experience / 10) * 5; // Convert experience to 5-point scale
		const salaryFactor = (item.expected_salary / 100) * 5; // Convert expected_salary to 5-point scale

		// Exclude can_join_in, expected_salary, and experience from the totalValues sum
		const totalValues = Object.entries(item).reduce((sum, [key, val]) => {
			if (
				typeof val === "number" &&
				key !== "can_join_in" &&
				key !== "expected_salary" &&
				key !== "experience"
			) {
				return sum + val; // Add only allowed numerical values
			}

			return sum;
		}, 0);

		// Calculate priority
		const priority =
			totalValues - canJoinFactor - salaryFactor + experienceFactor;

		// Add the object along with the calculated priority to the queue
		pq.queue({ id: item.id, priority });
	});

	// Extract sorted IDs from the priority queue
    console.log(pq)
	const sortedIds = [];
	while (pq.length > 0) {
		sortedIds.push(pq.dequeue().id);
	}
    // console.log(sortedIds)
	return sortedIds;
}
