export default function (firstArr, secondArr) {
	if (firstArr === secondArr) {
		return true;
	}

	if (firstArr == null || secondArr == null) {
		return false;
	}

	if (firstArr.length !== secondArr.length) {
		return false;
	}

	const sortedFirstArr = [...firstArr].sort();
	const sortedSecondArr = [...secondArr].sort();

	for (let i = 0; i < sortedFirstArr.length; i++) {
		if (sortedFirstArr[i] !== sortedSecondArr[i]) {
			return false;
		}
	}

	return true;
}
