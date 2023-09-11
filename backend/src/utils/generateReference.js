const generateUniqueReference = () => {
	const currentDate = new Date();
	const year = currentDate.getFullYear().toString().slice(-2); // Last two digits of the year
	const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month (padded with leading zero if necessary)
	const day = currentDate.getDate().toString().padStart(2, '0'); // Day (padded with leading zero if necessary)

	const randomPart = Math.random().toString(36).slice(2, 5); // Random alphanumeric part

	return `${year}${randomPart}${month}${day}`.slice().toLocaleUpperCase(); // Combine parts and convert to uppercase
};

export default generateUniqueReference;
